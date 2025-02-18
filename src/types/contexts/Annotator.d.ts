type AnnotatorContextProps = {
    annotationEvent: AnnotationEvent | null;
    setAnnotationEvent: Dispatch<SetStateAction<AnnotationEvent | null>>;
    suggestionsRef: RefObject<HTMLDivElement>;
    annotations: AnnotationModel[] | null;
    annotation: AnnotationModel | null;
    setAnnotation: Dispatch<SetStateAction<AnnotationModel | null>>;
    temporaryComments: TemporaryComments;
    setTemporaryComments: Dispatch<SetStateAction<TemporaryComments>>;
    members: MentionDict[] | undefined;
    initLoaded: boolean;
    refetch: () => void;
};

type TemporaryComments = {
    new: {
        content: string;
        attachments: AttachmentFile[];
    };
    threads: { [key: string]: { content: string; attachments: AttachmentFile[] } };
};

type AnnotatorProps = {
    children?: ReactNode;
};
