import { apiSlice } from '../ApiSlice';
export const ReelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetAllReels: builder.query({
            query: (page) => ({
                url: `/api/post/getall/reels?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    AllReels: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        GetMoreAllReels: builder.query({
            query: (page) => ({
                url: `/api/post/getall/reels?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetAllReels", 1, (draft) => {
                            return {
                                AllReels: [
                                    ...draft.AllReels,
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
            async onQueryStarted(id, { queryFulfilled, dispatch }) {

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
                    userReels: apiResponse.userReels,
                    count: apiResponse.count,
                    totalCount: Number(apiResponse.userReels.length)
                };
            },
        }),

        GetMoreUserByIdReels: builder.query({
            query: ({ id, page }) => ({
                url: `/api/post/get/userbyidreels/${id}?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {

                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetUserByIdReels", id, (draft) => {
                            return {
                                userReels: [
                                    ...draft.userReels,
                                    ...data.userReels,
                                ],
                                count: draft.count,
                                totalCount: Number(data.userReels.length),
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
            providesTags: ['UserFollow'],
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
    useGetAllReelsQuery,
    useGetMoreAllReelsQuery,
    useGetUserReelsQuery,
    useGetMoreUserReelsQuery,
    useGetUserByIdReelsQuery,
    useGetMoreUserByIdReelsQuery,
    useGetUsersWithActiveReelsQuery,
    useGetMoreUsersWithActiveReelsQuery,
} = ReelsApi;
