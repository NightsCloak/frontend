import apiSlice from '@/redux/apiSlice';

const chronicle = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addChronicle: builder.mutation<Chronicle, AddChronicleRequest>({
            query: (chronicle) => ({
                url: 'chronicles',
                method: 'POST',
                body: chronicle,
            }),
            invalidatesTags: ['Chronicles', 'User'],
        }),
        deleteChronicle: builder.mutation<void, Chronicle['id']>({
            query: (chronicleId) => ({
                url: `chronicles/${chronicleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Chronicles', 'User'],
        }),
        getChronicles: builder.mutation<ChronicleResponse, { options?: QueryFilterOptions }>({
            query: ({ options }) => {
                console.log('options1', options);
                return {
                    url: `chronicles${options}`,
                    method: 'GET',
                };
            },
        }),
        getUserChronicles: builder.mutation<ChronicleResponse, { options?: QueryFilterOptions }>({
            query: ({ options }) => ({
                url: `user/chronicles${options}`,
                method: 'GET',
            }),
            invalidatesTags: ['Chronicles'],
        }),
        getUserChronicle: builder.query<Chronicle, string>({
            query: (chronicleId) => ({
                url: `chronicles/${chronicleId}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, chronicleId) => [{ type: 'Chronicle', id: chronicleId }],
        }),
        getChronicleGenresList: builder.query<Omit<ChronicleGenresList, 'children'>[], void>({
            query: () => ({
                url: 'chronicles/genres',
                method: 'GET',
            }),
            providesTags: ['ChronicleGenres'],
            transformResponse: (result: ChronicleGenresList[]) => {
                const values: Omit<ChronicleGenresList, 'children'>[] = [];
                for (const genre of result) {
                    if (genre.children.length > 0) {
                        for (const child of genre.children) {
                            values.push({ name: `${genre.name} - ${child.name}`, value: child.value });
                        }
                        continue;
                    }

                    values.push({ name: genre.name, value: genre.value });
                }

                return values;
            },
        }),
        getChronicleRegionsList: builder.query<ChronicleRegionList[], void>({
            query: () => ({
                url: 'chronicles/regions',
                method: 'GET',
            }),
            providesTags: ['ChronicleRegions'],
        }),
        getChronicleTypesList: builder.query<ChronicleTypesList[], void>({
            query: () => ({
                url: 'chronicles/types',
                method: 'GET',
            }),
            providesTags: ['ChronicleRegions'],
        }),
        getChroniclesSearch: builder.query<{ id: string; label: string }[], void>({
            query: () => ({
                url: 'chronicles/search',
                method: 'GET',
            }),
            transformResponse: (result: Chronicle[], meta, arg) => {
                return result.map((chronicle) => ({ id: chronicle.id, label: chronicle.name }));
            },
        }),
        updateChronicle: builder.mutation<Chronicle, Partial<Chronicle> & { id: Chronicle['id'] }>({
            query: (chronicle) => ({
                url: `chronicles/${chronicle.id}`,
                method: 'PUT',
                body: chronicle,
            }),
            invalidatesTags: (_result, _error, chronicle) => [{ type: 'Chronicle', id: chronicle.id }],
        }),
    }),
});

export default chronicle;
export const {
    useAddChronicleMutation,
    useDeleteChronicleMutation,
    useGetChroniclesMutation,
    useGetUserChroniclesMutation,
    useGetUserChronicleQuery,
    useGetChroniclesSearchQuery,
    useGetChronicleGenresListQuery,
    useGetChronicleRegionsListQuery,
    useGetChronicleTypesListQuery,
    useUpdateChronicleMutation,
} = chronicle;
