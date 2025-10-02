# This takes in a merrl file and visualizes it

import sys
import struct
    
def main():
    # get the merrl file from the command line
    merrl_file = sys.argv[1]
    # read the merrl file
    with open(merrl_file, "rb") as f:
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
    