import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: ({ keyword, pagnum }) => ({
                url: `/api/user/search?keyword=${keyword}&page=${pagnum}`,
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        getUserById: builder.query({
            query: (username) => ({
                url: `/api/user/get/${username}`,
            }),
            providesTags: ['Auth'],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/user/info',
                method: 'GET',
            }),
            providesTags: ['Auth', 'Saves'],
        }),
        Suggestion: builder.query({
            query: () => ({
                url: '/api/user/suggestion',
                method: 'GET',
            }),
            // providesTags: ['Auth'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/user/getall',
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        FollowersList: builder.query({
            query: (id) => ({
                url: `/api/user/fowllowerslist/${id}`,
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        FollowingList: builder.query({
            query: (id) => ({
                url: `/api/user/followinglist/${id}`,
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/user/get/deleteuser/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/updateuser',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        UpdateProfilePic: builder.mutation({
            query: (data) => ({
                url: '/api/user/updatepic',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/user/updateuserrole/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        Block: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        UnBlock: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        Follow: builder.mutation({
            query: (id) => ({
                url: `/api/user/follow/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        FollowPrivate: builder.mutation({
            query: (id) => ({
                url: `/api/user/followprivate/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        UnFollow: builder.mutation({
            query: (id) => ({
                url: `/api/user/unfollow/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        CancelFollowRequest: builder.mutation({
            query: (id) => ({
                url: `/api/user/cancelrequest/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Auth'],
        }),
        ChangePrivacy: builder.mutation({
            query: () => ({
                url: '/api/user/privacy',
                method: 'PUT',
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
    useFollowPrivateMutation,
    useChangePrivacyMutation,
    useCancelFollowRequestMutation,
} = UserApi;
