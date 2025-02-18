export default function generateAuthQuery(auth: AuthState) {
    const query = {
        client_id: import.meta.env.VITE_PKCE_LOCAL_ID,
        redirect_uri: `http://${window.location.host}/auth/callback`,
        response_type: 'code',
        scope: '',
        state: auth.pkce.challenge_state,
        code_challenge: auth.pkce.challenge.codeChallenge,
        code_challenge_method: 'S256',
    };

    return Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
