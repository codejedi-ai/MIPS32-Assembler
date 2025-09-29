#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <memory>
#include "scannerWrapper.h"
#include "assemblerFactory.h"
#include "entryManager.h"

// ============================================================================
// COMPREHENSIVE MERL FILE GENERATION TEST SUITE
// ============================================================================
// Tests the complete system: scanner, assembler factory, entry management,
// automatic REL entry generation, and debug functionality

class MerlTestSuite {
public:
    MerlTestSuite() : testCount(0), passCount(0) {}
    
    void runAllTests() {
        std::cout << "=== COMPREHENSIVE MERL FILE GENERATION TEST SUITE ===" << std::endl;
        
        testBasicMerlGeneration();
        testRelEntryGeneration();
        testImportExportHandling();
        testDebugMode();
        testComplexMerlModule();
        testEntryManagerIntegration();
        testFileTypeDetection();
        
        printSummary();
    }
    
private:
    int testCount;
    int passCount;
    
    void testBasicMerlGeneration() {
        std::cout << "\n=== Test 1: Basic MERL File Generation ===" << std::endl;
        
        std::string testCode = R"(
.import external_func
.export main
lis $28
.word main
add $1, $2, $3
.word loop
sub $4, $5, $6
loop:
.word external_func
mult $7, $8
)";
        
        if (runMerlTest("basic_merl", testCode, true)) {
            passTest("Basic MERL generation");
        } else {
            failTest("Basic MERL generation");
        }
    }
    
    void testRelEntryGeneration() {
        std::cout << "\n=== Test 2: Automatic REL Entry Generation ===" << std::endl;
        
        std::string testCode = R"(
.word label1
.word label2
.word label3
.word 0x1234
.word label4
label1:
label2:
label3:
label4:
)";
        
        if (runMerlTest("rel_entries", testCode, false)) {
            passTest("REL entry generation");
        } else {
            failTest("REL entry generation");
        }
    }
    
    void testImportExportHandling() {
        std::cout << "\n=== Test 3: Import/Export Handling ===" << std::endl;
        
        std::string testCode = R"(
.import func1
.import func2
.export main
.export helper
.word func1
.word func2
main:
.word main
helper:
.word helper
)";
        
        if (runMerlTest("import_export", testCode, true)) {
            passTest("Import/Export handling");
        } else {
            failTest("Import/Export handling");
        }
    }
    
    void testDebugMode() {
        std::cout << "\n=== Test 4: Debug Mode Functionality ===" << std::endl;
        
        std::string testCode = R"(
.import debug_func
.export debug_main
lis $28
.word debug_main
.word debug_func
debug_main:
)";
        
        if (runMerlTest("debug_mode", testCode, true, true)) {
            passTest("Debug mode functionality");
        } else {
            failTest("Debug mode functionality");
        }
    }
    
    void testComplexMerlModule() {
        std::cout << "\n=== Test 5: Complex MERL Module ===" << std::endl;
        
        std::string testCode = R"(
.import printf
.import malloc
.import free
.export main
.export init
.export cleanup

lis $28
.word main
.word init
.word cleanup

main:
.word printf
.word malloc
.word free
.word main

init:
.word init

cleanup:
.word cleanup
.word free
)";
        
        if (runMerlTest("complex_module", testCode, true)) {
            passTest("Complex MERL module");
        } else {
            failTest("Complex MERL module");
        }
    }
    
    void testEntryManagerIntegration() {
        std::cout << "\n=== Test 6: EntryManager Integration ===" << std::endl;
        
        EntryManager manager;
        
        // Test REL entries
        manager.addRelEntry(0x1000);
        manager.addRelEntry(0x1004);
        manager.addRelEntry(0x1008);
        
        // Test ESR entries
        manager.addEsrEntry("func1", 0x2000);
        manager.addEsrEntry("func2", 0x2004);
        
        // Test ESD entries
        manager.addEsdEntry("main", 0x3000);
        manager.addEsdEntry("helper", 0x3004);
        
        manager.printEntrySummary();
        
        if (manager.getTotalEntryCount() == 7) {
            passTest("EntryManager integration");
        } else {
            failTest("EntryManager integration");
        }
    }
    
    void testFileTypeDetection() {
        std::cout << "\n=== Test 7: File Type Detection ===" << std::endl;
        
        // Test assembly file (no imports/exports)
        std::string assemblyCode = R"(
add $1, $2, $3
sub $4, $5, $6
mult $7, $8
)";
        
        ScannerWrapper scanner1;
        std::istringstream iss1(assemblyCode);
        FileType type1 = scanner1.scanInput(iss1);
        
        // Test MERL module (with imports/exports)
        std::string merlCode = R"(
