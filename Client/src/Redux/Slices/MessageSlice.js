import { createSlice } from "@reduxjs/toolkit"
const MessageSlice = createSlice({
    name: 'MSGs',
    initialState: {
        MSGsNotify: [],
        singleMSGNotify: {},
    },
    reducers: {
        setTotalMSGsNotify(state, action) {
            state.MSGs = action.payload;
        },
        setSingleMSGNotify(state, action) {
            state.singleMSG = action.payload;

        },
    }
})
export const { setTotalMSGsNotify, setSingleMSGNotify } = MessageSlice.actions;
export default MessageSlice.reducer

// export const selectTotalPosts = (state) => state.Posts.posts
// export const selectSinglePost = (state) => state.Posts.singlepost
