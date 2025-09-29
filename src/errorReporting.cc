#include "errorReporting.h"

// ============================================================================
// ERROR REPORTING SYSTEM IMPLEMENTATION
// ============================================================================

void ErrorReporter::reportError(ErrorType type, const std::string& message, const ErrorContext& context) {
    printErrorHeader(type, message);
    printErrorLocation(context);
    printErrorSuggestion(context);
    std::cerr << std::endl;
}

ErrorContext ErrorReporter::createContext(int lineNum, const std::string& line, const std::vector<Token>& tokens, int tokenIdx) {
    ErrorContext context;
    context.lineNumber = lineNum;
    context.lineContent = line;
    context.tokens = tokens;
    context.tokenIndex = tokenIdx;
    return context;
}

ErrorContext ErrorReporter::createContext(int lineNum, const std::string& line, const std::string& function) {
    ErrorContext context;
    context.lineNumber = lineNum;
    context.lineContent = line;
    context.functionName = function;
    return context;
}

void ErrorReporter::reportSyntaxError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::SYNTAX_ERROR, message, context);
}

void ErrorReporter::reportSemanticError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::SEMANTIC_ERROR, message, context);
}

void ErrorReporter::reportLabelError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::LABEL_ERROR, message, context);
}

void ErrorReporter::reportInstructionError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::INSTRUCTION_ERROR, message, context);
}

void ErrorReporter::reportRegisterError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::REGISTER_ERROR, message, context);
}

void ErrorReporter::reportImmediateError(const std::string& message, const ErrorContext& context) {
    reportError(ErrorType::IMMEDIATE_ERROR, message, context);
}

std::string ErrorReporter::getErrorTypeString(ErrorType type) {
    switch (type) {
        case ErrorType::SYNTAX_ERROR: return "SYNTAX ERROR";
        case ErrorType::SEMANTIC_ERROR: return "SEMANTIC ERROR";
        case ErrorType::LABEL_ERROR: return "LABEL ERROR";
        case ErrorType::INSTRUCTION_ERROR: return "INSTRUCTION ERROR";
        case ErrorType::REGISTER_ERROR: return "REGISTER ERROR";
        case ErrorType::IMMEDIATE_ERROR: return "IMMEDIATE ERROR";
        case ErrorType::FILE_ERROR: return "FILE ERROR";
        case ErrorType::INTERNAL_ERROR: return "INTERNAL ERROR";
        default: return "UNKNOWN ERROR";
    }
}

std::string ErrorReporter::formatTokenList(const std::vector<Token>& tokens) {
    std::string result = "[";
    for (size_t i = 0; i < tokens.size(); ++i) {
        if (i > 0) result += ", ";
        result += getTokenDescription(tokens[i]);
    }
    result += "]";
    return result;
}

std::string ErrorReporter::getTokenDescription(const Token& token) {
    std::string kind;
    switch (token.getKind()) {
        case Token::ID: kind = "ID"; break;
        case Token::LABEL: kind = "LABEL"; break;
        case Token::WORD: kind = "WORD"; break;
        case Token::COMMA: kind = "COMMA"; break;
        case Token::LPAREN: kind = "LPAREN"; break;
        case Token::RPAREN: kind = "RPAREN"; break;
        case Token::INT: kind = "INT"; break;
        case Token::HEXINT: kind = "HEXINT"; break;
        case Token::REG: kind = "REG"; break;
        case Token::WHITESPACE: kind = "WHITESPACE"; break;
        case Token::COMMENT: kind = "COMMENT"; break;
        default: kind = "UNKNOWN"; break;
    }
    return kind + "(\"" + token.getLexeme() + "\")";
}

