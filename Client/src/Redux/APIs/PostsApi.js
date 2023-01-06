import { apiSlice } from '../ApiSlice';
export const PostsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/api/post/get',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Posts', id })), 'Posts']
                    : ['Posts'],
        }),
        getUserPosts: builder.query({
            query: () => '/api/post/getuser',
            keepUnusedDataFor: 5,
            providesTags: ['Posts']
        }),
        getFollowersPosts: builder.query({
            query: () => '/api/post/get/followers/posts',
            keepUnusedDataFor: 5,
            providesTags: ['Posts']
        }),
        getUserPostsById: builder.query({
            query: (id) => `/api/post/get/all/${id}`,
            keepUnusedDataFor: 5,
            providesTags: ['Posts', 'Comments'],
        }),
        getPostDetails: builder.query({
            query: (id) => `/api/post/get/${id}`,
            keepUnusedDataFor: 5,
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
