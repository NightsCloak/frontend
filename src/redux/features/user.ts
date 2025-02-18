import apiSlice from '@/redux/apiSlice';

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
        getUser: builder.query<User, undefined>({
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
        getUserPendingOrganizationMembers: builder.query<OrganizationMember[], null>({
            query: () => ({
                url: 'user/members/pending',
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
    }),
});

export default user;
export const {
    useWaitListSignUpMutation,
    useGetUserQuery,
    useGetUserLoginsQuery,
    useGetUserPendingOrganizationMembersQuery,
    useUpdateUserAvatarMutation,
    useDeleteUserAvatarMutation,
    useUpdateUserNameMutation,
    useUpdateUserEmailMutation,
    useUpdateUserPasswordMutation,
    useSetUserPasswordMutation,
    useDeleteUserAccountMutation,
} = user;
