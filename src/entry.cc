#include "entry.h"
#include <iostream>
#include <iomanip>

// ============================================================================
// MERL ENTRY BASE CLASS IMPLEMENTATION
// ============================================================================

Entry::Entry(Type type) : entryType(type) {
}

Entry::Type Entry::getType() const {
    return entryType;
}

uint32_t Entry::getMarker() const {
    switch (entryType) {
        case REL: return 0x00000001;
        case ESR: return 0x00000011;
        case ESD: return 0x00000005;
        default: return 0x00000000;
    }
}

std::vector<uint8_t> Entry::uint32ToBigEndianBytes(uint32_t value) const {
    std::vector<uint8_t> bytes(4);
    bytes[0] = (value >> 24) & 0xFF;
    bytes[1] = (value >> 16) & 0xFF;
    bytes[2] = (value >> 8) & 0xFF;
    bytes[3] = value & 0xFF;
    return bytes;
}

std::vector<uint8_t> Entry::stringToBytes(const std::string& str) const {
    return std::vector<uint8_t>(str.begin(), str.end());
}

// ============================================================================
// REL ENTRY IMPLEMENTATION
// ============================================================================

RelEntry::RelEntry(uint32_t offset) : Entry(REL), codeOffset(offset) {
}

std::vector<uint8_t> RelEntry::serialize() const {
    std::vector<uint8_t> data;
    
    // Add REL marker
    auto markerBytes = uint32ToBigEndianBytes(REL_MARKER);
    data.insert(data.end(), markerBytes.begin(), markerBytes.end());
    
    // Add code offset
    auto offsetBytes = uint32ToBigEndianBytes(codeOffset);
    data.insert(data.end(), offsetBytes.begin(), offsetBytes.end());
    
    return data;
}

std::string RelEntry::getDescription() const {
    std::stringstream ss;
    ss << "REL Entry: Offset 0x" << std::hex << std::uppercase << codeOffset;
    return ss.str();
}

size_t RelEntry::getSize() const {
    return 8; // 4 bytes marker + 4 bytes offset
}

uint32_t RelEntry::getOffset() const {
    return codeOffset;
}

void RelEntry::setOffset(uint32_t offset) {
    codeOffset = offset;
}

// ============================================================================
// ESR ENTRY IMPLEMENTATION
// ============================================================================

EsrEntry::EsrEntry(const std::string& symbol, uint32_t offset) 
    : Entry(ESR), symbolName(symbol), codeOffset(offset) {
}

std::vector<uint8_t> EsrEntry::serialize() const {
    std::vector<uint8_t> data;
    
    // Add ESR marker
    auto markerBytes = uint32ToBigEndianBytes(ESR_MARKER);
    data.insert(data.end(), markerBytes.begin(), markerBytes.end());
    
    // Add code offset
    auto offsetBytes = uint32ToBigEndianBytes(codeOffset);
    data.insert(data.end(), offsetBytes.begin(), offsetBytes.end());
    
    // Add symbol length
    uint32_t symbolLength = symbolName.length();
    auto lengthBytes = uint32ToBigEndianBytes(symbolLength);
    data.insert(data.end(), lengthBytes.begin(), lengthBytes.end());
    
    // Add symbol name
    auto symbolBytes = stringToBytes(symbolName);
    data.insert(data.end(), symbolBytes.begin(), symbolBytes.end());
    
    return data;
}

std::string EsrEntry::getDescription() const {
    std::stringstream ss;
    ss << "ESR Entry: Symbol '" << symbolName << "' at offset 0x" << std::hex << std::uppercase << codeOffset;
    return ss.str();
}

size_t EsrEntry::getSize() const {
    return 12 + symbolName.length(); // marker + offset + length + symbol
}

std::string EsrEntry::getSymbol() const {
    return symbolName;
}

uint32_t EsrEntry::getOffset() const {
    return codeOffset;
}

void EsrEntry::setSymbol(const std::string& symbol) {
    symbolName = symbol;
}

void EsrEntry::setOffset(uint32_t offset) {
    codeOffset = offset;
}

// ============================================================================
// ESD ENTRY IMPLEMENTATION
// ============================================================================

EsdEntry::EsdEntry(const std::string& symbol, uint32_t offset) 
    : Entry(ESD), symbolName(symbol), codeOffset(offset) {
}

std::vector<uint8_t> EsdEntry::serialize() const {
    std::vector<uint8_t> data;
    
    // Add ESD marker
    auto markerBytes = uint32ToBigEndianBytes(ESD_MARKER);
    data.insert(data.end(), markerBytes.begin(), markerBytes.end());
    
    // Add code offset
    auto offsetBytes = uint32ToBigEndianBytes(codeOffset);
    data.insert(data.end(), offsetBytes.begin(), offsetBytes.end());
    
    // Add symbol length
    uint32_t symbolLength = symbolName.length();
    auto lengthBytes = uint32ToBigEndianBytes(symbolLength);
    data.insert(data.end(), lengthBytes.begin(), lengthBytes.end());
    
    // Add symbol name
    auto symbolBytes = stringToBytes(symbolName);
    data.insert(data.end(), symbolBytes.begin(), symbolBytes.end());
    
    return data;
}

std::string EsdEntry::getDescription() const {
    std::stringstream ss;
    ss << "ESD Entry: Symbol '" << symbolName << "' at offset 0x" << std::hex << std::uppercase << codeOffset;
    return ss.str();
}

size_t EsdEntry::getSize() const {
    return 12 + symbolName.length(); // marker + offset + length + symbol
}

std::string EsdEntry::getSymbol() const {
    return symbolName;
}

uint32_t EsdEntry::getOffset() const {
    return codeOffset;
}

void EsdEntry::setSymbol(const std::string& symbol) {
    symbolName = symbol;
}

void EsdEntry::setOffset(uint32_t offset) {
    codeOffset = offset;
}
