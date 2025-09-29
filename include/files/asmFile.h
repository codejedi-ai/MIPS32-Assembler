#ifndef ASMFILE_H
#define ASMFILE_H

#include "dataFile.h"
#include <vector>
#include <string>

// ============================================================================
// ASSEMBLY FILE CLASS
// ============================================================================
// Handles MIPS assembly source files
// Extends DataFile to provide assembly-specific functionality

class AsmFile : public DataFile {
public:
    AsmFile();
    AsmFile(const std::string& filename);
    virtual ~AsmFile() = default;
    
    // File operations
    virtual bool load(const std::string& filename) override;
    virtual bool save(const std::string& filename) const override;
    
    // Assembly-specific functions
    void addInstruction(const std::string& instruction);
    void addDataDirective(uint32_t value);
    std::vector<std::string> getSourceLines() const;
    void setSourceLines(const std::vector<std::string>& lines);
    
    // Assembly processing
    void assembleToWords();  // Convert assembly to machine code words
    
private:
    std::vector<std::string> sourceLines;  // Store original assembly source
    
    // Helper functions
    std::string trim(const std::string& str) const;
    bool isComment(const std::string& line) const;
    bool isEmpty(const std::string& line) const;
};

#endif // ASMFILE_H
