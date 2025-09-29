#include "pseudoCommand.h"
#include <iostream>

// ============================================================================
// PSEUDO COMMAND BASE CLASS IMPLEMENTATION
// ============================================================================

PseudoCommand::PseudoCommand() : symbolName(""), commandType("") {
    // Initialize with default values
}

void PseudoCommand::setSymbolName(const std::string& symbol) {
    symbolName = symbol;
}

std::string PseudoCommand::getDescription() const {
    return commandType + " " + symbolName;
}

// ============================================================================
// IMPORT COMMAND IMPLEMENTATION
// ============================================================================

ImportCommand::ImportCommand(const std::string& symbol) : PseudoCommand() {
    symbolName = symbol;
    commandType = "import";
}

std::string ImportCommand::getCommandType() const {
    return "import";
}

std::string ImportCommand::getSymbolName() const {
    return symbolName;
}

void ImportCommand::processCommand() {
    std::cout << "Processing import command for symbol: " << symbolName << std::endl;
    addExternalSymbolReference();
}

void ImportCommand::addExternalSymbolReference() {
    std::cout << "Adding external symbol reference: " << symbolName << std::endl;
    // This would integrate with the entry manager to add ESR entries
}

// ============================================================================
// EXPORT COMMAND IMPLEMENTATION
// ============================================================================

ExportCommand::ExportCommand(const std::string& symbol) : PseudoCommand() {
    symbolName = symbol;
    commandType = "export";
}

std::string ExportCommand::getCommandType() const {
    return "export";
}

std::string ExportCommand::getSymbolName() const {
    return symbolName;
}

void ExportCommand::processCommand() {
    std::cout << "Processing export command for symbol: " << symbolName << std::endl;
    addExportedSymbolDefinition();
}

void ExportCommand::addExportedSymbolDefinition() {
    std::cout << "Adding exported symbol definition: " << symbolName << std::endl;
    // This would integrate with the entry manager to add ESD entries
}
