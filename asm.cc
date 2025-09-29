#include <iostream>
#include <string>
#include <vector>
#include "scanner.h"
#include <map>
#include <algorithm>
#include <fstream>
using namespace std;

// ====================
// OOP Refactor: Word and Instruction Classes
// ====================

class Word {
  uint32_t value;
 public:
  explicit Word(uint32_t v = 0) : value(v) {}
  uint32_t getValue() const { return value; }
  void setValue(uint32_t v) { value = v; }
  void emit() const {
    unsigned char c = value >> 24; cout << c;
    c = value >> 16; cout << c;
    c = value >> 8;  cout << c;
    c = value;       cout << c;
  }
  // Match .word lines
  static bool matches(int ind, const std::vector<Token> &v) {
    vector<Token> buf = scan(".word i");
    if (ind + (int)buf.size() != (int)v.size()) return false;
    bool ok = true; for (size_t i=0;i<buf.size();++i) ok = ok && (v[ind+(int)i].getKind()==buf[i].getKind());
    if (!ok) { buf = scan(".word 0x0"); ok = true; for (size_t i=0;i<buf.size();++i) ok = ok && (v[ind+(int)i].getKind()==buf[i].getKind()); }
    if (!ok) { buf = scan(".word 1");   ok = true; for (size_t i=0;i<buf.size();++i) ok = ok && (v[ind+(int)i].getKind()==buf[i].getKind()); }
    if (!ok) return false;
    return v[ind].getKind() == Token::WORD;
  }
};

// (moved InstructionFactory below instruction class definitions)


