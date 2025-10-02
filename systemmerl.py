#!/usr/bin/env python3
"""
System MERL file generator for MIPS assembler.
Generates a MERL file containing system call addresses.
"""

import sys
import struct

def main():
    # System call addresses
    exit_addr = 0x0FFFFFF0
    print_addr = 0x0FFFFFF4
    init_addr = 0x0FFFFFF8
    new_addr = 0x0FFFFFFC
    delete_addr = 0x10000000
    
    # Create MERL file content
    merl_file = []
    
    # MERL Header
    merl_file.append(0x10000002)  # MERL cookie
    merl_file.append(0x00000000)  # End of file (will be calculated)
    merl_file.append(0x00000000)  # End of code (no code in system MERL)
    
    # ESR entries for each system call
    system_calls = [
        ("print", print_addr),
        ("init", init_addr), 
        ("new", new_addr),
        ("delete", delete_addr)
    ]
    
    for name, addr in system_calls:
        # ESR entry (External Symbol Reference)
        merl_file.append(0x00000011)  # ESR marker
        merl_file.append(addr)         # Address
        merl_file.append(len(name))   # Name length
        # Add name characters as 32-bit words
        for char in name:
            merl_file.append(ord(char))
    
    # Calculate end of file
    end_of_file = len(merl_file) * 4
    merl_file[1] = end_of_file
    
    # Output debug info to stderr
    print("System call addresses generated:", file=sys.stderr)
    print(f"Exit:   0x{exit_addr:08X}", file=sys.stderr)
    print(f"Print:  0x{print_addr:08X}", file=sys.stderr)
    print(f"Init:   0x{init_addr:08X}", file=sys.stderr)
    print(f"New:    0x{new_addr:08X}", file=sys.stderr)
    print(f"Delete: 0x{delete_addr:08X}", file=sys.stderr)
    
    # Write MERL file
    with open("systemmerl.merl", "wb") as f:
        for word in merl_file:
            f.write(struct.pack('>I', word))
    
    return 0

if __name__ == "__main__":
    main()
    # read the systemmerl.merl file
    with open("systemmerl.merl", "rb") as f:
        while True:
            # Read exactly 4 bytes for each 32-bit word
            word_bytes = f.read(4)
            if not word_bytes:
                break
            if len(word_bytes) == 4:
                # Unpack the 32-bit word and print in hex
                word_value = struct.unpack('>I', word_bytes)[0]
                print(f"0x{word_value:08X}")
            else:
                print(f"Warning: Incomplete word at end of file: {len(word_bytes)} bytes")
    