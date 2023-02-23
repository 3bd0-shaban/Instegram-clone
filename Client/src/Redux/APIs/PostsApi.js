import { apiSlice } from '../ApiSlice';
export const PostsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (page) => ({
                url: `/api/post/get?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    userPosts: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        getUserPosts: builder.query({
            query: (page) => ({
                url: `/api/post/getuser?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    userPosts: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        getMoreUserPosts: builder.query({
            query: (page) => ({
                url: `/api/post/getuser?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getUserPosts", 1, (draft) => {
                            return {
                                userPosts: [
                                    ...draft.userPosts,
                                    ...data,
                                ],
                                totalCount: Number(data.length),
                            };
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        getUserPostsById: builder.query({
            query: (id) => ({
                url: `/api/post/get/all/${id}?page=${1}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    userPostsById: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        getMoreUserPostsById: builder.query({
            query: ({ id, page }) => ({
                url: `/api/post/get/all/${id}?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getUserPostsById", args.id, (draft) => {
                            return {
                                userPostsById: [
                                    ...draft.userPostsById,
                                    ...data,
                                ],
                                totalCount: Number(data.length),
                            };
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        getFollowersPosts: builder.query({
            query: (page) => ({
                url: `/api/post/get/followers/posts?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    followersposts: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        getMoreFollowersPosts: builder.query({
            query: (page) => ({
                url: `/api/post/get/followers/posts?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            return {
                                followersposts: [
                                    ...draft.followersposts,
                                    ...data,
                                ],
                                totalCount: Number(data.length),
                            };
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),

        getPostDetails: builder.query({
            query: (id) => ({
                url: `/api/post/get/${id}`,
                method: 'GET',
            }),
            providesTags: ['Posts', 'Comments'],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: '/api/post/new',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['Posts'],
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            draft?.unshift(data.post)
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        updatePosts: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/post/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Posts'],
        }),
        HideLikes: builder.mutation({
            query: (id) => ({
                url: `/api/post/hidelikes/${id}`,
                method: 'PUT',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            draft?.unshift(data.post)
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        TurnComments: builder.mutation({
            query: (id) => ({
                url: `/api/post/turncomments/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
        }),
        deletePosts: builder.mutation({
            query: (id) => ({
                url: `/api/post/delete/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { queryFulfilled, dispatch }) {
                console.log(id)
                try {
                    dispatch(
                        apiSlice.util.updateQueryData("getFollowersPosts", 1, (draft) => {
                            const posts = draft?.followersposts?.filter((item) => item?._id !== id)
                            return {
                                followersposts: [
                                    ...posts
                                ],
                                totalCount: Number(4),
                            };
                        })
                    )
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetPostsQuery,
    useGetUserPostsByIdQuery,
    useGetUserPostsQuery,
    useGetFollowersPostsQuery,
    useGetPostDetailsQuery,
    useUpdatePostsMutation,
    useDeletePostsMutation,
    useHideLikesMutation,
    useTurnCommentsMutation,
    useGetMoreFollowersPostsQuery,
} = PostsApi;
                // serializeQueryArgs: ({ endpointName }) => {
                //     return endpointName
                // },
                // // Always merge incoming data to the cache entry
                // merge: (currentCache, newItems) => {
                //     currentCache.push(...newItems)
                // },
                // // Refetch when the page arg changes
                // forceRefetch({ currentArg, previousArg }) {
                //     return currentArg !== previousArg
                // },