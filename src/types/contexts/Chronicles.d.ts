type ChroniclesContextType = {
    genresList: Omit<ChronicleGenresList, 'children'>[];
    refetchGenresList: QueryActionCreatorResult<ChronicleGenresList>;
    regionsList: Omit<ChronicleRegionsList, 'children'>[];
    refetchRegionsList: QueryActionCreatorResult<ChronicleRegionList>;
    typesList: Omit<ChronicleTypesList, 'children'>[];
    refetchTypesList: QueryActionCreatorResult<ChronicleTypesList>;
    getChroniclesList: MutationTrigger<Chronicle[]>;
    chroniclesListState: BaseQueryResult<Chronicle[]>;
};
