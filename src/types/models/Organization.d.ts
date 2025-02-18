type Organization = {
    _morphType: 'organization';
    id: string;
    name: string;
    slug: string;
    pm_type: string | null;
    pm_last_four: string | null;
    tier: OrganizationTier;
    billable_seats_quantity: number;
    tier_display: OrganizationTierDisplay;
    supports_teams: boolean;
    is_trial_used: boolean;
    is_locked: boolean;
    has_testing_access: boolean;
    joinable_route: string | null;
    avatar: string | null;
    avatar_route: string | null;
    banner: string | null;
    banner_route: string | null;
    used_storage: FileSize;
    has_available_storage: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    members_count?: number;
    projects_count?: number;
    member?: Member;
    current_subscription?: OrganizationSubscription | null;
    owner?: OrganizationMember | null;
};

type OrganizationTier = 'free' | 'professional' | 'team' | 'enterprise';

type OrganizationTierDisplay = {
    name: string;
    storage_limit: number;
    storage_limit_human: string;
    has_available_storage: boolean;
    projects_limit: number;
    billable_members_limit: number;
};
