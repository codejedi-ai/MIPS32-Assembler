#include "assemblerUtils.h"

// ============================================================================
// ASSEMBLER UTILITY FUNCTIONS IMPLEMENTATION
// ============================================================================

void AssemblerUtils::printInstruction(uint32_t instr) {
    // Print 32-bit instruction in big-endian format (legacy method)
    unsigned char c = instr >> 24;
    std::cout << c;
    c = instr >> 16;
    std::cout << c;
    c = instr >> 8;
    std::cout << c;
    c = instr;
    std::cout << c;
}

void AssemblerUtils::printInstructionBytes(uint32_t instr) {
    // Alternative method to print instruction bytes (legacy method)
    printInstruction(instr);
}

void AssemblerUtils::addInstructionToArray(std::vector<uint8_t>& binaryArray, uint32_t instr) {
    // Convert instruction to big-endian bytes and add to array
    binaryArray.push_back((instr >> 24) & 0xFF);
    binaryArray.push_back((instr >> 16) & 0xFF);
    binaryArray.push_back((instr >> 8) & 0xFF);
    binaryArray.push_back(instr & 0xFF);
}

std::vector<uint8_t> AssemblerUtils::uint32ToBigEndianBytes(uint32_t value) {
    // Convert uint32_t to big-endian byte array
    std::vector<uint8_t> bytes(4);
    bytes[0] = (value >> 24) & 0xFF;
    bytes[1] = (value >> 16) & 0xFF;
    bytes[2] = (value >> 8) & 0xFF;
    bytes[3] = value & 0xFF;
    return bytes;
}

void AssemblerUtils::outputMERLFile(const std::vector<uint32_t>& instructions) {
    // MERL file format:
    // Header: 0x10000002 (merl magic number)
    // Length: total file size in bytes
    // Code section: 0x11 (code section marker)
    // Code length: code size in bytes
    // Instructions: actual instruction data
    // End marker: 0x00000000
    
    uint32_t codeSize = instructions.size() * 4; // 4 bytes per instruction
    uint32_t totalSize = 4 + 4 + 4 + 4 + codeSize + 4; // header + length + code_marker + code_length + code + end
    
    // Output MERL header (magic number)
    std::vector<uint8_t> header = uint32ToBigEndianBytes(0x10000002);
    for (uint8_t byte : header) {
        std::cout << byte;
    }
    
    // Output total file length
    std::vector<uint8_t> length = uint32ToBigEndianBytes(totalSize);
    for (uint8_t byte : length) {
        std::cout << byte;
    }
    
    // Output code section marker
    std::vector<uint8_t> codeMarker = uint32ToBigEndianBytes(0x11);
    for (uint8_t byte : codeMarker) {
        std::cout << byte;
    }
    
    // Output code section length
    std::vector<uint8_t> codeLength = uint32ToBigEndianBytes(codeSize);
    for (uint8_t byte : codeLength) {
        std::cout << byte;
    }
    
    // Output instructions
    for (uint32_t instr : instructions) {
        std::vector<uint8_t> instrBytes = uint32ToBigEndianBytes(instr);
        for (uint8_t byte : instrBytes) {
            std::cout << byte;
        }
    }
    
    // Output end marker
    std::vector<uint8_t> endMarker = uint32ToBigEndianBytes(0x00000000);
    for (uint8_t byte : endMarker) {
        std::cout << byte;
    }
}
