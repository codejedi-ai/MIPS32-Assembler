#ifndef RINSTRUCTION_H
#define RINSTRUCTION_H
// word is an unsigned 32-bit integer
#include <cstdint>
#include "instruction.h"
  // however there are different types of instructions
  // so we need to create a class for each type of instruction
  // and each class will extend the instruction class
  
class RTypeInstruction : public Instruction {
public:
    RTypeInstruction(char s, char t);
    RTypeInstruction(char d, char s, char t);  // For instructions with rd
    uint32_t getValue() const;
protected:
    char s;
    char t;
    char d;  // destination register
    char opcode;
};



// ============================================================================
// R-TYPE INSTRUCTIONS (Register-type)
// ============================================================================
// R-type instructions use three registers and have opcode 0
// Format: [opcode(6)] [rs(5)] [rt(5)] [rd(5)] [shamt(5)] [funct(6)]

// Multiplication and Division Instructions
class MultiplicationInstruction : public RTypeInstruction {
  public:
    MultiplicationInstruction(char s, char t);
    uint32_t getValue() const;
};
class MultuInstruction : public RTypeInstruction {
  public:
    MultuInstruction(char s, char t);
    uint32_t getValue() const;
};
class DivisionInstruction : public RTypeInstruction {
  public:
    DivisionInstruction(char s, char t);
    uint32_t getValue() const;
};

class DivisionuInstruction : public RTypeInstruction {
  public:
    DivisionuInstruction(char s, char t);
    uint32_t getValue() const;
};

class AddInstruction : public RTypeInstruction {
  public:
    AddInstruction(char d, char s, char t);
    uint32_t getValue() const;
};

class SubInstruction : public RTypeInstruction {
  public:
    SubInstruction(char d, char s, char t);
    uint32_t getValue() const;
};

class SltInstruction : public RTypeInstruction {
  public:
    SltInstruction(char d, char s, char t);
    uint32_t getValue() const;
};

class SltuInstruction : public RTypeInstruction {
  public:
    SltuInstruction(char d, char s, char t);
    uint32_t getValue() const;
};

class MoveFromHighInstruction : public RTypeInstruction {
  public:
    MoveFromHighInstruction(char s, char t);
    uint32_t getValue() const;
};

class MoveFromLowInstruction : public RTypeInstruction {
  public:
    MoveFromLowInstruction(char s, char t);
    uint32_t getValue() const;
};


#endif