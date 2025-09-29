#include "files/asmFile.h"
#include <fstream>
#include <sstream>
#include <algorithm>
#include <cctype>
#include <iostream>

// ============================================================================
// ASSEMBLY FILE CLASS IMPLEMENTATION
// ============================================================================

AsmFile::AsmFile() : DataFile() {
    sourceLines.clear();
}

AsmFile::AsmFile(const std::string& filename) : DataFile(filename) {
    // Constructor will call load() through DataFile constructor
}

bool AsmFile::load(const std::string& filename) {
    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open assembly file: " << filename << std::endl;
        return false;
    }
    
    sourceLines.clear();
    std::string line;
    
    while (std::getline(file, line)) {
        // Trim whitespace
        std::string trimmedLine = trim(line);
        
        // Skip empty lines and comments
        if (!isEmpty(trimmedLine) && !isComment(trimmedLine)) {
            sourceLines.push_back(trimmedLine);
        }
    }
    
    file.close();
    return true;
}

bool AsmFile::save(const std::string& filename) const {
    std::ofstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create assembly file: " << filename << std::endl;
        return false;
    }
    
    for (const auto& line : sourceLines) {
        file << line << std::endl;
    }
    
    file.close();
    return true;
}

void AsmFile::addInstruction(const std::string& instruction) {
    std::string trimmed = trim(instruction);
    if (!trimmed.empty() && !isComment(trimmed)) {
        sourceLines.push_back(trimmed);
    }
}

void AsmFile::addDataDirective(uint32_t value) {
    std::stringstream ss;
    ss << ".word 0x" << std::hex << std::uppercase << value;
    sourceLines.push_back(ss.str());
}

std::vector<std::string> AsmFile::getSourceLines() const {
    return sourceLines;
}

void AsmFile::setSourceLines(const std::vector<std::string>& lines) {
    sourceLines = lines;
}

void AsmFile::assembleToWords() {
    // This would integrate with the existing assembler
    // For now, we'll just clear the words array
    // In a full implementation, this would call the assembler
    words.clear();
    
    // Placeholder: In a real implementation, this would:
    // 1. Tokenize each source line
    // 2. Parse instructions
    // 3. Generate machine code
    // 4. Store in words array
    
    std::cout << "Assembly to words conversion not yet implemented." << std::endl;
    std::cout << "Source lines: " << sourceLines.size() << std::endl;
}

std::string AsmFile::trim(const std::string& str) const {
    size_t first = str.find_first_not_of(' ');
    if (first == std::string::npos) {
        return "";
    }
    size_t last = str.find_last_not_of(' ');
    return str.substr(first, (last - first + 1));
}

bool AsmFile::isComment(const std::string& line) const {
    std::string trimmed = trim(line);
    return !trimmed.empty() && trimmed[0] == '#';
}

bool AsmFile::isEmpty(const std::string& line) const {
    return trim(line).empty();
}
