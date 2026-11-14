# Tutorial to build a mini project that can encrypt and decrypt messages using the Caesar Cipher algorithm:

# How the Caesar Cipher Script Works

This script implements a **Caesar cipher**, a simple encryption technique where each letter is shifted a fixed number of positions in the alphabet.

## Constants Section

```py
FIRST_CHAR_CODE = ord("A")        # = 65
LAST_CHAR_CODE = ord("Z")         # = 90
CHAR_RANGE = LAST_CHAR_CODE - FIRST_CHAR_CODE + 1   # = 26
```

- `ord("A")` converts the letter `"A"` to its ASCII integer value, **65**.
- `ord("Z")` = **90**.
- `CHAR_RANGE` = 90 − 65 + 1 = **26** — the number of letters in the alphabet. This is used for wrapping around (e.g., Z + 1 → A).

## The `caesar_shift` Function

```py
def caesar_shift(message, shift):
    result = ""
```
A placeholder string collects the output as we build it up.

### Main Loop

```py
for char in message.upper():
```
- Iterates through every character in the message, **converted to uppercase** so the cipher is case-insensitive (lowercase becomes uppercase).
- **Spaces, digits, and punctuation** fall through to the `else` branch and are copied unchanged.

### Handling Letters

```py
if char.isalpha():
    char_code = ord(char)             # e.g., 'H' -> 72
    new_char_code = char_code + shift # apply the shift
```
`.isalpha()` is `True` only for letters A–Z (since we uppercased).

### Wrapping Around the Alphabet

The alphabet is treated as circular: after `Z` comes `A`, and before `A` comes `Z`. The two `if` statements enforce this:

```py
if new_char_code > LAST_CHAR_CODE:     # past 'Z'
    new_char_code -= CHAR_RANGE        # wrap back by 26

if new_char_code < FIRST_CHAR_CODE:    # before 'A' (negative shift)
    new_char_code += CHAR_RANGE        # wrap forward by 26
```

**Forward wrap example** — `Z` with shift 1:
- `90 + 1 = 91` → greater than 90 → `91 − 26 = 65` → `'A'` ✅

**Backward wrap example** — `A` with shift −1:
- `65 − 1 = 64` → less than 65 → `64 + 26 = 90` → `'Z'` ✅

Note: since `shift` is a single integer, `new_char_code` can only be off by at most one "wrap" from the valid range (for reasonable shift values), which is why two simple `if`s suffice.

### Convert Back and Append

```py
new_char = chr(new_char_code)   # ASCII number -> character
result += new_char
```

### Non-Letter Characters

```py
else:
    result += char   # spaces, punctuation, digits kept as-is
```

Finally, `return result`.

## The Driver Code

```py
user_message = input("Message to Encrypt: ")
user_shift_key = int(input("Shift Key (integer): "))
cipher_text = caesar_shift(user_message, user_shift_key)
print(f"Cipher Text: {cipher_text}")
```
1. Prompt for the message (string).
2. Prompt for the shift key (converted to `int`).
3. Call the cipher function.
4. Print the result.

## Worked Example

Input: `"Attack at Dawn"`, shift `3`

| Original | ASCII | +3 | Cipher |
|----------|-------|-----|--------|
| A | 65 | 68 | D |
| T | 84 | 87 | W |
| T | 84 | 87 | W |
| A | 65 | 68 | D |
| C | 67 | 70 | F |
| K | 75 | 78 | N |
| (space) | — | — | (space) |
| A | 65 | 68 | D |
| T | 84 | 87 | W |
| (space) | — | — | (space) |
| D | 68 | 71 | G |
| A | 65 | 68 | D |
| W | 87 | 90 | Z |
| N | 78 | 81 | Q |

Output: `"DWWDFN DW GDZQ"`

## Key Takeaways

- **`ord()` / `chr()`** convert between characters and their numeric ASCII codes.
- **Modular arithmetic** (achieved here via `if` + `CHAR_RANGE`) makes the alphabet wrap around.
- **`isalpha()` + `.upper()`** limits the transformation to letters while leaving other characters untouched.
- The function is **symmetric**: calling it again with shift `26 − n` (or `−n`) decrypts the text, which is the defining property of a Caesar cipher.

---

### Reference
pixegami. November 14, 2022. *Python beginner project: Build a Caesar cipher encryption app*. YouTube. https://www.youtube.com/watch?v=x71kJyNvB5o