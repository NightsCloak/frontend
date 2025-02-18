type ReviewComment = {
    _morphType: 'reviewComment';
    id: string;
    review_id: string;
    user_id: string | null;
    content: string;
    content_tokens?: ContentToken[];
    status: ReviewStatus;
    attachments: Attachment[] | null;
    attachments_size: FileSize;
    system_action: ReviewCommentSystemAction;
    created_at: string;
    updated_at: string;
    review?: Review;
    user?: User;
};

type ReviewCommentSystemAction =
    | 'approved'
    | 'closed'
    | 'denied'
    | 'drafted'
    | 'opened'
    | 'renamed'
    | 'reviewers-updated';
