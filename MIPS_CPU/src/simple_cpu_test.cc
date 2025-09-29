#include "mipsCPU.h"
#include <iostream>
#include <vector>
#include <iomanip>

int main() {
    // Create CPU with 1MB memory
    MipsCPU cpu(1024 * 1024 / 4);
    
    // Create a simple program with just one instruction
    std::vector<int32_t> program;
    
    // Program: addi $1, $0, 5
    auto addi1 = InstructionFactory::createAddi(1, 0, 5);
    program.push_back(addi1->getEncodedValue());
    
    std::cout << "=== Simple CPU Test ===" << std::endl;
    std::cout << "Program: addi $1, $0, 5" << std::endl;
    std::cout << "Encoded: 0x" << std::hex << std::setfill('0') << std::setw(8) << addi1->getEncodedValue() << std::dec << std::endl;
    
    // Load program into CPU
    cpu.loadProgram(program);
    
    // Print initial state
    std::cout << "\nInitial CPU State:" << std::endl;
    cpu.printState();
    
    // Execute one instruction
    std::cout << "\nExecuting one instruction..." << std::endl;
    cpu.step();
    
    std::cout << "\nAfter execution:" << std::endl;
    cpu.printState();
    
    std::cout << "\n$1 = " << cpu.getRegister(1) << " (expected: 5)" << std::endl;
    
    return 0;
}
