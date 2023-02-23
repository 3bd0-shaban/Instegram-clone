import { apiSlice } from '../ApiSlice';
export const MessageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewMessage: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/message/${id}`,
                method: 'Post',
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                            return {
                                MSGs: [
                                    data,
                                    ...draft.MSGs,
                                ],
                                totalCount: Number(draft.totalCount),
                            };

                            // Object.assign(draft.MSGs, data)
                        })
                    );

                } catch (err) {
                    console.log(err)
                }
            },

        }),
        GetMessages: builder.query({
            query: ({ id, page }) => ({
                url: `/api/message/${id}?page=${1}`,
                method: 'Get',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    MSGs: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
            // async onCacheEntryAdded(
            //     arg,
            //     { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
            // ) {
            //     // create socket
            //     let getRecievedUserEmail = getState().auth?.user?.email;

            //     const socket = io(process.env.REACT_APP_API_URL, {
            //         reconnectionDelay: 1000,
            //         reconnection: true,
            //         reconnectionAttemps: 10,
            //         transports: ["websocket"],
            //         agent: false,
            //         upgrade: false,
            //         rejectUnauthorized: false,
            //     });

            //     try {
            //         await cacheDataLoaded;

            //         socket.on("message", (data) => {
            //             updateCachedData((draft) => {
            //                 debugger
            //                 console.log(JSON.stringify(draft))
            //                 if (data?.data?.receiver?.email === getRecievedUserEmail) {
            //                     if (draft.data.length > 0 && draft.data[0].conversationId === data?.data?.conversationId) {
            //                         draft.data.unshift(data?.data);
            //                         draft.totalCount = Number(draft.totalCount)
            //                     }
            //                 }
            //             });
            //         });
            //     } catch (err) { }

            //     await cacheEntryRemoved;
            //     socket.close();
            // },
        }),
        GetMoreMessages: builder.query({
            query: ({ id, page }) =>
                `/api/message/${id}?page=${page}`,
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                            return {
                                MSGs: [
                                    ...draft.MSGs,
                                    ...data,
                                ],
                                totalCount: Number(draft.totalCount),
                            };
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
});

export const {
    useNewMessageMutation,
    useGetMessagesQuery,
} = MessageApi;
