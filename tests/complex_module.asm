
.import printf
.import malloc
.import free
.export main
.export init
.export cleanup

lis $28
.word main
.word init
.word cleanup

main:
.word printf
.word malloc
.word free
.word main

init:
.word init

cleanup:
.word cleanup
.word free
