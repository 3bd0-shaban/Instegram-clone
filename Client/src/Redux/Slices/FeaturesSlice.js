import { createSlice } from '@reduxjs/toolkit';
const FeaturesSlice = createSlice({
    name: 'Upload_Product',
    initialState: {
        SideBar: false,
        isModalFollowersList: false,
        isModalFollowingList: false,
        DrobdownMore: false,
        isModalAddPost: false,
        IsModalPreviewImages: false,
        isModalConfirm: false,
        isPostMore: false,
        isModalSittings: false,
        isModalPostDetails: false,
        isModalPostMoreLogged: false

    },
    reducers: {
        ShowSideBar(state) {
            state.SideBar = !state.SideBar;
        },
        setIsModalFollowersList(state) {
            state.isModalFollowersList = !state.isModalFollowersList;
        },
        setIsModalFollowingList(state) {
            state.isModalFollowingList = !state.isModalFollowingList;
        },
        ShowDrobdownMore(state) {
            state.DrobdownMore = !state.DrobdownMore;
        },
        ShowModalAddPost(state) {
            state.isModalAddPost = !state.isModalAddPost;
        },
        Show_ModalConfirm(state) {
            state.isModalConfirm = !state.isModalConfirm;
        },
        Show_ModalPreviewImages(state) {
            state.IsModalPreviewImages = !state.IsModalPreviewImages;
        },
        Show_isPostMore(state) {
            state.isPostMore = !state.isPostMore;
        },
        Show_iSModalSittings(state) {
            state.isModalSittings = !state.isModalSittings;
        },
        Show_ModalPostDetails(state) {
            state.isModalPostDetails = !state.isModalPostDetails;
        },
        Show_ModalPostMoreLogged(state) {
            state.isModalPostMoreLogged = !state.isModalPostMoreLogged;
        },
    },
});

export const FeatureAction =
    FeaturesSlice.actions;
export default FeaturesSlice.reducer;
