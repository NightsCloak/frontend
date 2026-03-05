import apiSlice from '../apiSlice';

const user = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        waitListSignUp: builder.mutation<WaitListSignUpResponse, WaitListSignUpRequest>({
            query: ({ first, last, email }) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    first,
                    last,
                    email,
                },
            }),
        }),
        getUser: builder.query<User, null>({
            query: () => ({
                url: 'user',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        getUserLogins: builder.query<UserLoginsResponse, null>({
            query: () => ({
                url: 'user/logins?limit=10',
                method: 'GET',
            }),
        }),
        updateUserAvatar: builder.mutation<UpdateAvatarResponse, UpdateUserAvatarRequest>({
            query: ({ avatar }) => ({
                url: 'user/avatar',
                method: 'POST',
                body: avatar,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUserAvatar: builder.mutation<void, void>({
            query: () => ({
                url: 'user/avatar',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        updateUserName: builder.mutation<UpdateNameResponse, UpdateUserNameRequest>({
            query: ({ first, last }) => ({
                url: 'user/name',
                method: 'PUT',
                body: { first, last },
            }),
            // invalidatesTags: ['User'],
        }),
        updateUserSettings: builder.mutation<User, UpdateUserSettingsRequest>({
            query: ({ is_onboarded, onboarding }) => ({
                url: 'user/settings',
                method: 'PUT',
                body: { is_onboarded, onboarding },
            }),
            invalidatesTags: ['User'],
        }),
        updateUserEmail: builder.mutation<UpdateEmailResponse, UpdateUserEmailRequest>({
            query: ({ current_password, email }) => ({
                url: 'user/email',
                method: 'PUT',
                body: { current_password, email },
            }),
            invalidatesTags: ['User'],
        }),
        updateUserPassword: builder.mutation<UpdatePasswordResponse, UpdateUserPasswordRequest>({
            query: ({ current_password, password, password_confirmation }) => ({
                url: 'user/password',
                method: 'PUT',
                body: { current_password, password, password_confirmation },
            }),
        }),
        setUserPassword: builder.mutation<UpdatePasswordResponse, SetUserPasswordRequest>({
            query: ({ password, password_confirmation }) => ({
                url: 'user/set-password',
                method: 'PUT',
                body: { password, password_confirmation },
            }),
        }),
        deleteUserAccount: builder.mutation<DeleteAccountResponse | void, DeleteUserAccountRequest>({
            query: ({ current_password }) => ({
                url: 'user/delete',
                method: 'POST',
                body: { current_password },
            }),
        }),
        enable2FA: builder.mutation<{ svg: string }, TwoFactorActionRequest>({
            query: ({ current_password }) => ({
                url: 'user/2fa/enable',
                method: 'POST',
                body: { current_password },
            }),
            invalidatesTags: ['User'],
        }),
        confirm2FA: builder.mutation<string[], ConfirmTwoFactorRequest>({
            query: ({ code }) => ({
                url: 'user/2fa/confirm',
                method: 'POST',
                body: { code },
            }),
            invalidatesTags: ['User'],
        }),
        get2FAQrCode: builder.mutation<{ svg: string }, null>({
            query: () => ({
                url: 'user/2fa/qr-code',
                method: 'GET',
            }),
        }),
        get2FASecret: builder.mutation<{ secret: string }, TwoFactorActionRequest>({
            query: ({ current_password }) => ({
                url: 'user/2fa/key',
                method: 'POST',
                body: { current_password },
            }),
        }),
        get2FARecoveryCodes: builder.mutation<string[], TwoFactorActionRequest>({
            query: ({ current_password }) => ({
                url: 'user/2fa/recovery-codes',
                method: 'POST',
                body: { current_password },
            }),
        }),
        regenerate2FARecoveryCodes: builder.mutation<string[], TwoFactorActionRequest>({
            query: ({ current_password }) => ({
                url: 'user/2fa/recovery-codes',
                method: 'PUT',
                body: { current_password },
            }),
            invalidatesTags: ['User'],
        }),
        disable2FA: builder.mutation<null, TwoFactorActionRequest>({
            query: ({ current_password }) => ({
                url: 'user/2fa/disable',
                method: 'POST',
                body: { current_password },
            }),
            invalidatesTags: ['User'],
        }),
        getUserSocialAccount: builder.query<UserSocialAccount, null>({
            query: () => ({
                url: 'user/social',
                method: 'GET',
            }),
            providesTags: ['user-social-account'],
        }),
        removeUserSocialAccount: builder.mutation<null, RemoveUserSocialAccountRequest>({
            query: ({ provider, current_password }) => ({
                url: `user/social/${provider}/remove`,
                method: 'PUT',
                body: { current_password },
            }),
            invalidatesTags: ['user-social-account'],
        }),
    }),
});

export default user;
export const {
    useWaitListSignUpMutation,
    useGetUserQuery,
    useGetUserLoginsQuery,
    useUpdateUserAvatarMutation,
    useDeleteUserAvatarMutation,
    useUpdateUserNameMutation,
    useUpdateUserSettingsMutation,
    useUpdateUserEmailMutation,
    useUpdateUserPasswordMutation,
    useSetUserPasswordMutation,
    useDeleteUserAccountMutation,
    useEnable2FAMutation,
    useConfirm2FAMutation,
    useGet2FAQrCodeMutation,
    useGet2FASecretMutation,
    useGet2FARecoveryCodesMutation,
    useRegenerate2FARecoveryCodesMutation,
    useDisable2FAMutation,
    useGetUserSocialAccountQuery,
    useRemoveUserSocialAccountMutation,
} = user;
