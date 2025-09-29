#include <iostream>
#include "files/dataFile.h"
#include "files/asmFile.h"
#include "files/merlFile.h"

// ============================================================================
// ENHANCED MERL FILE TEST PROGRAM
// ============================================================================
// Demonstrates MERL files containing assembly source data

int main() {
    std::cout << "=== ENHANCED MERL FILE TEST PROGRAM ===" << std::endl;
    
    // Test 1: Create AsmFile with assembly source
    std::cout << "\n=== Test 1: Create Assembly File ===" << std::endl;
    AsmFile asmFile;
    
    // Add assembly instructions
    asmFile.addInstruction("add $1, $2, $3");
    asmFile.addInstruction("sub $4, $5, $6");
    asmFile.addInstruction("mult $7, $8");
    asmFile.addDataDirective(0x42);
    asmFile.addDataDirective(0x1234);
    
    std::cout << "Created assembly file with " << asmFile.getSourceLines().size() << " lines:" << std::endl;
    for (const auto& line : asmFile.getSourceLines()) {
        std::cout << "  " << line << std::endl;
    }
    
    // Test 2: Create MERL file from assembly file
    std::cout << "\n=== Test 2: Create MERL File from Assembly ===" << std::endl;
    MerlFile merlFile;
    
    // Create instruction words (simulated assembly output)
    std::vector<uint32_t> instructionWords = {
        0x00430820,  // add $1, $2, $3
        0x00A62022,  // sub $4, $5, $6
        0x00E80018,  // mult $7, $8
        0x00000042,  // .word 0x42
        0x00001234   // .word 0x1234
    };
    
    // Create MERL file from assembly file
    merlFile.createFromAsmFile(asmFile, instructionWords);
    merlFile.setMemoryAddress(0x2000);
    
    std::cout << "Created MERL file with:" << std::endl;
    std::cout << "  - " << merlFile.getSize() << " instruction words" << std::endl;
    std::cout << "  - " << merlFile.getAssemblySource().size() << " assembly source lines" << std::endl;
    std::cout << "  - Memory address: 0x" << std::hex << merlFile.getMemoryAddress() << std::endl;
    
    // Display assembly source from MERL file
    std::cout << "\nAssembly source in MERL file:" << std::endl;
    for (const auto& line : merlFile.getAssemblySource()) {
        std::cout << "  " << line << std::endl;
    }
    
    // Test 3: Memory access
    std::cout << "\n=== Test 3: Memory Access ===" << std::endl;
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
    
    // Test 4: Save MERL file with assembly source
    std::cout << "\n=== Test 4: Save MERL File with Assembly Source ===" << std::endl;
    if (merlFile.save("enhanced_test.merl")) {
        std::cout << "Successfully saved enhanced MERL file to enhanced_test.merl" << std::endl;
    } else {
        std::cout << "Failed to save enhanced MERL file" << std::endl;
    }
    
    // Test 5: Load MERL file and verify assembly source
    std::cout << "\n=== Test 5: Load MERL File and Verify Assembly Source ===" << std::endl;
    MerlFile loadedMerlFile;
    if (loadedMerlFile.load("enhanced_test.merl")) {
        std::cout << "Successfully loaded enhanced MERL file" << std::endl;
        std::cout << "Loaded " << loadedMerlFile.getSize() << " instruction words" << std::endl;
        std::cout << "Loaded " << loadedMerlFile.getAssemblySource().size() << " assembly source lines" << std::endl;
        
        // Set memory address for verification
        loadedMerlFile.setMemoryAddress(0x2000);
        
        // Verify instruction data
        try {
            uint32_t word1 = loadedMerlFile.getMem(0x2000);
            std::cout << "Verification - getMem(0x2000) = 0x" << std::hex << word1 << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "Verification error: " << e.what() << std::endl;
        }
        
        // Verify assembly source
        std::cout << "\nLoaded assembly source:" << std::endl;
        for (const auto& line : loadedMerlFile.getAssemblySource()) {
            std::cout << "  " << line << std::endl;
        }
        
        // Check if assembly source matches original
        bool sourceMatches = (loadedMerlFile.getAssemblySource() == asmFile.getSourceLines());
        std::cout << "\nAssembly source matches original: " << (sourceMatches ? "YES" : "NO") << std::endl;
        
    } else {
        std::cout << "Failed to load enhanced MERL file" << std::endl;
    }
    
    // Test 6: Manual assembly source manipulation
    std::cout << "\n=== Test 6: Manual Assembly Source Manipulation ===" << std::endl;
    MerlFile manualMerlFile;
    manualMerlFile.addWord(0x00430820);  // add $1, $2, $3
    manualMerlFile.addWord(0x00A62022);  // sub $4, $5, $6
    manualMerlFile.setMemoryAddress(0x3000);
    
    // Add assembly source manually
    manualMerlFile.addAssemblyLine("add $1, $2, $3");
    manualMerlFile.addAssemblyLine("sub $4, $5, $6");
    
    std::cout << "Manual MERL file created with:" << std::endl;
    std::cout << "  - " << manualMerlFile.getSize() << " instruction words" << std::endl;
    std::cout << "  - " << manualMerlFile.getAssemblySource().size() << " assembly source lines" << std::endl;
    std::cout << "  - Has assembly source: " << (manualMerlFile.hasAssemblySource() ? "YES" : "NO") << std::endl;
    
    // Save manual MERL file
    if (manualMerlFile.save("manual_test.merl")) {
        std::cout << "Successfully saved manual MERL file to manual_test.merl" << std::endl;
    }
    
    std::cout << "\n=== All tests completed ===" << std::endl;
    return 0;
}