.import func1
.export main
add $1, $2, $3
)";
        
        ScannerWrapper scanner2;
        std::istringstream iss2(merlCode);
        FileType type2 = scanner2.scanInput(iss2);
        
        if (type1 == FileType::ASSEMBLY && type2 == FileType::MERL_MODULE) {
            passTest("File type detection");
        } else {
            failTest("File type detection");
        }
    }
    
    bool runMerlTest(const std::string& testName, const std::string& code, bool expectMerlModule, bool debugMode = false) {
        std::cout << "Running test: " << testName << std::endl;
        
        // Create test file
        std::string filename = "tests/" + testName + ".asm";
        std::ofstream file(filename);
        if (!file.is_open()) {
            std::cerr << "Failed to create test file: " << filename << std::endl;
            return false;
        }
        file << code;
        file.close();
        
        // Analyze file
        ScannerWrapper scanner = AssemblerFactory::analyzeInput(filename);
        FileType detectedType = scanner.getFileType();
        
        std::cout << "  Detected file type: " << (detectedType == FileType::ASSEMBLY ? "Assembly" : "MERL Module") << std::endl;
        std::cout << "  Expected file type: " << (expectMerlModule ? "MERL Module" : "Assembly") << std::endl;
        
        if (detectedType != (expectMerlModule ? FileType::MERL_MODULE : FileType::ASSEMBLY)) {
            std::cerr << "  File type detection failed!" << std::endl;
            return false;
        }
        
        // Create assembler
        std::unique_ptr<BaseAssembler> assembler = AssemblerFactory::createAssembler(scanner);
        if (!assembler) {
            std::cerr << "  Failed to create assembler!" << std::endl;
            return false;
        }
        
        // Set debug mode if requested
        if (debugMode) {
            assembler->setDebugMode(true);
            std::cout << "  Debug mode enabled" << std::endl;
        }
        
        // Assemble
        int result = assembler->assemble(filename);
        if (result != 0) {
            std::cerr << "  Assembly failed with error code: " << result << std::endl;
            return false;
        }
        
        // Print analysis
        assembler->printAnalysis();
        
        // Output to MERL file
        std::string outputFile = "tests/" + testName + ".merl";
        assembler->outputToFile(outputFile);
        
        std::cout << "  Test completed successfully!" << std::endl;
        return true;
    }
    
    void passTest(const std::string& testName) {
        testCount++;
        passCount++;
        std::cout << "✅ PASS: " << testName << std::endl;
    }
    
    void failTest(const std::string& testName) {
        testCount++;
        std::cout << "❌ FAIL: " << testName << std::endl;
    }
    
    void printSummary() {
        std::cout << "\n=== TEST SUMMARY ===" << std::endl;
        std::cout << "Total Tests: " << testCount << std::endl;
        std::cout << "Passed: " << passCount << std::endl;
        std::cout << "Failed: " << (testCount - passCount) << std::endl;
        std::cout << "Success Rate: " << (testCount > 0 ? (passCount * 100 / testCount) : 0) << "%" << std::endl;
        
        if (passCount == testCount) {
            std::cout << "🎉 ALL TESTS PASSED! 🎉" << std::endl;
        } else {
            std::cout << "⚠️  Some tests failed. Check the output above." << std::endl;
        }
    }
};

int main() {
    MerlTestSuite suite;
    suite.runAllTests();
    return 0;
}
