type OrganizationSetupIntentResponse = {
    intent: string;
};

type OrganizationSubscribeResponse = {
    payment_action_id: string | null;
};

type OrganizationInvoicesResponse = {
    invoices: Invoice[];
    upcoming_invoice: Invoice | null;
};
