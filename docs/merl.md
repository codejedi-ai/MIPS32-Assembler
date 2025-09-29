The **MERL (Module Entry Record Language)** file structure is specifically designed to enable **relocation and linking** for MIPS assembly modules. It is organized sequentially, with every field being a 32-bit (4-byte) word.

Here is a detailed breakdown of the three main sections of the MERL file.

## I. File Header

The header contains critical metadata the MIPS loader needs to read the file correctly.

| Offset | Size (Words) | Value/Description |
| :--- | :--- | :--- |
| **0x00** | 1 | **Magic Number (Cookie):** Must be `0x10000002` to identify a valid MERL file. |
| **0x04** | 1 | **End of Module:** The size of the entire MERL file in bytes. |
| **0x08** | 1 | **End of Code:** The size of the executable code section (starting at `0x0C`) in bytes. This marks the beginning of the Linker Records section. |

---

## II. Code Section

This section begins immediately after the header (`0x0C`) and contains the compiled instructions.

| Offset | Content | Description |
| :--- | :--- | :--- |
| **0x0C...** | Sequence of 32-bit words | **MIPS Machine Code:** Includes all assembled instructions and initialized data words (`.word`). |
| **...End of Code** | Placeholder values | **Relocation Targets:** Words that need to be patched (e.g., the `.word` following a `lis` instruction) contain placeholder values (like `0x00000000`) until they are fixed by the loader. |

---

## III. Linker Records (Refactoring Data)

This section starts at **End of Code** and defines how the placeholders in the Code Section must be patched. Every record begins with a unique 32-bit **Marker**.

### 1. REL Entry (Relocation)

**Marker:** `0x00000001`
**Purpose:** Fixes addresses for **local symbols** (labels or constants defined and referenced within the same module, such as `loop:` or `.word 42`).

| Field Name | Size (Words) | Value/Description |
| :--- | :--- | :--- |
| **Marker** | 1 | `0x00000001` (Indicates a list of offsets follows) |
| **Offset List** | Variable | A list of **32-bit offsets** (relative to the start of the code section, `0x0C`). Each offset points to a placeholder that needs the module's load address added to it. |

### 2. ESR Entry (External Symbol Reference)

**Marker:** `0x00000011`
**Purpose:** Defines a **dependency** on a symbol (`.import`) that is defined in another module.

| Field Name | Size (Words) | Value/Description |
| :--- | :--- | :--- |
| **Marker** | 1 | `0x00000011` (Indicates an External Reference block) |
| **Code Offset** | 1 | Offset to the **placeholder word** in the code section that needs to be replaced with the symbol's final address. |
| **Symbol Length** | 1 | Number of characters in the symbol name. |
| **Symbol Name** | $L$ | The actual symbol name, stored as $L$ words, one ASCII character per word. |

### 3. ESD Entry (Exported Symbol Definition)

**Marker:** `0x00000005`
**Purpose:** **Publishes** the address of a symbol (`.export`) defined within the current module, making it available for others to import.

| Field Name | Size (Words) | Value/Description |
| :--- | :--- | :--- |
| **Marker** | 1 | `0x00000005` (Indicates an Exported Definition block) |
| **Code Offset** | 1 | **The definition offset**—the location of the symbol's declaration (e.g., where `funcA:` begins) relative to the start of the code section. |
| **Symbol Length** | 1 | Number of characters in the symbol name. |
| **Symbol Name** | $L$ | The actual symbol name, stored as $L$ words, one ASCII character per word. |