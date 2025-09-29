#include "entryManager.h"
#include <iostream>
#include <algorithm>

// ============================================================================
// ENTRY MANAGER IMPLEMENTATION
// ============================================================================

EntryManager::EntryManager() {
    clearAllEntries();
}

void EntryManager::addRelEntry(uint32_t offset) {
    auto entry = EntryFactory::createRelEntry(offset);
    addEntry(std::move(entry));
}

void EntryManager::addEsrEntry(const std::string& symbol, uint32_t offset) {
    auto entry = EntryFactory::createEsrEntry(symbol, offset);
    addEntry(std::move(entry));
    symbolReferences[symbol] = offset;
}

void EntryManager::addEsdEntry(const std::string& symbol, uint32_t offset) {
    auto entry = EntryFactory::createEsdEntry(symbol, offset);
    addEntry(std::move(entry));
    symbolDefinitions[symbol] = offset;
}

void EntryManager::processImportCommand(const ImportCommand& importCmd, uint32_t offset) {
    std::cout << "Processing import command: " << importCmd.getDescription() << std::endl;
    addEsrEntry(importCmd.getSymbolName(), offset);
}

void EntryManager::processExportCommand(const ExportCommand& exportCmd, uint32_t offset) {
    std::cout << "Processing export command: " << exportCmd.getDescription() << std::endl;
    addEsdEntry(exportCmd.getSymbolName(), offset);
}

void EntryManager::processPseudoCommands(const std::vector<std::unique_ptr<PseudoCommand>>& commands) {
    uint32_t currentOffset = 0; // This would be determined by the assembler
    
    for (const auto& command : commands) {
        if (command->getCommandType() == "import") {
            auto importCmd = dynamic_cast<const ImportCommand*>(command.get());
            if (importCmd) {
                processImportCommand(*importCmd, currentOffset);
            }
        } else if (command->getCommandType() == "export") {
            auto exportCmd = dynamic_cast<const ExportCommand*>(command.get());
            if (exportCmd) {
                processExportCommand(*exportCmd, currentOffset);
            }
        }
        currentOffset += 4; // Assume each command takes 4 bytes
    }
}

const std::vector<std::unique_ptr<Entry>>& EntryManager::getRelEntries() const {
    return relEntries;
}

const std::vector<std::unique_ptr<Entry>>& EntryManager::getEsrEntries() const {
    return esrEntries;
}

const std::vector<std::unique_ptr<Entry>>& EntryManager::getEsdEntries() const {
    return esdEntries;
}

std::vector<const Entry*> EntryManager::getAllEntries() const {
    std::vector<const Entry*> allEntriesPtr;
    
    // Add all entries in order: REL, ESR, ESD
    for (const auto& entry : relEntries) {
        allEntriesPtr.push_back(entry.get());
    }
    
    for (const auto& entry : esrEntries) {
        allEntriesPtr.push_back(entry.get());
    }
    
    for (const auto& entry : esdEntries) {
        allEntriesPtr.push_back(entry.get());
    }
    
    return allEntriesPtr;
}

size_t EntryManager::getRelEntryCount() const {
    return relEntries.size();
}

size_t EntryManager::getEsrEntryCount() const {
    return esrEntries.size();
}

size_t EntryManager::getEsdEntryCount() const {
    return esdEntries.size();
}

size_t EntryManager::getTotalEntryCount() const {
    return relEntries.size() + esrEntries.size() + esdEntries.size();
}

size_t EntryManager::getTotalSize() const {
    size_t totalSize = 0;
    for (const auto& entry : relEntries) {
        totalSize += entry->getSize();
    }
    for (const auto& entry : esrEntries) {
        totalSize += entry->getSize();
    }
    for (const auto& entry : esdEntries) {
        totalSize += entry->getSize();
    }
    return totalSize;
}

void EntryManager::addSymbolReference(const std::string& symbol, uint32_t offset) {
    symbolReferences[symbol] = offset;
}

void EntryManager::addSymbolDefinition(const std::string& symbol, uint32_t offset) {
    symbolDefinitions[symbol] = offset;
}

bool EntryManager::hasSymbolReference(const std::string& symbol) const {
    return symbolReferences.find(symbol) != symbolReferences.end();
}

bool EntryManager::hasSymbolDefinition(const std::string& symbol) const {
    return symbolDefinitions.find(symbol) != symbolDefinitions.end();
}

uint32_t EntryManager::getSymbolOffset(const std::string& symbol) const {
    auto it = symbolReferences.find(symbol);
    if (it != symbolReferences.end()) {
        return it->second;
    }
    
    it = symbolDefinitions.find(symbol);
    if (it != symbolDefinitions.end()) {
        return it->second;
    }
    
    return 0; // Symbol not found
}

