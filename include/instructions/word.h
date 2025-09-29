#ifndef WORD_H
#define WORD_H
#include <cstdint>

class Word {
  public:
    Word() = default;
    virtual ~Word() = default;
    
    // Pure virtual methods - making Word abstract
    virtual uint32_t getValue() const = 0;
    virtual void setValue(uint32_t value) = 0;
    
  protected:
    uint32_t value = 0;
};
#endif