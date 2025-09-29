#include "instructions/RInstruction.h"
#include <iostream>
#include <iomanip>

// ============================================================================
// INSTRUCTION CLASS IMPLEMENTATION
// ============================================================================

// ============================================================================
// R-TYPE INSTRUCTION BASE CLASS IMPLEMENTATION
// ============================================================================

RTypeInstruction::RTypeInstruction(char s, char t) : Instruction(0), s(s), t(t), opcode(0) {
  // Base R-type instruction with opcode 0
  setValue((opcode << 26) | (s << 21) | (t << 16));
}

RTypeInstruction::RTypeInstruction(char d, char s, char t) : Instruction(0), s(s), t(t), d(d), opcode(0) {
  // Base R-type instruction with opcode 0 and destination register
  // Don't set value here - let derived classes set it
}

uint32_t RTypeInstruction::getValue() const {
  return Instruction::getValue();
}

// ============================================================================
// MULTIPLICATION INSTRUCTIONS
// ============================================================================

MultiplicationInstruction::MultiplicationInstruction(char s, char t) : RTypeInstruction(s, t) {
  // mult rs, rt - multiply signed (funct = 24)
  setValue((0 << 26) | (s << 21) | (t << 16) | (0 << 11) | 24);
}

uint32_t MultiplicationInstruction::getValue() const {
  return Instruction::getValue();
}

MultuInstruction::MultuInstruction(char s, char t) : RTypeInstruction(s, t) {
  // multu rs, rt - multiply unsigned (funct = 25)
  setValue((0 << 26) | (s << 21) | (t << 16) | (0 << 11) | 25);
}

uint32_t MultuInstruction::getValue() const {
  return Instruction::getValue();
}

// ============================================================================
// DIVISION INSTRUCTIONS
// ============================================================================

DivisionInstruction::DivisionInstruction(char s, char t) : RTypeInstruction(s, t) {
  // div rs, rt - divide signed (funct = 26)
  setValue((0 << 26) | (s << 21) | (t << 16) | (0 << 11) | 26);
}

uint32_t DivisionInstruction::getValue() const {
  return Instruction::getValue();
}

DivisionuInstruction::DivisionuInstruction(char s, char t) : RTypeInstruction(s, t) {
  // divu rs, rt - divide unsigned (funct = 27)
  setValue((0 << 26) | (s << 21) | (t << 16) | (0 << 11) | 27);
}

uint32_t DivisionuInstruction::getValue() const {
  return Instruction::getValue();
}

// ============================================================================
// ARITHMETIC INSTRUCTIONS
// ============================================================================

AddInstruction::AddInstruction(char d, char s, char t) : RTypeInstruction(d, s, t) {
  // add rd, rs, rt - add signed (funct = 32)
  uint32_t encoding = (0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 32;
  setValue(encoding);
}

uint32_t AddInstruction::getValue() const {
  return Instruction::getValue();
}

SubInstruction::SubInstruction(char d, char s, char t) : RTypeInstruction(d, s, t) {
  // sub rd, rs, rt - subtract signed (funct = 34)
  setValue((0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 34);
}

uint32_t SubInstruction::getValue() const {
  return Instruction::getValue();
}

// ============================================================================
// COMPARISON INSTRUCTIONS
// ============================================================================

SltInstruction::SltInstruction(char d, char s, char t) : RTypeInstruction(d, s, t) {
  // slt rd, rs, rt - set less than signed (funct = 42)
  setValue((0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 42);
}

uint32_t SltInstruction::getValue() const {
  return Instruction::getValue();
}

SltuInstruction::SltuInstruction(char d, char s, char t) : RTypeInstruction(d, s, t) {
  // sltu rd, rs, rt - set less than unsigned (funct = 43)
  setValue((0 << 26) | (s << 21) | (t << 16) | (d << 11) | (0 << 6) | 43);
}

uint32_t SltuInstruction::getValue() const {
  return Instruction::getValue();
}

// ============================================================================
// MOVE INSTRUCTIONS
// ============================================================================

MoveFromHighInstruction::MoveFromHighInstruction(char s, char t) : RTypeInstruction(s, t) {
  // mfhi rd - move from HI register (funct = 16)
  // Note: This only needs rd parameter, but following the pattern with s, t
  setValue((0 << 26) | (0 << 21) | (0 << 16) | (s << 11) | 16);
}

uint32_t MoveFromHighInstruction::getValue() const {
  return Instruction::getValue();
}

MoveFromLowInstruction::MoveFromLowInstruction(char s, char t) : RTypeInstruction(s, t) {
  // mflo rd - move from LO register (funct = 18)
  // Note: This only needs rd parameter, but following the pattern with s, t
  setValue((0 << 26) | (0 << 21) | (0 << 16) | (s << 11) | 18);
}

uint32_t MoveFromLowInstruction::getValue() const {
  return Instruction::getValue();
}