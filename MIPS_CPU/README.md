# MIPS CPU Simulator

This folder contains a complete MIPS CPU simulator implementation that can execute MIPS machine code programs.

## Features

### CPU Components
- **RegisterFile**: 32 MIPS registers with $0 read-only constraint
- **SpecialRegisters**: HI/LO registers for multiplication/division results
- **Memory**: Word-addressable memory with stdin/stdout handling

### Instruction Support
- **R-Type Instructions**: `add`, `sub`, `mult`, `div`, `mfhi`, `mflo`, `lis`
- **I-Type Instructions**: `addi`, `beq`, `bne`
- **J-Type Instructions**: `j`

### Advanced Features
- **Instruction Factory**: Creates and decodes MIPS instructions
- **Proper MIPS Encoding**: Correct binary instruction format
- **CPU Execution**: Complete fetch-decode-execute cycle
- **Debug Capabilities**: State inspection and memory viewing

## Directory Structure

```
MIPS_CPU/
├── include/
│   └── mipsCPU.h          # Complete CPU simulator header
├── src/
│   ├── cpu_test.cc        # Basic CPU test
│   ├── cpu_test_comprehensive.cc  # Comprehensive CPU test
│   ├── debug_instructions.cc      # Instruction debugging
│   ├── test_encoding.cc           # Encoding verification
│   └── simple_cpu_test.cc         # Simple CPU test
├── build/                 # Build artifacts (created by make)
└── Makefile              # Build system
```

## Usage

### Building and Running Tests

```bash
# Run comprehensive CPU test (default)
make

# Run specific tests
make cpu-test                    # Basic CPU test
make cpu-test-comprehensive      # Comprehensive CPU test
make simple-cpu-test            # Simple CPU test
make debug-instructions         # Debug instruction encoding
make test-encoding             # Test instruction encoding

# Clean build files
make clean

# Show help
make help
```

### Example Program

```cpp
#include "mipsCPU.h"

int main() {
    // Create CPU with 1MB memory
    MipsCPU cpu(1024 * 1024 / 4);
    
    // Create program
    std::vector<int32_t> program;
    
    // addi $1, $0, 5
    auto addi1 = InstructionFactory::createAddi(1, 0, 5);
    program.push_back(addi1->getEncodedValue());
    
    // addi $2, $0, 3
    auto addi2 = InstructionFactory::createAddi(2, 0, 3);
    program.push_back(addi2->getEncodedValue());
    
    // add $3, $1, $2
    auto addInstr = InstructionFactory::createAdd(3, 1, 2);
    program.push_back(addInstr->getEncodedValue());
    
    // Load and run program
    cpu.loadProgram(program);
    cpu.run();
    
    // Check results
    std::cout << "$1 = " << cpu.getRegister(1) << std::endl;  // 5
    std::cout << "$2 = " << cpu.getRegister(2) << std::endl;  // 3
    std::cout << "$3 = " << cpu.getRegister(3) << std::endl;  // 8
    
    return 0;
}
```

## Test Results

The comprehensive test demonstrates all instruction types working correctly:

```
=== Verification ===
$1 = 5 (expected: 5)      # addi $1, $0, 5
$2 = 3 (expected: 3)      # addi $2, $0, 3
$3 = 8 (expected: 8)      # add $3, $1, $2 (5+3)
$4 = 15 (expected: 15)    # mflo $4 (5*3)
$5 = -7 (expected: -7)    # sub $5, $3, $4 (8-15)
HI = 0 (expected: 0)      # multiplication result
LO = 15 (expected: 15)    # multiplication result
```

## Integration with MIPS Assembler

This CPU simulator works seamlessly with the MIPS assembler in the parent directory:

1. **Assemble** MIPS assembly code using the assembler
2. **Load** the generated machine code into the CPU simulator
3. **Execute** the program and inspect results

The CPU simulator provides a complete MIPS execution environment for testing assembled programs.