class AddInstruction : public Word { public: AddInstruction(int d,int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(d<<11)|32){} static void print(int d,int s,int t){ AddInstruction(d,s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("add $1, $2, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class SubInstruction : public Word { public: SubInstruction(int d,int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(d<<11)|34){} static void print(int d,int s,int t){ SubInstruction(d,s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("sub $1, $2, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class SltInstruction : public Word { public: SltInstruction(int d,int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(d<<11)|42){} static void print(int d,int s,int t){ SltInstruction(d,s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("slt $1, $2, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class SltuInstruction : public Word { public: SltuInstruction(int d,int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(d<<11)|43){} static void print(int d,int s,int t){ SltuInstruction(d,s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("sltu $1, $2, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class MultInstruction : public Word { public: MultInstruction(int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(0<<11)|24){} static void print(int s,int t){ MultInstruction(s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("mult $4, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class MultuInstruction : public Word { public: MultuInstruction(int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(0<<11)|25){} static void print(int s,int t){ MultuInstruction(s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("multu $4, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class DivInstruction : public Word { public: DivInstruction(int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(0<<11)|26){} static void print(int s,int t){ DivInstruction(s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("div $4, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class DivuInstruction : public Word { public: DivuInstruction(int s,int t):Word((0<<26)|(s<<21)|(t<<16)|(0<<11)|27){} static void print(int s,int t){ DivuInstruction(s,t).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("divu $4, $3"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class JrInstruction : public Word { public: JrInstruction(int s):Word((0<<26)|(s<<21)|(0<<16)|(0<<11)|8 ){} static void print(int s){ JrInstruction(s).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("jr $4"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class JalrInstruction : public Word { public: JalrInstruction(int s):Word((0<<26)|(s<<21)|(0<<16)|(0<<11)|9 ){} static void print(int s){ JalrInstruction(s).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("jalr $4"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class MfhiInstruction : public Word { public: MfhiInstruction(int d):Word((0<<26)|(0<<21)|(0<<16)|(d<<11)|16){} static void print(int d){ MfhiInstruction(d).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("mfhi $4"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class MfloInstruction : public Word { public: MfloInstruction(int d):Word((0<<26)|(0<<21)|(0<<16)|(d<<11)|18){} static void print(int d){ MfloInstruction(d).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("mflo $4"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class LisInstruction : public Word { public: LisInstruction(int d):Word((0<<26)|(0<<21)|(0<<16)|(d<<11)|20){} static void print(int d){ LisInstruction(d).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("lis $4"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class LwInstruction : public Word { public: LwInstruction(int t,int i,int s):Word((35<<26)|(s<<21)|(t<<16)|(i&0xffff)){} static void print(int t,int i,int s){ LwInstruction(t,i,s).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("lw $4, 1($3)"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class SwInstruction : public Word { public: SwInstruction(int t,int i,int s):Word((43<<26)|(s<<21)|(t<<16)|(i&0xffff)){} static void print(int t,int i,int s){ SwInstruction(t,i,s).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("sw $4, 1($3)"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t i=0;i<buf.size();++i){ if(v[ind+(int)i].getKind()!=buf[i].getKind()) return false; } return true; } };
class BeqInstruction : public Word { public: BeqInstruction(int s,int t,int i):Word(( 4<<26)|(s<<21)|(t<<16)|(i&0xffff)){} static void print(int s,int t,int i){ BeqInstruction(s,t,i).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("beq $4, $0, i"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t j=0;j<buf.size();++j){ if(v[ind+(int)j].getKind()!=buf[j].getKind()) return false; } return true; } };
class BneInstruction : public Word { public: BneInstruction(int s,int t,int i):Word(( 5<<26)|(s<<21)|(t<<16)|(i&0xffff)){} static void print(int s,int t,int i){ BneInstruction(s,t,i).emit(); } static bool matches(int ind,const std::vector<Token>&v){ auto buf=scan("bne $4, $0, i"); if(ind+(int)buf.size()!=(int)v.size()) return false; for(size_t j=0;j<buf.size();++j){ if(v[ind+(int)j].getKind()!=buf[j].getKind()) return false; } return true; } };

void printInstruction(int instr)
{
  Word(instr).emit();
}

// ====================
// Instruction Factory using class matchers
// ====================
class InstructionFactory {
public:
  static bool build(int ind,
                    const std::vector<Token> &v,
                    const std::map<std::string,int> &sym,
                    int pc,
                    Word &out) {
    // .word
    if (Word::matches(ind, v)) {
      int64_t instr = 0;
      const Token &tok = v[ind+1];
      if (tok.getKind() == Token::ID) {
        std::string lab = tok.getLexeme();
        auto it = sym.find(lab);
        if (it == sym.end()) { std::cerr << "ERROR: Invalid Lable :" << lab << std::endl; return false; }
        instr = it->second;
      } else {
        instr = tok.toNumber();
      }
      out = Word(static_cast<uint32_t>(instr));
  return true;
}

    // jr / jalr
    if (JrInstruction::matches(ind, v) || JalrInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int s = v[ind+1].toNumber();
      if (op == "jr") { out = JrInstruction(s); }
      else { out = JalrInstruction(s); }
  return true;
}

    // add/sub/slt/sltu
    if (AddInstruction::matches(ind, v) || SubInstruction::matches(ind, v) || SltInstruction::matches(ind, v) || SltuInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int d = v[ind+1].toNumber();
      int s = v[ind+3].toNumber();
      int t = v[ind+5].toNumber();
      if (op == "add") out = AddInstruction(d,s,t);
      else if (op == "sub") out = SubInstruction(d,s,t);
      else if (op == "slt") out = SltInstruction(d,s,t);
      else out = SltuInstruction(d,s,t);
      return true;
    }

    // beq / bne
    if (BeqInstruction::matches(ind, v) || BneInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int s = v[ind+1].toNumber();
      int t = v[ind+3].toNumber();
      int64_t i = 0;
      const Token &dest = v[ind+5];
      if (dest.getKind() == Token::ID) {
        std::string lab = dest.getLexeme();
        auto it = sym.find(lab);
        if (it == sym.end()) { std::cerr << "ERROR: " << lab << " is an invalid token" << std::endl; return false; }
        i = (it->second - pc) / 4;
      } else {
        i = dest.toNumber();
        if ((dest.getKind() == Token::INT) && !(-32768 <= i && i <= 32767)) { std::cerr << "ERROR: Step count out of range. must be -32768 <= i <= 32767" << std::endl; return false; }
        if ((dest.getKind() == Token::HEXINT) && i > 0xffff) { std::cerr << "ERROR: Step count out of range. must be i <= 0xffff" << std::endl; return false; }
      }
      if (op == "beq") out = BeqInstruction(s,t,static_cast<int>(i));
      else out = BneInstruction(s,t,static_cast<int>(i));
  return true;
}

    // lis / mfhi / mflo
    if (LisInstruction::matches(ind, v) || MfhiInstruction::matches(ind, v) || MfloInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int d = v[ind+1].toNumber();
      if (op == "lis") out = LisInstruction(d);
      else if (op == "mfhi") out = MfhiInstruction(d);
      else out = MfloInstruction(d);
      return true;
    }

    // mult/multu/div/divu
    if (MultInstruction::matches(ind, v) || MultuInstruction::matches(ind, v) || DivInstruction::matches(ind, v) || DivuInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int s = v[ind+1].toNumber();
      int t = v[ind+3].toNumber();
      if (op == "mult") out = MultInstruction(s,t);
      else if (op == "multu") out = MultuInstruction(s,t);
      else if (op == "div") out = DivInstruction(s,t);
      else out = DivuInstruction(s,t);
  return true;
}

    // lw / sw
    if (LwInstruction::matches(ind, v) || SwInstruction::matches(ind, v)) {
      const std::string op = v[ind].getLexeme();
      int t = v[ind+1].toNumber();
      int i = v[ind+3].toNumber();
      int s = v[ind+5].toNumber();
      if (op == "lw") out = LwInstruction(t,i,s);
      else out = SwInstruction(t,i,s);
  return true;
}

    return false;
  }
  static bool matchesAny(int ind, const std::vector<Token>& v) {
    return Word::matches(ind, v)
        || JrInstruction::matches(ind, v)
        || JalrInstruction::matches(ind, v)
        || AddInstruction::matches(ind, v)
        || SubInstruction::matches(ind, v)
        || SltInstruction::matches(ind, v)
        || SltuInstruction::matches(ind, v)
        || BeqInstruction::matches(ind, v)
        || BneInstruction::matches(ind, v)
        || LisInstruction::matches(ind, v)
        || MfhiInstruction::matches(ind, v)
        || MfloInstruction::matches(ind, v)
        || MultInstruction::matches(ind, v)
        || MultuInstruction::matches(ind, v)
        || DivInstruction::matches(ind, v)
        || DivuInstruction::matches(ind, v)
        || LwInstruction::matches(ind, v)
        || SwInstruction::matches(ind, v);
  }
};
// ====================
// Assembler class (labels table, PC, words output, export)
// ====================
class Assembler {
  std::map<std::string,int> symbolTable;
  std::vector<std::vector<Token>> tokensByLine;
  std::vector<Word> words;
  int pc = 0;
  int pc_start = 0;
public:
  Assembler() : pc_start(0) {}
  // can set pc_start to x if needed
  Assembler(int x) : pc_start(x) {}
  ~Assembler() {}
  const std::map<std::string,int>& getSymbols() const { return symbolTable; }
  const std::vector<Word>& getWords() const { return words; }
  int getPC() const { return pc; }

  int assemble(std::istream &in) {
    // Scan inputs
    std::string line;
    try {
      while (std::getline(in, line)) {
        tokensByLine.push_back(scan(line));
      }
    } catch (ScanningFailure &f) {
      std::cerr << f.what() << std::endl; return 1;
    }

    // First pass: labels and validation
    pc = pc_start;
    for (const auto &ln : tokensByLine) {
      if (ln.empty()) continue;
      size_t ind = 0;
      while (ind < ln.size() && ln[ind].getKind() == Token::LABEL) {
        std::string name = ln[ind].getLexeme(); name.pop_back();
        if (symbolTable.count(name)) { std::cerr << "ERROR: Duplicate Labels" << std::endl; return 1; }
        symbolTable[name] = pc; ind++;
      }
      if (ind == ln.size()) continue;
      if (!InstructionFactory::matchesAny(static_cast<int>(ind), ln)) { std::cerr << "ERROR: Invalid instruction or parameters" << std::endl; return 1; }
      pc += 4;
    }

    // Second pass: build words
    words.clear();
    pc = pc_start;
    for (const auto &ln : tokensByLine) {
      if (ln.empty()) continue;
      size_t ind = 0; while (ind < ln.size() && ln[ind].getKind() == Token::LABEL) { ind++; }
      if (ind == ln.size()) continue;
      Word w;
      if (!InstructionFactory::build(static_cast<int>(ind), ln, symbolTable, pc, w)) { return 1; }
      words.push_back(w);
      pc += 4;
    }

    return 0;
  }

  bool exportToFile(const std::string &filename) const {
    std::ofstream out(filename, std::ios::binary);
    if (!out) return false;
    for (const Word &w : words) {
      uint32_t v = w.getValue();
      unsigned char b0 = v >> 24, b1 = v >> 16, b2 = v >> 8, b3 = v;
      out.write(reinterpret_cast<const char*>(&b0), 1);
      out.write(reinterpret_cast<const char*>(&b1), 1);
      out.write(reinterpret_cast<const char*>(&b2), 1);
      out.write(reinterpret_cast<const char*>(&b3), 1);
    }
  return true;
}
};

/*
 * C++ Starter code for CS241 A3
 * All code requires C++14, so if you're getting compile errors make sure to
 * use -std=c++14.
 *
 * This file contains the main function of your program. By default, it just
 * prints the scanned list of tokens back to standard output.
 */
int main()
{
  
  Assembler assembler;
  int rc = assembler.assemble(cin);
  if (rc != 0) return rc;
  for (const Word &w : assembler.getWords()) {
    w.emit();
  }
  return 0;
}
