#ifndef IINSTRUCTION_H
#define IINSTRUCTION_H

#include <cstdint>
#include "instruction.h"

// ============================================================================
// I-TYPE INSTRUCTION BASE CLASS
// ============================================================================
// I-type instructions use two registers and a 16-bit immediate value
// Format: [opcode(6)] [rs(5)] [rt(5)] [immediate(16)]

class ITypeInstruction : public Instruction {
public:
    ITypeInstruction(char rs, char rt, int16_t immediate);
    uint32_t getValue() const;
protected:
    char rs;
    char rt;
    int16_t immediate;
    char opcode;
};

// ============================================================================
// BRANCH INSTRUCTIONS
// ============================================================================

class BeqInstruction : public ITypeInstruction {
public:
    BeqInstruction(char rs, char rt, int16_t immediate);
    uint32_t getValue() const;
};

class BneInstruction : public ITypeInstruction {
public:
    BneInstruction(char rs, char rt, int16_t immediate);
    uint32_t getValue() const;
};

// ============================================================================
// MEMORY ACCESS INSTRUCTIONS
// ============================================================================

class LwInstruction : public ITypeInstruction {
public:
    LwInstruction(char rs, char rt, int16_t immediate);
    uint32_t getValue() const;
};

class SwInstruction : public ITypeInstruction {
public:
    SwInstruction(char rs, char rt, int16_t immediate);
    uint32_t getValue() const;
};

#endif