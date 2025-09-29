main:   lis $1
        .word 42
        add $2, $3, $4
        beq $5, $6, main
        lw $7, 0($8)
        sw $9, 4($10)
        jr $31
