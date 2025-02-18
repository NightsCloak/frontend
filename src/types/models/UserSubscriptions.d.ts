type UserSubscription = {
    _morphType: 'userSubscription';
    id: string;
    user_id: string;
    type: string;
    is_canceled: boolean;
    is_ended: boolean;
    is_incomplete: boolean;
    is_on_trial: boolean;
    is_past_due: boolean;
    is_recurring: boolean;
    is_valid: boolean;
    stripe_id: string | null;
    stripe_price: string | null;
    stripe_status: string;
    price: UserPriceDisplay | null;
    quantity: number | null;
    trial_ends_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    user?: User;
    items: UserSubscriptionItem[];
};

type UserSubscriptionItem = {
    _morphType: 'userSubscriptionItem';
    id: string;
    subscription_id: string;
    stripe_id: string | null;
    stripe_product: string | null;
    stripe_price: string | null;
    price: UserPriceDisplay | null;
    quantity: number | null;
    created_at: string;
    updated_at: string;
    subscription?: UserSubscription;
};

type UserPriceDisplay = {
    name: string;
    frequency: 'monthly' | 'yearly';
    alias: UserPrice;
    storage_limit: number;
    storage_limit_human: string;
};

type UserPrice =
    | 'tier-1-monthly'
    | 'tier-1-yearly'
    | 'tier-2-monthly'
    | 'tier-2-yearly'
    | 'tier-3-monthly'
    | 'tier-3-yearly';

type UserInvoice = {
    createdAt: string;
    total: string;
    url: string;
};
