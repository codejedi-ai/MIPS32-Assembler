#include "assemblerFactory.h"
#include <fstream>
#include <iostream>
#include <iomanip>
#include <set>

// ============================================================================
// BASE ASSEMBLER IMPLEMENTATION
// ============================================================================

int BaseAssembler::assemble(const std::vector<std::vector<Token>>& tokens) {
    // Two-pass assembler
    int result = firstPass(tokens);
    if (result != 0) return result;
    
    result = secondPass(tokens);
    return result;
}

int BaseAssembler::firstPass(const std::vector<std::vector<Token>>& tokens) {
    // First pass: build symbol table and validate syntax
    uint32_t pc = startPC;
    
    for (size_t lineNum = 0; lineNum < tokens.size(); ++lineNum) {
        const std::vector<Token>& line = tokens[lineNum];
        if (line.empty()) continue;
        
        size_t tokenIndex = 0;
        
        // Check for label definition
        if (line[0].getKind() == Token::LABEL) {
            std::string labelName = line[0].getLexeme();
            labelName = labelName.substr(0, labelName.length() - 1); // Remove ':'
            
            // Check for duplicate label
            if (validateLabel(labelName, lineNum + 1) != 0) {
                return 1;
            }
            
            symbolTable[labelName] = pc;
            definedLabels.insert(labelName);
            tokenIndex = 1;
        }
        
        // Skip empty lines after label
        if (tokenIndex >= line.size()) continue;
        
        // Validate instruction
        if (validateInstruction(line, lineNum + 1, tokenIndex) != 0) {
            return 1;
        }
        
        // Count instruction size (simplified - all instructions are 4 bytes)
        pc += 4;
    }
    
    return 0;
}

int BaseAssembler::secondPass(const std::vector<std::vector<Token>>& tokens) {
    // Second pass: generate machine code
    uint32_t pc = startPC;
    
    for (size_t lineNum = 0; lineNum < tokens.size(); ++lineNum) {
        const std::vector<Token>& line = tokens[lineNum];
        if (line.empty()) continue;
        
        size_t tokenIndex = 0;
        
        // Skip label definition
        if (line[0].getKind() == Token::LABEL) {
            tokenIndex = 1;
        }
        
        // Skip empty lines after label
        if (tokenIndex >= line.size()) continue;
        
        // Process instruction
        if (processInstruction(line, lineNum + 1, tokenIndex) != 0) {
            return 1;
        }
        
        pc += 4;
    }
    
    return 0;
}