std::string ErrorReporter::getSyntaxSuggestion(const std::vector<Token>& tokens, int tokenIndex, const std::string& errorMessage) {
    if (tokens.empty()) {
        return "Expected at least one token. Check if the line is empty or contains only whitespace.";
    }
    
    if (tokenIndex < 0 || tokenIndex >= static_cast<int>(tokens.size())) {
        tokenIndex = tokens.size() - 1; // Default to last token
    }
    
    const Token& errorToken = tokens[tokenIndex];
    std::string suggestion;
    
    // Analyze the error context
    if (errorMessage.find("maximal munch failed") != std::string::npos) {
        // Tokenization failed - likely invalid characters or syntax
        suggestion = "Check for invalid characters or incorrect syntax. ";
        
        if (errorToken.getKind() == Token::ID) {
            std::string lexeme = errorToken.getLexeme();
            suggestion += "Did you mean: ";
            
            // Common instruction name suggestions
            if (lexeme.find("add") != std::string::npos) suggestion += "'add', ";
            if (lexeme.find("sub") != std::string::npos) suggestion += "'sub', ";
            if (lexeme.find("mult") != std::string::npos) suggestion += "'mult', ";
            if (lexeme.find("div") != std::string::npos) suggestion += "'div', ";
            if (lexeme.find("beq") != std::string::npos) suggestion += "'beq', ";
            if (lexeme.find("bne") != std::string::npos) suggestion += "'bne', ";
            if (lexeme.find("lw") != std::string::npos) suggestion += "'lw', ";
            if (lexeme.find("sw") != std::string::npos) suggestion += "'sw', ";
            if (lexeme.find("jr") != std::string::npos) suggestion += "'jr', ";
            if (lexeme.find("jalr") != std::string::npos) suggestion += "'jalr', ";
            if (lexeme.find("lis") != std::string::npos) suggestion += "'lis', ";
            if (lexeme.find("mfhi") != std::string::npos) suggestion += "'mfhi', ";
            if (lexeme.find("mflo") != std::string::npos) suggestion += "'mflo', ";
            if (lexeme.find("slt") != std::string::npos) suggestion += "'slt', ";
            if (lexeme.find("sltu") != std::string::npos) suggestion += "'sltu', ";
            if (lexeme.find("word") != std::string::npos) suggestion += "'.word', ";
            
            if (suggestion.back() == ' ') {
                suggestion.pop_back(); // Remove trailing space
                suggestion.pop_back(); // Remove trailing comma
            }
        }
    }
    
    // Analyze token sequence for common patterns
    if (tokens.size() >= 2) {
        const Token& firstToken = tokens[0];
        const Token& secondToken = tokens[1];
        
        // Check for common instruction patterns
        if (firstToken.getKind() == Token::ID) {
            std::string instruction = firstToken.getLexeme();
            
            if (instruction == "add" || instruction == "sub" || instruction == "slt" || instruction == "sltu") {
                if (tokens.size() < 6) {
                    suggestion += "R-type instruction '" + instruction + "' requires: " + instruction + " $rd, $rs, $rt";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rd, $rs, $rt";
                }
            } else if (instruction == "mult" || instruction == "multu" || instruction == "div" || instruction == "divu") {
                if (tokens.size() < 4) {
                    suggestion += "R-type instruction '" + instruction + "' requires: " + instruction + " $rs, $rt";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rs, $rt";
                }
            } else if (instruction == "beq" || instruction == "bne") {
                if (tokens.size() < 6) {
                    suggestion += "Branch instruction '" + instruction + "' requires: " + instruction + " $rs, $rt, label";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rs, $rt, label";
                }
            } else if (instruction == "lw" || instruction == "sw") {
                if (tokens.size() < 6) {
                    suggestion += "Memory instruction '" + instruction + "' requires: " + instruction + " $rt, offset($rs)";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rt, offset($rs)";
                }
            } else if (instruction == "jr" || instruction == "jalr") {
                if (tokens.size() < 2) {
                    suggestion += "Jump instruction '" + instruction + "' requires: " + instruction + " $rs";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rs";
                }
            } else if (instruction == "lis" || instruction == "mfhi" || instruction == "mflo") {
                if (tokens.size() < 2) {
                    suggestion += "Instruction '" + instruction + "' requires: " + instruction + " $rd";
                } else if (secondToken.getKind() != Token::REG) {
                    suggestion += "Expected register after instruction name. Format: " + instruction + " $rd";
                }
            } else if (instruction == "word") {
                suggestion += "Use '.word' (with dot) for data directives. Format: .word immediate_value";
            } else {
                suggestion += "Unknown instruction '" + instruction + "'. Valid instructions: add, sub, mult, div, beq, bne, lw, sw, jr, jalr, lis, mfhi, mflo, slt, sltu, .word";
            }
        }
        
        // Check for register format issues
        if (secondToken.getKind() == Token::REG) {
            std::string reg = secondToken.getLexeme();
            if (reg.length() > 2 && reg[0] == '$') {
                std::string regNum = reg.substr(1);
                try {
                    int regValue = std::stoi(regNum);
                    if (regValue > 31) {
                        suggestion += "Register number must be between 0 and 31. You used $" + regNum;
                    }
                } catch (...) {
                    suggestion += "Invalid register format. Use $0 to $31";
                }
            }
        }
    }
    
    // Check for common punctuation issues
    bool hasComma = false;
    bool hasParen = false;
    for (const auto& token : tokens) {
        if (token.getKind() == Token::COMMA) hasComma = true;
        if (token.getKind() == Token::LPAREN || token.getKind() == Token::RPAREN) hasParen = true;
    }
    
    if (tokens.size() > 3 && !hasComma) {
        suggestion += "Missing comma separator between operands. ";
    }
    
    if (tokens.size() > 4 && !hasParen) {
        // Check if this looks like a memory instruction
        if (tokens.size() >= 2 && tokens[0].getKind() == Token::ID) {
            std::string instruction = tokens[0].getLexeme();
            if (instruction == "lw" || instruction == "sw") {
                suggestion += "Memory instructions require parentheses around address. Format: " + instruction + " $rt, offset($rs)";
            }
        }
    }
    
    // Default suggestion if nothing specific found
    if (suggestion.empty()) {
        suggestion = "Check instruction syntax. Common formats:\n";
        suggestion += "  R-type: add $rd, $rs, $rt\n";
        suggestion += "  I-type: beq $rs, $rt, label\n";
        suggestion += "  Memory: lw $rt, offset($rs)\n";
        suggestion += "  Data: .word immediate_value";
    }
    
    return suggestion;
}

