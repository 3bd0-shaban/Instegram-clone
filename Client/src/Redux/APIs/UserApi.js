import { apiSlice } from '../ApiSlice';
export const SearchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: () => ({
                url: '/api/user/search',
                method: 'GET',
                credentials: 'include',
            }),
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
            invalidatesTags: ['Auth', 'Saves', 'Posts'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/user/getall',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
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
            query: (data, id) => ({
                url: `/api/user/updateuser/${id}`,
                method: 'POST',
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
    }),

});

export const {
    useSearchQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
} = SearchApi;
