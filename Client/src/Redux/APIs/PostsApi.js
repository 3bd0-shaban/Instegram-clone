import { apiSlice } from '../ApiSlice';
export const PostsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: '/api/post/get',
                method: 'GET',
                credentials: 'include',
            }),
            // providesTags: ['Posts', 'Saves', 'Auth'],
        }),
        getUserPosts: builder.query({
            query: (page) => ({
                url: `/api/post/getuser?page=${page}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Posts', 'Saves', 'Auth'],
        }),
        getFollowersPosts: builder.query({
            query: (page) => ({
                url: `/api/post/get/followers/posts?page=${page}`,
                method: 'GET',
                credentials: 'include',
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName
                },
                // Always merge incoming data to the cache entry
                merge: (currentCache, newItems) => {
                    currentCache.push(...newItems)
                },
                // Refetch when the page arg changes
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg
                },
            }),
            providesTags: ['Comments', 'Posts'],
        }),
        getUserPostsById: builder.query({
            query: (id) => ({
                url: `/api/post/get/all/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Posts', 'Comments'],
        }),
        getPostDetails: builder.query({
            query: (id) => ({
                url: `/api/post/get/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Posts', 'Comments'],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: '/api/post/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Posts'],
        }),
        updatePosts: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/post/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Posts'],
        }),
        HideLikes: builder.mutation({
            query: (id) => ({
                url: `/api/post/hidelikes/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
        }),
        TurnComments: builder.mutation({
            query: (id) => ({
                url: `/api/post/turncomments/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
        }),
        deletePosts: builder.mutation({
            query: (id) => ({
                url: `/api/post/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
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
} = PostsApi;
