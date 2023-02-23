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
            providesTags: ['Chat', 'User'],
        }),
        getMoreChats: builder.query({
            query: ({ page }) =>
                `/api/chat/all?page=${page}`,
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    const conversations = await queryFulfilled;
                    if (conversations?.data?.length > 0) {
                        // update conversation cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "UserChats",
                                email,
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...conversations.data,
                                        ],
                                        totalCount: Number(draft.totalCount),
                                    };
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) { }
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
