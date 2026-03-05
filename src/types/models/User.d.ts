type User = {
    _morphType: 'user';
    id: string;
    first: string;
    last: string;
    name: string;
    initials: string | null;
    email: string;
    avatar: string | null;
    avatar_route: string | null;
    chronicles_count?: number;
    slug: string;
    is_admin: boolean;
    is_enabled: boolean;
    is_verified: boolean;
    has_password: boolean;
    has_2fa_enabled: boolean;
    dark_mode: boolean;
    last_active_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    logins_count?: number;
    unread_notifications_count?: number;
};

type UserSettings = { admin: boolean; developer: boolean; verified: boolean | null; darkMode: boolean } | null;

type UserSocialAccount = {
    _morphType: 'userSocialAccount';
    user_id: string;
    has_discord: boolean;
    discord_id: string | null;
    discord_email: string | null;
    has_google: boolean;
    google_id: string | null;
    google_email: string | null;
    created_at: string;
    updated_at: string;
};

type ThirdPartyProvider = 'discord' | 'google' | 'slack' | 'roblox' | 'cfx';
