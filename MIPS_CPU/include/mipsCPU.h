#pragma once
#include <cstdint>
#include <vector>
#include <string>
#include <memory>
#include <stdexcept>
#include <cstdio>

// ====================
// CPU State Components
// ====================

class RegisterFile {
private:
    int32_t registers[32];
    
public:
    RegisterFile() {
        for (int i = 0; i < 32; i++) {
            registers[i] = 0;
        }
    }
    
    int32_t read(uint8_t reg) const {
        if (reg == 0) return 0; // $0 always returns 0
        return registers[reg];
    }
    
    void write(uint8_t reg, int32_t value) {
        if (reg != 0) { // $0 is read-only
            registers[reg] = value;
        }
    }
    
    // Debug methods
    void printRegisters() const {
        for (int i = 0; i < 32; i++) {
            printf("$%d = %d\n", i, registers[i]);
        }
    }
};

class SpecialRegisters {
private:
    int32_t hi;
    int32_t lo;
    
public:
    SpecialRegisters() : hi(0), lo(0) {}
    
    int32_t getHi() const { return hi; }
    int32_t getLo() const { return lo; }
    void setHi(int32_t value) { hi = value; }
    void setLo(int32_t value) { lo = value; }
    void setHiLo(int64_t result) {
        hi = (result >> 32) & 0xFFFFFFFF;
        lo = result & 0xFFFFFFFF;
    }
    
    // Debug methods
    void printSpecialRegisters() const {
        printf("HI = %d\n", hi);
        printf("LO = %d\n", lo);
    }
};

class Memory {
private:
    std::vector<int32_t> memory;
    static const uint32_t STDIN_ADDR = 0xffff0004;
    static const uint32_t STDOUT_ADDR = 0xffff000c;
    
public:
    Memory(size_t size) : memory(size, 0) {}
    
    int32_t loadWord(uint32_t address) {
        if (address == STDIN_ADDR) {
            // Handle stdin
            int ch = getchar();
            return ch;
        }
        
        // Convert byte address to word index
        uint32_t index = address / 4;
        if (index >= memory.size()) {
            throw std::runtime_error("Memory access out of bounds");
        }
        return memory[index];
    }
    
    void storeWord(uint32_t address, int32_t value) {
        if (address == STDOUT_ADDR) {
            // Handle stdout - print least significant byte
            putchar(value & 0xFF);
            return;
        }
        
        // Convert byte address to word index
        uint32_t index = address / 4;
        if (index >= memory.size()) {
            throw std::runtime_error("Memory access out of bounds");
        }
        memory[index] = value;
    }
    
    void loadProgram(const std::vector<int32_t>& program, uint32_t startAddress = 0) {
        uint32_t startIndex = startAddress / 4;
        for (size_t i = 0; i < program.size(); i++) {
            memory[startIndex + i] = program[i];
        }
    }
    
    // Debug methods
    void printMemory(uint32_t startAddr, uint32_t endAddr) const {
        uint32_t startIndex = startAddr / 4;
        uint32_t endIndex = endAddr / 4;
        
        for (uint32_t i = startIndex; i <= endIndex && i < memory.size(); i++) {
            printf("Memory[0x%08X] = 0x%08X (%d)\n", i * 4, memory[i], memory[i]);
        }
    }
};

// ====================
// Instruction Decoder
// ====================

struct DecodedInstruction {
    uint8_t opcode;
    uint8_t rs;
    uint8_t rt;
    uint8_t rd;
    uint8_t shamt;
    uint8_t funct;
    int16_t immediate;
    
    DecodedInstruction(int32_t instruction) {
        opcode = (instruction >> 26) & 0x3F;
        rs = (instruction >> 21) & 0x1F;
        rt = (instruction >> 16) & 0x1F;
        rd = (instruction >> 11) & 0x1F;
        shamt = (instruction >> 6) & 0x1F;
        funct = instruction & 0x3F;
        immediate = instruction & 0xFFFF;
    }
};

// ====================
// Abstract Instruction Base
// ====================

class Instruction {
public:
    virtual ~Instruction() = default;
    virtual void execute(RegisterFile& regs, SpecialRegisters& special, 
                        Memory& mem, uint32_t& pc) = 0;
    virtual std::string getName() const = 0;
    virtual uint32_t getEncodedValue() const = 0;
};

// ====================
// R-Type Instructions
// ====================

