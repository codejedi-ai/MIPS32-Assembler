CXX = g++
CXXFLAGS = -std=c++14 -Wall -MMD -Iinclude
EXEC = /home/darcy/binmerl
SRCDIR = src
BUILDDIR = build
OBJECTS = $(BUILDDIR)/scanner.o $(BUILDDIR)/main.o $(BUILDDIR)/scannerWrapper.o $(BUILDDIR)/assemblerFactory.o $(BUILDDIR)/pseudoCommand.o $(BUILDDIR)/entry.o $(BUILDDIR)/entryFactory.o $(BUILDDIR)/entryManager.o $(BUILDDIR)/instructions/word.o
DEPENDS = ${OBJECTS:.o=.d}

${EXEC}: ${OBJECTS}
	${CXX} ${CXXFLAGS} ${OBJECTS} -o ${EXEC}

$(BUILDDIR)/%.o: $(SRCDIR)/%.cc
	@mkdir -p $(BUILDDIR)
	${CXX} ${CXXFLAGS} -c $< -o $@

$(BUILDDIR)/instructions/%.o: $(SRCDIR)/instructions/%.cc
	@mkdir -p $(BUILDDIR)/instructions
	${CXX} ${CXXFLAGS} -c $< -o $@

-include ${DEPENDS}

.PHONY: clean

clean:
	rm -rf ${BUILDDIR} ${EXEC}

test-factory: build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o
	${CXX} ${CXXFLAGS} build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o src/test_factory.cc -o test_factory
	@echo "Factory test program built successfully!"

test-pseudo-entries: build/scanner.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o
	${CXX} ${CXXFLAGS} build/scanner.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o src/test_pseudo_entries.cc -o test_pseudo_entries
	@echo "Pseudo command and entry test program built successfully!"

test-rel-generation: build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o
	${CXX} ${CXXFLAGS} build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o src/test_rel_generation.cc -o test_rel_generation
	@echo "REL generation test program built successfully!"

test-comprehensive: build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o
	${CXX} ${CXXFLAGS} build/scanner.o build/scannerWrapper.o build/assemblerFactory.o build/pseudoCommand.o build/entry.o build/entryFactory.o build/entryManager.o build/instructions/word.o src/comprehensive_merl_tests.cc -o test_comprehensive
	@echo "Comprehensive MERL test suite built successfully!"
