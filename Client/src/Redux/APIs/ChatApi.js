import { apiSlice } from '../ApiSlice';
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

                return {
                    Chats: apiResponse,
                    totalCount: Number(apiResponse.length)
                };
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
                                totalCount: Number(draft.totalCount),
                            };
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        SingleChat: builder.query({
            query: (id) => ({
                url: `/api/chat/${id}`,
                method: 'GET',
            }),
            providesTags: ['Chat', 'User'],
        }),
        ChatMessages: builder.query({
            query: () => ({
                url: '/api/chat/get/messeages',
                method: 'Post',
            }),
            providesTags: ['Chat', 'User'],
        }),
    }),
});

export const {
    useNewChatMutation,
    useUserChatsQuery,
    useChatMessagesQuery,
    useSingleChatQuery,
} = ChatApi;
