.import printf
.export main
.export loop
main:
add $1, $2, $3
.word loop
loop:
add $4, $5, $6
.word main