#ifndef SCANNER_WRAPPER_H
#define SCANNER_WRAPPER_H

#include <string>
#include <vector>
#include <iostream>
#include "scanner.h"

// ============================================================================
// SCANNER WRAPPER CLASS
// ============================================================================
// Wraps the scanner to provide file type detection and token management
// Determines if input is MERL (with imports/exports) or regular assembly

enum class FileType {
    ASSEMBLY,    // Regular assembly file
    MERL_MODULE  // MERL module with imports/exports (needs linking)
};

class ScannerWrapper {
public:
    ScannerWrapper();
    
    // Main scanning interface
    FileType scanInput(std::istream& input);
    FileType scanInput(const std::string& filename);
    
    // Token access
    const std::vector<std::vector<Token>>& getTokens() const;
    FileType getFileType() const;
    
    // Import/Export detection
    bool hasImports() const;
    bool hasExports() const;
    const std::vector<std::string>& getImports() const;
    const std::vector<std::string>& getExports() const;
    
    // Symbol information
    const std::vector<std::string>& getDefinedLabels() const;
    const std::vector<std::string>& getReferencedLabels() const;
    
    // File analysis
    void printAnalysis() const;
    
private:
    std::vector<std::vector<Token>> tokens;
    std::vector<std::string> originalLines;  // Store original lines for manual parsing
    FileType fileType;
    
    // Import/Export tracking
    std::vector<std::string> imports;
    std::vector<std::string> exports;
    std::vector<std::string> definedLabels;
    std::vector<std::string> referencedLabels;
    
    // Analysis methods
    void analyzeTokens();
    void detectImportsExports();
    void detectLabels();
    bool isImportDirective(const std::vector<Token>& lineTokens) const;
    bool isExportDirective(const std::vector<Token>& lineTokens) const;
    bool isLabelDefinition(const std::vector<Token>& lineTokens) const;
    void extractLabelReferences(const std::vector<Token>& lineTokens);
    
    // Helper methods
    std::string tokenVectorToString(const std::vector<Token>& tokens) const;
    void clearAnalysis();
};

#endif // SCANNER_WRAPPER_H
