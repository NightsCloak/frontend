import apiSlice from '@/redux/apiSlice';

const userNotifications = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.mutation<UserNotificationsResponse, GetUserNotificationsRequest>({
            query: ({ options }) => ({
                url: `user/notifications${options}`,
                method: 'GET',
            }),
        }),
        markUserNotificationRead: builder.mutation<null, MarkUserNotificationReadRequest>({
            query: ({ notificationId }) => ({
                url: `user/notifications/${notificationId}/mark-read`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        markAllUserNotificationsRead: builder.mutation<null, null>({
            query: () => ({
                url: `user/notifications/mark-read`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        markAllUserNotificationsFromOrganizationRead: builder.mutation<
            null,
            MarkUserNotificationsFromOrganizationReadRequest
        >({
            query: ({ orgId }) => ({
                url: `user/notifications/mark-read/${orgId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        clearAllUserNotifications: builder.mutation<null, null>({
            query: () => ({
                url: `user/notifications/clear`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        clearAllUserNotificationsFromOrganization: builder.mutation<
            null,
            ClearAllUserNotificationsFromOrganizationRequest
        >({
            query: ({ orgId }) => ({
                url: `user/notifications/clear/${orgId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export default userNotifications;
export const {
    useGetUserNotificationsMutation,
    useMarkUserNotificationReadMutation,
    useMarkAllUserNotificationsReadMutation,
    useMarkAllUserNotificationsFromOrganizationReadMutation,
    useClearAllUserNotificationsMutation,
    useClearAllUserNotificationsFromOrganizationMutation,
} = userNotifications;
