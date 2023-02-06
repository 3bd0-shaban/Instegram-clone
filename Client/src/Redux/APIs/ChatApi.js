import { apiSlice } from '../ApiSlice';
export const ChatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewChat: builder.mutation({
            query: (id) => ({
                url: `/api/chat/${id}`,
                method: 'Post',
                credentials: 'include',
            }),
            invalidatesTags: ['Chat', 'User'],
        }),
        UserChats: builder.query({
            query: () => ({
                url: '/api/chat/all',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Chat', 'User'],
        }),
        ChatMessages: builder.query({
            query: () => ({
                url: '/api/chat/get/messeages',
                method: 'Post',
                credentials: 'include',
            }),
            providesTags: ['Chat', 'User'],
        }),
    }),
});

export const {
    useNewChatMutation,
    useUserChatsQuery,
    useChatMessagesQuery,
} = ChatApi;
