import { apiSlice } from '../ApiSlice';
export const CommentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/comment/new/${id}`,
                method: 'Post',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Comments'],
        }),
        Like: builder.mutation({
            query: (id) => ({
                url: `/api/comment/like/${id}`,
                method: 'Post',
                credentials: 'include',
            }),
            invalidatesTags: ['Comments'],
        }),
        UnLike: builder.mutation({
            query: (id) => ({
                url: `/api/comment/unlike/${id}`,
                method: 'Post',
                credentials: 'include',
            }),
            invalidatesTags: ['Comments'],
        }),
        updateComment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/comment/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Comments'],
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/api/comment/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Comments', id: arg.id }],
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeMutation,
    useUnLikeMutation,
} = CommentsApi;
