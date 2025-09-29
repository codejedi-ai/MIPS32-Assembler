#ifndef DATAFILE_H
#define DATAFILE_H

#include <vector>
#include <cstdint>
#include <string>

// ============================================================================
// DATA FILE BASE CLASS
// ============================================================================
// Base class for handling file data with memory-like access
// Contains a uint32_t array to hold words and a memory address

class DataFile {
public:
    DataFile();
    DataFile(const std::string& filename);
    virtual ~DataFile() = default;
    
    // Memory access functions
    uint32_t getMem(uint32_t pc) const;
    void setMem(uint32_t pc, uint32_t value);
    
    // File operations
    virtual bool load(const std::string& filename) = 0;
    virtual bool save(const std::string& filename) const = 0;
    
    // Memory management
    void addWord(uint32_t word);
    void clear();
    size_t getSize() const;
    uint32_t getMemoryAddress() const;
    void setMemoryAddress(uint32_t address);
    
    // Utility functions
    bool isValidPC(uint32_t pc) const;
    void printMemoryDump() const;
    
protected:
    std::vector<uint32_t> words;  // Array to hold words
    uint32_t memoryAddress;       // Base memory address
    
    // Helper functions
    uint32_t pcToIndex(uint32_t pc) const;
    uint32_t indexToPC(size_t index) const;
};

#endif // DATAFILE_H
