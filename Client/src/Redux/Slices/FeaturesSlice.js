import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        SideBar: false,
        DrobdownMore: false,
    },
    reducers: {
        ShowSideBar(state) {
            state.SideBar = !state.SideBar;
        },
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
    },

})


export const { ShowDrobdownMore } = FeaturesSlice.actions;
export default FeaturesSlice.reducer
