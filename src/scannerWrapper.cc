#include "scannerWrapper.h"
#include <fstream>
#include <algorithm>
#include <iostream>
#include <stdexcept>

// ============================================================================
// SCANNER WRAPPER IMPLEMENTATION
// ============================================================================

ScannerWrapper::ScannerWrapper() : fileType(FileType::ASSEMBLY) {
    clearAnalysis();
}

FileType ScannerWrapper::scanInput(std::istream& input) {
    std::cout << "ScannerWrapper::scanInput(std::istream) called" << std::endl;
    clearAnalysis();
    
    std::string line;
    while (std::getline(input, line)) {
        originalLines.push_back(line);  // Store original line
        
        try {
            std::vector<Token> lineTokens = scan(line);
            tokens.push_back(lineTokens);
        } catch (const ScanningFailure& e) {
            // Handle scanning failures gracefully
            std::cerr << "Scanning error: " << e.what() << std::endl;
            // Continue with empty token vector for this line
            tokens.push_back(std::vector<Token>());
        }
    }
    
    analyzeTokens();
    std::cout << "ScannerWrapper scanned " << tokens.size() << " lines, file type: " << (fileType == FileType::MERL_MODULE ? "MERL_MODULE" : "ASSEMBLY") << std::endl;
    return fileType;
}

FileType ScannerWrapper::scanInput(const std::string& filename) {
    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open file: " << filename << std::endl;
        return FileType::ASSEMBLY;
    }
    
    return scanInput(file);
}

const std::vector<std::vector<Token>>& ScannerWrapper::getTokens() const {
    return tokens;
}

FileType ScannerWrapper::getFileType() const {
    return fileType;
}

bool ScannerWrapper::hasImports() const {
    return !imports.empty();
}

bool ScannerWrapper::hasExports() const {
    return !exports.empty();
}

const std::vector<std::string>& ScannerWrapper::getImports() const {
    return imports;
}

const std::vector<std::string>& ScannerWrapper::getExports() const {
    return exports;
}

const std::vector<std::string>& ScannerWrapper::getDefinedLabels() const {
    return definedLabels;
}

const std::vector<std::string>& ScannerWrapper::getReferencedLabels() const {
    return referencedLabels;
}

void ScannerWrapper::printAnalysis() const {
    std::cout << "=== FILE ANALYSIS ===" << std::endl;
    std::cout << "File Type: " << (fileType == FileType::MERL_MODULE ? "MERL Module" : "Assembly") << std::endl;
    std::cout << "Total Lines: " << tokens.size() << std::endl;
    
    if (hasImports()) {
        std::cout << "Imports (" << imports.size() << "): ";
        for (const auto& imp : imports) {
            std::cout << imp << " ";
        }
        std::cout << std::endl;
    }
    
    if (hasExports()) {
        std::cout << "Exports (" << exports.size() << "): ";
        for (const auto& exp : exports) {
            std::cout << exp << " ";
        }
        std::cout << std::endl;
    }
    
    if (!definedLabels.empty()) {
        std::cout << "Defined Labels (" << definedLabels.size() << "): ";
        for (const auto& label : definedLabels) {
            std::cout << label << " ";
        }
        std::cout << std::endl;
    }
    
    if (!referencedLabels.empty()) {
        std::cout << "Referenced Labels (" << referencedLabels.size() << "): ";
        for (const auto& label : referencedLabels) {
            std::cout << label << " ";
        }
        std::cout << std::endl;
    }
    std::cout << "====================" << std::endl;
}

void ScannerWrapper::analyzeTokens() {
    detectImportsExports();
    detectLabels();
    
    // Determine file type based on imports/exports
    if (hasImports() || hasExports()) {
        fileType = FileType::MERL_MODULE;
    } else {
        fileType = FileType::ASSEMBLY;
    }
}

