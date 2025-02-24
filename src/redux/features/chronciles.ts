import apiSlice from '@/redux/apiSlice';

const chronicle = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addChronicle: builder.mutation<Chronicle, AddChronicleRequest>({
            query: (chronicle) => ({
                url: 'chronicles',
                method: 'POST',
                body: chronicle,
            }),
            invalidatesTags: ['Chronicles'],
        }),
        deleteChronicle: builder.mutation<void, Chronicle['id']>({
            query: (chronicleId) => ({
                url: `chronicles/${chronicleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Chronicles'],
        }),
        getUserChronicles: builder.query<Chronicle[], void>({
            query: () => ({
                url: 'chronicles',
                method: 'GET',
            }),
            providesTags: ['Chronicles'],
        }),
    }),
});

export default chronicle;
export const { useAddChronicleMutation, useDeleteChronicleMutation, useGetUserChroniclesQuery } = chronicle;
