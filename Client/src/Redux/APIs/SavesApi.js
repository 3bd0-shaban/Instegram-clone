import { apiSlice } from '../ApiSlice';
export const SavesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSave: builder.query({
            query: (id) => ({
                url: '/api/auth/saves',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Saves', 'Auth'],
        }),
        Save: builder.mutation({
            query: (id) => ({
                url: `/api/auth/save/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Saves'],
        }),
        Unsave: builder.mutation({
            query: (id) => ({
                url: `/api/auth/unsave/${id}`,
                method: 'PUT',
                credentials: 'include',
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
