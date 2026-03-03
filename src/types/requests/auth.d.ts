type LoginRequest = {
    email: string;
    password: string;
    remember?: boolean;
};

type RegisterRequest = {
    first: string;
    last: string;
    email: string;
    code?: string;
    terms: boolean;
    password: string;
    password_confirmation: string;
};

type ForgotPasswordRequest = {
    email: string;
};

type ResendEmailVerificationRequest = {
    email: string;
};

type ResetPasswordRequest = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ContactRequest = {
    name: string;
    email: string;
    message: string;
};

type Confirm2FAChallengeRequest = {
    code?: string;
    recovery_code?: string;
};

type ThirdPartyOauthRequest = {
    provider: string;
    code: string;
    state: string;
};


type BroadcastingRequest = {
    socket_id: string;
    channel_name: string;
};
