#!/usr/bin/env python3
"""
AI-Driven MIPS Assembler Test Suite
====================================
Dynamic test case generation and validation for the MIPS assembler.
Creates test cases on-the-fly and validates assembler output.
"""

import os
import sys
import subprocess
import tempfile
import random
import string
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

class TestResult(Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    ERROR = "ERROR"

@dataclass
class TestCase:
    name: str
    description: str
    assembly_code: str
    is_merl_module: bool
    should_pass: bool
    expected_outputs: List[str]
    debug_mode: bool = False

class AITestGenerator:
    def __init__(self):
        self.test_count = 0
        self.pass_count = 0
        self.fail_count = 0
        self.error_count = 0
        self.assembler_path = "/home/darcy/binmerl"
        self.test_dir = Path("tests")
        self.testbin_dir = self.test_dir / "testbin"
        self.testmerl_dir = self.test_dir / "testmerl"
        
    def run_all_tests(self) -> int:
        """Run all AI-generated test cases"""
        print("=== AI-DRIVEN MIPS ASSEMBLER TEST SUITE ===")
        
        # Create test directories
        self._create_test_directories()
        
        # Generate and run test cases
        self._generate_and_run_tests()
        
        # Print summary
        self._print_summary()
        
        return 0 if self.fail_count == 0 and self.error_count == 0 else 1
    
    def _create_test_directories(self):
        """Create test directory structure"""
        print("Creating test directories...")
        
        self.test_dir.mkdir(exist_ok=True)
        self.testbin_dir.mkdir(exist_ok=True)
        self.testmerl_dir.mkdir(exist_ok=True)
        
        # Create empty infile and outfile
        (self.testbin_dir / "infile").touch()
        (self.testbin_dir / "outfile").touch()
        (self.testmerl_dir / "infile").touch()
        (self.testmerl_dir / "outfile").touch()
        
        print("Test directories created successfully!")
    
    def _generate_and_run_tests(self):
        """Generate and run all test cases"""
        print("\n=== Generating Dynamic Test Cases ===")
        
        # Assembly test cases
        self._generate_assembly_tests()
        
        # MERL module test cases
        self._generate_merl_tests()
        
        # Edge case tests
        self._generate_edge_case_tests()
        
        # Error case tests
        self._generate_error_case_tests()
        
        # Debug mode tests
        self._generate_debug_mode_tests()
    
    def _generate_assembly_tests(self):
        """Generate Assembly file test cases"""
        print("Generating Assembly test cases...")
        
        test_cases = [
            TestCase(
                name="basic_arithmetic",
                description="Basic arithmetic operations (add, sub, mult)",
                assembly_code=self._generate_basic_arithmetic(),
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="register_operations",
                description="Register operations with different registers",
                assembly_code=self._generate_register_operations(),
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="label_operations",
                description="Operations with labels and jumps",
                assembly_code=self._generate_label_operations(),
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="immediate_operations",
                description="Operations with immediate values",
                assembly_code=self._generate_immediate_operations(),
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            )
        ]
        
        for test_case in test_cases:
            self._run_test_case(test_case, self.testbin_dir)
    
    def _generate_merl_tests(self):
        """Generate MERL module test cases"""
        print("Generating MERL module test cases...")
        
        test_cases = [
            TestCase(
                name="basic_merl_module",
                description="Basic MERL module with imports and exports",
                assembly_code=self._generate_basic_merl_module(),
                is_merl_module=True,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="complex_merl_module",
                description="Complex MERL module with multiple imports/exports",
                assembly_code=self._generate_complex_merl_module(),
                is_merl_module=True,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="merl_word_directives",
                description="MERL module with .word directives and labels",
                assembly_code=self._generate_merl_with_word_directives(),
                is_merl_module=True,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="merl_rel_entries",
                description="MERL module with automatic REL entry generation",
                assembly_code=self._generate_merl_with_rel_entries(),
                is_merl_module=True,
                should_pass=True,
                expected_outputs=["test.merl"]
            )
        ]
        
        for test_case in test_cases:
            self._run_test_case(test_case, self.testmerl_dir)
    
    def _generate_edge_case_tests(self):
        """Generate edge case test cases"""
        print("Generating edge case tests...")
        
        test_cases = [
            TestCase(
                name="empty_file",
                description="Empty assembly file",
                assembly_code="",
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="single_instruction",
                description="Single instruction file",
                assembly_code="add $1, $2, $3",
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="large_file",
                description="Large assembly file with many instructions",
                assembly_code=self._generate_large_file(),
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            ),
            TestCase(
                name="whitespace_only",
                description="File with only whitespace",
                assembly_code="   \n  \t  \n  ",
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.merl"]
            )
        ]
        
        for test_case in test_cases:
            self._run_test_case(test_case, self.testbin_dir)
    
    def _generate_error_case_tests(self):
        """Generate error case test cases"""
        print("Generating error case tests...")
        
        test_cases = [
            TestCase(
                name="invalid_syntax",
                description="Invalid assembly syntax",
                assembly_code="invalid instruction $1, $2, $3",
                is_merl_module=False,
                should_pass=False,
                expected_outputs=[]
            ),
            TestCase(
                name="invalid_register",
                description="Invalid register number",
                assembly_code="add $99, $2, $3",
                is_merl_module=False,
                should_pass=False,
                expected_outputs=[]
            ),
            TestCase(
                name="missing_operand",
                description="Missing operand",
                assembly_code="add $1, $2",
                is_merl_module=False,
                should_pass=False,
                expected_outputs=[]
            ),
            TestCase(
                name="duplicate_label",
                description="Duplicate label definition",
                assembly_code="main:\nadd $1, $2, $3\nmain:\nadd $4, $5, $6",
                is_merl_module=False,
                should_pass=False,
                expected_outputs=[]
            )
        ]
        
        for test_case in test_cases:
            self._run_test_case(test_case, self.testbin_dir)
    
    def _generate_debug_mode_tests(self):
        """Generate debug mode test cases"""
        print("Generating debug mode tests...")
        
        test_cases = [
            TestCase(
                name="debug_assembly",
                description="Assembly file in debug mode",
                assembly_code="add $1, $2, $3\n.word main\nmain:",
                is_merl_module=False,
                should_pass=True,
                expected_outputs=["test.tbin"],
                debug_mode=True
            ),
            TestCase(
                name="debug_merl",
                description="MERL module in debug mode",
                assembly_code=".import debug_func\n.export debug_main\n.word debug_main\ndebug_main:",
                is_merl_module=True,
                should_pass=True,
                expected_outputs=["test.tmerl"],
                debug_mode=True
            )
        ]
        
        for test_case in test_cases:
            self._run_test_case(test_case, self.testbin_dir if not test_case.is_merl_module else self.testmerl_dir)
    
    def _run_test_case(self, test_case: TestCase, test_dir: Path):
        """Run a single test case"""
        print(f"Running test: {test_case.name} - {test_case.description}")
        
        # Create test file
        test_file = test_dir / f"{test_case.name}.asm"
        try:
            with open(test_file, 'w') as f:
                f.write(test_case.assembly_code)
        except Exception as e:
            print(f"❌ ERROR: Failed to create test file {test_file}: {e}")
            self._record_result(TestResult.ERROR, test_case.name)
            return
        
        # Run assembler
        try:
            cmd = [self.assembler_path]
            if test_case.debug_mode:
                cmd.append("--debug")
            cmd.append(str(test_file))
            
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            actual_pass = (result.returncode == 0)
            
            # Check if test behaved as expected
            if actual_pass == test_case.should_pass:
                if test_case.should_pass:
                    # Check if output file was created
                    output_file = test_file.with_suffix('.merl')
                    if test_case.debug_mode:
                        if test_case.is_merl_module:
                            output_file = test_file.with_suffix('.tmerl')
                        else:
                            output_file = test_file.with_suffix('.tbin')
                    
                    if output_file.exists():
                        self._record_result(TestResult.PASS, test_case.name)
                    else:
                        self._record_result(TestResult.FAIL, f"{test_case.name} (no output file)")
                else:
                    # Expected failure occurred
                    self._record_result(TestResult.PASS, f"{test_case.name} (expected failure)")
            else:
                # Test did not behave as expected
                self._record_result(TestResult.FAIL, f"{test_case.name} (unexpected behavior)")
                
        except subprocess.TimeoutExpired:
            print(f"❌ ERROR: Test {test_case.name} timed out")
            self._record_result(TestResult.ERROR, test_case.name)
        except Exception as e:
            print(f"❌ ERROR: Test {test_case.name} failed with exception: {e}")
            self._record_result(TestResult.ERROR, test_case.name)
    
    def _record_result(self, result: TestResult, test_name: str):
        """Record test result"""
        self.test_count += 1
        
        if result == TestResult.PASS:
            self.pass_count += 1
            print(f"✅ PASS: {test_name}")
        elif result == TestResult.FAIL:
            self.fail_count += 1
            print(f"❌ FAIL: {test_name}")
        else:  # ERROR
            self.error_count += 1
            print(f"💥 ERROR: {test_name}")
    
    def _print_summary(self):
        """Print test summary"""
        print("\n=== TEST SUMMARY ===")
        print(f"Total Tests: {self.test_count}")
        print(f"Passed: {self.pass_count}")
        print(f"Failed: {self.fail_count}")
        print(f"Errors: {self.error_count}")
        
        if self.test_count > 0:
            success_rate = (self.pass_count * 100) // self.test_count
            print(f"Success Rate: {success_rate}%")
        
        if self.fail_count == 0 and self.error_count == 0:
            print("🎉 ALL TESTS PASSED! BUILD SUCCESSFUL! 🎉")
        else:
            print("⚠️  Some tests failed. BUILD FAILED!")
    
    # Test case generators
    def _generate_basic_arithmetic(self) -> str:
        return """add $1, $2, $3
sub $4, $5, $6
mult $7, $8
div $9, $10
mfhi $11
mflo $12"""
    
    def _generate_register_operations(self) -> str:
        return """add $1, $2, $3
add $4, $5, $6
add $7, $8, $9
add $10, $11, $12
add $13, $14, $15
add $16, $17, $18
add $19, $20, $21
add $22, $23, $24
add $25, $26, $27
add $28, $29, $30
add $31, $0, $1"""
    
    def _generate_label_operations(self) -> str:
        return """main:
add $1, $2, $3
beq $1, $0, end
add $4, $5, $6
j main
end:
add $7, $8, $9"""
    
    def _generate_immediate_operations(self) -> str:
        return """addi $1, $2, 100
addi $3, $4, -50
addi $5, $6, 0x1234
addi $7, $8, 0xFFFF"""
    
    def _generate_basic_merl_module(self) -> str:
        return """.import printf
.import malloc
.export main
.export init
main:
add $1, $2, $3
init:
add $4, $5, $6"""
    
    def _generate_complex_merl_module(self) -> str:
        return """.import printf
.import malloc
.import free
.import strlen
.export main
.export init
.export cleanup
main:
add $1, $2, $3
init:
add $4, $5, $6
cleanup:
add $7, $8, $9"""
    
    def _generate_merl_with_word_directives(self) -> str:
        return """.import external_func
.export main
lis $28
.word main
add $1, $2, $3
.word loop
sub $4, $5, $6
loop:
.word external_func
mult $7, $8
.word 0x1234"""
    
    def _generate_merl_with_rel_entries(self) -> str:
        return """.import printf
.export main
.export loop
main:
add $1, $2, $3
.word loop
loop:
add $4, $5, $6
.word main"""
    
    def _generate_large_file(self) -> str:
        lines = []
        for i in range(100):
            reg1 = (i % 31) + 1
            reg2 = ((i + 1) % 31) + 1
            reg3 = ((i + 2) % 31) + 1
            lines.append(f"add ${reg1}, ${reg2}, ${reg3}")
        return "\n".join(lines)

def main():
    """Main entry point"""
    generator = AITestGenerator()
    return generator.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())
