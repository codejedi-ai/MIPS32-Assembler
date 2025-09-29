#include <iostream>
#include <sstream>
#include <memory>
#include "scanner.h"
#include "assemblerFactory.h"

// ============================================================================
// AUTOMATIC REL ENTRY GENERATION TEST PROGRAM
// ============================================================================
// Tests the automatic generation of REL entries for .word directives with labels

void testWordWithLabelDetection() {
    std::cout << "\n=== Testing .word with Label Detection ===" << std::endl;
    
    // Test cases for .word with labels
    std::vector<std::string> testCases = {
        ".word loop",           // Simple label reference
        ".word main",           // Another label reference
        ".word 0x1234",         // Numeric value (should not generate REL)
        ".word foo",            // External symbol reference
        "add $1, $2, $3",       // Regular instruction (should not generate REL)
        ".word bar"             // Another label reference
    };
    
    for (const auto& testCase : testCases) {
        std::cout << "\nTesting: " << testCase << std::endl;
        
        // Scan the line
        std::vector<Token> tokens = scan(testCase);
        
        // Create a MerlAssembler to test detection
        ScannerWrapper scanner;
        std::istringstream iss(testCase);
        scanner.scanInput(iss);
        
        MerlAssembler assembler(scanner);
        
        // Test if it's a .word with label
        bool isWordWithLabel = assembler.isWordWithLabel(tokens);
        std::cout << "  Is .word with label: " << (isWordWithLabel ? "YES" : "NO") << std::endl;
        
        if (isWordWithLabel) {
            std::string label = assembler.extractLabelFromWord(tokens);
            std::cout << "  Extracted label: '" << label << "'" << std::endl;
        }
    }
}

void testAutomaticRelGeneration() {
    std::cout << "\n=== Testing Automatic REL Entry Generation ===" << std::endl;
    
    // Create a test MERL module with .word directives
    std::string merlModule = R"(
.import external_func
.export main
lis $28
.word main
add $1, $2, $3
.word loop
sub $4, $5, $6
loop:
.word external_func
mult $7, $8
.word 0x1234
)";
    
    std::cout << "Test MERL Module:" << std::endl;
    std::cout << merlModule << std::endl;
    
    // Process with MerlAssembler
    ScannerWrapper scanner;
    std::istringstream iss(merlModule);
    scanner.scanInput(iss);
    
    MerlAssembler assembler(scanner);
    
    // Process the module
    int result = assembler.assemble(iss);
    
    if (result == 0) {
        std::cout << "\nAssembly successful!" << std::endl;
        
        // Print analysis
        assembler.printAnalysis();
        
        // Output to file to see the results
        assembler.outputToFile("test_rel_generation.merl");
    } else {
        std::cout << "Assembly failed!" << std::endl;
    }
}

void testPcCalculation() {
    std::cout << "\n=== Testing PC Calculation for REL Entries ===" << std::endl;
    
    // Simulate processing with different PC values
    std::vector<std::pair<std::string, uint32_t>> testCases = {
        {".word loop", 0x0C},      // First instruction after header
        {".word main", 0x10},      // Second instruction
        {".word foo", 0x14},       // Third instruction
        {".word bar", 0x18}        // Fourth instruction
    };
    
    ScannerWrapper scanner;
    MerlAssembler assembler(scanner);
    
    for (const auto& testCase : testCases) {
        std::string line = testCase.first;
        uint32_t pc = testCase.second;
        
        std::cout << "\nProcessing: " << line << " at PC 0x" << std::hex << pc << std::dec << std::endl;
        
        // Scan the line
        std::vector<Token> tokens = scan(line);
        
        // Process the word directive
        assembler.processWordDirective(tokens, pc);
        
        // Calculate expected relocation address
        uint32_t expectedRelAddr = 0xC + pc;
        std::cout << "  Expected REL address: 0x" << std::hex << expectedRelAddr << std::dec << std::endl;
    }
}

void testEntryManagerIntegration() {
    std::cout << "\n=== Testing EntryManager Integration ===" << std::endl;
    
    // Create a simple test
    std::string testCode = R"(
.word loop
.word main
.word external_func
)";
    
    ScannerWrapper scanner;
    std::istringstream iss(testCode);
    scanner.scanInput(iss);
    
    MerlAssembler assembler(scanner);
    
    // Process each line manually to test EntryManager
    std::istringstream iss2(testCode);
    std::string line;
    uint32_t pc = 0x0C;
    
    while (std::getline(iss2, line)) {
        if (!line.empty()) {
            std::vector<Token> tokens = scan(line);
            
            if (assembler.isWordWithLabel(tokens)) {
                assembler.processWordDirective(tokens, pc);
            }
            
            pc += 4; // Increment PC
        }
    }
    
    // The EntryManager should now have REL entries
    std::cout << "EntryManager integration test completed." << std::endl;
}

int main() {
    std::cout << "=== AUTOMATIC REL ENTRY GENERATION TEST PROGRAM ===" << std::endl;
    
    testWordWithLabelDetection();
    testAutomaticRelGeneration();
    testPcCalculation();
    testEntryManagerIntegration();
    
    std::cout << "\n=== All tests completed ===" << std::endl;
    return 0;
}
