import { apiSlice } from '../ApiSlice';
export const MessageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewMessage: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/message/${id}`,
                method: 'Post',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Message'],
        }),
        GetMessages: builder.query({
            query: (id) => ({
                url: `/api/message/${id}`,
                method: 'Get',
                credentials: 'include',
            }),
            invalidatesTags: ['Message'],
        }),
    }),
});

export const {
    useNewMessageMutation,
    useGetMessagesQuery,
} = MessageApi;
