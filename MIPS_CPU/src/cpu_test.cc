#include "mipsCPU.h"
#include <iostream>
#include <vector>

int main() {
    // Create CPU with 1MB memory
    MipsCPU cpu(1024 * 1024 / 4);
    
    // Create a simple program
    std::vector<int32_t> program;
    
    // Program: add $1, $2, $3
    // This will add registers $2 and $3, store result in $1
    auto addInstr = InstructionFactory::createAdd(1, 2, 3);
    program.push_back(addInstr->getEncodedValue());
    
    // Program: addi $4, $1, 100
    // This will add 100 to register $1, store result in $4
    auto addiInstr = InstructionFactory::createAddi(4, 1, 100);
    program.push_back(addiInstr->getEncodedValue());
    
    // Program: mult $5, $6
    // This will multiply registers $5 and $6
    auto multInstr = InstructionFactory::createMult(5, 6);
    program.push_back(multInstr->getEncodedValue());
    
    // Program: mflo $7
    // This will move the low part of multiplication result to $7
    auto mfloInstr = InstructionFactory::createMflo(7);
    program.push_back(mfloInstr->getEncodedValue());
    
    // Load program into CPU
    cpu.loadProgram(program);
    
    // Set some initial register values for testing
    // We'll need to access the registers directly, so let's create a simple test
    
    std::cout << "=== MIPS CPU Simulator Test ===" << std::endl;
    std::cout << "Program loaded with " << program.size() << " instructions" << std::endl;
    
    // Print initial state
    std::cout << "\nInitial CPU State:" << std::endl;
    cpu.printState();
    
    // Execute one instruction at a time
    std::cout << "\nExecuting instructions one by one:" << std::endl;
    
    for (int i = 0; i < program.size(); i++) {
        std::cout << "\n--- Step " << (i + 1) << " ---" << std::endl;
        cpu.step();
        cpu.printState();
    }
    
    std::cout << "\n=== Final CPU State ===" << std::endl;
    cpu.printState();
    
    return 0;
}
