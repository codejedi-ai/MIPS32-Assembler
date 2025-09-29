#include "assembler.h"
#include <sstream> // For std::stringstream
#include <algorithm> // For std::transform
#include <iomanip>  // For std::setfill, std::setw

// ============================================================================
// MIPS ASSEMBLER IMPLEMENTATION
// ============================================================================

Assembler::Assembler(bool debugMode) : programCounter(0), currentLineNumber(0), debugMode(debugMode) {
    binaryInstructions.clear();
}

int Assembler::assemble(std::istream& input) {
    std::string line;
    std::vector<std::vector<Token>> assemblyProgram;
    currentLineNumber = 0;
    
    try {
        // Read and tokenize input
        while (getline(input, line)) {
            currentLineNumber++;
            assemblyProgram.push_back(scan(line));
        }
    }
    catch (ScanningFailure &f) {
        ErrorContext context = ErrorReporter::createContext(currentLineNumber, line, "assemble");
        ErrorReporter::reportError(ErrorType::SYNTAX_ERROR, f.what(), context);
        return 1;
    }
    
    // First pass: build symbol table
    if (firstPass(assemblyProgram) != 0) {
        return 1;
    }
    
    // Second pass: generate machine code
    if (secondPass(assemblyProgram) != 0) {
        return 1;
    }
    
    // Output MERL file
    outputMERLFile();
    
    return 0;
}

int Assembler::firstPass(const std::vector<std::vector<Token>>& program) {
    programCounter = 0;
    int lineNumber = 0;
    
    for (const auto& line : program) {
        lineNumber++;
        if (line.empty()) continue;
        
        size_t ind = 0;
        
        // Process labels
        while (ind < line.size() && line[ind].getKind() == Token::LABEL) {
            std::string label = line[ind].getLexeme();
            label.resize(label.size() - 1); // Remove ':'
            
            if (hasLabel(label)) {
                ErrorContext context = ErrorReporter::createContext(lineNumber, "", line, ind);
                int originalLine = getLabelLineNumber(label);
                context.additionalInfo = "Label '" + label + "' was already defined on line " + std::to_string(originalLine);
                ErrorReporter::reportLabelError("Duplicate label definition", context);
                return 1;
            }
            
            addLabel(label, programCounter, lineNumber);
            ind++;
        }
        
        if (ind == line.size()) continue;
        
        // Validate instruction
        if (!isValidInstruction(line, ind)) {
            ErrorContext context = ErrorReporter::createContext(lineNumber, "", line, ind);
            context.additionalInfo = "Expected valid instruction format";
            ErrorReporter::reportInstructionError("Invalid instruction or parameters", context);
            return 1;
        }
        
        programCounter += 4;
    }
    
    return 0;
}

int Assembler::secondPass(const std::vector<std::vector<Token>>& program) {
    programCounter = 0;
    
    for (const auto& line : program) {
        if (line.empty()) continue;
        
        size_t ind = 0;
        
        // Skip labels
        while (ind < line.size() && line[ind].getKind() == Token::LABEL) {
            ind++;
        }
        
        if (ind == line.size()) continue;
        
        // Process instruction
        auto instruction = processInstruction(line, ind);
        if (instruction) {
            addInstruction(instruction->getValue());
        } else {
            reportError("ERROR: Failed to create instruction");
            return 1;
        }
        
        programCounter += 4;
    }
    
    return 0;
}

void Assembler::addInstruction(uint32_t instruction) {
    binaryInstructions.push_back(instruction);
    
    // Debug mode: output hexadecimal instruction
    if (debugMode) {
        std::cout << "0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << instruction << std::endl;
    }
}

void Assembler::outputMERLFile() {
    // Only output MERL file in production mode
    if (!debugMode) {
        AssemblerUtils::outputMERLFile(binaryInstructions);
    }
}

void Assembler::addLabel(const std::string& label, int address, int lineNumber) {
    symbolTable[label] = address;
    labelLineNumbers[label] = lineNumber;
}

bool Assembler::hasLabel(const std::string& label) const {
    return symbolTable.find(label) != symbolTable.end();
}

int Assembler::getLabelAddress(const std::string& label) const {
    auto it = symbolTable.find(label);
    return (it != symbolTable.end()) ? it->second : -1;
}

