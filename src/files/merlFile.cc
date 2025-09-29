#include "files/merlFile.h"
#include "files/asmFile.h"
#include <fstream>
#include <iostream>
#include <iomanip>

// ============================================================================
// MERL FILE CLASS IMPLEMENTATION
// ============================================================================

MerlFile::MerlFile() : DataFile() {
    // Initialize with default values
    assemblySource.clear();
}

MerlFile::MerlFile(const std::string& filename) : DataFile(filename) {
    // Constructor will call load() through DataFile constructor
}

bool MerlFile::load(const std::string& filename) {
    std::ifstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open MERL file: " << filename << std::endl;
        return false;
    }
    
    try {
        // Read MERL header
        uint32_t magic = readBigEndianUint32(file);
        if (magic != MERL_MAGIC) {
            std::cerr << "Error: Invalid MERL magic number: 0x" << std::hex << magic << std::endl;
            return false;
        }
        
        // Read file length
        uint32_t fileLength = readBigEndianUint32(file);
        
        // Read code section marker
        uint32_t codeMarker = readBigEndianUint32(file);
        if (codeMarker != CODE_SECTION_MARKER) {
            std::cerr << "Error: Invalid code section marker: 0x" << std::hex << codeMarker << std::endl;
            return false;
        }
        
        // Read code section length
        uint32_t codeLength = readBigEndianUint32(file);
        
        // Read instruction words
        words.clear();
        uint32_t numWords = codeLength / 4;
        for (uint32_t i = 0; i < numWords; ++i) {
            uint32_t word = readBigEndianUint32(file);
            words.push_back(word);
        }
        
        // Check if there's an assembly source section
        assemblySource.clear();
        if (file.tellg() < static_cast<std::streampos>(fileLength - 4)) { // Not at end marker yet
            uint32_t sectionMarker = readBigEndianUint32(file);
            if (sectionMarker == ASM_SECTION_MARKER) {
                // Read assembly section length
                uint32_t asmLength = readBigEndianUint32(file);
                
                // Read assembly source lines
                size_t bytesRead = 0;
                while (bytesRead < asmLength) {
                    // Read until null terminator
                    std::string line;
                    char c;
                    while (bytesRead < asmLength && (c = file.get()) != 0) {
                        line += c;
                        bytesRead++;
                    }
                    if (c == 0) {
                        bytesRead++; // Count null terminator
                    }
                    if (!line.empty()) {
                        assemblySource.push_back(line);
                    }
                }
            } else {
                // Put back the section marker for end marker check
                file.seekg(-4, std::ios::cur);
            }
        }
        
        // Read end marker
        uint32_t endMarker = readBigEndianUint32(file);
        if (endMarker != END_MARKER) {
            std::cerr << "Error: Invalid end marker: 0x" << std::hex << endMarker << std::endl;
            return false;
        }
        
        file.close();
        return true;
        
    } catch (const std::exception& e) {
        std::cerr << "Error reading MERL file: " << e.what() << std::endl;
        file.close();
        return false;
    }
}

bool MerlFile::save(const std::string& filename) const {
    std::ofstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Error: Could not create MERL file: " << filename << std::endl;
        return false;
    }
    
    try {
        uint32_t codeSize = words.size() * 4; // 4 bytes per instruction
        
        // Calculate assembly source size
        uint32_t asmSize = 0;
        if (!assemblySource.empty()) {
            for (const auto& line : assemblySource) {
                asmSize += line.length() + 1; // +1 for null terminator
            }
        }
        
        // Calculate total size: header + length + code_section + code_length + code + asm_section + asm_length + asm_data + end
        uint32_t totalSize = 4 + 4 + 4 + 4 + codeSize + 4 + 4 + asmSize + 4;
        
        // Write MERL header
        writeBigEndianUint32(file, MERL_MAGIC);
        
        // Write total file length
        writeBigEndianUint32(file, totalSize);
        
        // Write code section marker
        writeBigEndianUint32(file, CODE_SECTION_MARKER);
        
        // Write code section length
        writeBigEndianUint32(file, codeSize);
        
        // Write instruction words
        for (uint32_t word : words) {
            writeBigEndianUint32(file, word);
        }
        
        // Write assembly source section (if present)
        if (!assemblySource.empty()) {
            // Write assembly section marker
            writeBigEndianUint32(file, ASM_SECTION_MARKER);
            
            // Write assembly section length
            writeBigEndianUint32(file, asmSize);
            
            // Write assembly source lines
            for (const auto& line : assemblySource) {
                writeString(file, line);
            }
        }
        
        // Write end marker
        writeBigEndianUint32(file, END_MARKER);
        
        file.close();
        return true;
        
    } catch (const std::exception& e) {
        std::cerr << "Error writing MERL file: " << e.what() << std::endl;
        file.close();
        return false;
    }
}

