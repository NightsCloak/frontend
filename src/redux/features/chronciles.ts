import apiSlice from '@/redux/apiSlice';

const chronicle = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addChronicle: builder.mutation<Chronicle, AddChronicleRequest>({
            query: (chronicle) => ({
                url: 'chronicles',
                method: 'POST',
                body: chronicle,
            }),
        }),
        getUserChronicles: builder.query<Chronicle[], void>({
            query: () => ({
                url: 'chronicles',
                method: 'GET',
            }),
        }),
    }),
});

export default chronicle;
export const { useAddChronicleMutation, useGetUserChroniclesQuery } = chronicle;
