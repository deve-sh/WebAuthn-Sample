# Example Payloads and Responses when working with WebAuthn

#### Example Payload for `PublicKeyCredentialCreationOptions`

```typescript
{
    challenge: ArrayBuffer(CreatedFromRandomStringSentByServer),  // This is only to make sure that the client-sent data is from a session started by the server.

    // Stands for Relying Party which is the app using WebAuthn
    rp: {
        name: "Local WebAuthn Restricted App",
        id: "localhost"   // window.location.hostname
    },
    user: {
        id: ArrayBuffer(FromUserUID),
        name: "contact@devesh.tech",  response: {
            attestationObject: ArrayBuffer(),
            clientDataJSON: ArrayBuffer(),
        },
        type: 'public-key'
        displayName: "Devesh Kumar"
    },
    pubKeyCredParams: [
        {
            alg: -7,
            type: "public-key"
        },
        {
            alg: -257,
            type: "public-key"
        }
    ],
    authenticatorSelection: {
        authenticatorAttachment: "platform"
    },
    timeout: 60000,
    attestation: "none"
}
```

#### Example Response from `navigator.credentials.create` after getting the user to enter their device information

```typescript
{
    authenticatorAttachment: "platform",
    id: "WkOWO5tpVQMDD0y9l_xovkmJ8_MsLoWEM8Z8q2fBWZw",
    rawId: ArrayBuffer(OfTheIdAbove),
    response: {
        attestationObject: ArrayBuffer(),
        clientDataJSON: ArrayBuffer(),
    },
    type: 'public-key'
}
```

#### Example Payload for `navigator.credentials.get` to retreive a signature from the created credential IDs

```typescript
{
    challenge: ArrayBuffer(),
    rpId: "localhost",
    userVerification: "preferred",
    // An array of all the credentials the user has saved as part of WebAuthn on the server
    // The client browser will select the most appropriate one and use that to authenticate and generate a signature
    allowCredentials: [
        {
            id: ArrayBuffer(FromTheRawIDOfTheCreateResponse),
            type: "public-key",
            transports: [
                // This is the internal transport which means platform-specific methods like Fingerprint or device pin, if you want Yubikey-like inputs you can use 'usb' and other available transports.
                "internal"
            ]
        }
    ],
    timeout: 60000
}
```

#### Example response from `navigator.credential.get` that can be sent to the server for final verification

```js
{
	authenticatorAttachment: null,
    id: "WkOWO5tpVQMDD0y9l_xovkmJ8_MsLoWEM8Z8q2fBWZw",
    rawId: ArrayBuffer(),
    type: "public-key",
    response: {
        authenticatorData: ArrayBuffer(),
        clientDataJSON: ArrayBuffer(),
        signature: ArrayBuffer(),
        userHandle: ArrayBuffer(),
    }
}
```
