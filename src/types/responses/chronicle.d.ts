type AddChronicleResponse = Partial<Chronicle>[] | FetchBaseQueryError | SerializedError;

type ChronicleResponse = {
    data: Chronicle[];
} & Pagination;
