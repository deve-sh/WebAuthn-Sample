export const stringToBuffer = (value: string): ArrayBuffer => {
	const buffer = new ArrayBuffer(value.length * 2); // 2 bytes per char
	const view = new Uint16Array(buffer);
	for (let i = 0, length = value.length; i < length; i++) {
		view[i] = value.charCodeAt(i);
	}
	return buffer;
};
