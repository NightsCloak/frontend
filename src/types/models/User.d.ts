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
    slug: string;
    tier: UserTier;
    tier_display: {
        name: string;
        storage_limit: number;
        storage_limit_human: string;
    };
    used_storage: FileSize;
    is_guest?: boolean;
    has_available_storage: boolean;
    is_admin: boolean;
    is_enabled: boolean;
    is_verified: boolean;
    has_password: boolean;
    dark_mode: boolean;
    can_trial_organization: boolean;
    last_active_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    assets_count?: number;
    asset_collections_count?: number;
    textures_count?: number;
    ai_textures_count?: number;
    logins_count?: number;
    unread_notifications_count?: number;
    pending_organization_members_count?: number;
    organization_members_count?: number;
    current_subscription?: UserSubscription | null;
};

type UserSettings = { admin: boolean; developer: boolean; verified: boolean | null; darkMode: boolean } | null;

type UserTier = 'free' | 'tier-1' | 'tier-2' | 'tier-3' | 'unlimited';
