type ChroniclesContextType = {
    genresList: Omit<ChronicleGenresList, 'children'>[];
    regionsList: Omit<ChronicleRegionsList, 'children'>[];
    typesList: Omit<ChronicleTypesList, 'children'>[];
    chroniclesList: {
        data: Chronicle[];
    } & Pagination;
};
