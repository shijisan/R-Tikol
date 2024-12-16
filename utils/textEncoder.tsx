export function encodeText(text: string): Uint8Array {
   const encoder = new TextEncoder();  // Create a new TextEncoder instance
   return encoder.encode(text);        // Encode the text into a Uint8Array
}
