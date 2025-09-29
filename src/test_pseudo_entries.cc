#include <iostream>
#include <memory>
#include "scanner.h"
#include "pseudoCommand.h"
#include "entry.h"
#include "entryFactory.h"
#include "entryManager.h"

// ============================================================================
// PSEUDO COMMAND AND ENTRY SYSTEM TEST PROGRAM
// ============================================================================
// Demonstrates the new pseudo command and entry system

void testScannerTokens() {
    std::cout << "\n=== Testing Scanner Tokens ===" << std::endl;
    
    // Test .import token
    std::string importLine = ".import foo";
    std::vector<Token> importTokens = scan(importLine);
    
    std::cout << "Import line tokens:" << std::endl;
    for (const auto& token : importTokens) {
        std::cout << "  " << token << std::endl;
    }
    
    // Test .export token
    std::string exportLine = ".export bar";
    std::vector<Token> exportTokens = scan(exportLine);
    
    std::cout << "Export line tokens:" << std::endl;
    for (const auto& token : exportTokens) {
        std::cout << "  " << token << std::endl;
    }
}

void testPseudoCommands() {
    std::cout << "\n=== Testing Pseudo Commands ===" << std::endl;
    
    // Create import command
    ImportCommand importCmd("foo");
    std::cout << "Import Command: " << importCmd.getDescription() << std::endl;
    importCmd.processCommand();
    
    // Create export command
    ExportCommand exportCmd("bar");
    std::cout << "Export Command: " << exportCmd.getDescription() << std::endl;
    exportCmd.processCommand();
}

void testEntries() {
    std::cout << "\n=== Testing MERL Entries ===" << std::endl;
    
    // Create REL entry
    auto relEntry = EntryFactory::createRelEntry(0x1000);
    std::cout << "REL Entry: " << relEntry->getDescription() << std::endl;
    std::cout << "Size: " << relEntry->getSize() << " bytes" << std::endl;
    
    // Create ESR entry
    auto esrEntry = EntryFactory::createEsrEntry("foo", 0x2000);
    std::cout << "ESR Entry: " << esrEntry->getDescription() << std::endl;
    std::cout << "Size: " << esrEntry->getSize() << " bytes" << std::endl;
    
    // Create ESD entry
    auto esdEntry = EntryFactory::createEsdEntry("bar", 0x3000);
    std::cout << "ESD Entry: " << esdEntry->getDescription() << std::endl;
    std::cout << "Size: " << esdEntry->getSize() << " bytes" << std::endl;
}

void testEntryManager() {
    std::cout << "\n=== Testing Entry Manager ===" << std::endl;
    
    EntryManager manager;
    
    // Add some entries
    manager.addRelEntry(0x1000);
    manager.addEsrEntry("foo", 0x2000);
    manager.addEsdEntry("bar", 0x3000);
    
    // Print summary
    manager.printEntrySummary();
    
    // Print detailed entries
    manager.printDetailedEntries();
    
    // Test serialization
    auto serializedData = manager.serializeAllEntries();
    std::cout << "Serialized data size: " << serializedData.size() << " bytes" << std::endl;
    
    // Test validation
    bool isValid = manager.validateEntries();
    std::cout << "Entries valid: " << (isValid ? "Yes" : "No") << std::endl;
}

void testPseudoCommandToEntry() {
    std::cout << "\n=== Testing Pseudo Command to Entry Conversion ===" << std::endl;
    
    EntryManager manager;
    
    // Create pseudo commands
    ImportCommand importCmd("external_func");
    ExportCommand exportCmd("my_function");
    
    // Process commands through manager
    manager.processImportCommand(importCmd, 0x4000);
    manager.processExportCommand(exportCmd, 0x5000);
    
    // Show results
    manager.printEntrySummary();
    manager.printDetailedEntries();
}

void testBatchEntryCreation() {
    std::cout << "\n=== Testing Batch Entry Creation ===" << std::endl;
    
    // Create multiple entries at once
    std::vector<uint32_t> relOffsets = {0x1000, 0x1004, 0x1008};
    auto relEntries = EntryFactory::createRelEntries(relOffsets);
    
    std::vector<std::pair<std::string, uint32_t>> esrSymbols = {
        {"func1", 0x2000},
        {"func2", 0x2004}
    };
    auto esrEntries = EntryFactory::createEsrEntries(esrSymbols);
    
    std::vector<std::pair<std::string, uint32_t>> esdSymbols = {
        {"main", 0x3000},
        {"helper", 0x3004}
    };
    auto esdEntries = EntryFactory::createEsdEntries(esdSymbols);
    
    // Combine all entries
    std::vector<std::unique_ptr<Entry>> allEntries;
    allEntries.insert(allEntries.end(), 
                     std::make_move_iterator(relEntries.begin()),
                     std::make_move_iterator(relEntries.end()));
    allEntries.insert(allEntries.end(),
                     std::make_move_iterator(esrEntries.begin()),
                     std::make_move_iterator(esrEntries.end()));
    allEntries.insert(allEntries.end(),
                     std::make_move_iterator(esdEntries.begin()),
                     std::make_move_iterator(esdEntries.end()));
    
    // Serialize all entries
    auto serializedData = EntryFactory::serializeEntries(allEntries);
    std::cout << "Batch created " << allEntries.size() << " entries" << std::endl;
    std::cout << "Total serialized size: " << serializedData.size() << " bytes" << std::endl;
}

int main() {
    std::cout << "=== PSEUDO COMMAND AND ENTRY SYSTEM TEST PROGRAM ===" << std::endl;
    
    testScannerTokens();
    testPseudoCommands();
    testEntries();
    testEntryManager();
    testPseudoCommandToEntry();
    testBatchEntryCreation();
    
    std::cout << "\n=== All tests completed ===" << std::endl;
    return 0;
}
