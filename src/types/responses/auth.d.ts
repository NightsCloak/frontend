type LoginResponse = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
};

type LoginError = {
    status: number;
    data: {
        message: string;
        errors?: {
            email?: string[];
            password?: string[];
        };
    };
};

type PkceAuthResponse = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    message?: string;
    errors?: {
        username?: string[];
        password?: string[];
    };
};

type ThirdPartyOauthResponse = {
    access_token?: string;
    login: boolean;
    linked: boolean;
};

type BroadcastingResponse = {
    auth: string;
    channel_data?: string;
};

type RegisterResponse = {
    message: string;
    errors?: {
        first?: string[];
        last?: string[];
        email?: string[];
        code?: string[];
        terms?: string[];
        password?: string[];
    };
};

type ForgotPasswordResponse = {
    message: string;
    errors?: {
        email: string[];
    };
};

type ResendEmailVerificationResponse = {
    message: string;
    errors?: {
        email: string[];
    };
};

type ResetPasswordResponse = {
    message: string;
    errors?: {
        email?: string[];
        password?: string[];
    };
};

type VerifyEmailResponse = {
    message: string;
};

type ContactResponse = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};
