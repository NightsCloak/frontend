type GetOrganizationSubscriptionRequest = {
    orgId: string;
};

type GetOrganizationInvoicesRequest = {
    orgId: string;
};

type GetOrganizationInvoiceRequest = {
    orgId: string;
    invoiceId: string;
};

type OrganizationSetupIntentRequest = {
    orgId: string;
};

type OrganizationRemovePaymentMethodsRequest = {
    orgId: string;
};

type SetOrganizationDefaultPaymentRequest = {
    orgId: string;
    payment_id: string;
};

type OrganizationSubscriptionRequest = {
    orgId: string;
    price: OrganizationPrice;
    quantity: number;
    code?: string;
};

type OrganizationCancelSubscriptionRequest = {
    orgId: string;
};

type OrganizationResumeSubscriptionRequest = {
    orgId: string;
};
