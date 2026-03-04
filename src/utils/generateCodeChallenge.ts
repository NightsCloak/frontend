import { base64UrlEncode, hexToBinary, sha256 } from '@/utils/crypto';

// Generate PKCE code challenge (RFC-7636 compliant)
function generateCodeChallenge(codeVerifier: string): string {
    const hash = sha256(codeVerifier);
    const binary = hexToBinary(hash);
    return base64UrlEncode(binary);
}

export default generateCodeChallenge;
