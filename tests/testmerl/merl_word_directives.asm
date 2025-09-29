.import external_func
.export main
lis $28
.word main
add $1, $2, $3
.word loop
sub $4, $5, $6
loop:
.word external_func
mult $7, $8
.word 0x1234