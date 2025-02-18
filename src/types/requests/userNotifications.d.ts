type GetUserNotificationsRequest = {
    options?: QueryFilterOptions;
};

type MarkUserNotificationReadRequest = {
    notificationId: string;
};

type MarkUserNotificationsFromOrganizationReadRequest = {
    orgId: string;
};

type ClearAllUserNotificationsFromOrganizationRequest = {
    orgId: string;
};
