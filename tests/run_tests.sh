# Test Suite for MIPS Assembler
# This file contains comprehensive tests for both debug and production modes

# Test 1: Simple R-type instruction
echo "=== Test 1: Simple R-type instruction (add) ==="
echo "add \$1, \$2, \$3" | ./binasm --debug
echo "Expected: 0x00000000 (add instruction)"

echo ""
echo "=== Test 1 Production Mode ==="
echo "add \$1, \$2, \$3" | ./binasm > tests/test1_production.merl
hexdump -C tests/test1_production.merl

echo ""
echo "=== Test 2: Multiple R-type instructions ==="
cat > tests/test2.asm << 'EOF'
add $1, $2, $3
sub $4, $5, $6
mult $7, $8
EOF

echo "Debug mode:"
cat tests/test2.asm | ./binasm --debug

echo ""
echo "Production mode:"
cat tests/test2.asm | ./binasm > tests/test2_production.merl
hexdump -C tests/test2_production.merl

echo ""
echo "=== Test 3: I-type instructions ==="
cat > tests/test3.asm << 'EOF'
beq $1, $2, loop
bne $3, $4, end
lw $5, 4($6)
sw $7, 8($8)
EOF

echo "Debug mode:"
cat tests/test3.asm | ./binasm --debug

echo ""
echo "Production mode:"
cat tests/test3.asm | ./binasm > tests/test3_production.merl
hexdump -C tests/test3_production.merl

echo ""
echo "=== Test 4: Labels and branches ==="
cat > tests/test4.asm << 'EOF'
start: add $1, $2, $3
       sub $4, $5, $6
       beq $7, $8, start
       end: mult $9, $10
EOF

echo "Debug mode:"
cat tests/test4.asm | ./binasm --debug

echo ""
echo "Production mode:"
cat tests/test4.asm | ./binasm > tests/test4_production.merl
hexdump -C tests/test4_production.merl

echo ""
echo "=== Test 5: Data directives ==="
cat > tests/test5.asm << 'EOF'
.word 42
.word 0x1234
add $1, $2, $3
EOF

echo "Debug mode:"
cat tests/test5.asm | ./binasm --debug

echo ""
echo "Production mode:"
cat tests/test5.asm | ./binasm > tests/test5_production.merl
hexdump -C tests/test5_production.merl

echo ""
echo "=== Test 6: Complex program ==="
cat > tests/test6.asm << 'EOF'
main:   lis $1
        .word 42
        add $2, $3, $4
        beq $5, $6, main
        lw $7, 0($8)
        sw $9, 4($10)
        jr $31
EOF

echo "Debug mode:"
cat tests/test6.asm | ./binasm --debug

echo ""
echo "Production mode:"
cat tests/test6.asm | ./binasm > tests/test6_production.merl
hexdump -C tests/test6_production.merl

echo ""
echo "=== Test 7: Error handling (should fail) ==="
echo "invalid_instruction \$1, \$2" | ./binasm --debug

echo ""
echo "=== Test 8: Duplicate labels (should fail) ==="
cat > tests/test8.asm << 'EOF'
label: add $1, $2, $3
label: sub $4, $5, $6
EOF
cat tests/test8.asm | ./binasm --debug

echo ""
echo "=== All tests completed ==="
