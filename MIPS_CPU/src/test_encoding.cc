#include "mipsCPU.h"
#include <iostream>
#include <iomanip>

int main() {
    std::cout << "=== Testing R-Type Instruction Encoding ===" << std::endl;
    
    // Test add $3, $1, $2
    auto addInstr = InstructionFactory::createAdd(3, 1, 2);
    uint32_t encoded = addInstr->getEncodedValue();
    
    std::cout << "add $3, $1, $2:" << std::endl;
    std::cout << "  Encoded: 0x" << std::hex << std::setfill('0') << std::setw(8) << encoded << std::dec << std::endl;
    
    // Decode it manually
    uint8_t opcode = (encoded >> 26) & 0x3F;
    uint8_t rs = (encoded >> 21) & 0x1F;
    uint8_t rt = (encoded >> 16) & 0x1F;
    uint8_t rd = (encoded >> 11) & 0x1F;
    uint8_t shamt = (encoded >> 6) & 0x1F;
    uint8_t funct = encoded & 0x3F;
    
    std::cout << "  Decoded:" << std::endl;
    std::cout << "    opcode = " << (int)opcode << " (should be 0)" << std::endl;
    std::cout << "    rs = " << (int)rs << " (should be 1)" << std::endl;
    std::cout << "    rt = " << (int)rt << " (should be 2)" << std::endl;
    std::cout << "    rd = " << (int)rd << " (should be 3)" << std::endl;
    std::cout << "    shamt = " << (int)shamt << " (should be 0)" << std::endl;
    std::cout << "    funct = " << (int)funct << " (should be 0x20)" << std::endl;
    
    // Test decoding
    try {
        auto decoded = InstructionFactory::decode(encoded);
        std::cout << "  Decoded instruction: " << decoded->getName() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "  Error decoding: " << e.what() << std::endl;
    }
    
    return 0;
}
