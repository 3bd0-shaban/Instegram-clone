import { current } from '@reduxjs/toolkit';
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
                            current(draft.MSGs).push(data)
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
            async onQueryStarted({ id, page }, { queryFulfilled, dispatch }) {
                try {

                    const messages = await queryFulfilled;
                    if (messages?.data?.MSGs?.length > 0) {
                        // console.log(messages)
                        // debugger
                        // update conversation cache pessimistically start
                        const result = dispatch(
                            apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                                // console.log(current(draft))
                                // current(draft)?.push(messages)
                                // console.log(messages)
                                return {
                                    MSGs: [
                                        ...draft.data.MSGs,
                                        ...messages.data.MSGs,
                                    ],
                                    totalCount: Number(draft.totalCount),
                                };
                            })
                        );
                        console.log(result)
                        // update messages cache pessimistically end
                    }
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
