#include <iostream>
#include <fstream>
#include <sstream>
#include "assemblerFactory.h"

// ============================================================================
// ASSEMBLER FACTORY TEST PROGRAM
// ============================================================================
// Demonstrates the factory pattern for different file types

void testAssemblyFile() {
    std::cout << "\n=== Testing Assembly File ===" << std::endl;
    
    // Create a simple assembly file content
    std::string assemblyContent = R"(
add $1, $2, $3
sub $4, $5, $6
loop:
mult $7, $8
.word 42
)";
    
    std::istringstream input(assemblyContent);
    
    // Analyze the input
    ScannerWrapper scanner = AssemblerFactory::analyzeInput(input);
    scanner.printAnalysis();
    
    // Create appropriate assembler
    auto assembler = AssemblerFactory::createAssembler(scanner.getFileType());
    assembler->setDebugMode(true);
    
    // Process the assembly
    std::istringstream input2(assemblyContent);
    int result = assembler->assemble(input2);
    
    std::cout << "Assembly result: " << result << std::endl;
}

void testMerlFile() {
    std::cout << "\n=== Testing MERL File ===" << std::endl;
    
    // Create a MERL module content with imports/exports
    std::string merlContent = R"(
.import foo
.import bar
.export baz
.export qux

add $1, $2, $3
sub $4, $5, $6
baz:
mult $7, $8
.word foo
.word bar
qux:
.word 42
)";
    
    std::istringstream input(merlContent);
    
    // Analyze the input
    ScannerWrapper scanner = AssemblerFactory::analyzeInput(input);
    scanner.printAnalysis();
    
    // Create appropriate assembler
    auto assembler = AssemblerFactory::createAssembler(scanner.getFileType());
    assembler->setDebugMode(true);
    
    // Process the MERL module
    std::istringstream input2(merlContent);
    int result = assembler->assemble(input2);
    
    std::cout << "MERL assembly result: " << result << std::endl;
}

void testFileAnalysis() {
    std::cout << "\n=== Testing File Analysis ===" << std::endl;
    
    // Test different file types
    std::vector<std::pair<std::string, std::string>> testCases = {
        {"Assembly", "add $1, $2, $3\nsub $4, $5, $6"},
        {"MERL with imports", ".import foo\nadd $1, $2, $3"},
        {"MERL with exports", ".export bar\nadd $1, $2, $3"},
        {"MERL with both", ".import foo\n.export bar\nadd $1, $2, $3"}
    };
    
    for (const auto& testCase : testCases) {
        std::cout << "\n--- " << testCase.first << " ---" << std::endl;
        std::istringstream input(testCase.second);
        
        ScannerWrapper scanner = AssemblerFactory::analyzeInput(input);
        std::cout << "File Type: " << (scanner.getFileType() == FileType::MERL_MODULE ? "MERL Module" : "Assembly") << std::endl;
        std::cout << "Has Imports: " << (scanner.hasImports() ? "Yes" : "No") << std::endl;
        std::cout << "Has Exports: " << (scanner.hasExports() ? "Yes" : "No") << std::endl;
    }
}

int main() {
    std::cout << "=== ASSEMBLER FACTORY TEST PROGRAM ===" << std::endl;
    
    testFileAnalysis();
    testAssemblyFile();
    testMerlFile();
    
    std::cout << "\n=== All tests completed ===" << std::endl;
    return 0;
}
