#ifndef PSEUDOCOMMAND_H
#define PSEUDOCOMMAND_H

#include "instructions/word.h"
#include "scanner.h"

// ============================================================================
// PSEUDO COMMAND BASE CLASS
// ============================================================================
// Base class for pseudo commands like .import and .export
// Extends Word to provide pseudo command functionality

class PseudoCommand : public Word {
public:
    PseudoCommand();
    virtual ~PseudoCommand() = default;
    
    // Virtual methods to be implemented by derived classes
    virtual std::string getCommandType() const = 0;
    virtual std::string getSymbolName() const = 0;
    virtual void processCommand() = 0;
    
    // Common functionality
    void setSymbolName(const std::string& symbol);
    std::string getDescription() const;
    
protected:
    std::string symbolName;
    std::string commandType;
};

// ============================================================================
// IMPORT COMMAND CLASS
// ============================================================================
// Handles .import pseudo commands

class ImportCommand : public PseudoCommand {
public:
    ImportCommand(const std::string& symbol);
    virtual ~ImportCommand() = default;
    
    // PseudoCommand interface
    virtual std::string getCommandType() const override;
    virtual std::string getSymbolName() const override;
    virtual void processCommand() override;
    
    // Import-specific functionality
    void addExternalSymbolReference();
};

// ============================================================================
// EXPORT COMMAND CLASS
// ============================================================================
// Handles .export pseudo commands

class ExportCommand : public PseudoCommand {
public:
    ExportCommand(const std::string& symbol);
    virtual ~ExportCommand() = default;
    
    // PseudoCommand interface
    virtual std::string getCommandType() const override;
    virtual std::string getSymbolName() const override;
    virtual void processCommand() override;
    
    // Export-specific functionality
    void addExportedSymbolDefinition();
};

#endif // PSEUDOCOMMAND_H
