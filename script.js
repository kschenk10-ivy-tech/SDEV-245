const show = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

const encode = text => new TextEncoder().encode(text);
const decode = data => new TextDecoder().decode(data);

const hash = async data => {
  const result = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(result))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
};

let key, iv, cipher, originalHash, fileName, blobUrl = null;

function clearDownload() {
  const download = document.getElementById("download");
  if (!download) return;
  download.hidden = true;
  download.removeAttribute("href");
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl); // free the old blob
    blobUrl = null;
  }
}

// Encrypt
document.getElementById("encrypt").onclick = async () => {
  try {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput && fileInput.files[0];
    const messageEl = document.getElementById("message");
    const message = messageEl ? messageEl.value : "";

    if (!file && !message) {
      show("result", "Please enter a message or choose a file.");
      return;
    }

    const data = file ? await file.arrayBuffer() : encode(message);
    const newFileName     = file ? file.name : null;
    const newOriginalHash = await hash(data);

    const newKey = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    const newIv = crypto.getRandomValues(new Uint8Array(12));
    const newCipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: newIv },
      newKey,
      data
    );

    // Commit state only after everything succeeds
    key          = newKey;
    iv           = newIv;
    cipher       = newCipher;
    originalHash = newOriginalHash;
    fileName     = newFileName;

    show("originalHash", originalHash);
    show("cipher", "Encrypted (" + cipher.byteLength + " bytes)");
    show("plain", "—");
    show("result", "—");
    clearDownload();
  } catch (error) {
    show("result", "Encryption failed: " + error.message);
  }
};

// Decrypt and verify
document.getElementById("decrypt").onclick = async () => {
  if (!cipher || !key || !iv) {
    show("result", "Encrypt something first.");
    return;
  }

  try {
    const data = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipher
    );

    const newHash = await hash(data);
    show("result", originalHash === newHash
      ? "Success: Hashes match!"
      : "Warning: Hashes do not match!");

    clearDownload();

    if (fileName) {
      show("plain", "File decrypted: " + fileName);
      blobUrl = URL.createObjectURL(new Blob([data]));
      const download = document.getElementById("download");
      download.href = blobUrl;
      download.download = fileName;
      download.hidden = false;
    } else {
      show("plain", decode(data));
    }
  } catch (error) {
    show("result", "Decryption failed or data was modified: " + error.message);
  }
};