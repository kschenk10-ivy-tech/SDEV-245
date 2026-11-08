const encode = text => new TextEncoder().encode(text);
const decode = bytes => new TextDecoder().decode(bytes);
const base64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const show = (id, value) => document.getElementById(id).textContent = value;
const input = id => document.getElementById(id).value;

let aesKey, aesIv, aesCipher;
document.getElementById('symmetricEncrypt').onclick = async () => {
	aesKey = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
	aesIv = crypto.getRandomValues(new Uint8Array(12));
	aesCipher = await crypto.subtle.encrypt({name: 'AES-GCM', iv: aesIv}, aesKey, encode(input('symmetricMessage')));
	show('symmetricCipher', base64(aesCipher));
	show('symmetricPlain', '—');
};
document.getElementById('symmetricDecrypt').onclick = async () => {
	if (!aesCipher) return show('symmetricPlain', 'Encrypt a message first.');
	const result = await crypto.subtle.decrypt({name: 'AES-GCM', iv: aesIv}, aesKey, aesCipher);
	show('symmetricPlain', decode(result));
};

let rsaKeys, rsaCipher;
document.getElementById('asymmetricEncrypt').onclick = async () => {
	rsaKeys = await crypto.subtle.generateKey(
		{name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256'},
		true, ['encrypt', 'decrypt']
	);
	rsaCipher = await crypto.subtle.encrypt({name: 'RSA-OAEP'}, rsaKeys.publicKey, encode(input('asymmetricMessage')));
	show('asymmetricCipher', base64(rsaCipher));
	show('asymmetricPlain', '—');
};
document.getElementById('asymmetricDecrypt').onclick = async () => {
	if (!rsaCipher) return show('asymmetricPlain', 'Encrypt a message first.');
	const result = await crypto.subtle.decrypt({name: 'RSA-OAEP'}, rsaKeys.privateKey, rsaCipher);
	show('asymmetricPlain', decode(result));
};