void MerlFile::createFromWords(const std::vector<uint32_t>& instructionWords) {
    words = instructionWords;
}

void MerlFile::createFromAsmFile(const AsmFile& asmFile, const std::vector<uint32_t>& instructionWords) {
    words = instructionWords;
    assemblySource = asmFile.getSourceLines();
}

std::vector<uint32_t> MerlFile::getInstructionWords() const {
    return words;
}

// Assembly source functions
void MerlFile::setAssemblySource(const std::vector<std::string>& sourceLines) {
    assemblySource = sourceLines;
}

std::vector<std::string> MerlFile::getAssemblySource() const {
    return assemblySource;
}

void MerlFile::addAssemblyLine(const std::string& line) {
    assemblySource.push_back(line);
}

bool MerlFile::hasAssemblySource() const {
    return !assemblySource.empty();
}

std::vector<uint8_t> MerlFile::uint32ToBigEndianBytes(uint32_t value) const {
    std::vector<uint8_t> bytes(4);
    bytes[0] = (value >> 24) & 0xFF;
    bytes[1] = (value >> 16) & 0xFF;
    bytes[2] = (value >> 8) & 0xFF;
    bytes[3] = value & 0xFF;
    return bytes;
}

uint32_t MerlFile::bigEndianBytesToUint32(const std::vector<uint8_t>& bytes) const {
    if (bytes.size() != 4) {
        throw std::invalid_argument("Byte array must be exactly 4 bytes");
    }
    
    return (static_cast<uint32_t>(bytes[0]) << 24) |
           (static_cast<uint32_t>(bytes[1]) << 16) |
           (static_cast<uint32_t>(bytes[2]) << 8) |
           static_cast<uint32_t>(bytes[3]);
}

void MerlFile::writeBigEndianUint32(std::ofstream& file, uint32_t value) const {
    std::vector<uint8_t> bytes = uint32ToBigEndianBytes(value);
    file.write(reinterpret_cast<const char*>(bytes.data()), 4);
}

uint32_t MerlFile::readBigEndianUint32(std::ifstream& file) const {
    std::vector<uint8_t> bytes(4);
    file.read(reinterpret_cast<char*>(bytes.data()), 4);
    
    if (file.gcount() != 4) {
        throw std::runtime_error("Could not read 4 bytes from file");
    }
    
    return bigEndianBytesToUint32(bytes);
}

// String handling methods
std::vector<uint8_t> MerlFile::stringToBytes(const std::string& str) const {
    std::vector<uint8_t> bytes(str.begin(), str.end());
    bytes.push_back(0); // Add null terminator
    return bytes;
}

std::string MerlFile::bytesToString(const std::vector<uint8_t>& bytes) const {
    if (bytes.empty() || bytes.back() != 0) {
        throw std::invalid_argument("Invalid string bytes");
    }
    return std::string(bytes.begin(), bytes.end() - 1); // Exclude null terminator
}

void MerlFile::writeString(std::ofstream& file, const std::string& str) const {
    file.write(str.c_str(), str.length());
    file.put(0); // Write null terminator
}

std::string MerlFile::readString(std::ifstream& file, size_t length) const {
    std::vector<char> buffer(length);
    file.read(buffer.data(), length);
    
    if (file.gcount() != static_cast<std::streamsize>(length)) {
        throw std::runtime_error("Could not read string from file");
    }
    
    // Find null terminator
    size_t actualLength = 0;
    for (size_t i = 0; i < length; ++i) {
        if (buffer[i] == 0) {
            actualLength = i;
            break;
        }
    }
    
    return std::string(buffer.data(), actualLength);
}
