# How to Verify File Integrity Using SHA-256

To verify file integrity using SHA-256, calculate the cryptographic hash of a file by reading it in chunks and compare the resulting hash against a known, expected hash value. Reading files in chunks reduces memory usage and allows applications to process large files efficiently without loading the entire file into memory (BitBootcamp, n.d.; GeeksforGeeks, 2025; santoshcgpandey, 2025).

### Python Implementation

Python provides the built-in `hashlib` module for calculating SHA-256 hashes and the `hmac.compare_digest()` function for performing timing-attack-resistant comparisons of hash values (BitBootcamp, n.d.; GeeksforGeeks, 2025).

```
import hashlib
import hmac

def calculate_sha256(file_path: str) -> str:
    """Computes the SHA-256 hash of a file by reading it in 64KB chunks."""
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(65536):
            sha256.update(chunk)
    return sha256.hexdigest()

def verify_file_integrity(file_path: str, expected_hash: str) -> bool:
    """Verifies if the file's SHA-256 hash matches the expected hash."""
    actual_hash = calculate_sha256(file_path)
    # Normalize case and use timing-attack-resistant comparison
    return hmac.compare_digest(actual_hash.lower(), expected_hash.strip().lower())

# Example usage
is_valid = verify_file_integrity("example.zip", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
print(f"File intact: {is_valid}")
```

### Node.js (JavaScript) Implementation

In Node.js, the built-in `crypto` module can be used with file streams to calculate SHA-256 hashes asynchronously without blocking the event loop during file reading. The `crypto.timingSafeEqual()` function provides a timing-attack-resistant method for comparing hash values of equal length (DataByte Ltd., 2026).

```
const crypto = require('crypto');
const fs = require('fs');

function calculateSha256(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
}

async function verifyFileIntegrity(filePath, expectedHash) {
  const actualHash = await calculateSha256(filePath);
  const actualBuffer = Buffer.from(actualHash.toLowerCase(), 'utf8');
  const expectedBuffer = Buffer.from(expectedHash.trim().toLowerCase(), 'utf8');

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

// Example usage
verifyFileIntegrity('example.zip', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  .then((isValid) => console.log(`File intact: ${isValid}`))
  .catch(console.error);

```

---


## Implement a SHA-256 hash to verify file integrity


> Every major OS includes built-in tools: 

**Linux**
`sha256sum /path/to/file`
**macOS**
`shasum -a 256 /path/to/file`
**Windows (PowerShell)**
`Get-FileHash C:\path\to\file -Algorithm SHA256`
**Windows (CMD)**
`certutil -hashfile C:\path\to\file SHA256`
    

### Best Practices

**Use a trusted source for the expected hash.** Obtain the expected SHA-256 hash through a trusted, authenticated source, such as an official HTTPS website or a digitally signed manifest. A hash distributed alongside an unverified file without independent authentication may be altered by an attacker, making the comparison unreliable (santoshcgpandey, 2025).

----------

## References

BitBootcamp. (n.d.). *Integrity: Verify a SHA-256 hash* Interactive lab. https://bitbootcamp.com/lab?nb=notebooks/cyber/hash-integrity-verify.ipynb

DataByte Ltd. March 12, 2026. *How to verify file integrity with SHA-256 (Windows, Mac & Linux)*. Bitkode. https://bitkode.com/how-to-verify-file-integrity-with-sha-256-windows-mac-linux/


GeeksforGeeks. July 23, 2025. *Verify integrity of files using digest in Python*.  https://www.geeksforgeeks.org/python/verify-integrity-of-files-using-digest-in-python/

santoshcgpandey. April 13, 2025. *Hashing made simple: How MD5 and SHA-256 ensure data integrity*. Medium. https://medium.com/@santoshcgpandey/hashing-made-simple-how-md5-and-sha-256-ensure-data-integrity-235ad06fb4f2