#include "instructions/instructionFactory.h"
#include <iostream>

using namespace std;

// ============================================================================
// INSTRUCTION FACTORY IMPLEMENTATION
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (startIndex >= tokens.size()) {
        return nullptr;
    }
    
    const std::string& instructionName = tokens[startIndex].getLexeme();
    
    // R-type arithmetic instructions
    if (instructionName == "add") {
        return createAddInstruction(tokens, startIndex);
    } else if (instructionName == "sub") {
        return createSubInstruction(tokens, startIndex);
    } else if (instructionName == "slt") {
        return createSltInstruction(tokens, startIndex);
    } else if (instructionName == "sltu") {
        return createSltuInstruction(tokens, startIndex);
    }
    
    // R-type multiplication/division instructions
    else if (instructionName == "mult") {
        return createMultInstruction(tokens, startIndex);
    } else if (instructionName == "multu") {
        return createMultuInstruction(tokens, startIndex);
    } else if (instructionName == "div") {
        return createDivInstruction(tokens, startIndex);
    } else if (instructionName == "divu") {
        return createDivuInstruction(tokens, startIndex);
    }
    
    // R-type move instructions
    else if (instructionName == "mfhi") {
        return createMfhiInstruction(tokens, startIndex);
    } else if (instructionName == "mflo") {
        return createMfloInstruction(tokens, startIndex);
    } else if (instructionName == "lis") {
        return createLisInstruction(tokens, startIndex);
    }
    
    // R-type jump instructions
    else if (instructionName == "jr") {
        return createJrInstruction(tokens, startIndex);
    } else if (instructionName == "jalr") {
        return createJalrInstruction(tokens, startIndex);
    }
    
    // I-type branch instructions
    else if (instructionName == "beq") {
        return createBeqInstruction(tokens, startIndex);
    } else if (instructionName == "bne") {
        return createBneInstruction(tokens, startIndex);
    }
    
    // I-type memory access instructions
    else if (instructionName == "lw") {
        return createLwInstruction(tokens, startIndex);
    } else if (instructionName == "sw") {
        return createSwInstruction(tokens, startIndex);
    }
    
    // Pseudo-instructions
    else if (tokens[startIndex].getKind() == Token::WORD) {
        return createWordInstruction(tokens, startIndex);
    }
    
    return nullptr;
}

// ============================================================================
// R-TYPE ARITHMETIC INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createAddInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!add_sub_slt_sltu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    int rs = extractRegisterNumber(tokens[startIndex + 3]);
    int rt = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<AddInstruction>(rd, rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createSubInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!add_sub_slt_sltu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    int rs = extractRegisterNumber(tokens[startIndex + 3]);
    int rt = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<SubInstruction>(rd, rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createSltInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!add_sub_slt_sltu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    int rs = extractRegisterNumber(tokens[startIndex + 3]);
    int rt = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<SltInstruction>(rd, rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createSltuInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!add_sub_slt_sltu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    int rs = extractRegisterNumber(tokens[startIndex + 3]);
    int rt = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<SltuInstruction>(rd, rs, rt);
}

// ============================================================================
// R-TYPE MULTIPLICATION/DIVISION INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createMultInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mult_multu_div_divu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    
    return std::make_unique<MultiplicationInstruction>(rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createMultuInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mult_multu_div_divu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    
    return std::make_unique<MultuInstruction>(rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createDivInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mult_multu_div_divu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    
    return std::make_unique<DivisionInstruction>(rs, rt);
}

std::unique_ptr<Instruction> InstructionFactory::createDivuInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mult_multu_div_divu(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    
    return std::make_unique<DivisionuInstruction>(rs, rt);
}

// ============================================================================
// R-TYPE MOVE INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createMfhiInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mfhi_mflo_lis(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    
    return std::make_unique<MoveFromHighInstruction>(rd, 0);
}

std::unique_ptr<Instruction> InstructionFactory::createMfloInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mfhi_mflo_lis(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    
    return std::make_unique<MoveFromLowInstruction>(rd, 0);
}

std::unique_ptr<Instruction> InstructionFactory::createLisInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!mfhi_mflo_lis(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rd = extractRegisterNumber(tokens[startIndex + 1]);
    
    return std::make_unique<MoveFromLowInstruction>(rd, 0); // Using MoveFromLow as placeholder
}

// ============================================================================
// R-TYPE JUMP INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createJrInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!jr_jalr(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    
    return std::make_unique<MoveFromLowInstruction>(rs, 0); // Using MoveFromLow as placeholder
}

std::unique_ptr<Instruction> InstructionFactory::createJalrInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!jr_jalr(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    
    return std::make_unique<MoveFromLowInstruction>(rs, 0); // Using MoveFromLow as placeholder
}

// ============================================================================
// I-TYPE BRANCH INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createBeqInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!beq_bne(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    int16_t immediate = extractImmediate(tokens[startIndex + 5]);
    
    return std::make_unique<BeqInstruction>(rs, rt, immediate);
}