void ScannerWrapper::detectImportsExports() {
    // First, try to detect from successfully scanned tokens
    for (const auto& lineTokens : tokens) {
        if (isImportDirective(lineTokens)) {
            // Extract import symbol name
            for (size_t i = 0; i < lineTokens.size(); ++i) {
                if (lineTokens[i].getKind() == Token::IMPORT) {
                    if (i + 1 < lineTokens.size() && 
                        lineTokens[i + 1].getKind() == Token::ID) {
                        imports.push_back(lineTokens[i + 1].getLexeme());
                    }
                    break;
                }
            }
        } else if (isExportDirective(lineTokens)) {
            // Extract export symbol name
            for (size_t i = 0; i < lineTokens.size(); ++i) {
                if (lineTokens[i].getKind() == Token::EXPORT) {
                    if (i + 1 < lineTokens.size() && 
                        lineTokens[i + 1].getKind() == Token::ID) {
                        exports.push_back(lineTokens[i + 1].getLexeme());
                    }
                    break;
                }
            }
        }
    }
    
    // Also check original lines for .import/.export directives
    for (size_t i = 0; i < originalLines.size(); ++i) {
        const std::string& line = originalLines[i];
        
        // Check for .import directive
        if (line.find(".import") != std::string::npos) {
            // Extract the symbol name after .import
            size_t importPos = line.find(".import");
            if (importPos != std::string::npos) {
                size_t startPos = importPos + 7; // Length of ".import"
                // Skip whitespace
                while (startPos < line.length() && std::isspace(line[startPos])) {
                    startPos++;
                }
                // Extract symbol name
                size_t endPos = startPos;
                while (endPos < line.length() && !std::isspace(line[endPos])) {
                    endPos++;
                }
                if (endPos > startPos) {
                    std::string symbol = line.substr(startPos, endPos - startPos);
                    // Check if not already added
                    if (std::find(imports.begin(), imports.end(), symbol) == imports.end()) {
                        imports.push_back(symbol);
                    }
                }
            }
        }
        
        // Check for .export directive
        if (line.find(".export") != std::string::npos) {
            // Extract the symbol name after .export
            size_t exportPos = line.find(".export");
            if (exportPos != std::string::npos) {
                size_t startPos = exportPos + 7; // Length of ".export"
                // Skip whitespace
                while (startPos < line.length() && std::isspace(line[startPos])) {
                    startPos++;
                }
                // Extract symbol name
                size_t endPos = startPos;
                while (endPos < line.length() && !std::isspace(line[endPos])) {
                    endPos++;
                }
                if (endPos > startPos) {
                    std::string symbol = line.substr(startPos, endPos - startPos);
                    // Check if not already added
                    if (std::find(exports.begin(), exports.end(), symbol) == exports.end()) {
                        exports.push_back(symbol);
                    }
                }
            }
        }
    }
}

void ScannerWrapper::detectLabels() {
    for (const auto& lineTokens : tokens) {
        if (isLabelDefinition(lineTokens)) {
            // Extract label name
            for (const auto& token : lineTokens) {
                if (token.getKind() == Token::LABEL) {
                    std::string labelName = token.getLexeme();
                    // Remove the colon
                    if (!labelName.empty() && labelName.back() == ':') {
                        labelName.pop_back();
                    }
                    definedLabels.push_back(labelName);
                    break;
                }
            }
        }
        
        // Extract label references from instructions
        extractLabelReferences(lineTokens);
    }
}

bool ScannerWrapper::isImportDirective(const std::vector<Token>& lineTokens) const {
    for (const auto& token : lineTokens) {
        if (token.getKind() == Token::IMPORT) {
            return true;
        }
    }
    return false;
}

bool ScannerWrapper::isExportDirective(const std::vector<Token>& lineTokens) const {
    for (const auto& token : lineTokens) {
        if (token.getKind() == Token::EXPORT) {
            return true;
        }
    }
    return false;
}

bool ScannerWrapper::isLabelDefinition(const std::vector<Token>& lineTokens) const {
    for (const auto& token : lineTokens) {
        if (token.getKind() == Token::LABEL) {
            return true;
        }
    }
    return false;
}

void ScannerWrapper::extractLabelReferences(const std::vector<Token>& lineTokens) {
    for (const auto& token : lineTokens) {
        if (token.getKind() == Token::ID) {
            // Check if this ID is a label reference (not a register or instruction)
            std::string lexeme = token.getLexeme();
            if (lexeme[0] != '$' && lexeme != "add" && lexeme != "sub" && 
                lexeme != "mult" && lexeme != "div" && lexeme != "mfhi" && 
                lexeme != "mflo" && lexeme != "lis" && lexeme != "lw" && 
                lexeme != "sw" && lexeme != "slt" && lexeme != "sltu" && 
                lexeme != "beq" && lexeme != "bne" && lexeme != "jr" && 
                lexeme != "jalr") {
                
                // Check if this label is not already in defined labels
                if (std::find(definedLabels.begin(), definedLabels.end(), lexeme) == definedLabels.end()) {
                    // Check if this label is not already in referenced labels
                    if (std::find(referencedLabels.begin(), referencedLabels.end(), lexeme) == referencedLabels.end()) {
                        referencedLabels.push_back(lexeme);
                    }
                }
            }
        }
    }
}

std::string ScannerWrapper::tokenVectorToString(const std::vector<Token>& tokens) const {
    std::string result;
    for (const auto& token : tokens) {
        result += token.getLexeme() + " ";
    }
    return result;
}

void ScannerWrapper::clearAnalysis() {
    tokens.clear();
    originalLines.clear();
    imports.clear();
    exports.clear();
    definedLabels.clear();
    referencedLabels.clear();
    fileType = FileType::ASSEMBLY;
}
