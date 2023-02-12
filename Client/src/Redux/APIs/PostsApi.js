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
            query: () => ({
                url: '/api/post/getuser',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Posts', 'Saves', 'Auth'],
        }),
        getFollowersPosts: builder.query({
            query: () => ({
                url: '/api/post/get/followers/posts',
                method: 'GET',
                credentials: 'include',
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
} = PostsApi;
