#ifndef WORD_H
#define WORD_H
#include <cstdint>

class Word {
  public:
    Word();
    uint32_t getValue() const;
    void setValue(uint32_t value);
  private:
    uint32_t value;
};
#endif