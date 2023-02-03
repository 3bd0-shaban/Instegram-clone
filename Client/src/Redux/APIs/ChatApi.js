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
        SingleChat: builder.mutation({
            query: (id) => ({
                url: `/api/chat/get/single/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Chat', 'User'],
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
    useSingleChatMutation,
    useChatMessagesQuery,
} = ChatApi;