class AddInstruction : public Instruction {
private:
    uint8_t rd, rs, rt;
    uint32_t encodedValue;
    
public:
    AddInstruction(uint8_t rd, uint8_t rs, uint8_t rt) 
        : rd(rd), rs(rs), rt(rt) {
        // R-type format: [opcode(6)] [rs(5)] [rt(5)] [rd(5)] [shamt(5)] [funct(6)]
        // add: opcode=0, funct=0x20
        encodedValue = (0 << 26) | (rs << 21) | (rt << 16) | (rd << 11) | (0 << 6) | 0x20;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory&, uint32_t&) override {
        int32_t result = regs.read(rs) + regs.read(rt);
        regs.write(rd, result);
    }
    
    std::string getName() const override { return "add"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class SubInstruction : public Instruction {
private:
    uint8_t rd, rs, rt;
    uint32_t encodedValue;
    
public:
    SubInstruction(uint8_t rd, uint8_t rs, uint8_t rt) 
        : rd(rd), rs(rs), rt(rt) {
        // sub: opcode=0, funct=0x22
        encodedValue = (0 << 26) | (rs << 21) | (rt << 16) | (rd << 11) | (0 << 6) | 0x22;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory&, uint32_t&) override {
        int32_t result = regs.read(rs) - regs.read(rt);
        regs.write(rd, result);
    }
    
    std::string getName() const override { return "sub"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class MultInstruction : public Instruction {
private:
    uint8_t rs, rt;
    bool isUnsigned;
    uint32_t encodedValue;
    
public:
    MultInstruction(uint8_t rs, uint8_t rt, bool isUnsigned = false) 
        : rs(rs), rt(rt), isUnsigned(isUnsigned) {
        // mult: opcode=0, funct=0x18 (signed) or 0x19 (unsigned)
        uint8_t funct = isUnsigned ? 0x19 : 0x18;
        encodedValue = (0 << 26) | (rs << 21) | (rt << 16) | (0 << 11) | (0 << 6) | funct;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters& special, Memory&, uint32_t&) override {
        if (isUnsigned) {
            uint64_t result = static_cast<uint64_t>(static_cast<uint32_t>(regs.read(rs))) * 
                             static_cast<uint64_t>(static_cast<uint32_t>(regs.read(rt)));
            special.setHiLo(result);
        } else {
            int64_t result = static_cast<int64_t>(regs.read(rs)) * 
                            static_cast<int64_t>(regs.read(rt));
            special.setHiLo(result);
        }
    }
    
    std::string getName() const override { return isUnsigned ? "multu" : "mult"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class DivInstruction : public Instruction {
private:
    uint8_t rs, rt;
    bool isUnsigned;
    uint32_t encodedValue;
    
public:
    DivInstruction(uint8_t rs, uint8_t rt, bool isUnsigned = false) 
        : rs(rs), rt(rt), isUnsigned(isUnsigned) {
        // div: opcode=0, funct=0x1A (signed) or 0x1B (unsigned)
        uint8_t funct = isUnsigned ? 0x1B : 0x1A;
        encodedValue = (0 << 26) | (rs << 21) | (rt << 16) | (0 << 11) | (0 << 6) | funct;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters& special, Memory&, uint32_t&) override {
        int32_t dividend = regs.read(rs);
        int32_t divisor = regs.read(rt);
        
        if (divisor == 0) {
            // Division by zero - set special registers to 0
            special.setHi(0);
            special.setLo(0);
        } else {
            if (isUnsigned) {
                uint32_t u_dividend = static_cast<uint32_t>(dividend);
                uint32_t u_divisor = static_cast<uint32_t>(divisor);
                special.setLo(u_dividend / u_divisor);
                special.setHi(u_dividend % u_divisor);
            } else {
                special.setLo(dividend / divisor);
                special.setHi(dividend % divisor);
            }
        }
    }
    
    std::string getName() const override { return isUnsigned ? "divu" : "div"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class MfhiInstruction : public Instruction {
private:
    uint8_t rd;
    uint32_t encodedValue;
    
public:
    MfhiInstruction(uint8_t rd) : rd(rd) {
        // mfhi: opcode=0, funct=0x10
        encodedValue = (0 << 26) | (0 << 21) | (0 << 16) | (rd << 11) | (0 << 6) | 0x10;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters& special, Memory&, uint32_t&) override {
        regs.write(rd, special.getHi());
    }
    
    std::string getName() const override { return "mfhi"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class MfloInstruction : public Instruction {
private:
    uint8_t rd;
    uint32_t encodedValue;
    
public:
    MfloInstruction(uint8_t rd) : rd(rd) {
        // mflo: opcode=0, funct=0x12
        encodedValue = (0 << 26) | (0 << 21) | (0 << 16) | (rd << 11) | (0 << 6) | 0x12;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters& special, Memory&, uint32_t&) override {
        regs.write(rd, special.getLo());
    }
    
    std::string getName() const override { return "mflo"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class LisInstruction : public Instruction {
private:
    uint8_t rd;
    uint32_t encodedValue;
    
public:
    LisInstruction(uint8_t rd) : rd(rd) {
        // lis: opcode=0, funct=0x14
        encodedValue = (0 << 26) | (0 << 21) | (0 << 16) | (rd << 11) | (0 << 6) | 0x14;
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory& mem, uint32_t& pc) override {
        int32_t value = mem.loadWord(pc);
        regs.write(rd, value);
        pc += 4;
    }
    
    std::string getName() const override { return "lis"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

// ====================
// I-Type Instructions
// ====================

class AddiInstruction : public Instruction {
private:
    uint8_t rt, rs;
    int16_t immediate;
    uint32_t encodedValue;
    
public:
    AddiInstruction(uint8_t rt, uint8_t rs, int16_t immediate) 
        : rt(rt), rs(rs), immediate(immediate) {
        // addi: opcode=0x08
        encodedValue = (0x08 << 26) | (rs << 21) | (rt << 16) | (immediate & 0xFFFF);
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory&, uint32_t&) override {
        int32_t result = regs.read(rs) + immediate;
        regs.write(rt, result);
    }
    
    std::string getName() const override { return "addi"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class BeqInstruction : public Instruction {
private:
    uint8_t rs, rt;
    int16_t offset;
    uint32_t encodedValue;
    
public:
    BeqInstruction(uint8_t rs, uint8_t rt, int16_t offset) 
        : rs(rs), rt(rt), offset(offset) {
        // beq: opcode=0x04
        encodedValue = (0x04 << 26) | (rs << 21) | (rt << 16) | (offset & 0xFFFF);
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory&, uint32_t& pc) override {
        if (regs.read(rs) == regs.read(rt)) {
            pc += offset * 4;
        }
    }
    
    std::string getName() const override { return "beq"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

class BneInstruction : public Instruction {
private:
    uint8_t rs, rt;
    int16_t offset;
    uint32_t encodedValue;
    
public:
    BneInstruction(uint8_t rs, uint8_t rt, int16_t offset) 
        : rs(rs), rt(rt), offset(offset) {
        // bne: opcode=0x05
        encodedValue = (0x05 << 26) | (rs << 21) | (rt << 16) | (offset & 0xFFFF);
    }
    
    void execute(RegisterFile& regs, SpecialRegisters&, Memory&, uint32_t& pc) override {
        if (regs.read(rs) != regs.read(rt)) {
            pc += offset * 4;
        }
    }
    
    std::string getName() const override { return "bne"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

// ====================
// J-Type Instructions
// ====================

class JInstruction : public Instruction {
private:
    uint32_t address;
    uint32_t encodedValue;
    
public:
    JInstruction(uint32_t address) : address(address) {
        // j: opcode=0x02
        encodedValue = (0x02 << 26) | (address & 0x03FFFFFF);
    }
    
    void execute(RegisterFile&, SpecialRegisters&, Memory&, uint32_t& pc) override {
        pc = address;
    }
    
    std::string getName() const override { return "j"; }
    uint32_t getEncodedValue() const override { return encodedValue; }
};

// ====================
// Instruction Factory
// ====================

class InstructionFactory {
public:
    static std::unique_ptr<Instruction> decode(int32_t word) {
        DecodedInstruction decoded(word);
        
        // R-Type (opcode = 0)
        if (decoded.opcode == 0) {
            switch (decoded.funct) {
                case 0x20: return std::make_unique<AddInstruction>(decoded.rd, decoded.rs, decoded.rt);
                case 0x22: return std::make_unique<SubInstruction>(decoded.rd, decoded.rs, decoded.rt);
                case 0x18: return std::make_unique<MultInstruction>(decoded.rs, decoded.rt, false);
                case 0x19: return std::make_unique<MultInstruction>(decoded.rs, decoded.rt, true);
                case 0x1A: return std::make_unique<DivInstruction>(decoded.rs, decoded.rt, false);
                case 0x1B: return std::make_unique<DivInstruction>(decoded.rs, decoded.rt, true);
                case 0x10: return std::make_unique<MfhiInstruction>(decoded.rd);
                case 0x12: return std::make_unique<MfloInstruction>(decoded.rd);
                case 0x14: return std::make_unique<LisInstruction>(decoded.rd);
                default:
                    throw std::runtime_error("Unknown R-type instruction: funct=" + std::to_string(decoded.funct));
            }
        }
        // I-Type
        else {
            switch (decoded.opcode) {
                case 0x08: return std::make_unique<AddiInstruction>(decoded.rt, decoded.rs, decoded.immediate);
                case 0x04: return std::make_unique<BeqInstruction>(decoded.rs, decoded.rt, decoded.immediate);
                case 0x05: return std::make_unique<BneInstruction>(decoded.rs, decoded.rt, decoded.immediate);
                default:
                    throw std::runtime_error("Unknown I-type instruction: opcode=" + std::to_string(decoded.opcode));
            }
        }
        
        throw std::runtime_error("Unknown instruction");
    }
    
    // Factory methods for creating instructions from assembly
    static std::unique_ptr<Instruction> createAdd(uint8_t rd, uint8_t rs, uint8_t rt) {
        return std::make_unique<AddInstruction>(rd, rs, rt);
    }
    
    static std::unique_ptr<Instruction> createSub(uint8_t rd, uint8_t rs, uint8_t rt) {
        return std::make_unique<SubInstruction>(rd, rs, rt);
    }
    
    static std::unique_ptr<Instruction> createMult(uint8_t rs, uint8_t rt) {
        return std::make_unique<MultInstruction>(rs, rt, false);
    }
    
    static std::unique_ptr<Instruction> createDiv(uint8_t rs, uint8_t rt) {
        return std::make_unique<DivInstruction>(rs, rt, false);
    }
    
    static std::unique_ptr<Instruction> createMfhi(uint8_t rd) {
        return std::make_unique<MfhiInstruction>(rd);
    }
    
    static std::unique_ptr<Instruction> createMflo(uint8_t rd) {
        return std::make_unique<MfloInstruction>(rd);
    }
    
    static std::unique_ptr<Instruction> createLis(uint8_t rd) {
        return std::make_unique<LisInstruction>(rd);
    }
    
    static std::unique_ptr<Instruction> createAddi(uint8_t rt, uint8_t rs, int16_t immediate) {
        return std::make_unique<AddiInstruction>(rt, rs, immediate);
    }
    
    static std::unique_ptr<Instruction> createBeq(uint8_t rs, uint8_t rt, int16_t offset) {
        return std::make_unique<BeqInstruction>(rs, rt, offset);
    }
    
    static std::unique_ptr<Instruction> createBne(uint8_t rs, uint8_t rt, int16_t offset) {
        return std::make_unique<BneInstruction>(rs, rt, offset);
    }
    
    static std::unique_ptr<Instruction> createJ(uint32_t address) {
        return std::make_unique<JInstruction>(address);
    }
};

// ====================
// CPU Core
// ====================

class MipsCPU {
private:
    RegisterFile registers;
    SpecialRegisters specialRegs;
    Memory memory;
    uint32_t pc;
    bool running;
    
public:
    MipsCPU(size_t memorySize) : memory(memorySize), pc(0), running(false) {}
    
    void loadProgram(const std::vector<int32_t>& program) {
        memory.loadProgram(program);
        pc = 0;
        running = true;
    }
    
    void step() {
        if (!running) return;
        
        // Fetch
        int32_t instruction = memory.loadWord(pc);
        pc += 4;
        
        // Decode and Execute
        auto decodedInstr = InstructionFactory::decode(instruction);
        decodedInstr->execute(registers, specialRegs, memory, pc);
    }
    
    void run() {
        while (running) {
            step();
        }
    }
    
    void stop() { running = false; }
    
    // Debug methods
    int32_t getRegister(uint8_t reg) const { return registers.read(reg); }
    uint32_t getPC() const { return pc; }
    int32_t getHi() const { return specialRegs.getHi(); }
    int32_t getLo() const { return specialRegs.getLo(); }
    
    void printState() const {
        printf("PC = 0x%08X\n", pc);
        registers.printRegisters();
        specialRegs.printSpecialRegisters();
    }
    
    void printMemory(uint32_t startAddr, uint32_t endAddr) const {
        memory.printMemory(startAddr, endAddr);
    }
};
