import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: ({ keyword, pagnum }) => ({
                url: `/api/user/search?keyword=${keyword}&page=${pagnum}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        getUserById: builder.query({
            query: (username) => ({
                url: `/api/user/get/${username}`,
            }),
            providesTags: ['User', 'UserFollow'],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/user/info',
                method: 'GET',
            }),
            providesTags: ['User', 'Saves', 'UserFollow'],
        }),
        Suggestion: builder.query({
            query: () => ({
                url: '/api/user/suggestion',
                method: 'GET',
            }),
            providesTags: ['User', 'UserFollow'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/user/getall',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        FollowersList: builder.query({
            query: (id) => ({
                url: `/api/user/fowllowerslist/${id}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        FollowingList: builder.query({
            query: (id) => ({
                url: `/api/user/followinglist/${id}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/user/get/deleteuser/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/updateuser',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        UpdateProfilePic: builder.mutation({
            query: (data) => ({
                url: '/api/user/updatepic',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/user/updateuserrole/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        Block: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        UnBlock: builder.mutation({
            query: (id) => ({
                url: `/api/user/block/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        Follow: builder.mutation({
            query: (id) => ({
                url: `/api/user/follow/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['UserFollow'],
        }),
        FollowPrivate: builder.mutation({
            query: (id) => ({
                url: `/api/user/followprivate/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['UserFollow'],
        }),
        UnFollow: builder.mutation({
            query: (id) => ({
                url: `/api/user/unfollow/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['UserFollow'],
        }),
        ConfirmFollowing: builder.mutation({
            query: (id) => ({
                url: `/api/user/confirm/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        CancelFollowRequest: builder.mutation({
            query: (id) => ({
                url: `/api/user/cancelrequest/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        RefuseFollowRequest: builder.mutation({
            query: (id) => ({
                url: `/api/user/refuse/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        ChangePrivacy: builder.mutation({
            query: () => ({
                url: '/api/user/privacy',
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
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
    useConfirmFollowingMutation,
    useRefuseFollowRequestMutation,
} = UserApi;
