type IntractPlugin = {
    _morphType: 'intractPlugin';
    id: string;
    type: IntractPluginType;
    name: string;
    file: string;
    file_size: FileSize;
    file_route: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type IntractPluginType = 'blender' | 'blender-installer' | 'roblox';
