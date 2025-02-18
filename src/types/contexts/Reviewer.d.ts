type ReviewerProps = {
    children?: ReactNode;
    review: Review;
    project: Project;
    fetchReview: () => void;
    socket?: Channel | null;
    member?: Member;
    membersOverride?: MentionDict[];
    admin?: boolean;
};

type ReviewerContextProps = {
    review: Review;
    project: Project;
    fetchReview: () => void;
    socket?: Channel | null;
    editingCommentId: string | null;
    setEditingCommentId: (commentId: string | null) => void;
    suggestionsRef: RefObject<HTMLDivElement>;
    member?: Member;
    members?: MentionDict[];
    admin?: boolean;
};
