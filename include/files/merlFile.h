#ifndef MERLFILE_H
#define MERLFILE_H

#include "dataFile.h"
#include <string>
#include <vector>

// Forward declaration
class AsmFile;

// ============================================================================
// MERL FILE CLASS
// ============================================================================
// Handles MERL (MIPS Executable and Relocatable Linker) binary files
// Extends DataFile to provide MERL-specific functionality
// Now includes assembly source data

class MerlFile : public DataFile {
public:
    MerlFile();
    MerlFile(const std::string& filename);
    virtual ~MerlFile() = default;
    
    // File operations
    virtual bool load(const std::string& filename) override;
    virtual bool save(const std::string& filename) const override;
    
    // MERL-specific functions
    void createFromWords(const std::vector<uint32_t>& instructionWords);
    void createFromAsmFile(const AsmFile& asmFile, const std::vector<uint32_t>& instructionWords);
    std::vector<uint32_t> getInstructionWords() const;
    
    // Assembly source functions
    void setAssemblySource(const std::vector<std::string>& sourceLines);
    std::vector<std::string> getAssemblySource() const;
    void addAssemblyLine(const std::string& line);
    bool hasAssemblySource() const;
    
    // MERL format constants
    static const uint32_t MERL_MAGIC = 0x10000002;
    static const uint32_t CODE_SECTION_MARKER = 0x11;
    static const uint32_t ASM_SECTION_MARKER = 0x12;  // New section for assembly source
    static const uint32_t END_MARKER = 0x00000000;
    
private:
    std::vector<std::string> assemblySource;  // Store assembly source lines
    
    // MERL format helper functions
    std::vector<uint8_t> uint32ToBigEndianBytes(uint32_t value) const;
    uint32_t bigEndianBytesToUint32(const std::vector<uint8_t>& bytes) const;
    void writeBigEndianUint32(std::ofstream& file, uint32_t value) const;
    uint32_t readBigEndianUint32(std::ifstream& file) const;
    
    // String handling for assembly source
    std::vector<uint8_t> stringToBytes(const std::string& str) const;
    std::string bytesToString(const std::vector<uint8_t>& bytes) const;
    void writeString(std::ofstream& file, const std::string& str) const;
    std::string readString(std::ifstream& file, size_t length) const;
};

#endif // MERLFILE_H
