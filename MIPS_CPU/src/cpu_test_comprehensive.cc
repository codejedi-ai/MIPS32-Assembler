#include "mipsCPU.h"
#include <iostream>
#include <vector>

int main() {
    // Create CPU with 1MB memory
    MipsCPU cpu(1024 * 1024 / 4);
    
    // Create a more comprehensive test program
    std::vector<int32_t> program;
    
    // Program 1: addi $1, $0, 5
    // Load immediate value 5 into register $1
    auto addi1 = InstructionFactory::createAddi(1, 0, 5);
    program.push_back(addi1->getEncodedValue());
    
    // Program 2: addi $2, $0, 3
    // Load immediate value 3 into register $2
    auto addi2 = InstructionFactory::createAddi(2, 0, 3);
    program.push_back(addi2->getEncodedValue());
    
    // Program 3: add $3, $1, $2
    // Add $1 (5) + $2 (3) = 8, store in $3
    auto addInstr = InstructionFactory::createAdd(3, 1, 2);
    program.push_back(addInstr->getEncodedValue());
    
    // Program 4: mult $1, $2
    // Multiply $1 (5) * $2 (3) = 15, store in HI/LO
    auto multInstr = InstructionFactory::createMult(1, 2);
    program.push_back(multInstr->getEncodedValue());
    
    // Program 5: mflo $4
    // Move low part of multiplication result (15) to $4
    auto mfloInstr = InstructionFactory::createMflo(4);
    program.push_back(mfloInstr->getEncodedValue());
    
    // Program 6: sub $5, $3, $4
    // Subtract $4 (15) from $3 (8) = -7, store in $5
    auto subInstr = InstructionFactory::createSub(5, 3, 4);
    program.push_back(subInstr->getEncodedValue());
    
    std::cout << "=== MIPS CPU Simulator Comprehensive Test ===" << std::endl;
    std::cout << "Program loaded with " << program.size() << " instructions" << std::endl;
    
    // Print the encoded instructions
    std::cout << "\nEncoded instructions:" << std::endl;
    for (size_t i = 0; i < program.size(); i++) {
        std::cout << "  Instruction " << i << ": 0x" << std::hex << program[i] << std::dec << std::endl;
    }
    
    // Load program into CPU
    cpu.loadProgram(program);
    std::cout << "Expected results:" << std::endl;
    std::cout << "  $1 = 5 (from addi)" << std::endl;
    std::cout << "  $2 = 3 (from addi)" << std::endl;
    std::cout << "  $3 = 8 (from add: 5+3)" << std::endl;
    std::cout << "  $4 = 15 (from mflo: 5*3)" << std::endl;
    std::cout << "  $5 = -7 (from sub: 8-15)" << std::endl;
    
    // Print initial state
    std::cout << "\nInitial CPU State:" << std::endl;
    cpu.printState();
    
    // Execute all instructions one by one
    std::cout << "\nExecuting instructions one by one..." << std::endl;
    
    for (size_t i = 0; i < program.size(); i++) {
        std::cout << "\n--- Step " << (i + 1) << " ---" << std::endl;
        cpu.step();
        cpu.printState();
    }
    
    std::cout << "\n=== Final CPU State ===" << std::endl;
    cpu.printState();
    
    // Verify results
    std::cout << "\n=== Verification ===" << std::endl;
    std::cout << "$1 = " << cpu.getRegister(1) << " (expected: 5)" << std::endl;
    std::cout << "$2 = " << cpu.getRegister(2) << " (expected: 3)" << std::endl;
    std::cout << "$3 = " << cpu.getRegister(3) << " (expected: 8)" << std::endl;
    std::cout << "$4 = " << cpu.getRegister(4) << " (expected: 15)" << std::endl;
    std::cout << "$5 = " << cpu.getRegister(5) << " (expected: -7)" << std::endl;
    std::cout << "HI = " << cpu.getHi() << " (expected: 0)" << std::endl;
    std::cout << "LO = " << cpu.getLo() << " (expected: 15)" << std::endl;
    
    return 0;
}
