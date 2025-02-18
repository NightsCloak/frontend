type Tag = {
    _morphType: 'tag';
    id: string;
    name: string;
    type: TagType;
    created_at: string;
    updated_at: string;
};

type TagType = 'character' | 'guild' | 'unknown';
