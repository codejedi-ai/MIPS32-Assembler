#ifndef ENTRY_FACTORY_H
#define ENTRY_FACTORY_H

#include "entry.h"
#include "pseudoCommand.h"
#include <memory>
#include <vector>

// ============================================================================
// ENTRY FACTORY CLASS
// ============================================================================
// Factory pattern for creating MERL entries from pseudo commands

class EntryFactory {
public:
    // Factory methods for creating entries
    static std::unique_ptr<RelEntry> createRelEntry(uint32_t offset);
    static std::unique_ptr<EsrEntry> createEsrEntry(const std::string& symbol, uint32_t offset);
    static std::unique_ptr<EsdEntry> createEsdEntry(const std::string& symbol, uint32_t offset);
    
    // Factory methods from pseudo commands
    static std::unique_ptr<EsrEntry> createFromImportCommand(const ImportCommand& importCmd, uint32_t offset);
    static std::unique_ptr<EsdEntry> createFromExportCommand(const ExportCommand& exportCmd, uint32_t offset);
    
    // Batch creation methods
    static std::vector<std::unique_ptr<Entry>> createRelEntries(const std::vector<uint32_t>& offsets);
    static std::vector<std::unique_ptr<Entry>> createEsrEntries(const std::vector<std::pair<std::string, uint32_t>>& symbols);
    static std::vector<std::unique_ptr<Entry>> createEsdEntries(const std::vector<std::pair<std::string, uint32_t>>& symbols);
    
    // Utility methods
    static std::vector<uint8_t> serializeEntries(const std::vector<std::unique_ptr<Entry>>& entries);
    static size_t calculateTotalSize(const std::vector<std::unique_ptr<Entry>>& entries);
    
private:
    // Helper methods
    static void addEntryToData(std::vector<uint8_t>& data, const Entry& entry);
};

#endif // ENTRY_FACTORY_H
