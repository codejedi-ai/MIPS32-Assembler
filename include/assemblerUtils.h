#ifndef ASSEMBLERUTILS_H
#define ASSEMBLERUTILS_H

#include <iostream>
#include <cstdint>
#include <vector>

// ============================================================================
// ASSEMBLER UTILITY FUNCTIONS
// ============================================================================

class AssemblerUtils {
public:
    // Print 32-bit instruction in big-endian format (legacy method)
    static void printInstruction(uint32_t instr);
    
    // Print instruction as raw bytes (legacy method)
    static void printInstructionBytes(uint32_t instr);
    
    // Convert instruction to big-endian bytes and add to array
    static void addInstructionToArray(std::vector<uint8_t>& binaryArray, uint32_t instr);
    
    // Output binary array as MERL file format
    static void outputMERLFile(const std::vector<uint32_t>& instructions);
    
    // Convert uint32_t to big-endian byte array
    static std::vector<uint8_t> uint32ToBigEndianBytes(uint32_t value);
};

#endif
