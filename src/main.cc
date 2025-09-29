#include <iostream>
#include <string>
#include "assemblerFactory.h"

// ============================================================================
// MAIN ASSEMBLER PROGRAM
// ============================================================================
// Uses the assembler factory to create appropriate assembler based on file type
// Automatically detects MERL modules vs regular assembly files

int main(int argc, char* argv[]) {
    bool debugMode = false;
    std::string inputFile;
    
    // Parse command line arguments
    if (argc > 1) {
        for (int i = 1; i < argc; ++i) {
            std::string arg = argv[i];
            if (arg == "--debug" || arg == "-d") {
                debugMode = true;
            } else if (arg[0] != '-') {
                inputFile = arg;
            }
        }
    }
    
    try {
        // Create assembler using factory
        std::unique_ptr<BaseAssembler> assembler;
        
        if (!inputFile.empty()) {
            // Analyze file first
            ScannerWrapper scanner = AssemblerFactory::analyzeInput(inputFile);
            scanner.printAnalysis();
            
            // Create appropriate assembler with scanner
            assembler = AssemblerFactory::createAssembler(scanner);
        } else {
            // Analyze stdin
            ScannerWrapper scanner = AssemblerFactory::analyzeInput(std::cin);
            scanner.printAnalysis();
            
            // Create appropriate assembler with scanner
            assembler = AssemblerFactory::createAssembler(scanner);
        }
        
        // Set debug mode
        assembler->setDebugMode(debugMode);
        
        // Perform assembly
        int result;
        if (!inputFile.empty()) {
            result = assembler->assemble(inputFile);
        } else {
            result = assembler->assemble(std::cin);
        }
        
        // Print final analysis
        assembler->printAnalysis();
        
        if (result == 0) {
            std::cout << "Assembly completed successfully!" << std::endl;
        } else {
            std::cout << "Assembly failed with error code: " << result << std::endl;
        }
        
        return result;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
}
