type AssetMove = {
    _morphType: 'assetMove';
    id: string;
    user_id: string | null;
    asset_id: string | null;
    from_project_id: string | null;
    to_project_id: string | null;
    batch_id: string | null;
    status: 'processing' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
    user?: User;
    asset?: Asset | null;
    from_project?: Project | null;
    to_project?: Project | null;
};

type AssetMoveBatch = { batch: JobBatch; moves: AssetMove[] };
