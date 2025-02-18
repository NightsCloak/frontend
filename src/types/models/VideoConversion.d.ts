type VideoConversion = {
    _morphType: 'videoConversion';
    id: string;
    user_id: string;
    name: string;
    status: VideoConversionStatus;
    type: VideoConversionType;
    extension: string;
    scale: VideoConversionScale;
    source_file_size: FileSize;
    output_file_size: FileSize;
    output_file_route: string | null;
    created_at: string;
    updated_at: string;
    user?: User;
};

type VideoConversionStatus = 'completed' | 'failed' | 'pending' | 'processing';

type VideoConversionType = 'gif' | 'mp4' | 'mov' | 'webm' | 'prores-mov';

type VideoConversionScale = '1280x720' | '1920x1080' | '1080x1920' | '720x1280' | 'source';
