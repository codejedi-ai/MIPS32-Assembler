#ifndef ASSEMBLER_FACTORY_H
#define ASSEMBLER_FACTORY_H

#include <memory>
#include <iostream>
#include <map>
#include <set>
#include "scannerWrapper.h" // For FileType and ScannerWrapper
#include "entryManager.h"   // For EntryManager

// Forward declarations
class BaseAssembler;
class AssemblyAssembler;
class MerlAssembler;

// ============================================================================
// ASSEMBLER FACTORY CLASS
// ============================================================================
// Factory pattern to create appropriate assembler based on file type
// Determines whether to create AssemblyAssembler or MerlAssembler

class AssemblerFactory {
public:
    // Factory method to create appropriate assembler
    static std::unique_ptr<BaseAssembler> createAssembler(std::istream& input);
    static std::unique_ptr<BaseAssembler> createAssembler(const std::string& filename);
    static std::unique_ptr<BaseAssembler> createAssembler(const ScannerWrapper& scanner);
    
    // Factory method with explicit file type
    static std::unique_ptr<BaseAssembler> createAssembler(FileType fileType);
    
    // Analysis method
    static ScannerWrapper analyzeInput(std::istream& input);
    static ScannerWrapper analyzeInput(const std::string& filename);
    
private:
    // Helper methods
    static FileType determineFileType(const ScannerWrapper& scanner);
};

// ============================================================================
// BASE ASSEMBLER ABSTRACT CLASS
// ============================================================================
// Common interface for all assembler types

class BaseAssembler {
public:
    BaseAssembler(uint32_t startPC = 0) : debugMode(false), startPC(startPC) {}
    virtual ~BaseAssembler() = default;
    
    // Main assembly interface
    virtual int assemble(std::istream& input) = 0;
    virtual int assemble(const std::string& filename) = 0;
    int assemble(const std::vector<std::vector<Token>>& tokens);
    
    // Common functionality
    virtual void setDebugMode(bool debug) { debugMode = debug; }
    virtual bool isDebugMode() const { return debugMode; }
    
    // Output methods with debug mode handling
    void outputToFile(const std::string& filename) {
        if (debugMode) {
            outputDebugFile(filename);
        } else {
            outputProductionFile(filename);
        }
    }
    virtual void outputToStream(std::ostream& stream) = 0;
    
    // Analysis
    virtual void printAnalysis() const = 0;
    
    // Label mapping access
    const std::map<std::string, uint32_t>& getSymbolTable() const { return symbolTable; }

protected:
    bool debugMode;
    uint32_t startPC;
    
    // Two-pass assembler methods
    int firstPass(const std::vector<std::vector<Token>>& tokens);
    int secondPass(const std::vector<std::vector<Token>>& tokens);
    
    // Validation methods
    int validateInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex);
    int validateRegister(const Token& regToken, size_t lineNum);
    int validateLabel(const std::string& labelName, size_t lineNum);
    
    // Symbol table
    std::map<std::string, uint32_t> symbolTable;
    std::set<std::string> definedLabels;
    
    // Pure virtual methods for derived classes to implement
    virtual void outputDebugFile(const std::string& filename) = 0;
    virtual void outputProductionFile(const std::string& filename) = 0;
    virtual int processInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) = 0;
};

// ============================================================================
// ASSEMBLY ASSEMBLER CLASS
// ============================================================================
// Handles regular assembly files (no imports/exports)

class AssemblyAssembler : public BaseAssembler {
public:
    AssemblyAssembler();
    AssemblyAssembler(const ScannerWrapper& scanner);
    virtual ~AssemblyAssembler() = default;
    
    // BaseAssembler interface
    virtual int assemble(std::istream& input) override;
    virtual int assemble(const std::string& filename) override;
    virtual void outputToStream(std::ostream& stream) override;
    virtual void printAnalysis() const override;
    
    // Debug and production output methods
    virtual void outputDebugFile(const std::string& filename) override;
    virtual void outputProductionFile(const std::string& filename) override;
    
    // Instruction processing
    virtual int processInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) override;
    
private:
    ScannerWrapper scanner;
    std::vector<uint32_t> binaryInstructions;
    
    // Assembly methods
    void outputAssemblyFile(const std::string& filename);
};

// ============================================================================
// MERL ASSEMBLER CLASS
// ============================================================================
// Handles MERL modules with imports/exports and linker records

class MerlAssembler : public BaseAssembler {
public:
    MerlAssembler();
    MerlAssembler(const ScannerWrapper& scanner);
    virtual ~MerlAssembler() = default;
    
    // BaseAssembler interface
    virtual int assemble(std::istream& input) override;
    virtual int assemble(const std::string& filename) override;
    virtual void outputToStream(std::ostream& stream) override;
    virtual void printAnalysis() const override;
    
    // Debug and production output methods
    virtual void outputDebugFile(const std::string& filename) override;
    virtual void outputProductionFile(const std::string& filename) override;
    
    // Instruction processing
    virtual int processInstruction(const std::vector<Token>& line, size_t lineNum, size_t tokenIndex) override;
    
    // MERL-specific methods
    void addRelocationRecord(uint32_t offset);
    void addExternalSymbolReference(const std::string& symbol, uint32_t offset);
    void addExportedSymbolDefinition(const std::string& symbol, uint32_t offset);
    
    // MERL directive processing
    void processMerlDirectives(const std::vector<std::vector<Token>>& tokens);
    
    // Label reference tracking
    void processWordDirective(const std::vector<Token>& tokens, uint32_t pc);
    bool isWordWithLabel(const std::vector<Token>& tokens) const;
    std::string extractLabelFromWord(const std::vector<Token>& tokens) const;
    
private:
    ScannerWrapper scanner;
    EntryManager entryManager;
    
    // MERL-specific data
    std::vector<uint32_t> relocationRecords;      // REL entries
    std::vector<std::pair<std::string, uint32_t>> externalSymbols;  // ESR entries
    std::vector<std::pair<std::string, uint32_t>> exportedSymbols;  // ESD entries
    
    // MERL processing methods
    int processMerlModule(const std::vector<std::vector<Token>>& tokens);
    void generateMerlHeader(uint32_t& endOfModule, uint32_t& endOfCode);
    void generateLinkerRecords(std::vector<uint8_t>& merlData);
    void outputMerlFile(const std::string& filename);
    
    // MERL constants
    static const uint32_t MERL_MAGIC = 0x10000002;
    static const uint32_t REL_MARKER = 0x00000001;
    static const uint32_t ESR_MARKER = 0x00000011;
    static const uint32_t ESD_MARKER = 0x00000005;
};

#endif // ASSEMBLER_FACTORY_H
