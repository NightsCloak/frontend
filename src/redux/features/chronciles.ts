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
        getChronicles: builder.query<ChronicleResponse, void>({
            query: () => {
                return {
                    url: 'chronicles',
                    method: 'GET',
                };
            },
        }),
        getUserChronicles: builder.query<ChronicleResponse, void>({
            query: () => ({
                url: 'user/chronicles',
                method: 'GET',
            }),
            providesTags: ['Chronicles'],
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
        updateChronicle: builder.mutation<Chronicle, { chronicleId: string; name: string }>({
            query: ({ chronicleId, name }) => ({
                url: `chronicles/${chronicleId}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: (_result, _error, { chronicleId }) => [{ type: 'Chronicle', id: chronicleId }],
        }),
    }),
});

export default chronicle;
export const {
    useAddChronicleMutation,
    useDeleteChronicleMutation,
    useGetChroniclesQuery,
    useGetUserChroniclesQuery,
    useGetUserChronicleQuery,
    useGetChroniclesSearchQuery,
    useGetChronicleGenresListQuery,
    useGetChronicleRegionsListQuery,
    useGetChronicleTypesListQuery,
    useUpdateChronicleMutation,
} = chronicle;
