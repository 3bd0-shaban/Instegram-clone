import { createSlice } from "@reduxjs/toolkit"
const MessageSlice = createSlice({
    name: 'MSGs',
    initialState: {
        MSGs: [],
        singleMSG: {},
    },
    reducers: {
        setTotalMSGs(state, action) {
            state.MSGs = action.payload;
        },
        setSingleMSG(state, action) {
            state.singleMSG = action.payload;

        },
    }
})
export const { setTotalMSGs, setSingleMSG } = MessageSlice.actions;
export default MessageSlice.reducer

// export const selectTotalPosts = (state) => state.Posts.posts
// export const selectSinglePost = (state) => state.Posts.singlepost
