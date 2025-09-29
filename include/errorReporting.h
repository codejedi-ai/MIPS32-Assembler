#ifndef ERRORREPORTING_H
#define ERRORREPORTING_H

#include <string>
#include <vector>
#include <iostream>
#include "scanner.h"

// ============================================================================
// ERROR REPORTING SYSTEM
// ============================================================================

enum class ErrorType {
    SYNTAX_ERROR,
    SEMANTIC_ERROR,
    LABEL_ERROR,
    INSTRUCTION_ERROR,
    REGISTER_ERROR,
    IMMEDIATE_ERROR,
    FILE_ERROR,
    INTERNAL_ERROR
};

struct ErrorContext {
    int lineNumber;
    int columnNumber;
    std::string fileName;
    std::string lineContent;
    std::vector<Token> tokens;
    int tokenIndex;
    std::string functionName;
    std::string additionalInfo;
    
    ErrorContext() : lineNumber(0), columnNumber(0), tokenIndex(-1) {}
};

class ErrorReporter {
public:
    // Report detailed error with context
    static void reportError(ErrorType type, const std::string& message, const ErrorContext& context);
    
    // Helper functions to create error context
    static ErrorContext createContext(int lineNum, const std::string& line, const std::vector<Token>& tokens, int tokenIdx = -1);
    static ErrorContext createContext(int lineNum, const std::string& line, const std::string& function);
    
    // Specific error reporting functions
    static void reportSyntaxError(const std::string& message, const ErrorContext& context);
    static void reportSemanticError(const std::string& message, const ErrorContext& context);
    static void reportLabelError(const std::string& message, const ErrorContext& context);
    static void reportInstructionError(const std::string& message, const ErrorContext& context);
    static void reportRegisterError(const std::string& message, const ErrorContext& context);
    static void reportImmediateError(const std::string& message, const ErrorContext& context);
    
    // Utility functions
    static std::string getErrorTypeString(ErrorType type);
    static std::string formatTokenList(const std::vector<Token>& tokens);
    static std::string getTokenDescription(const Token& token);
    static std::string getSyntaxSuggestion(const std::vector<Token>& tokens, int tokenIndex, const std::string& errorMessage);
    
private:
    static void printErrorHeader(ErrorType type, const std::string& message);
    static void printErrorLocation(const ErrorContext& context);
    static void printErrorSuggestion(const ErrorContext& context);
};

#endif
