#include "entryFactory.h"
#include <iostream>

// ============================================================================
// ENTRY FACTORY IMPLEMENTATION
// ============================================================================

std::unique_ptr<RelEntry> EntryFactory::createRelEntry(uint32_t offset) {
    return std::make_unique<RelEntry>(offset);
}

std::unique_ptr<EsrEntry> EntryFactory::createEsrEntry(const std::string& symbol, uint32_t offset) {
    return std::make_unique<EsrEntry>(symbol, offset);
}

std::unique_ptr<EsdEntry> EntryFactory::createEsdEntry(const std::string& symbol, uint32_t offset) {
    return std::make_unique<EsdEntry>(symbol, offset);
}

std::unique_ptr<EsrEntry> EntryFactory::createFromImportCommand(const ImportCommand& importCmd, uint32_t offset) {
    return std::make_unique<EsrEntry>(importCmd.getSymbolName(), offset);
}

std::unique_ptr<EsdEntry> EntryFactory::createFromExportCommand(const ExportCommand& exportCmd, uint32_t offset) {
    return std::make_unique<EsdEntry>(exportCmd.getSymbolName(), offset);
}

std::vector<std::unique_ptr<Entry>> EntryFactory::createRelEntries(const std::vector<uint32_t>& offsets) {
    std::vector<std::unique_ptr<Entry>> entries;
    for (uint32_t offset : offsets) {
        entries.push_back(createRelEntry(offset));
    }
    return entries;
}

std::vector<std::unique_ptr<Entry>> EntryFactory::createEsrEntries(const std::vector<std::pair<std::string, uint32_t>>& symbols) {
    std::vector<std::unique_ptr<Entry>> entries;
    for (const auto& symbol : symbols) {
        entries.push_back(createEsrEntry(symbol.first, symbol.second));
    }
    return entries;
}

std::vector<std::unique_ptr<Entry>> EntryFactory::createEsdEntries(const std::vector<std::pair<std::string, uint32_t>>& symbols) {
    std::vector<std::unique_ptr<Entry>> entries;
    for (const auto& symbol : symbols) {
        entries.push_back(createEsdEntry(symbol.first, symbol.second));
    }
    return entries;
}

std::vector<uint8_t> EntryFactory::serializeEntries(const std::vector<std::unique_ptr<Entry>>& entries) {
    std::vector<uint8_t> data;
    
    for (const auto& entry : entries) {
        auto entryData = entry->serialize();
        data.insert(data.end(), entryData.begin(), entryData.end());
    }
    
    return data;
}

size_t EntryFactory::calculateTotalSize(const std::vector<std::unique_ptr<Entry>>& entries) {
    size_t totalSize = 0;
    for (const auto& entry : entries) {
        totalSize += entry->getSize();
    }
    return totalSize;
}

void EntryFactory::addEntryToData(std::vector<uint8_t>& data, const Entry& entry) {
    auto entryData = entry.serialize();
    data.insert(data.end(), entryData.begin(), entryData.end());
}
