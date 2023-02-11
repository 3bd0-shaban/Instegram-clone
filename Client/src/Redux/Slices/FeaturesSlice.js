import { createSlice } from '@reduxjs/toolkit';
const FeaturesSlice = createSlice({
    name: 'Features',
    initialState: {
        SideBar: false,
        DrobdownMore: false,
        isModalFollowersList: false,
        isModalFollowingList: false,
        isModalFollowerCTRL: false,
        isModalChangeProfile: false,
        isModalAddPost: false,
        IsModalPreviewImages: false,
        isModalConfirm: false,
        isClipAlert: false,
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
        setIsModalFollowerCTRL(state) {
            state.isModalFollowerCTRL = !state.isModalFollowerCTRL;
        },
        setIsModalChangeProfile(state) {
            state.isModalChangeProfile = !state.isModalChangeProfile;
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
        setIsClipAlert: (state) => {
            state.isClipAlert = true;
            setTimeout(() => {
              state.isClipAlert = !state.isClipAlert;
            }, 1000);
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
