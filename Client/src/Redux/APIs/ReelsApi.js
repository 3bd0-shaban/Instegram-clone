import { apiSlice } from '../ApiSlice';
export const ReelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetFollowersReels: builder.query({
            query: (page) => ({
                url: `/api/post/get/followers/reels?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    FollowersReel: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        GetMoreFollowersReels: builder.query({
            query: (page) => ({
                url: `/api/post/get/followers/reels?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                console.log('ddddddddddddddddddddd')
                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetFollowersReels", 1, (draft) => {
                            return {
                                FollowersReel: [
                                    ...draft.FollowersReel,
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
        GetUserReels: builder.query({
            query: (page) => ({
                url: `/api/post/userreels?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    userReels: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        GetMoreUserReels: builder.query({
            query: (page) => ({
                url: `/api/post/userreels?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserReels", 1, (draft) => {
                            return {
                                userReels: [
                                    ...draft.userReels,
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
        GetUserByIdReels: builder.query({
            query: (id) => ({
                url: `/api/post/get/userbyidreels/${id}?page=${1}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    userReels: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),

        GetMoreUserByIdReels: builder.query({
            query: ({ id, page }) => ({
                url: `/api/post/get/userbyidreels${id}?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserByIdReels", 1, (draft) => {
                            return {
                                userReels: [
                                    ...draft.userReels,
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


        GetUsersWithActiveReels: builder.query({
            query: (id) => ({
                url: `/api/post/activeReels?page=${1}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    ActiveReels: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),

        GetMoreUsersWithActiveReels: builder.query({
            query: ({ id, page }) => ({
                url: `/api/post/activeReels?page=${1}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserByIdReels", 1, (draft) => {
                            return {
                                ActiveReels: [
                                    ...draft.ActiveReels,
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


    }),
});

export const {
    useGetFollowersReelsQuery,
    useGetMoreFollowersReelsQuery,
    useGetUserReelsQuery,
    useGetMoreUserReelsQuery,
    useGetUserByIdReelsQuery,
    useGetMoreUserByIdReelsQuery,
    useGetUsersWithActiveReelsQuery,
    useGetMoreUsersWithActiveReelsQuery,
} = ReelsApi;
