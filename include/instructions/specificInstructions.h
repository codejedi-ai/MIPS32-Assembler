#ifndef SPECIFIC_INSTRUCTIONS_H
#define SPECIFIC_INSTRUCTIONS_H

#include "instruction.h"
#include <cstdint>

// ============================================================================
// R-TYPE INSTRUCTIONS (Register-type)
// ============================================================================
// R-type instructions use three registers and have opcode 0
// Format: [opcode(6)] [rs(5)] [rt(5)] [rd(5)] [shamt(5)] [funct(6)]

class AddInstruction : public Instruction {
public:
    AddInstruction(char d, char s, char t);
    void printInstruction() const override;
private:
    char d, s, t;  // destination, source1, source2
};

class SubInstruction : public Instruction {
public:
    SubInstruction(char d, char s, char t);
    void printInstruction() const override;
private:
    char d, s, t;
};

class MultInstruction : public Instruction {
public:
    MultInstruction(char s, char t);
    void printInstruction() const override;
private:
    char s, t;
};

class DivInstruction : public Instruction {
public:
    DivInstruction(char s, char t);
    void printInstruction() const override;
private:
    char s, t;
};

class MfhiInstruction : public Instruction {
public:
    MfhiInstruction(char d);
    void printInstruction() const override;
private:
    char d;
};

class MfloInstruction : public Instruction {
public:
    MfloInstruction(char d);
    void printInstruction() const override;
private:
    char d;
};

class LisInstruction : public Instruction {
public:
    LisInstruction(char d);
    void printInstruction() const override;
private:
    char d;
};

// ============================================================================
// I-TYPE INSTRUCTIONS (Immediate-type)
// ============================================================================
// I-type instructions use two registers and a 16-bit immediate value
// Format: [opcode(6)] [rs(5)] [rt(5)] [immediate(16)]

class AddiInstruction : public Instruction {
public:
    AddiInstruction(char rt, char rs, int16_t immediate);
    void printInstruction() const override;
private:
    char rt, rs;
    int16_t immediate;
};

class BeqInstruction : public Instruction {
public:
    BeqInstruction(char rs, char rt, int16_t immediate);
    void printInstruction() const override;
private:
    char rs, rt;
    int16_t immediate;
};

class BneInstruction : public Instruction {
public:
    BneInstruction(char rs, char rt, int16_t immediate);
    void printInstruction() const override;
private:
    char rs, rt;
    int16_t immediate;
};

// ============================================================================
// J-TYPE INSTRUCTIONS (Jump-type)
// ============================================================================
// J-type instructions use a 26-bit address
// Format: [opcode(6)] [address(26)]

class JInstruction : public Instruction {
public:
    JInstruction(uint32_t address);
    void printInstruction() const override;
private:
    uint32_t address;
};

#endif