int Assembler::getLabelLineNumber(const std::string& label) const {
    auto it = labelLineNumbers.find(label);
    return (it != labelLineNumbers.end()) ? it->second : -1;
}

std::unique_ptr<Instruction> Assembler::processInstruction(const std::vector<Token>& tokens, int startIndex) {
    // Handle .word pseudo-instruction
    if (tokens[startIndex].getKind() == Token::WORD) {
        if (startIndex + 1 >= tokens.size()) {
            return nullptr;
        }
        
        uint32_t value;
        if (tokens[startIndex + 1].getKind() == Token::ID) {
            // Label reference
            std::string label = tokens[startIndex + 1].getLexeme();
            if (!hasLabel(label)) {
                reportError("ERROR: Invalid Label: " + label);
                return nullptr;
            }
            value = getLabelAddress(label);
        } else {
            // Immediate value
            value = tokens[startIndex + 1].toNumber();
        }
        
        return std::make_unique<Instruction>(value);
    }
    
    // Handle branch instructions with label resolution
    if (tokens[startIndex].getLexeme() == "beq" || tokens[startIndex].getLexeme() == "bne") {
        if (startIndex + 5 >= tokens.size()) {
            return nullptr;
        }
        
        int rs = extractRegisterNumber(tokens[startIndex + 1]);
        int rt = extractRegisterNumber(tokens[startIndex + 3]);
        int16_t offset = calculateBranchOffset(tokens[startIndex + 5], programCounter);
        
        if (tokens[startIndex].getLexeme() == "beq") {
            return std::make_unique<BeqInstruction>(rs, rt, offset);
        } else {
            return std::make_unique<BneInstruction>(rs, rt, offset);
        }
    }
    
    // Use instruction factory for all other instructions
    return InstructionFactory::createInstruction(tokens, startIndex);
}

void Assembler::reportError(const std::string& message) {
    std::cerr << message << std::endl;
}

void Assembler::reportDetailedError(ErrorType type, const std::string& message, const std::vector<Token>& tokens, int tokenIndex) {
    ErrorContext context = ErrorReporter::createContext(currentLineNumber, "", tokens, tokenIndex);
    ErrorReporter::reportError(type, message, context);
}

void Assembler::reportDetailedError(ErrorType type, const std::string& message, const std::string& function) {
    ErrorContext context = ErrorReporter::createContext(currentLineNumber, "", function);
    ErrorReporter::reportError(type, message, context);
}

int Assembler::extractRegisterNumber(const Token& token) {
    if (token.getKind() != Token::REG) {
        return 0;
    }
    
    std::string regStr = token.getLexeme();
    if (regStr.length() > 1 && regStr[0] == '$') {
        return std::stoi(regStr.substr(1));
    }
    
    return 0;
}

int16_t Assembler::calculateBranchOffset(const Token& token, int currentPC) {
    if (token.getKind() == Token::ID) {
        // Label reference
        std::string label = token.getLexeme();
        if (!hasLabel(label)) {
            reportError("ERROR: " + label + " is an invalid token");
            return 0;
        }
        
        int targetAddress = getLabelAddress(label);
        int offset = (targetAddress - currentPC) / 4;
        
        // Validate offset range
        if (offset < -32768 || offset > 32767) {
            reportError("ERROR: Branch offset out of range");
            return 0;
        }
        
        return static_cast<int16_t>(offset);
    } else {
        // Immediate value
        int32_t value = token.toNumber();
        
        // Validate immediate range
        if (token.getKind() == Token::INT && (value < -32768 || value > 32767)) {
            reportError("ERROR: Step count out of range. must be -32768 <= i <= 32767");
            return 0;
        }
        if (token.getKind() == Token::HEXINT && value > 0xffff) {
            reportError("ERROR: Step count out of range. must be i <= 0xffff");
            return 0;
        }
        
        return static_cast<int16_t>(value & 0xFFFF);
    }
}

bool Assembler::isValidInstruction(const std::vector<Token>& tokens, int startIndex) {
    return lw_sw(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           mult_multu_div_divu(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           mfhi_mflo_lis(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           beq_bne(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           word(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           jr_jalr(startIndex, const_cast<std::vector<Token>&>(tokens)) ||
           add_sub_slt_sltu(startIndex, const_cast<std::vector<Token>&>(tokens));
}
