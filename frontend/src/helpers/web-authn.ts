import { v4 as uuid } from "uuid";
import { stringToBuffer } from "./utils";

const user = {
	displayName: "Devesh Kumar",
	uid: "abcdefghijkmlm",
	identifier: "contact@devesh.tech",
};

export const isWebAuthnSupported = () => {
	return !!navigator.credentials || !window.PublicKeyCredential;
};

export const registerWebAuthn = () => {
	const publicKeyCreateOptions = {
		// This is to make sure that the navigator doesn't run duplicate auth checks for the same user and the same auth instance.
		// And to prevent such replay-attacks
		challenge: stringToBuffer(uuid()),
		// Your app's information
		rp: {
			name: "Local WebAuthN Restricted App",
			id: window.location.hostname,
		},
		// Your user's information who this credential will be linked to
		user: {
			id: stringToBuffer(user.uid),
			name: user.identifier,
			displayName: user.displayName,
		},
		// Specifier for the algorithm type, this is the confusing part, but not something you have to worry about.
		// Unless of course, supercomputers and quantum computers figure out how to break public-key cryptography.
		pubKeyCredParams: [-7, -257].map((algId) => ({
			alg: algId,
			type: "public-key",
		})),
		// Whether this credential is being created for a cross-platform entity or from a platform-specific method available to the browser like OS's FingerPrint scanner or Windows Hello
		authenticatorSelection: {
			authenticatorAttachment: "platform",
		},
		timeout: 60000,
		// Whether the user details are stored in the authentication generated information at the end of the process
		attestation: "none",
	} as PublicKeyCredentialCreationOptions;

	console.log("[PublicKeyCreateOptions]", publicKeyCreateOptions);

	return navigator.credentials.create({ publicKey: publicKeyCreateOptions });
};

export const getWebAuthnCredentials = (credential: PublicKeyCredential) => {
	const credentialGetterOptions = {
		challenge: stringToBuffer(uuid()),
		extensions: {},
		rpId: window.location.hostname,
		userVerification: "preferred",
		allowCredentials: [
			{
				id: credential.rawId,
				type: "public-key",
				transports: ["internal"],
			},
		],
		timeout: 60000,
	} as PublicKeyCredentialRequestOptions;

	console.log("[PublicKeyCredentialGetterOptions]", credentialGetterOptions);

	return navigator.credentials.get({ publicKey: credentialGetterOptions });
};
