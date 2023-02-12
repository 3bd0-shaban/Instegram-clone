import { createSlice } from "@reduxjs/toolkit"
const PostsSlice = createSlice({
    name: 'Posts',
    initialState: {
        posts: [],
        singlepost: {},
    },
    reducers: {
        setTotalPosts(state, action) {
            state.posts = action.payload;
        },
        setSinglePost(state, action) {
            state.posts = action.payload;

        },
    }
})
export const { setTotalPosts, setSinglePost } = PostsSlice.actions;
export default PostsSlice.reducer

// export const selectTotalPosts = (state) => state.Posts.posts
// export const selectSinglePost = (state) => state.Posts.singlepost
