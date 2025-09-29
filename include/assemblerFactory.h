#ifndef ASSEMBLER_FACTORY_H
#define ASSEMBLER_FACTORY_H

#include <memory>
#include <iostream>
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
    virtual ~BaseAssembler() = default;
    
    // Main assembly interface
    virtual int assemble(std::istream& input) = 0;
    virtual int assemble(const std::string& filename) = 0;
    
    // Common functionality
    virtual void setDebugMode(bool debug) = 0;
    virtual bool isDebugMode() const = 0;
    
    // Output methods
    virtual void outputToFile(const std::string& filename) = 0;
    virtual void outputToStream(std::ostream& stream) = 0;
    
    // Analysis
    virtual void printAnalysis() const = 0;
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
    virtual void setDebugMode(bool debug) override;
    virtual bool isDebugMode() const override;
    virtual void outputToFile(const std::string& filename) override;
    virtual void outputToStream(std::ostream& stream) override;
    virtual void printAnalysis() const override;
    
private:
    bool debugMode;
    ScannerWrapper scanner;
    
    // Assembly methods
    int processAssembly(const std::vector<std::vector<Token>>& tokens);
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
    virtual void setDebugMode(bool debug) override;
    virtual bool isDebugMode() const override;
    virtual void outputToFile(const std::string& filename) override;
    virtual void outputToStream(std::ostream& stream) override;
    virtual void printAnalysis() const override;
    
    // MERL-specific methods
    void addRelocationRecord(uint32_t offset);
    void addExternalSymbolReference(const std::string& symbol, uint32_t offset);
    void addExportedSymbolDefinition(const std::string& symbol, uint32_t offset);
    
    // Label reference tracking
    void processWordDirective(const std::vector<Token>& tokens, uint32_t pc);
    bool isWordWithLabel(const std::vector<Token>& tokens) const;
    std::string extractLabelFromWord(const std::vector<Token>& tokens) const;
    
private:
    bool debugMode;
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
