#include <iostream>
#include <vector>
#include "scanner.h"

int main() {
    std::string line;
    while (std::getline(std::cin, line)) {
        std::vector<Token> tokens = scan(line);
        std::cout << "Line: " << line << std::endl;
        for (const auto& token : tokens) {
            std::cout << "  " << token << std::endl;
        }
        std::cout << std::endl;
    }
    return 0;
}
