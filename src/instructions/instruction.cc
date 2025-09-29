#include <iostream>
#include <string>
#include <vector>
#include "instructions/instruction.h"
#include <map>
#include <algorithm>
using namespace std;

Instruction::Instruction(uint32_t value) : Word() {
  setValue(value);
}

uint32_t Instruction::getValue() const {
  return Word::getValue();
}
void Instruction::printInstruction(int instr)
{
  unsigned char c = instr >> 24;
  cout << c;
  c = instr >> 16;
  cout << c;
  c = instr >> 8;
  cout << c;
  c = instr;
  cout << c;
}