#include "mipsCPU.h"
#include <iostream>
#include <vector>
#include <iomanip>

int main() {
    // Test individual instruction creation and encoding
    std::cout << "=== MIPS Instruction Encoding Test ===" << std::endl;
    
    // Test addi $1, $0, 5
    auto addi1 = InstructionFactory::createAddi(1, 0, 5);
    std::cout << "addi $1, $0, 5 = 0x" << std::hex << addi1->getEncodedValue() << std::dec << std::endl;
    
    // Test addi $2, $0, 3
    auto addi2 = InstructionFactory::createAddi(2, 0, 3);
    std::cout << "addi $2, $0, 3 = 0x" << std::hex << addi2->getEncodedValue() << std::dec << std::endl;
    
    // Test add $3, $1, $2
    auto addInstr = InstructionFactory::createAdd(3, 1, 2);
    std::cout << "add $3, $1, $2 = 0x" << std::hex << addInstr->getEncodedValue() << std::dec << std::endl;
    
    // Test mult $1, $2
    auto multInstr = InstructionFactory::createMult(1, 2);
    std::cout << "mult $1, $2 = 0x" << std::hex << multInstr->getEncodedValue() << std::dec << std::endl;
    
    // Test mflo $4
    auto mfloInstr = InstructionFactory::createMflo(4);
    std::cout << "mflo $4 = 0x" << std::hex << mfloInstr->getEncodedValue() << std::dec << std::endl;
    
    // Test sub $5, $3, $4
    auto subInstr = InstructionFactory::createSub(5, 3, 4);
    std::cout << "sub $5, $3, $4 = 0x" << std::hex << subInstr->getEncodedValue() << std::dec << std::endl;
    
    std::cout << "\n=== Testing Instruction Decoding ===" << std::endl;
    
    // Test decoding each instruction
    try {
        auto decoded1 = InstructionFactory::decode(addi1->getEncodedValue());
        std::cout << "Decoded addi1: " << decoded1->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding addi1: " << e.what() << std::endl;
    }
    
    try {
        auto decoded2 = InstructionFactory::decode(addi2->getEncodedValue());
        std::cout << "Decoded addi2: " << decoded2->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding addi2: " << e.what() << std::endl;
    }
    
    try {
        auto decoded3 = InstructionFactory::decode(addInstr->getEncodedValue());
        std::cout << "Decoded add: " << decoded3->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding add: " << e.what() << std::endl;
    }
    
    try {
        auto decoded4 = InstructionFactory::decode(multInstr->getEncodedValue());
        std::cout << "Decoded mult: " << decoded4->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding mult: " << e.what() << std::endl;
    }
    
    try {
        auto decoded5 = InstructionFactory::decode(mfloInstr->getEncodedValue());
        std::cout << "Decoded mflo: " << decoded5->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding mflo: " << e.what() << std::endl;
    }
    
    try {
        auto decoded6 = InstructionFactory::decode(subInstr->getEncodedValue());
        std::cout << "Decoded sub: " << decoded6->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error decoding sub: " << e.what() << std::endl;
    }
    
    return 0;
}