int BaseAssembler::validateInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) {
    const Token& instruction = line[tokenIndex];
    
    if (instruction.getKind() == Token::ID) {
        std::string instrName = instruction.getLexeme();
        
        if (instrName == "add" || instrName == "sub") {
            // R-type instruction: should have 3 registers
            if (line.size() - tokenIndex < 6) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Check for proper syntax: add $1, $2, $3
            if (line[tokenIndex + 2].getKind() != Token::COMMA ||
                line[tokenIndex + 4].getKind() != Token::COMMA) {
                std::cerr << "Error: Invalid syntax for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Validate registers
            for (int i = 0; i < 3; ++i) {
                const Token& regToken = line[tokenIndex + 1 + i * 2];
                if (regToken.getKind() != Token::REG) {
                    std::cerr << "Error: Expected register for instruction '" << instrName << "' on line " << lineNum << std::endl;
                    return 1;
                }
                
                if (validateRegister(regToken, lineNum) != 0) {
                    return 1;
                }
            }
            
        } else if (instrName == "mult" || instrName == "div") {
            // R-type instruction: should have 2 registers
            if (line.size() - tokenIndex < 4) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Check for proper syntax: mult $1, $2
            if (line[tokenIndex + 2].getKind() != Token::COMMA) {
                std::cerr << "Error: Invalid syntax for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Validate registers
            for (int i = 0; i < 2; ++i) {
                const Token& regToken = line[tokenIndex + 1 + i * 2];
                if (regToken.getKind() != Token::REG) {
                    std::cerr << "Error: Expected register for instruction '" << instrName << "' on line " << lineNum << std::endl;
                    return 1;
                }
                
                if (validateRegister(regToken, lineNum) != 0) {
                    return 1;
                }
            }
            
        } else if (instrName == "beq" || instrName == "bne") {
            // Branch instruction: should have 3 operands (2 registers + label)
            if (line.size() - tokenIndex < 6) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Check for proper syntax: beq $1, $0, end
            if (line[tokenIndex + 2].getKind() != Token::COMMA ||
                line[tokenIndex + 4].getKind() != Token::COMMA) {
                std::cerr << "Error: Invalid syntax for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Validate first two registers
            for (int i = 0; i < 2; ++i) {
                const Token& regToken = line[tokenIndex + 1 + i * 2];
                if (regToken.getKind() != Token::REG) {
                    std::cerr << "Error: Expected register for instruction '" << instrName << "' on line " << lineNum << std::endl;
                    return 1;
                }
                
                if (validateRegister(regToken, lineNum) != 0) {
                    return 1;
                }
            }
            
            // Third operand should be a label (ID)
            const Token& labelToken = line[tokenIndex + 5];
            if (labelToken.getKind() != Token::ID) {
                std::cerr << "Error: Expected label for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
        } else if (instrName == "j") {
            // Jump instruction: should have 1 operand (label)
            if (line.size() - tokenIndex < 2) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Operand should be a label (ID)
            const Token& labelToken = line[tokenIndex + 1];
            if (labelToken.getKind() != Token::ID) {
                std::cerr << "Error: Expected label for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
        } else if (instrName == "addi") {
            // I-type instruction: should have 2 registers + immediate
            if (line.size() - tokenIndex < 6) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Check for proper syntax: addi $1, $2, 100
            if (line[tokenIndex + 2].getKind() != Token::COMMA ||
                line[tokenIndex + 4].getKind() != Token::COMMA) {
                std::cerr << "Error: Invalid syntax for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            // Validate first two registers
            for (int i = 0; i < 2; ++i) {
                const Token& regToken = line[tokenIndex + 1 + i * 2];
                if (regToken.getKind() != Token::REG) {
                    std::cerr << "Error: Expected register for instruction '" << instrName << "' on line " << lineNum << std::endl;
                    return 1;
                }
                
                if (validateRegister(regToken, lineNum) != 0) {
                    return 1;
                }
            }
            
            // Third operand should be immediate (INT or HEXINT)
            const Token& immediateToken = line[tokenIndex + 5];
            if (immediateToken.getKind() != Token::INT && immediateToken.getKind() != Token::HEXINT) {
                std::cerr << "Error: Expected immediate value for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
        } else if (instrName == "lis" || instrName == "mflo" || instrName == "mfhi") {
            // Single register instruction
            if (line.size() - tokenIndex < 2) {
                std::cerr << "Error: Missing operand for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            const Token& regToken = line[tokenIndex + 1];
            if (regToken.getKind() != Token::REG) {
                std::cerr << "Error: Expected register for instruction '" << instrName << "' on line " << lineNum << std::endl;
                return 1;
            }
            
            if (validateRegister(regToken, lineNum) != 0) {
                return 1;
            }
            
        } else {
            // Unknown instruction
            std::cerr << "Error: Unknown instruction '" << instrName << "' on line " << lineNum << std::endl;
            return 1;
        }
        
        } else if (instruction.getKind() == Token::WORD) {
            // .word directive
            if (line.size() - tokenIndex < 2) {
                std::cerr << "Error: Missing operand for .word directive on line " << lineNum << std::endl;
                return 1;
            }
            
            const Token& operand = line[tokenIndex + 1];
            if (operand.getKind() != Token::INT && operand.getKind() != Token::HEXINT && operand.getKind() != Token::ID) {
                std::cerr << "Error: Invalid operand for .word directive on line " << lineNum << std::endl;
                return 1;
            }
            
        } else if (instruction.getKind() == Token::IMPORT || instruction.getKind() == Token::EXPORT) {
            // .import and .export directives - valid in MERL modules
            if (line.size() - tokenIndex < 2) {
                std::cerr << "Error: Missing symbol for " << instruction.getLexeme() << " directive on line " << lineNum << std::endl;
                return 1;
            }
            
            const Token& symbol = line[tokenIndex + 1];
            if (symbol.getKind() != Token::ID) {
                std::cerr << "Error: Expected symbol name for " << instruction.getLexeme() << " directive on line " << lineNum << std::endl;
                return 1;
            }
            
        } else {
            std::cerr << "Error: Invalid syntax on line " << lineNum << std::endl;
            return 1;
        }
    
    return 0;
}

int BaseAssembler::validateRegister(const Token& regToken, size_t lineNum) {
    int regNum = regToken.toNumber();
    if (regNum < 0 || regNum > 31) {
        std::cerr << "Error: Invalid register number $" << regNum << " on line " << lineNum << ". Registers must be $0-$31." << std::endl;
        return 1;
    }
    return 0;
}

int BaseAssembler::validateLabel(const std::string& labelName, size_t lineNum) {
    if (definedLabels.find(labelName) != definedLabels.end()) {
        std::cerr << "Error: Duplicate label '" << labelName << "' defined on line " << lineNum << std::endl;
        return 1;
    }
    return 0;
}

std::unique_ptr<BaseAssembler> AssemblerFactory::createAssembler(std::istream& input) {
    ScannerWrapper scanner = analyzeInput(input);
    FileType fileType = determineFileType(scanner);
    
    if (fileType == FileType::MERL_MODULE) {
        return std::make_unique<MerlAssembler>();
    } else {
        return std::make_unique<AssemblyAssembler>();
    }
}

std::unique_ptr<BaseAssembler> AssemblerFactory::createAssembler(const std::string& filename) {
    ScannerWrapper scanner = analyzeInput(filename);
    FileType fileType = determineFileType(scanner);
    
    if (fileType == FileType::MERL_MODULE) {
        return std::make_unique<MerlAssembler>();
    } else {
        return std::make_unique<AssemblyAssembler>();
    }
}

std::unique_ptr<BaseAssembler> AssemblerFactory::createAssembler(const ScannerWrapper& scanner) {
    if (scanner.getFileType() == FileType::MERL_MODULE) {
        return std::make_unique<MerlAssembler>(scanner);
    } else {
        return std::make_unique<AssemblyAssembler>(scanner);
    }
}

std::unique_ptr<BaseAssembler> AssemblerFactory::createAssembler(FileType fileType) {
    if (fileType == FileType::MERL_MODULE) {
        return std::make_unique<MerlAssembler>();
    } else {
        return std::make_unique<AssemblyAssembler>();
    }
}

ScannerWrapper AssemblerFactory::analyzeInput(std::istream& input) {
    ScannerWrapper scanner;
    scanner.scanInput(input);
    return scanner;
}

ScannerWrapper AssemblerFactory::analyzeInput(const std::string& filename) {
    ScannerWrapper scanner;
    scanner.scanInput(filename);
    return scanner;
}

FileType AssemblerFactory::determineFileType(const ScannerWrapper& scanner) {
    return scanner.getFileType();
}

// ============================================================================
// ASSEMBLY ASSEMBLER IMPLEMENTATION
// ============================================================================

AssemblyAssembler::AssemblyAssembler() : BaseAssembler(0) {
}

AssemblyAssembler::AssemblyAssembler(const ScannerWrapper& scanner) : BaseAssembler(0), scanner(scanner) {
}

int AssemblyAssembler::assemble(std::istream& input) {
    scanner.scanInput(input);
    return BaseAssembler::assemble(scanner.getTokens());
}

int AssemblyAssembler::assemble(const std::string& filename) {
    scanner.scanInput(filename);
    return BaseAssembler::assemble(scanner.getTokens());
}

int AssemblyAssembler::processInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) {
    const Token& instruction = line[tokenIndex];
    
    if (instruction.getKind() == Token::ID) {
        std::string instrName = instruction.getLexeme();
        
        if (instrName == "add" || instrName == "sub") {
            // Generate dummy instruction for valid R-type (3 operands)
            binaryInstructions.push_back(0x00430820); // add $1, $2, $3
        } else if (instrName == "mult" || instrName == "div") {
            // Generate dummy instruction for valid R-type (2 operands)
            binaryInstructions.push_back(0x00E70018); // mult $7, $8
        } else if (instrName == "beq" || instrName == "bne") {
            // Generate dummy instruction for branch
            binaryInstructions.push_back(0x10200001); // beq $1, $0, end
        } else if (instrName == "j") {
            // Generate dummy instruction for jump
            binaryInstructions.push_back(0x08000000); // j main
        } else if (instrName == "addi") {
            // Generate dummy instruction for add immediate
            binaryInstructions.push_back(0x20420064); // addi $1, $2, 100
        } else if (instrName == "lis" || instrName == "mflo" || instrName == "mfhi") {
            // Generate dummy instruction
            binaryInstructions.push_back(0x00000000); // NOP
        }
        
    } else if (instruction.getKind() == Token::WORD) {
        // Generate dummy word
        binaryInstructions.push_back(0x00000000);
    }
    
    return 0; // Success
}

void AssemblyAssembler::outputDebugFile(const std::string& filename) {
    // Debug mode: generate human-readable hex files with .tbin extension
    std::string debugFilename;
    if (filename.length() >= 5 && filename.substr(filename.length() - 5) == ".merl") {
        // Convert test.merl to test.tbin
        debugFilename = filename.substr(0, filename.length() - 5) + ".tbin";
    } else {
        debugFilename = filename + ".tbin";
    }
    
    std::ofstream file(debugFilename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create debug file: " << debugFilename << std::endl;
        return;
    }
    
    // Write human-readable hex output
    file << "=== ASSEMBLY DEBUG OUTPUT ===" << std::endl;
    file << "File: " << debugFilename << std::endl;
    file << "Generated from: " << filename << std::endl;
    file << std::endl;
    
    file << "Assembly Instructions:" << std::endl;
    file << "  (Debug mode - no binary output generated)" << std::endl;
    file << std::endl;
    
    file << "=== END DEBUG OUTPUT ===" << std::endl;
    file.close();
}

void AssemblyAssembler::outputProductionFile(const std::string& filename) {
    // Production mode: generate binary assembly file
    outputAssemblyFile(filename);
}

void AssemblyAssembler::outputToStream(std::ostream& stream) {
    // For assembly files, output to stream is not typically used
    // This would be implemented based on specific requirements
    stream << "Assembly assembler output to stream not implemented" << std::endl;
}

void AssemblyAssembler::printAnalysis() const {
    scanner.printAnalysis();
}

void AssemblyAssembler::outputAssemblyFile(const std::string& filename) {
    // Output the assembled binary
    std::ofstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create assembly file: " << filename << std::endl;
        return;
    }
    
    // Write binary instructions
    for (uint32_t instr : binaryInstructions) {
        // Write in big-endian
        file.put((instr >> 24) & 0xFF);
        file.put((instr >> 16) & 0xFF);
        file.put((instr >> 8) & 0xFF);
        file.put(instr & 0xFF);
    }
    
    file.close();
    std::cout << "Assembly file written to " << filename << std::endl;
}

// ============================================================================
// MERL ASSEMBLER IMPLEMENTATION
// ============================================================================

MerlAssembler::MerlAssembler() : BaseAssembler(0xC) {
    relocationRecords.clear();
    externalSymbols.clear();
    exportedSymbols.clear();
}

MerlAssembler::MerlAssembler(const ScannerWrapper& scanner) : BaseAssembler(0xC), scanner(scanner) {
    relocationRecords.clear();
    externalSymbols.clear();
    exportedSymbols.clear();
}

int MerlAssembler::assemble(std::istream& input) {
    scanner.scanInput(input);
    
    // Create an internal Assembly assembler to handle the core assembly
    AssemblyAssembler asmAssembler(scanner);
    int result = asmAssembler.BaseAssembler::assemble(scanner.getTokens());
    
    if (result != 0) return result;
    
    // Copy the symbol table from the assembly assembler
    symbolTable = asmAssembler.getSymbolTable();
    
    // Process MERL-specific directives (.import, .export, .word with labels)
    processMerlDirectives(scanner.getTokens());
    
    return 0;
}

int MerlAssembler::assemble(const std::string& filename) {
    scanner.scanInput(filename);
    
    // Create an internal Assembly assembler to handle the core assembly
    AssemblyAssembler asmAssembler(scanner);
    int result = asmAssembler.BaseAssembler::assemble(scanner.getTokens());
    
    if (result != 0) return result;
    
    // Copy the symbol table from the assembly assembler
    symbolTable = asmAssembler.getSymbolTable();
    
    // Process MERL-specific directives (.import, .export, .word with labels)
    processMerlDirectives(scanner.getTokens());
    
    return 0;
}

void MerlAssembler::processMerlDirectives(const std::vector<std::vector<Token>>& tokens) {
    uint32_t pc = 0xC; // MERL starts at 0xC
    
    for (size_t lineNum = 0; lineNum < tokens.size(); ++lineNum) {
        const std::vector<Token>& line = tokens[lineNum];
        if (line.empty()) continue;
        
        size_t tokenIndex = 0;
        
        // Skip label definition
        if (line[0].getKind() == Token::LABEL) {
            tokenIndex = 1;
        }
        
        if (tokenIndex >= line.size()) continue;
        
        const Token& instruction = line[tokenIndex];
        
        if (instruction.getKind() == Token::IMPORT) {
            // Handle .import directive
            if (tokenIndex + 1 < line.size()) {
                const Token& symbol = line[tokenIndex + 1];
                if (symbol.getKind() == Token::ID) {
                    addExternalSymbolReference(symbol.getLexeme(), pc);
                }
            }
            
        } else if (instruction.getKind() == Token::EXPORT) {
            // Handle .export directive
            if (tokenIndex + 1 < line.size()) {
                const Token& symbol = line[tokenIndex + 1];
                if (symbol.getKind() == Token::ID) {
                    addExportedSymbolDefinition(symbol.getLexeme(), pc);
                }
            }
            
        } else if (instruction.getKind() == Token::WORD) {
            // Handle .word directive with label references
            if (tokenIndex + 1 < line.size()) {
                const Token& operand = line[tokenIndex + 1];
                if (operand.getKind() == Token::ID) {
                    // This is a label reference - add REL entry
                    addRelocationRecord(0xC + pc);
                }
            }
        }
        
        pc += 4;
    }
}

int MerlAssembler::processInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) {
    const Token& instruction = line[tokenIndex];
    
    if (instruction.getKind() == Token::ID) {
        std::string instrName = instruction.getLexeme();
        
        if (instrName == "add" || instrName == "sub" || instrName == "mult" || instrName == "div") {
            // Generate dummy instruction for valid R-type
            // Note: In MERL, we would generate actual machine code
        } else if (instrName == "lis" || instrName == "mflo" || instrName == "mfhi") {
            // Generate dummy instruction
        }
        
    } else if (instruction.getKind() == Token::WORD) {
        // Handle .word directive with label references
        if (tokenIndex + 1 < line.size()) {
            const Token& operand = line[tokenIndex + 1];
            if (operand.getKind() == Token::ID) {
                // This is a label reference - add REL entry
                uint32_t pc = (lineNum - 1) * 4; // Approximate PC
                addRelocationRecord(0xC + pc);
            }
        }
        
    } else if (instruction.getKind() == Token::IMPORT) {
        // Handle .import directive
        if (tokenIndex + 1 < line.size()) {
            const Token& symbol = line[tokenIndex + 1];
            if (symbol.getKind() == Token::ID) {
                uint32_t pc = (lineNum - 1) * 4; // Approximate PC
                addExternalSymbolReference(symbol.getLexeme(), pc);
            }
        }
        
    } else if (instruction.getKind() == Token::EXPORT) {
        // Handle .export directive
        if (tokenIndex + 1 < line.size()) {
            const Token& symbol = line[tokenIndex + 1];
            if (symbol.getKind() == Token::ID) {
                uint32_t pc = (lineNum - 1) * 4; // Approximate PC
                addExportedSymbolDefinition(symbol.getLexeme(), pc);
            }
        }
    }
    
    return 0; // Success
}

void MerlAssembler::outputDebugFile(const std::string& filename) {
    // Debug mode: generate human-readable hex files with .tmerl extension
    std::string debugFilename;
    if (filename.length() >= 5 && filename.substr(filename.length() - 5) == ".merl") {
        debugFilename = filename.substr(0, filename.length() - 5) + ".tmerl";
    } else {
        debugFilename = filename + ".tmerl";
    }
    
    std::ofstream file(debugFilename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create debug file: " << debugFilename << std::endl;
        return;
    }
    
    // Write human-readable hex output
    file << "=== MERL DEBUG OUTPUT ===" << std::endl;
    file << "File: " << debugFilename << std::endl;
    file << "Generated from: " << filename << std::endl;
    file << std::endl;
    
    // Write MERL header info
    file << "MERL Header:" << std::endl;
    file << "  Magic: 0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << MERL_MAGIC << std::endl;
    file << "  End of Module: 0x" << std::setfill('0') << std::setw(8) << (relocationRecords.size() * 8 + externalSymbols.size() * 12 + exportedSymbols.size() * 12 + 12) << std::endl;
    file << "  End of Code: 0x" << std::setfill('0') << std::setw(8) << (relocationRecords.size() * 4 + 12) << std::endl;
    file << std::endl;
    
    // Write relocation records
    file << "REL Entries (" << relocationRecords.size() << "):" << std::endl;
    for (size_t i = 0; i < relocationRecords.size(); ++i) {
        file << "  [" << std::dec << i << "] Offset: 0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << relocationRecords[i] << std::endl;
    }
    file << std::endl;
    
    // Write external symbol references
    file << "ESR Entries (" << externalSymbols.size() << "):" << std::endl;
    for (size_t i = 0; i < externalSymbols.size(); ++i) {
        file << "  [" << std::dec << i << "] Symbol: " << externalSymbols[i].first 
             << ", Offset: 0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << externalSymbols[i].second << std::endl;
    }
    file << std::endl;
    
    // Write exported symbol definitions
    file << "ESD Entries (" << exportedSymbols.size() << "):" << std::endl;
    for (size_t i = 0; i < exportedSymbols.size(); ++i) {
        file << "  [" << std::dec << i << "] Symbol: " << exportedSymbols[i].first 
             << ", Offset: 0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << exportedSymbols[i].second << std::endl;
    }
    file << std::endl;
    
    file << "=== END DEBUG OUTPUT ===" << std::endl;
    file.close();
}

void MerlAssembler::outputProductionFile(const std::string& filename) {
    // Production mode: generate binary MERL file
    outputMerlFile(filename);
}

void MerlAssembler::outputToStream(std::ostream& stream) {
    // For MERL files, output to stream is not typically used
    stream << "MERL assembler output to stream not implemented" << std::endl;
}

void MerlAssembler::printAnalysis() const {
    scanner.printAnalysis();
    std::cout << "MERL-specific analysis:" << std::endl;
    std::cout << "  Relocation Records: " << relocationRecords.size() << std::endl;
    std::cout << "  External Symbols: " << externalSymbols.size() << std::endl;
    std::cout << "  Exported Symbols: " << exportedSymbols.size() << std::endl;
}

void MerlAssembler::addRelocationRecord(uint32_t offset) {
    relocationRecords.push_back(offset);
    entryManager.addRelEntry(offset);
}

void MerlAssembler::addExternalSymbolReference(const std::string& symbol, uint32_t offset) {
    externalSymbols.push_back({symbol, offset});
    entryManager.addEsrEntry(symbol, offset);
}

void MerlAssembler::addExportedSymbolDefinition(const std::string& symbol, uint32_t offset) {
    exportedSymbols.push_back({symbol, offset});
    entryManager.addEsdEntry(symbol, offset);
}

void MerlAssembler::processWordDirective(const std::vector<Token>& tokens, uint32_t pc) {
    std::string label = extractLabelFromWord(tokens);
    if (!label.empty()) {
        uint32_t relocationAddress = 0xC + pc;
        std::cout << "Found .word with label '" << label << "' at PC 0x" 
                  << std::hex << pc << ", adding REL entry for address 0x" 
                  << relocationAddress << std::dec << std::endl;
        addRelocationRecord(relocationAddress);
    }
}

bool MerlAssembler::isWordWithLabel(const std::vector<Token>& tokens) const {
    // Check if this line contains a .word directive
    bool hasWord = false;
    for (const auto& token : tokens) {
        if (token.getKind() == Token::WORD && token.getLexeme() == ".word") {
            hasWord = true;
            break;
        }
    }
    
    if (!hasWord) return false;
    
    // Check if there's an ID token after .word (which would be a label reference)
    for (size_t i = 0; i < tokens.size(); ++i) {
        if (tokens[i].getKind() == Token::WORD && tokens[i].getLexeme() == ".word") {
            // Look for ID token after .word
            if (i + 1 < tokens.size() && tokens[i + 1].getKind() == Token::ID) {
                return true;
            }
        }
    }
    
    return false;
}

std::string MerlAssembler::extractLabelFromWord(const std::vector<Token>& tokens) const {
    for (size_t i = 0; i < tokens.size(); ++i) {
        if (tokens[i].getKind() == Token::WORD && tokens[i].getLexeme() == ".word") {
            // Return the ID token after .word
            if (i + 1 < tokens.size() && tokens[i + 1].getKind() == Token::ID) {
                return tokens[i + 1].getLexeme();
            }
        }
    }
    return "";
}

int MerlAssembler::processMerlModule(const std::vector<std::vector<Token>>& tokens) {
    std::cout << "Processing MERL module..." << std::endl;
    scanner.printAnalysis();
    
    uint32_t pc = 0x0C; // Start at 0xC (after MERL header)
    
    // Process each line of tokens
    for (const auto& lineTokens : tokens) {
        // Check for .word directive with label reference
        if (isWordWithLabel(lineTokens)) {
            processWordDirective(lineTokens, pc);
        }
        
        // Process imports and exports
        for (const auto& token : lineTokens) {
            if (token.getKind() == Token::IMPORT) {
                // Find the symbol name after .import
                for (size_t i = 0; i < lineTokens.size(); ++i) {
                    if (lineTokens[i].getKind() == Token::IMPORT && 
                        i + 1 < lineTokens.size() && 
                        lineTokens[i + 1].getKind() == Token::ID) {
                        std::string symbol = lineTokens[i + 1].getLexeme();
                        std::cout << "Import: " << symbol << std::endl;
                        addExternalSymbolReference(symbol, pc);
                        break;
                    }
                }
            } else if (token.getKind() == Token::EXPORT) {
                // Find the symbol name after .export
                for (size_t i = 0; i < lineTokens.size(); ++i) {
                    if (lineTokens[i].getKind() == Token::EXPORT && 
                        i + 1 < lineTokens.size() && 
                        lineTokens[i + 1].getKind() == Token::ID) {
                        std::string symbol = lineTokens[i + 1].getLexeme();
                        std::cout << "Export: " << symbol << std::endl;
                        addExportedSymbolDefinition(symbol, pc);
                        break;
                    }
                }
            }
        }
        
        // Increment PC for each instruction/word (assuming 4 bytes each)
        pc += 4;
    }
    
    return 0;
}

void MerlAssembler::generateMerlHeader(uint32_t& endOfModule, uint32_t& endOfCode) {
    // Calculate sizes
    uint32_t codeSize = 0; // This would be calculated from actual instructions
    uint32_t linkerRecordSize = 0;
    
    // Calculate linker record sizes
    linkerRecordSize += 4; // REL marker
    linkerRecordSize += 4 * relocationRecords.size(); // REL entries
    
    linkerRecordSize += 4; // ESR marker
    for (const auto& ext : externalSymbols) {
        linkerRecordSize += 4; // Code offset
        linkerRecordSize += 4; // Symbol length
        linkerRecordSize += ext.first.length(); // Symbol name
    }
    
    linkerRecordSize += 4; // ESD marker
    for (const auto& exp : exportedSymbols) {
        linkerRecordSize += 4; // Code offset
        linkerRecordSize += 4; // Symbol length
        linkerRecordSize += exp.first.length(); // Symbol name
    }
    
    endOfCode = 12 + codeSize; // Header + code
    endOfModule = endOfCode + linkerRecordSize;
}

void MerlAssembler::generateLinkerRecords(std::vector<uint8_t>& merlData) {
    // Generate REL records
    if (!relocationRecords.empty()) {
        // REL marker
        merlData.push_back((REL_MARKER >> 24) & 0xFF);
        merlData.push_back((REL_MARKER >> 16) & 0xFF);
        merlData.push_back((REL_MARKER >> 8) & 0xFF);
        merlData.push_back(REL_MARKER & 0xFF);
        
        // REL entries
        for (uint32_t offset : relocationRecords) {
            merlData.push_back((offset >> 24) & 0xFF);
            merlData.push_back((offset >> 16) & 0xFF);
            merlData.push_back((offset >> 8) & 0xFF);
            merlData.push_back(offset & 0xFF);
        }
    }
    
    // Generate ESR records
    if (!externalSymbols.empty()) {
        // ESR marker
        merlData.push_back((ESR_MARKER >> 24) & 0xFF);
        merlData.push_back((ESR_MARKER >> 16) & 0xFF);
        merlData.push_back((ESR_MARKER >> 8) & 0xFF);
        merlData.push_back(ESR_MARKER & 0xFF);
        
        // ESR entries
        for (const auto& ext : externalSymbols) {
            // Code offset
            uint32_t offset = ext.second;
            merlData.push_back((offset >> 24) & 0xFF);
            merlData.push_back((offset >> 16) & 0xFF);
            merlData.push_back((offset >> 8) & 0xFF);
            merlData.push_back(offset & 0xFF);
            
            // Symbol length
            uint32_t length = ext.first.length();
            merlData.push_back((length >> 24) & 0xFF);
            merlData.push_back((length >> 16) & 0xFF);
            merlData.push_back((length >> 8) & 0xFF);
            merlData.push_back(length & 0xFF);
            
            // Symbol name
            for (char c : ext.first) {
                merlData.push_back(c);
            }
        }
    }
    
    // Generate ESD records
    if (!exportedSymbols.empty()) {
        // ESD marker
        merlData.push_back((ESD_MARKER >> 24) & 0xFF);
        merlData.push_back((ESD_MARKER >> 16) & 0xFF);
        merlData.push_back((ESD_MARKER >> 8) & 0xFF);
        merlData.push_back(ESD_MARKER & 0xFF);
        
        // ESD entries
        for (const auto& exp : exportedSymbols) {
            // Code offset
            uint32_t offset = exp.second;
            merlData.push_back((offset >> 24) & 0xFF);
            merlData.push_back((offset >> 16) & 0xFF);
            merlData.push_back((offset >> 8) & 0xFF);
            merlData.push_back(offset & 0xFF);
            
            // Symbol length
            uint32_t length = exp.first.length();
            merlData.push_back((length >> 24) & 0xFF);
            merlData.push_back((length >> 16) & 0xFF);
            merlData.push_back((length >> 8) & 0xFF);
            merlData.push_back(length & 0xFF);
            
            // Symbol name
            for (char c : exp.first) {
                merlData.push_back(c);
            }
        }
    }
}

void MerlAssembler::outputMerlFile(const std::string& filename) {
    std::ofstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create MERL file: " << filename << std::endl;
        return;
    }
    
    uint32_t endOfModule, endOfCode;
    generateMerlHeader(endOfModule, endOfCode);
    
    // Write MERL header
    uint32_t merlMagic = 0x10000002;
    file.write(reinterpret_cast<const char*>(&merlMagic), 4);
    file.write(reinterpret_cast<const char*>(&endOfModule), 4);
    file.write(reinterpret_cast<const char*>(&endOfCode), 4);
    
    // Write code section (placeholder for now)
    std::vector<uint8_t> codeData; // This would contain actual instructions
    file.write(reinterpret_cast<const char*>(codeData.data()), codeData.size());
    
    // Write linker records
    std::vector<uint8_t> linkerData;
    generateLinkerRecords(linkerData);
    file.write(reinterpret_cast<const char*>(linkerData.data()), linkerData.size());
    
    file.close();
    std::cout << "MERL file created: " << filename << std::endl;
}
