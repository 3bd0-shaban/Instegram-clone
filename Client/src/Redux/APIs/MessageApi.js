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
                        })
                    );
                    dispatch(
                        apiSlice.util.updateQueryData("UserChats", 1, (draft) => {
                            const userChat = draft?.Chats?.find((item) => item?._id === data?.chatId)
                            userChat.lastMSG = data?.msg
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
            //     // let getRecievedUserEmail = getState().auth?.user?.email;
            //     // let userId = getState().auth?.user?._id;
            //     const userId = localStorage.getItem('id')

            //     const socket = io(process.env.REACT_APP_API_KEY, {
            //         agent: false,
            //         reconnectionDelay: 10000,
            //         reconnectionAttempts: 10,
            //         transports: ["websocket"],
            //         reconnection: true,
            //     });
            //     socket.on("connect", () => {
            //         socket.emit("join", userId);
            //         socket.on("getusers", (data) => {
            //             console.log(data)
            //         });
            //     });
            //     try {
            //         await cacheDataLoaded;
            //         socket.on("MessagetoClient", ({ image, sender, receiver, createdAt, msg }) => {
            //             console.log('working..............')
            //             updateCachedData((draft) => {
            //                 return {
            //                     MSGs: [
            //                         { image, sender, receiver, createdAt, msg },
            //                         ...draft.MSGs,
            //                     ],
            //                     totalCount: Number(draft.totalCount),
            //                 };
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
        DeleteAllMSGs: builder.mutation({
            query: (id) => ({
                url: `/api/message/deleteall/${id}`,
                method: 'Delete',
            }),
        })
    }),
});

export const {
    useNewMessageMutation,
    useGetMessagesQuery,
    useDeleteAllMSGsMutation,
} = MessageApi;
