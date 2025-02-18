import apiSlice from '@/redux/apiSlice';

const auth = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        heartbeat: builder.query<Heartbeat, void>({
            query: () => `oauth/heartbeat`,
        }),
        // Local Dev PKCE Token
        getToken: builder.mutation<PkceAuthResponse, { code: string; code_verifier: string }>({
            query: ({ code, code_verifier }) => ({
                url: `oauth/token`,
                method: 'POST',
                body: {
                    grant_type: 'authorization_code',
                    client_id: import.meta.env.VITE_PKCE_LOCAL_ID,
                    redirect_uri: `http://${window.location.host}/auth/callback`,
                    code_verifier,
                    code,
                },
            }),
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: ({ email, password, remember }) => ({
                url: 'oauth/login',
                method: 'POST',
                body: {
                    email,
                    password,
                    remember,
                },
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'oauth/logout',
                method: 'POST',
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
            query: ({ email }) => ({
                url: 'auth/passwords/forgot',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: ({ token, email, password, password_confirmation }) => ({
                url: 'auth/passwords/reset',
                method: 'POST',
                body: {
                    token,
                    email,
                    password,
                    password_confirmation,
                },
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: ({ first, last, email, code, terms, password, password_confirmation }) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    first,
                    last,
                    email,
                    code,
                    terms,
                    password,
                    password_confirmation,
                },
            }),
        }),
        contact: builder.mutation<ContactResponse, ContactRequest>({
            query: ({ name, email, message }) => ({
                url: 'contact',
                method: 'POST',
                body: {
                    name,
                    email,
                    message,
                },
            }),
        }),
        resendEmailVerification: builder.mutation<ResendEmailVerificationResponse, ResendEmailVerificationRequest>({
            query: ({ email }) => ({
                url: 'auth/email/resend',
                method: 'POST',
                body: { email },
            }),
        }),
        verifyEmail: builder.query<VerifyEmailResponse, { userId: string; emailHash: string }>({
            query: ({ userId, emailHash }) => ({
                url: `auth/email/verify/${userId}/${emailHash}`,
                method: 'GET',
            }),
        }),
        googleLoginRedirect: builder.mutation<{ url: string }, null>({
            query: () => ({
                url: 'auth/social/google/redirect',
                method: 'GET',
            }),
        }),
        googleLoginCallback: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
            query: ({ code, state }) => ({
                url: 'oauth/social/google/callback',
                method: 'POST',
                body: { code, state },
            }),
        }),
        broadcasting: builder.mutation<BroadcastingResponse, BroadcastingRequest>({
            query: ({ socket_id, channel_name }) => ({
                url: 'broadcasting/auth',
                method: 'POST',
                body: { socket_id, channel_name },
            }),
        }),
    }),
});

export default auth;
export const {
    useHeartbeatQuery,
    useGetTokenMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useContactMutation,
    useResendEmailVerificationMutation,
    useVerifyEmailQuery,
    useGoogleLoginRedirectMutation,
    useGoogleLoginCallbackMutation,
    useBroadcastingMutation,
} = auth;

export const { broadcasting } = auth.endpoints;
