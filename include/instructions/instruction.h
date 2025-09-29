#ifndef INSTRUCTION_H
#define INSTRUCTION_H
#include "word.h"

class Instruction : public Word {
  public:
    Instruction(uint32_t value);
    uint32_t getValue() const;
    void printInstruction(int instr);
};
#endif