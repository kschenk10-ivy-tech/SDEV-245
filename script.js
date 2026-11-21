
const show = (id, text) =>
  document.getElementById(id).textContent = text;

const encode = text => new TextEncoder().encode(text);
const decode = data => new TextDecoder().decode(data);

const hash = async data => {
  const result = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(result))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
};

let key, iv, cipher, originalHash, fileName;

// Encrypt
document.getElementById("encrypt").onclick = async () => {
  try {
    const file = document.getElementById("fileInput").files[0];
    const data = file
      ? await file.arrayBuffer()
      : encode(document.getElementById("message").value);

    fileName = file ? file.name : null;

    originalHash = await hash(data);
    show("originalHash", originalHash);

    key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    iv = crypto.getRandomValues(new Uint8Array(12));

    cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    show("cipher", "Encrypted (" + cipher.byteLength + " bytes)");
    show("plain", "—");
    show("result", "—");
    document.getElementById("download").hidden = true;
  } catch (error) {
    show("result", "Encryption failed: " + error.message);
  }
};

// Decrypt and verify
document.getElementById("decrypt").onclick = async () => {
  if (!cipher) {
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

    const download = document.getElementById("download");
    download.hidden = true;

    if (fileName) {
      show("plain", "File decrypted: " + fileName);

      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);

      download.href = url;
      download.download = fileName;
      download.hidden = false;
    } else {
      show("plain", decode(data));
    }
  } catch (error) {
    show("result", "Decryption failed or data was modified.");
  }
};
