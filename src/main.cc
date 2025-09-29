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
        
        ScannerWrapper scanner;
        if (!inputFile.empty()) {
            scanner = AssemblerFactory::analyzeInput(inputFile);
        } else {
            scanner = AssemblerFactory::analyzeInput(std::cin);
        }
        
        scanner.printAnalysis();
        
        assembler = AssemblerFactory::createAssembler(scanner);
        assembler->setDebugMode(debugMode);
        
        int result = assembler->assemble(scanner.getTokens());
        
        // Print final analysis
        assembler->printAnalysis();
        
        if (result == 0) {
            // Generate output file
            std::string outputFilename;
            if (!inputFile.empty()) {
                size_t dotPos = inputFile.find_last_of('.');
                if (dotPos != std::string::npos && inputFile.substr(dotPos) == ".asm") {
                    outputFilename = inputFile.substr(0, dotPos) + ".merl";
                } else {
                    outputFilename = inputFile + ".merl";
                }
            } else {
                outputFilename = "output.merl";
            }
            
            assembler->outputToFile(outputFilename);
        }
        
        return result;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
}
