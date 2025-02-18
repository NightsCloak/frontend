type Tag = {
    _morphType: 'tag';
    id: string;
    name: string;
    type: TagType;
    created_at: string;
    updated_at: string;
};

type TagType = 'texture' | 'asset' | 'unknown';
