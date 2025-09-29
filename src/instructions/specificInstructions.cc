#include "instructions/specificInstructions.h"
#include <iostream>
#include <iomanip>

// ============================================================================
// R-TYPE INSTRUCTION IMPLEMENTATIONS
// ============================================================================

AddInstruction::AddInstruction(char d, char s, char t) : Instruction() {
    this->d = d;
    this->s = s;
    this->t = t;
    
    // R-type format: [opcode(6)] [rs(5)] [rt(5)] [rd(5)] [shamt(5)] [funct(6)]
    // add: opcode=0, funct=0x20
    value = (0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 0x20;
}

void AddInstruction::printInstruction() const {
    std::cout << "add $" << (int)d << ", $" << (int)s << ", $" << (int)t << std::endl;
}

SubInstruction::SubInstruction(char d, char s, char t) : Instruction() {
    this->d = d;
    this->s = s;
    this->t = t;
    
    // sub: opcode=0, funct=0x22
    value = (0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 0x22;
}

void SubInstruction::printInstruction() const {
    std::cout << "sub $" << (int)d << ", $" << (int)s << ", $" << (int)t << std::endl;
}

MultInstruction::MultInstruction(char s, char t) : Instruction() {
    this->s = s;
    this->t = t;
    
    // mult: opcode=0, funct=0x18
    value = (0 << 26) | (s << 21) | (t << 16) | (0 << 11) | (0 << 6) | 0x18;
}

void MultInstruction::printInstruction() const {
    std::cout << "mult $" << (int)s << ", $" << (int)t << std::endl;
}

DivInstruction::DivInstruction(char s, char t) : Instruction() {
    this->s = s;
    this->t = t;
    
    // div: opcode=0, funct=0x1A
    value = (0 << 26) | (s << 21) | (t << 16) | (0 << 11) | (0 << 6) | 0x1A;
}

void DivInstruction::printInstruction() const {
    std::cout << "div $" << (int)s << ", $" << (int)t << std::endl;
}

MfhiInstruction::MfhiInstruction(char d) : Instruction() {
    this->d = d;
    
    // mfhi: opcode=0, funct=0x10
    value = (0 << 26) | (0 << 21) | (0 << 16) | (d << 11) | (0 << 6) | 0x10;
}

void MfhiInstruction::printInstruction() const {
    std::cout << "mfhi $" << (int)d << std::endl;
}

MfloInstruction::MfloInstruction(char d) : Instruction() {
    this->d = d;
    
    // mflo: opcode=0, funct=0x12
    value = (0 << 26) | (0 << 21) | (0 << 16) | (d << 11) | (0 << 6) | 0x12;
}

void MfloInstruction::printInstruction() const {
    std::cout << "mflo $" << (int)d << std::endl;
}

LisInstruction::LisInstruction(char d) : Instruction() {
    this->d = d;
    
    // lis: opcode=0, funct=0x14
    value = (0 << 26) | (0 << 21) | (0 << 16) | (d << 11) | (0 << 6) | 0x14;
}

void LisInstruction::printInstruction() const {
    std::cout << "lis $" << (int)d << std::endl;
}

// ============================================================================
// I-TYPE INSTRUCTION IMPLEMENTATIONS
// ============================================================================

AddiInstruction::AddiInstruction(char rt, char rs, int16_t immediate) : Instruction() {
    this->rt = rt;
    this->rs = rs;
    this->immediate = immediate;
    
    // addi: opcode=0x08
    value = (0x08 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF);
}

void AddiInstruction::printInstruction() const {
    std::cout << "addi $" << (int)rt << ", $" << (int)rs << ", " << immediate << std::endl;
}

BeqInstruction::BeqInstruction(char rs, char rt, int16_t immediate) : Instruction() {
    this->rs = rs;
    this->rt = rt;
    this->immediate = immediate;
    
    // beq: opcode=0x04
    value = (0x04 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF);
}

void BeqInstruction::printInstruction() const {
    std::cout << "beq $" << (int)rs << ", $" << (int)rt << ", " << immediate << std::endl;
}

BneInstruction::BneInstruction(char rs, char rt, int16_t immediate) : Instruction() {
    this->rs = rs;
    this->rt = rt;
    this->immediate = immediate;
    
    // bne: opcode=0x05
    value = (0x05 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF);
}

void BneInstruction::printInstruction() const {
    std::cout << "bne $" << (int)rs << ", $" << (int)rt << ", " << immediate << std::endl;
}

// ============================================================================
// J-TYPE INSTRUCTION IMPLEMENTATIONS
// ============================================================================

JInstruction::JInstruction(uint32_t address) : Instruction() {
    this->address = address;
    
    // j: opcode=0x02
    value = (0x02 << 26) | (address & 0x03FFFFFF);
}

void JInstruction::printInstruction() const {
    std::cout << "j " << std::hex << "0x" << address << std::dec << std::endl;
}
