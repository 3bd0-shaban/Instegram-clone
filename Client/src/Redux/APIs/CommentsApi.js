import { apiSlice } from '../ApiSlice';
export const CommentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/comment/new/${id}`,
                method: 'Post',
                body: data,
            }),
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {

                    const { data: updatedPost } = await queryFulfilled;
                    // const lastcomment = data.slice(-1)[0]
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            const post = draft?.followersposts?.find((item) => item?._id === id);
                            post.comments = updatedPost?.comments
                            post.numComments = updatedPost?.numComments

                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("getPostDetails", id, (draft) => {
                            draft.comments = updatedPost?.comments
                            draft.numComments = updatedPost?.numComments
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        Like: builder.mutation({
            query: (id) => ({
                url: `/api/comment/like/${id}`,
                method: 'PUT',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch, getState }) {
                try {
                    // const userInfo = getState().auth.user
                    const { data: updatedPost } = await queryFulfilled;
                    const userIdOfReel = updatedPost?.user
                    // replace the likes array inside followers posts array with the new array of likes 
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            const post = draft?.followersposts?.find((item) => item?._id === id);
                            if (post) {
                                post.likes = updatedPost.likes
                                post.numLikes = updatedPost.numLikes
                            }
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("getPostDetails", id, (draft) => {
                            draft.likes = updatedPost.likes
                            draft.numLikes = updatedPost.numLikes
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("GetAllReels", 1, (draft) => {
                            const Reel = draft?.AllReels?.find((item) => item?._id === id);
                            Reel.likes = updatedPost.likes
                            Reel.numLikes = updatedPost.numLikes
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserByIdReels", userIdOfReel, (draft) => {
                            const Reel = draft?.userReels?.find((item) => item?._id === id);
                            if (Reel) {
                                Reel.likes = updatedPost.likes
                                Reel.numLikes = updatedPost.numLikes
                            }
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        UnLike: builder.mutation({
            query: (id) => ({
                url: `/api/comment/unlike/${id}`,
                method: 'PUT',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch, getState }) {
                try {
                    // const userInfo = getState().auth.user
                    const { data: updatedPost } = await queryFulfilled;
                    const userIdOfReel = updatedPost?.user
                    // replace the likes array inside followers posts array with the new array of likes 
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            const post = draft?.followersposts?.find((item) => item?._id === id);
                            if (post) {
                                post.likes = updatedPost.likes
                                post.numLikes = updatedPost.numLikes
                            }

                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("getPostDetails", id, (draft) => {
                            draft.likes = updatedPost.likes
                            draft.numLikes = updatedPost.numLikes
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("GetAllReels", 1, (draft) => {
                            const Reel = draft?.AllReels?.find((item) => item?._id === id);
                            Reel.likes = updatedPost.likes
                            Reel.numLikes = updatedPost.numLikes
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserByIdReels", userIdOfReel, (draft) => {
                            const Reel = draft?.userReels?.find((item) => item?._id === id);
                            if (Reel) {
                                Reel.likes = updatedPost.likes
                                Reel.numLikes = updatedPost.numLikes
                            }
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        getCounter: builder.query({
            query: (id) => ({
                url: `/api/comment/length/${id}`,
                method: 'Post',
            }),
            providesTags: ['Comments'],
        }),
        updateComment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/comment/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Comments'],
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/api/comment/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Comments', id: arg.id }],
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetCounterQuery,
    useLikeMutation,
    useUnLikeMutation,
} = CommentsApi;
