type Invite = {
    _morphType: 'invite';
    id: string;
    entity_type: string;
    entity_id: string;
    sender_id: string;
    asset_id: string;
    code: string | null;
    email: string;
    endpoint: string | null;
    max_use: number;
    uses: number;
    can_use?: boolean;
    entity?: Project | Organization | null;
    asset?: Asset | null;
    created_at: string;
    updated_at: string;
};
