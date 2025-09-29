#include "instructions/IInstruction.h"

// ============================================================================
// I-TYPE INSTRUCTION BASE CLASS IMPLEMENTATION
// ============================================================================

ITypeInstruction::ITypeInstruction(char rs, char rt, int16_t immediate) 
    : Instruction(0), rs(rs), rt(rt), immediate(immediate), opcode(0) {
    // Base I-type instruction encoding
    setValue((opcode << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF));
}

uint32_t ITypeInstruction::getValue() const {
    return Instruction::getValue();
}

// ============================================================================
// BRANCH INSTRUCTIONS
// ============================================================================

BeqInstruction::BeqInstruction(char rs, char rt, int16_t immediate) 
    : ITypeInstruction(rs, rt, immediate) {
    // beq rs, rt, label - branch if equal (opcode = 4)
    setValue((4 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF));
}

uint32_t BeqInstruction::getValue() const {
    return Instruction::getValue();
}

BneInstruction::BneInstruction(char rs, char rt, int16_t immediate) 
    : ITypeInstruction(rs, rt, immediate) {
    // bne rs, rt, label - branch if not equal (opcode = 5)
    setValue((5 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF));
}

uint32_t BneInstruction::getValue() const {
    return Instruction::getValue();
}

// ============================================================================
// MEMORY ACCESS INSTRUCTIONS
// ============================================================================

LwInstruction::LwInstruction(char rs, char rt, int16_t immediate) 
    : ITypeInstruction(rs, rt, immediate) {
    // lw rt, offset(rs) - load word (opcode = 35)
    setValue((35 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF));
}

uint32_t LwInstruction::getValue() const {
    return Instruction::getValue();
}

SwInstruction::SwInstruction(char rs, char rt, int16_t immediate) 
    : ITypeInstruction(rs, rt, immediate) {
    // sw rt, offset(rs) - store word (opcode = 43)
    setValue((43 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF));
}

uint32_t SwInstruction::getValue() const {
    return Instruction::getValue();
}