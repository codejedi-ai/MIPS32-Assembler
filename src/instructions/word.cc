#include "instructions/word.h"
#include <cstdint>

// ============================================================================
// BASE WORD CLASS IMPLEMENTATION
// ============================================================================

Word::Word() : value(0) {}

uint32_t Word::getValue() const {
  return value;
}

void Word::setValue(uint32_t value) {
  this->value = value;
}
