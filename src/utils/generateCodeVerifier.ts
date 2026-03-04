// Generate a random code verifier (RFC-7636 compliant)
function generateCodeVerifier(length: number = 43): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
        .map((b) => charset[b % charset.length])
        .join('');
}

export default generateCodeVerifier;
