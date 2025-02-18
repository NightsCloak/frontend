type OrganizationPricingTier = {
    title: string;
    maxQuantity: number;
    priceMonthly: number;
    stripePriceMonthly: OrganizationPrice;
    details: string[];
    disabled: boolean;
};

type OrganizationPricing = {
    pricing: OrganizationPricingTier[];
};

const useOrganizationPricing = (): OrganizationPricing => {
    const pricing: OrganizationPricingTier[] = [
        {
            disabled: false,
            title: 'Professional',
            maxQuantity: 15,
            priceMonthly: 40.0,
            stripePriceMonthly: 'professional-monthly',
            details: [
                'Unlimited Projects',
                '250 GB organization storage',
                'Up to 15 paid seats (editors, reviewers, admins)',
                'Webhook integrations',
                'Plugin access',
                'Approval system access',
                'Unlimited commenters and viewers',
            ],
        },
        {
            disabled: false,
            title: 'Teams',
            maxQuantity: 40,
            priceMonthly: 75.0,
            stripePriceMonthly: 'team-monthly',
            details: [
                'Everything in Professional plus:',
                'Unlimited Private projects',
                '1 TB organization storage',
                'Up to 40 paid seats (editors, reviewers, admins)',
                'Multi-team management',
                'Unlimited contributor access',
                'BETA access',
            ],
        },
        {
            disabled: true,
            title: 'Enterprise',
            maxQuantity: 0,
            priceMonthly: 0,
            stripePriceMonthly: 'enterprise-monthly',
            details: [
                'Everything in Teams plus:',
                'Custom pricing',
                'Private cloud servers',
                'Customized storage',
                'Branded projects',
                'Two-factor authentication',
                'DRM encryption',
                'Priority support',
                'Scales to unlimited users',
                'White label licensing',
            ],
        },
    ];

    return { pricing };
};

export default useOrganizationPricing;
