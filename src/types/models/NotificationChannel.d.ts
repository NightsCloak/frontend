type NotificationChannel = {
    _morphType: 'notificationChannel';
    id: string;
    notifiable_id: string;
    notifiable_type: string;
    name: string;
    type: NotificationChannelType;
    type_display: string;
    data: NotificationChannelData;
    subscription: NotificationChannelSubscription;
    is_verified: boolean;
    delivery_failures: number;
    created_at: string;
    updated_at: string;
};

type NotificationChannelType = 'discord' | 'slack';

type NotificationChannelSubscription = {
    assetAnnotationCommentCreated: boolean;
    assetArchived: boolean;
    assetCopied: boolean;
    assetCreated: boolean;
    assetMoved: boolean;
    assetVersionCreated: boolean;
    projectArchived: boolean;
    projectCreated: boolean;
    reviewArchived: boolean;
    reviewCommentCreated: boolean;
    reviewCreated: boolean;
    reviewStatusUpdated: boolean;
    reviewersUpdated: boolean;
};

type NotificationChannelData = DiscordChannelData | SlackChannelData;

type DiscordChannelData = {
    type: 'discord';
    webhook: string;
};

type SlackChannelData = {
    type: 'slack';
    webhook: string;
};
