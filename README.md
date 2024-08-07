## Useful Links:

- [Piyush: Sign in with Javascript Passkeys | Web Authentication](https://youtu.be/O3j73J_LKE0?si=gIItiP0sBPjUYNQh)
- [Theo: Passkeys: The Future Of Authentication](https://youtu.be/pK3AtW7Ov90?si=jj6sHEC5Q91OlKP-)
- [SimpleWebAuthn](https://simplewebauthn.dev/docs/packages/server#2-verify-authentication-response)
- [Apple Developer Passkeys](https://developer.apple.com/passkeys/)
- [Google: Passwordless Login with Passkeys](https://developers.google.com/identity/passkeys/)

### How WebAuthn Works:

1. **Registration:**

   - The user initiates the registration process on a website.
   - The server generates a challenge and sends it to the user's device.
   - The user's authenticator generates a key pair and signs the challenge with the private key.
   - The signed challenge and the public key are sent back to the server, which stores the public key for future authentication.

2. **Authentication:**
   - The user attempts to log in to the website.
   - The server generates a new challenge and sends it to the user's device.
   - The user's authenticator signs the challenge with the private key.
   - The signed challenge is sent back to the server, which verifies the signature using the stored public key.

### Benefits of WebAuthn:

- **Enhanced Security:** WebAuthn eliminates the need for passwords, reducing the risk of password-related attacks (e.g., phishing, credential stuffing).
- **User Convenience:** Users can authenticate using biometrics or hardware tokens, making the process quicker and easier.
- **Interoperability:** WebAuthn is supported by all major browsers and platforms, making it a versatile solution for secure authentication.

### WebAuthn and Usernameless Authentication:

In usernameless authentication, the user does not provide a username before authentication. Instead, they present any WebAuthn credential they have for the site. The server must handle this by checking all stored public keys associated with the domain to find a match, which makes tracking challenges more complex.

### Role of Biometrics (Fingerprint, Face Recognition, etc.):

**Biometric Data:**

- Biometric methods like fingerprint scans, face recognition, or patterns are used to unlock or authorize the use of the private key.
- These methods provide a way to ensure that only the legitimate user can use the private key.
- The actual biometric data is not the private key; rather, it is a means of verifying the user's identity locally on the device.

### Key Points:

- **Private Key:** A cryptographic key stored securely on the device, used to sign authentication challenges.
- **Biometric Methods:** Used to verify the user's identity and unlock the private key for signing.
- **Public Key:** Stored on the server and used to verify the signatures created by the private key.

When you create a passkey on one device, like your MacBook, it can be synchronized across your other devices, such as your iPhone, through a secure cloud service. This synchronization ensures that you can use the passkey for authentication on all your devices without having to create a new passkey for each one.

### How Synchronization Works:

1. **Initial Creation:**

   - You create a passkey on your MacBook.
   - The private key is generated and stored securely on the MacBook.
   - The public key is sent to the server.

2. **Synchronization:**

   - The private key, or a cryptographic representation of it, is securely synchronized to your other devices (e.g., iPhone) using a cloud service such as iCloud Keychain (for Apple devices).
   - This process is handled securely, ensuring that the private key is protected during synchronization and storage.

3. **Authentication on Another Device (iPhone):**
   - When you attempt to log in from your iPhone, the device can access the synchronized private key.
   - The iPhone will use the private key to sign the authentication challenge.
   - The signed challenge is sent back to the server.
   - The server verifies the signature using the stored public key, confirming your identity.

### Key Points:

- **Secure Storage and Synchronization:** The private key is stored securely on each device and synchronized via a secure cloud service.
- **Seamless Authentication:** You can authenticate on any of your synchronized devices without needing to create new passkeys.
- **Biometric or Other Authentication Methods:** Each device may use its own biometric methods (fingerprint, Face ID) or other authentication mechanisms to authorize the use of the private key.

### Example with Apple Devices:

Apple's ecosystem provides a practical example of how this works:

1. **Creating a Passkey:**

   - You create a passkey on your MacBook using Touch ID.
   - The private key is stored in the Secure Enclave on the MacBook, and the public key is sent to the server.

2. **Synchronizing via iCloud Keychain:**

   - The private key is securely synchronized to your iPhone using iCloud Keychain.
   - iCloud Keychain uses end-to-end encryption, ensuring that only your devices can access the keys.

3. **Logging in on iPhone:**
   - You open the app or website on your iPhone and attempt to log in.
   - The iPhone uses Face ID or Touch ID to authorize the use of the private key.
   - The private key signs the authentication challenge, and the signed challenge is sent to the server for verification.

### Benefits of This Approach:

- **Consistency Across Devices:** Users have a consistent and seamless experience across all their devices.
- **Enhanced Security:** The private key remains protected and never leaves the secure storage on the device.
- **Convenience:** Users do not need to manage multiple passkeys for different devices.

By synchronizing the private key across devices, passkeys provide a secure and convenient method for passwordless authentication that works seamlessly across an ecosystem of devices.
