#ifndef INSTRUCTIONFACTORY_H
#define INSTRUCTIONFACTORY_H

#include <vector>
#include <memory>
#include "../scanner.h"
#include "instruction.h"
#include "RInstruction.h"
#include "IInstruction.h"

// ============================================================================
// INSTRUCTION FACTORY CLASS
// ============================================================================
// This factory creates instruction objects based on tokenized assembly code

class InstructionFactory {
public:
    // Factory method to create instruction from token vector
    static std::unique_ptr<Instruction> createInstruction(const std::vector<Token>& tokens, int startIndex = 0);
    
    // Individual factory methods for each instruction type
    static std::unique_ptr<Instruction> createAddInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createSubInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createSltInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createSltuInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createMultInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createMultuInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createDivInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createDivuInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createMfhiInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createMfloInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createLisInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createJrInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createJalrInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createBeqInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createBneInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createLwInstruction(const std::vector<Token>& tokens, int startIndex);
    static std::unique_ptr<Instruction> createSwInstruction(const std::vector<Token>& tokens, int startIndex);
    
    static std::unique_ptr<Instruction> createWordInstruction(const std::vector<Token>& tokens, int startIndex);

private:
    // Helper methods for validation
    static bool isValidInstruction(const std::vector<Token>& tokens, int startIndex);
    static int extractRegisterNumber(const Token& token);
    static int16_t extractImmediate(const Token& token);
};

// ============================================================================
// INSTRUCTION VALIDATION FUNCTIONS
// ============================================================================
// These functions validate the syntax and structure of different instruction types

bool add_sub_slt_sltu(int ind, std::vector<Token> &vecref);
bool mult_multu_div_divu(int ind, std::vector<Token> &vecref);
bool mfhi_mflo_lis(int ind, std::vector<Token> &vecref);
bool lw_sw(int ind, std::vector<Token> &vecref);
bool beq_bne(int ind, std::vector<Token> &vecref);
bool jr_jalr(int ind, std::vector<Token> &vecref);
bool word(int ind, std::vector<Token> &vecref);

#endif