void ErrorReporter::printErrorHeader(ErrorType type, const std::string& message) {
    std::cerr << "ERROR: " << getErrorTypeString(type) << ": " << message << std::endl;
}

void ErrorReporter::printErrorLocation(const ErrorContext& context) {
    if (context.lineNumber > 0) {
        std::cerr << "  Location: Line " << context.lineNumber;
        if (!context.fileName.empty()) {
            std::cerr << " in " << context.fileName;
        }
        std::cerr << std::endl;
        
        if (!context.lineContent.empty()) {
            std::cerr << "  Source: " << context.lineContent << std::endl;
            
            // Show token position if available
            if (context.tokenIndex >= 0 && context.tokenIndex < static_cast<int>(context.tokens.size())) {
                std::cerr << "  Token: " << getTokenDescription(context.tokens[context.tokenIndex]);
                std::cerr << " (position " << context.tokenIndex << ")" << std::endl;
            }
        }
    }
    
    if (!context.functionName.empty()) {
        std::cerr << "  Function: " << context.functionName << std::endl;
    }
    
    if (!context.tokens.empty()) {
        std::cerr << "  Tokens: " << formatTokenList(context.tokens) << std::endl;
    }
    
    if (!context.additionalInfo.empty()) {
        std::cerr << "  Details: " << context.additionalInfo << std::endl;
    }
}

void ErrorReporter::printErrorSuggestion(const ErrorContext& context) {
    std::cerr << "  Suggestion: ";
    
    // Use enhanced syntax suggestions for syntax errors
    if (!context.tokens.empty()) {
        std::string suggestion = getSyntaxSuggestion(context.tokens, context.tokenIndex, context.additionalInfo);
        std::cerr << suggestion;
    } else {
        // Provide context-specific suggestions
        if (context.tokenIndex >= 0 && context.tokenIndex < static_cast<int>(context.tokens.size())) {
            const Token& token = context.tokens[context.tokenIndex];
            
            switch (token.getKind()) {
                case Token::REG:
                    std::cerr << "Ensure register is between $0 and $31";
                    break;
                case Token::INT:
                    std::cerr << "Check if integer is within valid range";
                    break;
                case Token::HEXINT:
                    std::cerr << "Ensure hexadecimal value is valid";
                    break;
                case Token::ID:
                    std::cerr << "Check if instruction name is valid";
                    break;
                case Token::LABEL:
                    std::cerr << "Ensure label syntax is correct (ends with ':')";
                    break;
                default:
                    std::cerr << "Check syntax and ensure all required tokens are present";
                    break;
            }
        } else {
            std::cerr << "Review the line syntax and check for missing or invalid tokens";
        }
    }
}
