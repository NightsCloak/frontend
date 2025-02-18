type Review = {
    _morphType: 'review';
    id: string;
    project_id: string;
    user_id: string | null;
    reviewed_by_id: string | null;
    reviewable_id: string | null;
    reviewable_type: string | null;
    asset_version_id: string | null;
    is_reviewed: boolean;
    is_updatable: boolean;
    name: string;
    status: ReviewStatus;
    status_display: string;
    used_attachment_storage: FileSize;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    project?: Project;
    user?: User;
    reviewed_by?: User;
    reviewable?: Asset;
    reviewers?: OrganizationMember[];
    latest_comment?: ReviewComment;
    comments_count?: number;
};

type ReviewStatus = 'approved' | 'closed' | 'denied' | 'draft' | 'open';
