#ifndef ENTRY_H
#define ENTRY_H

#include <string>
#include <vector>
#include <cstdint>

// ============================================================================
// MERL ENTRY BASE CLASS
// ============================================================================
// Base class for MERL linker entries (REL, ESR, ESD)

class Entry {
public:
    enum Type {
        REL,  // Relocation entry
        ESR,  // External Symbol Reference
        ESD   // Exported Symbol Definition
    };
    
    Entry(Type type);
    virtual ~Entry() = default;
    
    // Virtual methods to be implemented by derived classes
    virtual std::vector<uint8_t> serialize() const = 0;
    virtual std::string getDescription() const = 0;
    virtual size_t getSize() const = 0;
    
    // Common functionality
    Type getType() const;
    uint32_t getMarker() const;
    
protected:
    Type entryType;
    
    // Helper methods
    std::vector<uint8_t> uint32ToBigEndianBytes(uint32_t value) const;
    std::vector<uint8_t> stringToBytes(const std::string& str) const;
};

// ============================================================================
// REL ENTRY CLASS
// ============================================================================
// Relocation entry for fixing internal addresses

class RelEntry : public Entry {
public:
    RelEntry(uint32_t offset);
    virtual ~RelEntry() = default;
    
    // Entry interface
    virtual std::vector<uint8_t> serialize() const override;
    virtual std::string getDescription() const override;
    virtual size_t getSize() const override;
    
    // REL-specific functionality
    uint32_t getOffset() const;
    void setOffset(uint32_t offset);
    
private:
    uint32_t codeOffset;
    static const uint32_t REL_MARKER = 0x00000001;
};

// ============================================================================
// ESR ENTRY CLASS
// ============================================================================
// External Symbol Reference entry

class EsrEntry : public Entry {
public:
    EsrEntry(const std::string& symbol, uint32_t offset);
    virtual ~EsrEntry() = default;
    
    // Entry interface
    virtual std::vector<uint8_t> serialize() const override;
    virtual std::string getDescription() const override;
    virtual size_t getSize() const override;
    
    // ESR-specific functionality
    std::string getSymbol() const;
    uint32_t getOffset() const;
    void setSymbol(const std::string& symbol);
    void setOffset(uint32_t offset);
    
private:
    std::string symbolName;
    uint32_t codeOffset;
    static const uint32_t ESR_MARKER = 0x00000011;
};

// ============================================================================
// ESD ENTRY CLASS
// ============================================================================
// Exported Symbol Definition entry

class EsdEntry : public Entry {
public:
    EsdEntry(const std::string& symbol, uint32_t offset);
    virtual ~EsdEntry() = default;
    
    // Entry interface
    virtual std::vector<uint8_t> serialize() const override;
    virtual std::string getDescription() const override;
    virtual size_t getSize() const override;
    
    // ESD-specific functionality
    std::string getSymbol() const;
    uint32_t getOffset() const;
    void setSymbol(const std::string& symbol);
    void setOffset(uint32_t offset);
    
private:
    std::string symbolName;
    uint32_t codeOffset;
    static const uint32_t ESD_MARKER = 0x00000005;
};

#endif // ENTRY_H
