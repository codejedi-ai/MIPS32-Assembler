#include <iostream>
#include <fstream>
#include "scannerWrapper.h"

int main() {
    std::cout << "Testing scanner wrapper with test_rel.asm" << std::endl;
    
    ScannerWrapper scanner;
    FileType fileType = scanner.scanInput("test_rel.asm");
    
    std::cout << "File Type: " << (fileType == FileType::ASSEMBLY ? "Assembly" : "MERL Module") << std::endl;
    scanner.printAnalysis();
    
    return 0;
}
