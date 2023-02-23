import { apiSlice } from '../ApiSlice';
export const SavesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSave: builder.query({
            query: () => ({
                url: '/api/auth/saves',
                method: 'GET',
            }),
            providesTags: ['Saves', 'Auth'],
        }),
        Save: builder.mutation({
            query: (id) => ({
                url: `/api/auth/save/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Saves'],
        }),
        Unsave: builder.mutation({
            query: (id) => ({
                url: `/api/auth/unsave/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Saves'],
        }),
    }),
});

export const {
    useGetSaveQuery,
    useSaveMutation,
    useUnsaveMutation,
} = SavesApi;
