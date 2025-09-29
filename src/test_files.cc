#include <iostream>
#include "files/dataFile.h"
#include "files/asmFile.h"
#include "files/merlFile.h"

// ============================================================================
// FILE CLASSES TEST PROGRAM
// ============================================================================
// Demonstrates the usage of DataFile, AsmFile, and MerlFile classes

int main() {
    std::cout << "=== FILE CLASSES TEST PROGRAM ===" << std::endl;
    
    // Test 1: DataFile basic functionality (using MerlFile as concrete implementation)
    std::cout << "\n=== Test 1: DataFile Basic Functionality ===" << std::endl;
    MerlFile dataFile;  // Use MerlFile as concrete implementation of DataFile
    dataFile.setMemoryAddress(0x1000);
    
    // Add some words
    dataFile.addWord(0x12345678);
    dataFile.addWord(0x9ABCDEF0);
    dataFile.addWord(0x11111111);
    
    std::cout << "Added " << dataFile.getSize() << " words" << std::endl;
    std::cout << "Memory address: 0x" << std::hex << dataFile.getMemoryAddress() << std::endl;
    
    // Test getMem with valid PCs
    try {
        uint32_t word1 = dataFile.getMem(0x1000);  // First word
        uint32_t word2 = dataFile.getMem(0x1004);  // Second word
        uint32_t word3 = dataFile.getMem(0x1008);  // Third word
        
        std::cout << "getMem(0x1000) = 0x" << std::hex << word1 << std::endl;
        std::cout << "getMem(0x1004) = 0x" << std::hex << word2 << std::endl;
        std::cout << "getMem(0x1008) = 0x" << std::hex << word3 << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    // Test getMem with invalid PC (not divisible by 4)
    try {
        uint32_t word = dataFile.getMem(0x1001);  // Invalid PC
        std::cout << "getMem(0x1001) = 0x" << std::hex << word << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Expected error for invalid PC: " << e.what() << std::endl;
    }
    
    // Test getMem with out-of-bounds PC
    try {
        uint32_t word = dataFile.getMem(0x1010);  // Out of bounds
        std::cout << "getMem(0x1010) = 0x" << std::hex << word << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Expected error for out-of-bounds PC: " << e.what() << std::endl;
    }
    
    // Print memory dump
    std::cout << "\nMemory dump:" << std::endl;
    dataFile.printMemoryDump();
    
    // Test 2: AsmFile functionality
    std::cout << "\n=== Test 2: AsmFile Functionality ===" << std::endl;
    AsmFile asmFile;
    
    // Add some assembly instructions
    asmFile.addInstruction("add $1, $2, $3");
    asmFile.addInstruction("sub $4, $5, $6");
    asmFile.addInstruction("mult $7, $8");
    asmFile.addDataDirective(0x42);
    asmFile.addDataDirective(0x1234);
    
    std::cout << "Added " << asmFile.getSourceLines().size() << " source lines" << std::endl;
    
    // Print source lines
    std::cout << "Source lines:" << std::endl;
    for (const auto& line : asmFile.getSourceLines()) {
        std::cout << "  " << line << std::endl;
    }
    
    // Test 3: MerlFile functionality
    std::cout << "\n=== Test 3: MerlFile Functionality ===" << std::endl;
    MerlFile merlFile;
    
    // Create some instruction words
    std::vector<uint32_t> instructionWords = {
        0x00430820,  // add $1, $2, $3
        0x00A62022,  // sub $4, $5, $6
        0x00E80018,  // mult $7, $8
        0x00000042,  // .word 0x42
        0x00001234   // .word 0x1234
    };
    
    merlFile.createFromWords(instructionWords);
    merlFile.setMemoryAddress(0x2000);
    
    std::cout << "Created MERL file with " << merlFile.getSize() << " instruction words" << std::endl;
    std::cout << "Memory address: 0x" << std::hex << merlFile.getMemoryAddress() << std::endl;
    
    // Test memory access
    try {
        uint32_t word1 = merlFile.getMem(0x2000);  // First instruction
        uint32_t word2 = merlFile.getMem(0x2004);  // Second instruction
        uint32_t word3 = merlFile.getMem(0x2008);  // Third instruction
        
        std::cout << "getMem(0x2000) = 0x" << std::hex << word1 << std::endl;
        std::cout << "getMem(0x2004) = 0x" << std::hex << word2 << std::endl;
        std::cout << "getMem(0x2008) = 0x" << std::hex << word3 << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    // Print memory dump
    std::cout << "\nMERL file memory dump:" << std::endl;
    merlFile.printMemoryDump();
    
    // Test 4: File I/O (save and load)
    std::cout << "\n=== Test 4: File I/O ===" << std::endl;
    
    // Save MERL file
    if (merlFile.save("test_output.merl")) {
        std::cout << "Successfully saved MERL file to test_output.merl" << std::endl;
    } else {
        std::cout << "Failed to save MERL file" << std::endl;
    }
    
    // Save ASM file
    if (asmFile.save("test_output.asm")) {
        std::cout << "Successfully saved ASM file to test_output.asm" << std::endl;
    } else {
        std::cout << "Failed to save ASM file" << std::endl;
    }
    
    // Load MERL file
    MerlFile loadedMerlFile;
    if (loadedMerlFile.load("test_output.merl")) {
        std::cout << "Successfully loaded MERL file" << std::endl;
        std::cout << "Loaded " << loadedMerlFile.getSize() << " instruction words" << std::endl;
        
        // Set the same memory address as the original
        loadedMerlFile.setMemoryAddress(0x2000);
        
        // Verify loaded data
        try {
            uint32_t word1 = loadedMerlFile.getMem(0x2000);
            std::cout << "Verification - getMem(0x2000) = 0x" << std::hex << word1 << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "Verification error: " << e.what() << std::endl;
        }
    } else {
        std::cout << "Failed to load MERL file" << std::endl;
    }
    
    std::cout << "\n=== All tests completed ===" << std::endl;
    return 0;
}
