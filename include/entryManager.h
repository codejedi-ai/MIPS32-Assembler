#ifndef ENTRY_MANAGER_H
#define ENTRY_MANAGER_H

#include "entry.h"
#include "entryFactory.h"
#include "pseudoCommand.h"
#include <memory>
#include <vector>
#include <map>
#include <string>

// ============================================================================
// ENTRY MANAGER CLASS
// ============================================================================
// Manages MERL entries and their creation from pseudo commands

class EntryManager {
public:
    EntryManager();
    ~EntryManager() = default;
    
    // Entry management
    void addRelEntry(uint32_t offset);
    void addEsrEntry(const std::string& symbol, uint32_t offset);
    void addEsdEntry(const std::string& symbol, uint32_t offset);
    
    // Pseudo command processing
    void processImportCommand(const ImportCommand& importCmd, uint32_t offset);
    void processExportCommand(const ExportCommand& exportCmd, uint32_t offset);
    
    // Batch processing
    void processPseudoCommands(const std::vector<std::unique_ptr<PseudoCommand>>& commands);
    
    // Entry access
    const std::vector<std::unique_ptr<Entry>>& getRelEntries() const;
    const std::vector<std::unique_ptr<Entry>>& getEsrEntries() const;
    const std::vector<std::unique_ptr<Entry>>& getEsdEntries() const;
    std::vector<const Entry*> getAllEntries() const;
    
    // Entry information
    size_t getRelEntryCount() const;
    size_t getEsrEntryCount() const;
    size_t getEsdEntryCount() const;
    size_t getTotalEntryCount() const;
    size_t getTotalSize() const;
    
    // Symbol management
    void addSymbolReference(const std::string& symbol, uint32_t offset);
    void addSymbolDefinition(const std::string& symbol, uint32_t offset);
    bool hasSymbolReference(const std::string& symbol) const;
    bool hasSymbolDefinition(const std::string& symbol) const;
    uint32_t getSymbolOffset(const std::string& symbol) const;
    
    // Serialization
    std::vector<uint8_t> serializeAllEntries() const;
    std::vector<uint8_t> serializeRelEntries() const;
    std::vector<uint8_t> serializeEsrEntries() const;
    std::vector<uint8_t> serializeEsdEntries() const;
    
    // Analysis and debugging
    void printEntrySummary() const;
    void printDetailedEntries() const;
    void clearAllEntries();
    
    // Validation
    bool validateEntries() const;
    std::vector<std::string> getValidationErrors() const;
    
private:
    // Entry storage
    std::vector<std::unique_ptr<Entry>> relEntries;
    std::vector<std::unique_ptr<Entry>> esrEntries;
    std::vector<std::unique_ptr<Entry>> esdEntries;
    
    // Symbol tracking
    std::map<std::string, uint32_t> symbolReferences;  // Imported symbols
    std::map<std::string, uint32_t> symbolDefinitions; // Exported symbols
    
    // Helper methods
    void addEntry(std::unique_ptr<Entry> entry);
    void updateAllEntries();
    bool isDuplicateEntry(const Entry& entry) const;
};

#endif // ENTRY_MANAGER_H
