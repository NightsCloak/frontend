interface AuthState {
    status: boolean;
    xsrfToken: string | null;
    redirect: string | null;
    intended: string | null;
    pkce: {
        lastCheck: string;
        accessToken: string;
        refreshToken: string | null;
        expiresIn: string | null;
        challenge: {
            codeChallenge: string;
            codeVerifier: string;
        };
        challenge_state: string;
    };
}