std::vector<uint8_t> EntryManager::serializeAllEntries() const {
    std::vector<uint8_t> data;
    
    // Serialize REL entries
    for (const auto& entry : relEntries) {
        auto entryData = entry->serialize();
        data.insert(data.end(), entryData.begin(), entryData.end());
    }
    
    // Serialize ESR entries
    for (const auto& entry : esrEntries) {
        auto entryData = entry->serialize();
        data.insert(data.end(), entryData.begin(), entryData.end());
    }
    
    // Serialize ESD entries
    for (const auto& entry : esdEntries) {
        auto entryData = entry->serialize();
        data.insert(data.end(), entryData.begin(), entryData.end());
    }
    
    return data;
}

std::vector<uint8_t> EntryManager::serializeRelEntries() const {
    return EntryFactory::serializeEntries(relEntries);
}

std::vector<uint8_t> EntryManager::serializeEsrEntries() const {
    return EntryFactory::serializeEntries(esrEntries);
}

std::vector<uint8_t> EntryManager::serializeEsdEntries() const {
    return EntryFactory::serializeEntries(esdEntries);
}

void EntryManager::printEntrySummary() const {
    std::cout << "=== ENTRY MANAGER SUMMARY ===" << std::endl;
    std::cout << "REL Entries: " << getRelEntryCount() << std::endl;
    std::cout << "ESR Entries: " << getEsrEntryCount() << std::endl;
    std::cout << "ESD Entries: " << getEsdEntryCount() << std::endl;
    std::cout << "Total Entries: " << getTotalEntryCount() << std::endl;
    std::cout << "Total Size: " << getTotalSize() << " bytes" << std::endl;
    std::cout << "=============================" << std::endl;
}

void EntryManager::printDetailedEntries() const {
    std::cout << "=== DETAILED ENTRIES ===" << std::endl;
    
    for (const auto& entry : relEntries) {
        std::cout << entry->getDescription() << std::endl;
    }
    
    for (const auto& entry : esrEntries) {
        std::cout << entry->getDescription() << std::endl;
    }
    
    for (const auto& entry : esdEntries) {
        std::cout << entry->getDescription() << std::endl;
    }
    
    std::cout << "========================" << std::endl;
}

void EntryManager::clearAllEntries() {
    relEntries.clear();
    esrEntries.clear();
    esdEntries.clear();
    symbolReferences.clear();
    symbolDefinitions.clear();
}

bool EntryManager::validateEntries() const {
    // Basic validation - check for duplicate symbols
    for (const auto& ref : symbolReferences) {
        if (symbolDefinitions.find(ref.first) != symbolDefinitions.end()) {
            return false; // Symbol both imported and exported
        }
    }
    return true;
}

std::vector<std::string> EntryManager::getValidationErrors() const {
    std::vector<std::string> errors;
    
    // Check for symbols that are both imported and exported
    for (const auto& ref : symbolReferences) {
        if (symbolDefinitions.find(ref.first) != symbolDefinitions.end()) {
            errors.push_back("Symbol '" + ref.first + "' is both imported and exported");
        }
    }
    
    return errors;
}

void EntryManager::addEntry(std::unique_ptr<Entry> entry) {
    if (!entry) return;
    
    // Add to appropriate category
    switch (entry->getType()) {
        case Entry::REL:
            relEntries.push_back(std::move(entry));
            break;
        case Entry::ESR:
            esrEntries.push_back(std::move(entry));
            break;
        case Entry::ESD:
            esdEntries.push_back(std::move(entry));
            break;
    }
    
    // No need to update allEntries anymore
}

void EntryManager::updateAllEntries() {
    // This method is no longer needed since we don't maintain a combined allEntries vector
}

bool EntryManager::isDuplicateEntry(const Entry& entry) const {
    // Check if entry already exists in the appropriate category
    switch (entry.getType()) {
        case Entry::REL:
            for (const auto& existingEntry : relEntries) {
                if (existingEntry->getType() == entry.getType()) {
                    return true; // Found duplicate
                }
            }
            break;
        case Entry::ESR:
            for (const auto& existingEntry : esrEntries) {
                if (existingEntry->getType() == entry.getType()) {
                    return true; // Found duplicate
                }
            }
            break;
        case Entry::ESD:
            for (const auto& existingEntry : esdEntries) {
                if (existingEntry->getType() == entry.getType()) {
                    return true; // Found duplicate
                }
            }
            break;
    }
    return false; // No duplicate found
}
