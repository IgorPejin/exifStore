function bufferToBase64(data) {
  let binary = "";
  let bytes = new Uint8Array(data.data);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default bufferToBase64;