std::unique_ptr<Instruction> InstructionFactory::createBneInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!beq_bne(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rs = extractRegisterNumber(tokens[startIndex + 1]);
    int rt = extractRegisterNumber(tokens[startIndex + 3]);
    int16_t immediate = extractImmediate(tokens[startIndex + 5]);
    
    return std::make_unique<BneInstruction>(rs, rt, immediate);
}

// ============================================================================
// I-TYPE MEMORY ACCESS INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createLwInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!lw_sw(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rt = extractRegisterNumber(tokens[startIndex + 1]);
    int16_t immediate = extractImmediate(tokens[startIndex + 3]);
    int rs = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<LwInstruction>(rs, rt, immediate);
}

std::unique_ptr<Instruction> InstructionFactory::createSwInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!lw_sw(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    int rt = extractRegisterNumber(tokens[startIndex + 1]);
    int16_t immediate = extractImmediate(tokens[startIndex + 3]);
    int rs = extractRegisterNumber(tokens[startIndex + 5]);
    
    return std::make_unique<SwInstruction>(rs, rt, immediate);
}

// ============================================================================
// PSEUDO-INSTRUCTION FACTORIES
// ============================================================================

std::unique_ptr<Instruction> InstructionFactory::createWordInstruction(const std::vector<Token>& tokens, int startIndex) {
    if (!word(startIndex, const_cast<std::vector<Token>&>(tokens))) {
        return nullptr;
    }
    
    uint32_t value = tokens[startIndex + 1].toNumber();
    return std::make_unique<Instruction>(value);
}

// ============================================================================
// HELPER METHODS
// ============================================================================

int InstructionFactory::extractRegisterNumber(const Token& token) {
    if (token.getKind() != Token::REG) {
        return 0;
    }
    
    std::string regStr = token.getLexeme();
    if (regStr.length() > 1 && regStr[0] == '$') {
        return std::stoi(regStr.substr(1));
    }
    
    return 0;
}

int16_t InstructionFactory::extractImmediate(const Token& token) {
    if (token.getKind() == Token::INT || token.getKind() == Token::HEXINT) {
        int32_t value = token.toNumber();
        return static_cast<int16_t>(value & 0xFFFF);
    }
    
    return 0;
}

// ============================================================================
// INSTRUCTION VALIDATION FUNCTIONS
// ============================================================================
// These functions validate the syntax and structure of different instruction types

