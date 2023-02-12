import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: ({ keyword, pagnum }) => ({
                url: `/api/user/search?keyword=${keyword}&page=${pagnum}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getUserById: builder.query({
            query: (username) => ({
                url: `/api/user/get/${username}`,
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/user/info',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth', 'Saves'],
        }),
        Suggestion: builder.query({
            query: () => ({
                url: '/api/user/suggestion',
                method: 'GET',
                credentials: 'include',
            }),
            // providesTags: ['Auth'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/user/getall',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        FollowersList: builder.query({
            query: (id) => ({
                url: `/api/user/fowllowerslist/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        FollowingList: builder.query({
            query: (id) => ({
                url: `/api/user/followinglist/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/user/get/deleteuser/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/updateuser',
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        UpdateProfilePic: builder.mutation({
            query: (data) => ({
                url: '/api/user/updatepic',
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/user/updateuserrole/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        Block: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        UnBlock: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        Follow: builder.mutation({
            query: (id) => ({
                url: `/api/user/follow/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        UnFollow: builder.mutation({
            query: (id) => ({
                url: `/api/user/unfollow/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),

});

export const {
    useSearchQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useUpdateProfilePicMutation,
    useFollowersListQuery,
    useFollowingListQuery,
    useFollowMutation,
    useUnFollowMutation,
    useSuggestionQuery,
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
    useBlockMutation,
    useUnBlockMutation,
} = UserApi;
