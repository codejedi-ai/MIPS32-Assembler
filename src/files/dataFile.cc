#include "files/dataFile.h"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <stdexcept>

// ============================================================================
// DATA FILE BASE CLASS IMPLEMENTATION
// ============================================================================

DataFile::DataFile() : memoryAddress(0) {
    words.clear();
}

DataFile::DataFile(const std::string& filename) : memoryAddress(0) {
    words.clear();
    // Note: Cannot call pure virtual load() from constructor
    // Derived classes should call load() after construction
}

uint32_t DataFile::getMem(uint32_t pc) const {
    // Validate PC is divisible by 4
    if (pc % 4 != 0) {
        throw std::invalid_argument("PC must be divisible by 4. PC: " + std::to_string(pc));
    }
    
    // Convert PC to index
    uint32_t index = pcToIndex(pc);
    
    // Check bounds
    if (index >= words.size()) {
        throw std::out_of_range("PC " + std::to_string(pc) + " is out of bounds. Max PC: " + std::to_string(indexToPC(words.size() - 1)));
    }
    
    return words[index];
}

void DataFile::setMem(uint32_t pc, uint32_t value) {
    // Validate PC is divisible by 4
    if (pc % 4 != 0) {
        throw std::invalid_argument("PC must be divisible by 4. PC: " + std::to_string(pc));
    }
    
    // Convert PC to index
    uint32_t index = pcToIndex(pc);
    
    // Resize if necessary
    if (index >= words.size()) {
        words.resize(index + 1, 0);
    }
    
    words[index] = value;
}

void DataFile::addWord(uint32_t word) {
    words.push_back(word);
}

void DataFile::clear() {
    words.clear();
    memoryAddress = 0;
}

size_t DataFile::getSize() const {
    return words.size();
}

uint32_t DataFile::getMemoryAddress() const {
    return memoryAddress;
}

void DataFile::setMemoryAddress(uint32_t address) {
    memoryAddress = address;
}

bool DataFile::isValidPC(uint32_t pc) const {
    return (pc % 4 == 0) && (pcToIndex(pc) < words.size());
}

void DataFile::printMemoryDump() const {
    std::cout << "Memory Dump (Base Address: 0x" << std::hex << std::uppercase << memoryAddress << ")" << std::endl;
    std::cout << "PC\t\tValue" << std::endl;
    std::cout << "---\t\t-----" << std::endl;
    
    for (size_t i = 0; i < words.size(); ++i) {
        uint32_t pc = indexToPC(i);
        std::cout << "0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << pc;
        std::cout << "\t0x" << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << words[i] << std::endl;
    }
}

uint32_t DataFile::pcToIndex(uint32_t pc) const {
    return (pc - memoryAddress) / 4;
}

uint32_t DataFile::indexToPC(size_t index) const {
    return memoryAddress + (index * 4);
}
