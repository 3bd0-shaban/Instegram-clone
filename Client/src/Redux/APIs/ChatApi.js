import { apiSlice } from '../ApiSlice';
import getSocket from '../SocketRTK';
export const ChatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewChat: builder.mutation({
            query: (id) => ({
                url: `/api/chat/${id}`,
                method: 'Post',
            }),
            invalidatesTags: ['Chat', 'User'],
        }),
        UserChats: builder.query({
            query: (page) => ({
                url: `/api/chat/all?page=${page}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                // const totalCount = Number(meta.response.headers.get('X-Total-Count'));
                let onlineStatus = false
                for (let i = 0; i < apiResponse.length; i++) {
                    apiResponse[i].isOnline = onlineStatus; // add the new element to each object
                }
                return {
                    Chats: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
            },
            providesTags: ['Message'],
            async onCacheEntryAdded(
                args,
                { cacheEntryRemoved, updateCachedData, cacheDataLoaded, getState }
            ) {
                const chats = await cacheDataLoaded;
                let userId = getState().auth?.user?._id;
                const socket = getSocket()
                socket.on("connect", () => {
                    socket.emit("join", userId);
                });
                try {
                    socket.on("getusers", (data) => {
                        for (let i = 0; i < chats.length; i++) {
                            const ckeckIsOnline = data?.some(user => user.userId === chats[i]?._id)
                            updateCachedData((draft) => {
                                draft.Chats[i].isOnline = ckeckIsOnline
                            });
                        }

                    });

                } catch (err) { }

                await cacheEntryRemoved;
                socket.close();
            },
        }),

        getMoreChats: builder.query({
            query: ({ page }) =>
                `/api/chat/all?page=${page}`,
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("GetMessages", { id }, (draft) => {
                            return {
                                Chats: [
                                    ...draft.Chats,
                                    ...data,
                                ],
                                totalCount: Number(data.totalCount),
                            };
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),

        // SingleChat: builder.query({
        //     query: (id) => ({
        //         url: `/api/chat/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['Chat', 'User'],
        // }),

    }),
});

export const {
    useNewChatMutation,
    useUserChatsQuery,
    // useSingleChatQuery,
} = ChatApi;
