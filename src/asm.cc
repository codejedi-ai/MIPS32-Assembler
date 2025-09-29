#include <iostream>
#include <string>
#include "assembler.h"

// ============================================================================
// MAIN ASSEMBLER FUNCTION
// ============================================================================
/*
 * C++ Starter code for CS241 A3
 * All code requires C++14, so if you're getting compile errors make sure to
 * use -std=c++14.
 *
 * This file contains the main function of your program.
 * It now uses the clean Assembler class for the two-pass assembly process.
 * 
 * Usage:
 *   binasm          - Production mode (outputs MERL binary)
 *   binasm --debug  - Debug mode (outputs hexadecimal instructions)
 */
int main(int argc, char* argv[]) {
    bool debugMode = false;
    
    // Check for debug flag
    if (argc > 1) {
        std::string arg = argv[1];
        if (arg == "--debug" || arg == "-d") {
            debugMode = true;
        }
    }
    
    Assembler assembler(debugMode);
    return assembler.assemble(std::cin);
}
