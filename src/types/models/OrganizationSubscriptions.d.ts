type OrganizationSubscription = {
    _morphType: 'organizationSubscription';
    id: string;
    organization_id: string;
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
    price: OrganizationPriceDisplay | null;
    quantity: number | null;
    trial_ends_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    latest_payment_id?: string | null;
    promotion?: SubscriptionPromotion | null;
    organization?: Organization;
    items: OrganizationSubscriptionItem[];
};

type OrganizationSubscriptionItem = {
    _morphType: 'organizationSubscriptionItem';
    id: string;
    subscription_id: string;
    stripe_id: string | null;
    stripe_product: string | null;
    stripe_price: string | null;
    price: OrganizationPriceDisplay | null;
    quantity: number | null;
    created_at: string;
    updated_at: string;
    subscription?: OrganizationSubscription;
};

type OrganizationPrice = 'professional-monthly' | 'team-monthly' | 'enterprise-monthly' | 'free';

type OrganizationPriceDisplay = OrganizationTierDisplay & {
    frequency: 'monthly' | 'yearly';
    alias: OrganizationPrice;
};
