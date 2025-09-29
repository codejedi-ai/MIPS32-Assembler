CXX = g++
CXXFLAGS = -std=c++14 -Wall -MMD -Iinclude
EXEC = /home/darcy/binmerl
SRCDIR = src
BUILDDIR = build
OBJECTS = $(BUILDDIR)/scanner.o $(BUILDDIR)/main.o $(BUILDDIR)/scannerWrapper.o $(BUILDDIR)/assemblerFactory.o $(BUILDDIR)/pseudoCommand.o $(BUILDDIR)/entry.o $(BUILDDIR)/entryFactory.o $(BUILDDIR)/entryManager.o $(BUILDDIR)/instructions/word.o $(BUILDDIR)/instructions/specificInstructions.o

# MIPS CPU simulator is now in separate MIPS_CPU/ folder
DEPENDS = ${OBJECTS:.o=.d}

${EXEC}: ${OBJECTS}
	${CXX} ${CXXFLAGS} ${OBJECTS} -o ${EXEC}

# CPU simulator targets moved to MIPS_CPU/ folder
# Use 'make -C MIPS_CPU/' to run CPU tests

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



test: ${EXEC}
	@echo "Running AI-generated Python test suite..."
	@python3 test_suite.py
	@echo "Tests completed!"

# Build is only successful if tests pass
build: ${EXEC} test
	@echo "Build and tests completed successfully!"
