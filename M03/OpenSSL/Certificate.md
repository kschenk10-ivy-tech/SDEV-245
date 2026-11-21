## Self-Signed SSL/TLS Certificate Setup

This project uses a self-signed X.509 certificate generated via OpenSSL in Git Bash.

### 1. Generated the Private Key and Certificate

Command to generate a 2048-bit RSA private key (`mydomain.key`) and a self-signed certificate (`mydomain.crt`) valid for 3 days:

```bash
openssl req -x509 -nodes -days 3 -newkey rsa:2048 -keyout mydomain.key -out mydomain.crt
```

*(Note: Ensure `*.key` is added to `.gitignore` file so the private key is never committed to the repository.)*

### 2. Verify the Certificate Details

To inspect the generated X.509 certificate metadata and confirm the subject details, run:

```bash
openssl x509 -in mydomain.crt -text -noout
```

**Output:**

```text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            34:b7:be:4a:72:08:dd:10:46:43:45:e4:25:c6:e7:49:59:c6:7b:0b
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, ST=Indiana, L=Evansville, O=My Org, OU=My Section, CN=Khristin, emailAddress=kschenk10@ivytech.edu
        Validity
            Not Before: Nov 18 03:06:40 2026 GMT
            Not After : Nov 21 03:06:40 2026 GMT
        Subject: C=US, ST=Indiana, L=Evansville, O=My Org, OU=My Section, CN=Khristin, emailAddress=kschenk10@ivytech.edu
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:a2:3f:f3:89:20:1f:63:cb:16:0c:94:35:1e:64:
                    7d:51:52:54:2e:24:c5:43:03:45:6d:e2:36:50:ab:
                    4d:84:57:3a:92:51:5b:95:8a:a3:ac:c4:93:f8:04:
                    13:7d:85:d1:39:fe:8f:11:e8:bb:12:04:ab:d4:c1:
                    b5:33:e8:70:2e:55:a3:3b:fd:93:34:3c:c8:77:2e:
                    37:ae:fd:28:41:3e:3d:5d:b8:5d:08:92:8d:d4:39:
                    94:3f:41:93:ad:6d:69:6f:68:c0:8b:92:26:de:10:
                    c2:49:d2:fd:a7:ab:af:57:27:d9:d2:5d:b4:75:44:
                    ec:b6:48:04:0f:ed:9f:45:a2:3b:dc:d1:0b:1a:36:
                    46:6a:65:5e:c8:f6:6a:91:99:ed:e1:d8:40:78:0f:
                    03:05:2f:28:32:86:2a:d1:97:39:e5:e0:1f:bd:b1:
                    88:cf:21:92:7b:c6:fd:e2:83:3b:79:2e:47:62:66:
                    03:44:85:5e:74:32:43:60:a5:18:8f:58:fd:9d:75:
                    c9:4f:d2:66:d1:6e:f3:72:d7:b4:80:39:b3:70:bb:
                    6d:24:1a:58:07:10:62:1e:c2:51:41:28:09:bf:e1:
                    fe:9c:9a:4f:29:e5:d3:82:ef:83:c7:ce:1e:5d:22:
                    eb:57:f5:ab:97:99:d1:5a:17:10:1d:6b:22:72:33:
                    7e:77
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                7A:B2:8A:AB:B1:9E:5C:99:13:7B:2D:90:72:8A:BB:1F:F0:F6:8C:85
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        2a:2a:e2:91:f2:fb:99:9e:cc:c3:fc:14:29:a3:31:51:d7:6b:
        ae:af:92:a1:19:f8:48:82:a6:c8:bf:ff:17:e4:eb:6b:94:04:
        5d:69:eb:4c:f4:8c:59:5c:d6:c6:cc:cb:b9:d6:04:eb:e7:fa:
        5b:e1:6a:6b:9a:0f:55:92:7b:f0:bc:c2:32:a5:ae:bb:96:a4:
        9d:11:0e:74:51:da:3b:e6:88:43:ab:d5:98:21:63:b4:dc:0d:
        31:63:45:86:6d:a6:4f:03:7b:ce:b0:b0:68:2c:ec:d0:78:e9:
        05:02:c1:9d:e4:41:fe:03:24:1f:a8:7e:75:2b:fb:b2:4f:93:
        d0:5b:16:5f:7c:b0:09:38:c7:60:4e:18:3c:c0:e0:e8:46:13:
        d4:99:e1:62:db:b5:1e:ba:27:ea:a6:a4:55:05:93:42:d6:0a:
        e4:4e:fc:b8:a9:cc:9f:da:5c:12:a7:92:0d:5f:7b:fa:d1:a2:
        02:49:a2:e8:f7:72:42:f8:6c:4b:1b:d0:49:47:b2:d7:63:24:
        b3:68:8a:32:e3:81:6d:60:96:ab:54:64:f8:88:91:cd:f3:8e:
        88:22:19:b2:b8:78:26:bd:45:50:98:d6:c4:c6:66:bf:43:db:
        40:65:29:21:79:0f:bb:36:85:cc:cc:f8:72:64:9e:60:b7:12:
        bc:49:72:c8
```
