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
        isModalReports: false,
        isModalThanksReport: false,
        isClipAlert: false,
        isPostMore: false,
        isModalSettings: false,
        isModalPostDetails: false,
        isModalPostMoreLogged: false,
        isModalUnfollowConfirm: false,
        isModalBlockConfirm: false,
        isModalLoadingUpload: false,
        isNewMSG: false,
        isShare: false,
        isReelComments: false
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
            state.isClipAlert = !state.isClipAlert;
            // setTimeout(() => {
            //     state.isClipAlert = !state.isClipAlert;
            // }, 1000);
        },
        Show_ModalPreviewImages(state) {
            state.IsModalPreviewImages = !state.IsModalPreviewImages;
        },
        setIsModalReports(state) {
            state.isModalReports = !state.isModalReports;
        },
        setIsModalThanksReport(state) {
            state.isModalThanksReport = !state.isModalThanksReport;
        },
        setIsModalBlockConfirm(state) {
            state.isModalBlockConfirm = !state.isModalBlockConfirm;
        },
        setIsModalUnfollowConfirm(state) {
            state.isModalUnfollowConfirm = !state.isModalUnfollowConfirm;
        },
        Show_isPostMore(state) {
            state.isPostMore = !state.isPostMore;
        },
        Show_iSModalSittings(state) {
            state.isModalSettings = !state.isModalSettings;
        },
        Show_ModalPostDetails(state) {
            state.isModalPostDetails = !state.isModalPostDetails;
        },
        Show_ModalPostMoreLogged(state) {
            state.isModalPostMoreLogged = !state.isModalPostMoreLogged;
        },
        setIsModalLoadingUpload(state) {
            state.isModalLoadingUpload = !state.isModalLoadingUpload;
        },
        setMessageAlert(state) {
            state.isNewMSG = !state.isNewMSG;
        },
        setIsShare(state) {
            state.isShare = !state.isShare;
        },
        setIsPostComments(state) {
            state.isReelComments = !state.isReelComments;
        },
    },
});

export const FeatureAction =
    FeaturesSlice.actions;
export default FeaturesSlice.reducer;
