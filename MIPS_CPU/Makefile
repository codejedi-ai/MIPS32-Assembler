CXX = g++
CXXFLAGS = -std=c++14 -Wall -MMD -I../include -Iinclude
SRCDIR = src
BUILDDIR = build

# CPU Test executables
CPU_TEST = ${BUILDDIR}/cpu_test
CPU_TEST_COMPREHENSIVE = ${BUILDDIR}/cpu_test_comprehensive
CPU_TEST_OBJECTS = ${BUILDDIR}/cpu_test.o
CPU_TEST_COMPREHENSIVE_OBJECTS = ${BUILDDIR}/cpu_test_comprehensive.o

# Debug executables
DEBUG_INSTRUCTIONS = ${BUILDDIR}/debug_instructions
TEST_ENCODING = ${BUILDDIR}/test_encoding
SIMPLE_CPU_TEST = ${BUILDDIR}/simple_cpu_test

DEPENDS = ${CPU_TEST_OBJECTS:.o=.d} ${CPU_TEST_COMPREHENSIVE_OBJECTS:.o=.d}

# Default target
all: cpu-test-comprehensive

# CPU Test targets
cpu-test: ${CPU_TEST}
	@echo "Running CPU simulator test..."
	@${CPU_TEST}

cpu-test-comprehensive: ${CPU_TEST_COMPREHENSIVE}
	@echo "Running comprehensive CPU simulator test..."
	@${CPU_TEST_COMPREHENSIVE}

# Debug targets
debug-instructions: ${DEBUG_INSTRUCTIONS}
	@echo "Running instruction debug test..."
	@${DEBUG_INSTRUCTIONS}

test-encoding: ${TEST_ENCODING}
	@echo "Running encoding test..."
	@${TEST_ENCODING}

simple-cpu-test: ${SIMPLE_CPU_TEST}
	@echo "Running simple CPU test..."
	@${SIMPLE_CPU_TEST}

# Build rules
${CPU_TEST}: ${CPU_TEST_OBJECTS}
	${CXX} ${CXXFLAGS} ${CPU_TEST_OBJECTS} -o ${CPU_TEST}

${CPU_TEST_COMPREHENSIVE}: ${CPU_TEST_COMPREHENSIVE_OBJECTS}
	${CXX} ${CXXFLAGS} ${CPU_TEST_COMPREHENSIVE_OBJECTS} -o ${CPU_TEST_COMPREHENSIVE}

${DEBUG_INSTRUCTIONS}: ${BUILDDIR}/debug_instructions.o
	${CXX} ${CXXFLAGS} ${BUILDDIR}/debug_instructions.o -o ${DEBUG_INSTRUCTIONS}

${TEST_ENCODING}: ${BUILDDIR}/test_encoding.o
	${CXX} ${CXXFLAGS} ${BUILDDIR}/test_encoding.o -o ${TEST_ENCODING}

${SIMPLE_CPU_TEST}: ${BUILDDIR}/simple_cpu_test.o
	${CXX} ${CXXFLAGS} ${BUILDDIR}/simple_cpu_test.o -o ${SIMPLE_CPU_TEST}

$(BUILDDIR)/%.o: $(SRCDIR)/%.cc
	@mkdir -p $(BUILDDIR)
	${CXX} ${CXXFLAGS} -c $< -o $@

-include ${DEPENDS}

.PHONY: clean all cpu-test cpu-test-comprehensive debug-instructions test-encoding simple-cpu-test

clean:
	rm -rf ${BUILDDIR}

help:
	@echo "MIPS CPU Simulator Makefile"
	@echo "Available targets:"
	@echo "  all                    - Run comprehensive CPU test (default)"
	@echo "  cpu-test              - Run basic CPU test"
	@echo "  cpu-test-comprehensive - Run comprehensive CPU test"
	@echo "  debug-instructions    - Debug instruction encoding/decoding"
	@echo "  test-encoding         - Test instruction encoding"
	@echo "  simple-cpu-test       - Run simple CPU test"
	@echo "  clean                 - Clean build files"
	@echo "  help                  - Show this help"
