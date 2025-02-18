type ContentToken = {
    token: string;
    user: User | null;
};

type MentionDict = {
    id: string;
    display: string;
};

type Attachment = {
    file: string;
    size: number;
    name: string;
    extension: string;
    route: string;
    size_human: string;
};

type AttachmentFile = {
    id: string;
    name: string;
    file: File;
    b64: string | null;
};

type FileSize = {
    bytes: number;
    human: string;
};

type Invoice = {
    id: string;
    createdAt: string;
    dueAt: string | null;
    description: string | null;
    status: string;
    isPaid: boolean;
    url: string | null;
    hasStartingBalance: boolean;
    hasAppliedBalance: boolean;
    hasEndingBalance: boolean;
    hasDiscount: boolean;
    startingBalance: string;
    appliedBalance: string;
    endingBalance: string;
    subtotal: string;
    total: string;
    amountDue: string;
    lines: InvoiceLineItem[] | null;
    discounts: InvoiceDiscount[] | null;
};

type InvoiceLineItem = {
    description: string;
    quantity: number | null;
    unitAmount: string;
    total: string;
    startDate: string | null;
    endDate: string | null;
};

type InvoiceDiscount = {
    name: string;
    percentage: number | null;
    amount: number | null;
    duration: string;
    durationMonths: number | null;
};

type SubscriptionPromotion = {
    id: string;
    code: string;
    duration: string;
    durationMonths: number | null;
    percentage: number | null;
    amount: number | null;
};

type JobBatch = {
    valid: boolean;
    id: string | null;
    name: string | null;
    totalJobs: number;
    pendingJobs: number;
    processedJobs: number;
    progress: number;
    failedJobs: number;
    createdAt: string | null;
    cancelledAt: string | null;
    finishedAt: string | null;
};
