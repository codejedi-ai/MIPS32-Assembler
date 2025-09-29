#ifndef ASSEMBLER_H
#define ASSEMBLER_H

#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <memory>
#include "scanner.h"
#include "instructions/instructionFactory.h"
#include "assemblerUtils.h"
#include "errorReporting.h"

// ============================================================================
// MIPS ASSEMBLER CLASS
// ============================================================================
// This class handles the two-pass assembly process

class Assembler {
public:
    Assembler(bool debugMode = false);
    
    // Main assembly process
    int assemble(std::istream& input);
    
    // Two-pass assembly methods
    int firstPass(const std::vector<std::vector<Token>>& program);
    int secondPass(const std::vector<std::vector<Token>>& program);
    
    // Symbol table management
    void addLabel(const std::string& label, int address, int lineNumber);
    bool hasLabel(const std::string& label) const;
    int getLabelAddress(const std::string& label) const;
    int getLabelLineNumber(const std::string& label) const;
    
    // Instruction processing
    std::unique_ptr<Instruction> processInstruction(const std::vector<Token>& tokens, int startIndex);
    
    // Binary output management
    void addInstruction(uint32_t instruction);
    void outputMERLFile();
    
    // Error handling
    void reportError(const std::string& message);
    
private:
    std::map<std::string, int> symbolTable;
    std::map<std::string, int> labelLineNumbers;  // Track line numbers where labels are defined
    std::vector<uint32_t> binaryInstructions;  // Store all instructions
    int programCounter;
    int currentLineNumber;  // Track current line for error reporting
    bool debugMode;  // Debug mode flag
    
    // Helper methods
    int extractRegisterNumber(const Token& token);
    int16_t calculateBranchOffset(const Token& token, int currentPC);
    bool isValidInstruction(const std::vector<Token>& tokens, int startIndex);
    
    // Error reporting methods
    void reportDetailedError(ErrorType type, const std::string& message, const std::vector<Token>& tokens, int tokenIndex = -1);
    void reportDetailedError(ErrorType type, const std::string& message, const std::string& function);
};

#endif
