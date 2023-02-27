import { apiSlice } from '../ApiSlice';
import getSocket from '../SocketRTK';
export const NotifiesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetNotifies: builder.query({
            query: (page) => ({
                url: `/api/notify?page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Notify'],
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));

                return {
                    notifies: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
        }),
        GetMoreNotifies: builder.query({
            query: (page) => ({
                url: `/api/notify?page=${page}`,
                method: 'GET',
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("GetNotifies", 1, (draft) => {
                            return {
                                notifies: [
                                    ...draft.notifies,
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
        NewNotify: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/notify/${id}`,
                method: 'Post',
                body: data,
            }),
            invalidatesTags: ['Notify'],
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
    }),
});

export const {
    useGetNotifiesQuery,
    useGetMoreNotifiesQuery,
    useNewNotifyMutation,
} = NotifiesApi;
