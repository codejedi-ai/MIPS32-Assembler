#!/usr/bin/env bash
set -euo pipefail

run_one() {
  local infile="$1"
  ./binasm < "$infile" > build/out_asm.bin || true
  ./binasm-test < "$infile" > build/out_ref.bin || true
  if cmp -s build/out_asm.bin build/out_ref.bin; then
    echo "PASS $infile"
  else
    echo "FAIL $infile"; diff -u build/out_ref.bin build/out_asm.bin || true; return 1
  fi
}

mkdir -p build tests_compare
cat > tests_compare/t1.asm <<'EOF'
add $1, $2, $3
EOF
cat > tests_compare/t2.asm <<'EOF'
mult $4, $3
mflo $5
EOF
cat > tests_compare/t3.asm <<'EOF'
label:
beq $4, $0, label
EOF
cat > tests_compare/t4.asm <<'EOF'
lis $5
.word 0x12345678
EOF
cat > tests_compare/t5.asm <<'EOF'
lw $4, 1($3)
sw $4, 1($3)
EOF

make
if ! [ -x ./binasm-test ]; then
  echo "binasm-test not found"; exit 1;
fi

rc=0
for f in tests_compare/*.asm; do
  run_one "$f" || rc=1
done
exit $rc
