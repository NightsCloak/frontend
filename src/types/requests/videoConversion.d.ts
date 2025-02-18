type GetVideoConversionRequest = {
    videoConversionId: string;
};

type StoreVideoConversionRequest = {
    name: string;
    type: VideoConversionType;
    scale: VideoConversionScale;
};

type StoreVideoConversionFileRequest = {
    videoConversionId: string;
    form: FormData;
};