/*
add $1, $2, $3
Token(ID, add) Token(REG, $1) Token(COMMA, ,) Token(REG, $2) Token(COMMA, ,) Token(REG, $3)
*/
// Validates R-type arithmetic instructions: add, sub, slt, sltu
bool add_sub_slt_sltu(int ind, std::vector<Token> &vecref)
{

  bool sizeMeet = (ind + 6 == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = vecref[ind].getKind() == Token::ID &&
                       vecref[ind + 1].getKind() == Token::REG &&
                       vecref[ind + 2].getKind() == Token::COMMA &&
                       vecref[ind + 3].getKind() == Token::REG &&
                       vecref[ind + 4].getKind() == Token::COMMA &&
                       vecref[ind + 5].getKind() == Token::REG;
  if (!structureMeet)
    return false;
  bool instructionValid = vecref[ind].getLexeme() == "add" ||
                          vecref[ind].getLexeme() == "sub" ||
                          vecref[ind].getLexeme() == "slt" ||
                          vecref[ind].getLexeme() == "sltu";
  if (!instructionValid)
    return false;
  return true;
}
// Validates R-type multiplication/division instructions: mult, multu, div, divu
bool mult_multu_div_divu(int ind, std::vector<Token> &vecref)
{
  vector<Token> buf = scan("mult $4, $3");
  bool sizeMeet = (ind + buf.size() == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = true;

  for (int i = 0; i < buf.size(); i++)
  {
    structureMeet = structureMeet && (vecref[ind + i].getKind() == buf[i].getKind());
  }

  if (!structureMeet)
    return false;
  bool instructionValid = vecref[ind].getLexeme() == "mult" ||
                          vecref[ind].getLexeme() == "multu" ||
                          vecref[ind].getLexeme() == "div" ||
                          vecref[ind].getLexeme() == "divu";
  if (!instructionValid)
    return false;
  return true;
}
// Token(ID, lis) Token(REG, $4)
// Validates R-type move instructions: mfhi, mflo, lis
bool mfhi_mflo_lis(int ind, std::vector<Token> &vecref)
{

  bool sizeMeet = (ind + 2 == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = vecref[ind].getKind() == Token::ID &&
                       vecref[ind + 1].getKind() == Token::REG;
  if (!structureMeet)
    return false;
  bool instructionValid = vecref[ind].getLexeme() == "mfhi" ||
                          vecref[ind].getLexeme() == "mflo" ||
                          vecref[ind].getLexeme() == "lis";
  if (!instructionValid)
    return false;
  return true;
}
// Token(ID, lw) Token(REG, $4) Token(COMMA, ,) Token(INT, 1) Token(LPAREN, () Token(REG, $3) Token(RPAREN, ))
// Validates I-type memory access instructions: lw, sw
bool lw_sw(int ind, std::vector<Token> &vecref)
{
  vector<Token> buf = scan("lw $4, 1($3)");
  bool sizeMeet = (ind + buf.size() == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = false;
  bool bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;
  buf = scan("lw $4, 0x1($3)");
  bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;
  if (!structureMeet)
    return false;
  bool instructionValid = vecref[ind].getLexeme() == "lw" ||
                          vecref[ind].getLexeme() == "sw";
  if (!instructionValid)
    return false;
  return true;
}
// Validates I-type branch instructions: beq, bne
bool beq_bne(int ind, std::vector<Token> &vecref)
{
  vector<Token> buf = scan("beq $4, $0, i");
  bool sizeMeet = (ind + buf.size() == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = false;
  bool bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  buf = scan("beq $4, $0, 0x0");
  bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  buf = scan("beq $4, $0, 1");
  bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  if (!structureMeet)
    return false;

  bool instructionValid = vecref[ind].getLexeme() == "beq" ||
                          vecref[ind].getLexeme() == "bne";
  if (!instructionValid)
    return false;
  return true;
}
// Validates R-type jump instructions: jr, jalr
bool jr_jalr(int ind, std::vector<Token> &vecref)
{

  bool sizeMeet = (ind + 2 == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = vecref[ind].getKind() == Token::ID &&
                       vecref[ind + 1].getKind() == Token::REG;
  if (!structureMeet)
    return false;
  bool instructionValid = vecref[ind].getLexeme() == "jr" ||
                          vecref[ind].getLexeme() == "jalr";
  if (!instructionValid)
    return false;
  return true;
}

// Validates pseudo-instruction: .word
bool word(int ind, std::vector<Token> &vecref)
{
  vector<Token> buf = scan(".word i");
  bool sizeMeet = (ind + buf.size() == vecref.size());
  if (!sizeMeet)
    return false;
  bool structureMeet = false;
  bool bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  buf = scan(".word 0x0");
  bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  buf = scan(".word 1");
  bufTemp = true;
  for (int i = 0; i < buf.size(); i++)
  {
    bufTemp = bufTemp && (vecref[ind + i].getKind() == buf[i].getKind());
  }
  structureMeet = structureMeet || bufTemp;

  bool instructionValid = vecref[ind].getKind() == Token::WORD;
  if (!instructionValid)
    return false;
  return true;
}