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
        getUserChronicles: builder.query<Chronicle[], void>({
            query: () => ({
                url: 'chronicles',
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
        getChroniclesSearch: builder.query<{ id: string; label: string }[], void>({
            query: () => ({
                url: 'chronicles/search',
                method: 'GET',
            }),
            transformResponse: (result: Chronicle[], meta, arg) => {
                return result.map((chronicle) => ({ id: chronicle.id, label: chronicle.name }));
            }
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
    useGetUserChroniclesQuery,
    useGetUserChronicleQuery,
    useGetChroniclesSearchQuery,
    useUpdateChronicleMutation,
} = chronicle;
