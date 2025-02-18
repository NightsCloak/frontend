import apiSlice from '@/redux/apiSlice';

const adminUser = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecentUsersAdmin: builder.query<User[], null>({
            query: () => ({
                url: 'admin/users?limit=15&sort=-created',
                method: 'GET',
            }),
            transformResponse: (response: AdminGetUsersResponse) => response.data,
        }),
        getUsersAdmin: builder.mutation<AdminGetUsersResponse, AdminGetUsersRequest>({
            query: ({ options }) => ({
                url: `admin/users${options}`,
                method: 'GET',
            }),
        }),
        getUserAdmin: builder.query<User, AdminGetUserRequest>({
            query: ({ userId }) => ({
                url: `admin/users/${userId}?load=currentSubscription`,
                method: 'GET',
            }),
        }),
        updateUserAdmin: builder.mutation<User, AdminUpdateUserRequest>({
            query: ({ userId, is_enabled, is_admin, is_verified }) => ({
                url: `admin/users/${userId}`,
                method: 'PUT',
                body: { is_enabled, is_admin, is_verified },
            }),
        }),
        archiveUserAdmin: builder.mutation<null, AdminArchiveUserRequest>({
            query: ({ userId }) => ({
                url: `admin/users/${userId}`,
                method: 'DELETE',
            }),
        }),
        restoreUserAdmin: builder.mutation<User, AdminRestoreUserRequest>({
            query: ({ userId }) => ({
                url: `admin/users/${userId}/restore`,
                method: 'PUT',
            }),
        }),
        purgeUserAdmin: builder.mutation<null, AdminPurgeUserRequest>({
            query: ({ userId }) => ({
                url: `admin/users/${userId}/purge`,
                method: 'DELETE',
            }),
        }),
    }),
});

export default adminUser;
export const {
    useGetRecentUsersAdminQuery,
    useGetUsersAdminMutation,
    useGetUserAdminQuery,
    useUpdateUserAdminMutation,
    useArchiveUserAdminMutation,
    useRestoreUserAdminMutation,
    usePurgeUserAdminMutation,
} = adminUser;
