import { apiSlice } from '../ApiSlice';
import { setSingleMSGNotify } from '../Slices/MessageSlice';
import getSocket from '../SocketRTK';
// const userId = localStorage.getItem('id')

export const MessageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewMessage: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/message/${id}`,
                method: 'Post',
                body: data,
            }),
            // queryFn(args) {

            //     console.log(args)
            // },
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const socket = getSocket()
                    socket.emit("Message", {
                        sender: data.sender,
                        msg: data.msg,
                        createdAt: data.createdAt,
                        image: data.image,
                        // receiver: userById?._id
                    });
                    dispatch(
                        apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                            return {
                                MSGs: [
                                    data,
                                    ...draft.MSGs,
                                ],
                                totalCount: Number(draft.totalCount),
                                typing: false,
                            };
                        })
                    );
                    dispatch(
                        apiSlice.util.updateQueryData("UserChats", 1, (draft) => {
                            // UPDATE LAST MASSAGE IN CHATS WNEN NEW MESSAGE SEND OR RECIEVED 
                            const userChat = draft?.Chats?.find((item) => item?._id === data?.chatId)
                            if (!userChat) {
                                // invalidatesTags:['chat']
                            }
                            userChat.lastMSG = data?.msg

                            //REARANGE CHATS By MOVING FOLLOWER CHAT CART AT TOP WHEN NEW MWSSGAE SEND
                            let index = draft?.Chats?.indexOf(userChat); // find the index of the object in the array
                            if (index > -1) { // if the object is in the array
                                draft?.Chats.splice(index, 1); // remove it from the current position
                                draft?.Chats.unshift(userChat); // add it to the beginning of the array
                            }
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
                return {
                    MSGs: apiResponse,
                    totalCount: Number(apiResponse.length),
                    typing: false
                };
            },
            providesTags: ['Message'],
            async onCacheEntryAdded(
                args,
                { updateCachedData, cacheDataLoaded, updateQueryData, cacheEntryRemoved, dispatch, getState }
            ) {

                let userId = getState().auth?.user?._id;
                // await cacheDataLoaded;
                const socket = getSocket()
                socket.on("connect", () => {
                    socket.emit("join", userId);

                });
                // socket.on("getusers", (data) => {
                //     console.log(`goined ${data.length}`)
                // });
                try {
                    socket.on("MessagetoClient", ({ image, sender, receiver, createdAt, chatId, msg }) => {
                        const id = chatId
                        dispatch(
                            apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                                return {
                                    MSGs: [
                                        { image, sender, receiver, chatId, createdAt, msg },
                                        ...draft.MSGs,
                                    ],
                                    totalCount: Number(draft.totalCount),
                                    typing: false,
                                };
                            })
                        );
                        dispatch(setSingleMSGNotify({ image, sender, receiver, chatId, createdAt, msg }))

                        dispatch(
                            apiSlice.util.updateQueryData("UserChats", 1, (draft) => {
                                // UPDATE LAST MASSAGE IN CHATS WNEN NEW MESSAGE SEND OR RECIEVED 
                                const userChat = draft?.Chats?.find((item) => item?._id === chatId)
                                userChat.lastMSG = msg

                                //REARANGE CHATS By MOVING FOLLOWER CHAT CART AT TOP WHEN NEW MWSSGAE RECIEBED
                                let index = draft?.Chats?.indexOf(userChat); // find the index of the object in the array
                                if (index > -1) { // if the object is in the array
                                    draft?.Chats.splice(index, 1); // remove it from the current position
                                    draft?.Chats.unshift(userChat); // add it to the beginning of the array
                                }
                            })
                        );
                        // updateCachedData((draft) => {
                        //     return {
                        //         MSGs: [
                        //             { image, sender, receiver, createdAt, msg },
                        //             ...draft.MSGs,
                        //         ],
                        //         totalCount: Number(draft.totalCount),
                        // typing: false,
                        //     };
                        // });

                    });
                    socket.on("TypingtoClient", ({ receiver, chatId, status }) => {
                        const id = chatId
                        dispatch(
                            apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                                return {
                                    MSGs: [
                                        ...draft.MSGs,
                                    ],
                                    totalCount: Number(draft.totalCount),
                                    typing: status,
                                };
                            })
                        );
                    })

                } catch (err) { }

                await cacheEntryRemoved;
                socket.close();
            },
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
                                totalCount: Number(data.length),
                                typing: false,
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
            invalidatesTags: ['Message']
        })
    }),
});

export const {
    useNewMessageMutation,
    useGetMessagesQuery,
    useDeleteAllMSGsMutation,
} = MessageApi;
