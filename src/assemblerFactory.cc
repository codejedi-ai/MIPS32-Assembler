#include "assemblerFactory.h"
#include <fstream>
#include <iostream>
#include <iomanip>

// ============================================================================
// ASSEMBLER FACTORY IMPLEMENTATION
// ============================================================================

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

AssemblyAssembler::AssemblyAssembler() : debugMode(false) {
}

AssemblyAssembler::AssemblyAssembler(const ScannerWrapper& scanner) : debugMode(false), scanner(scanner) {
}

int AssemblyAssembler::assemble(std::istream& input) {
    scanner.scanInput(input);
    return processAssembly(scanner.getTokens());
}

int AssemblyAssembler::assemble(const std::string& filename) {
    scanner.scanInput(filename);
    return processAssembly(scanner.getTokens());
}

void AssemblyAssembler::setDebugMode(bool debug) {
    debugMode = debug;
}

bool AssemblyAssembler::isDebugMode() const {
    return debugMode;
}

void AssemblyAssembler::outputToFile(const std::string& filename) {
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

int AssemblyAssembler::processAssembly(const std::vector<std::vector<Token>>& tokens) {
    // This would integrate with the existing assembler logic
    // For now, just print analysis
    std::cout << "Processing assembly file..." << std::endl;
    scanner.printAnalysis();
    return 0;
}

void AssemblyAssembler::outputAssemblyFile(const std::string& filename) {
    // This would output the assembled binary
    std::cout << "Outputting assembly file: " << filename << std::endl;
}

// ============================================================================
// MERL ASSEMBLER IMPLEMENTATION
// ============================================================================

MerlAssembler::MerlAssembler() : debugMode(false) {
    relocationRecords.clear();
    externalSymbols.clear();
    exportedSymbols.clear();
}

MerlAssembler::MerlAssembler(const ScannerWrapper& scanner) : debugMode(false), scanner(scanner) {
    relocationRecords.clear();
    externalSymbols.clear();
    exportedSymbols.clear();
}

int MerlAssembler::assemble(std::istream& input) {
    scanner.scanInput(input);
    return processMerlModule(scanner.getTokens());
}

int MerlAssembler::assemble(const std::string& filename) {
    scanner.scanInput(filename);
    return processMerlModule(scanner.getTokens());
}

void MerlAssembler::setDebugMode(bool debug) {
    debugMode = debug;
}

bool MerlAssembler::isDebugMode() const {
    return debugMode;
}

void MerlAssembler::outputToFile(const std::string& filename) {
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
