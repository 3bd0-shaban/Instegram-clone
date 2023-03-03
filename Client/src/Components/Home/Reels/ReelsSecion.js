import { BsX } from 'react-icons/bs'
import { Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from 'react-infinite-scroll-component'; import "swiper/css";
import { useGetAllReelsQuery, ReelsApi } from '../../../Redux/APIs/ReelsApi';
import "swiper/css/pagination";
import Video from './Video';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    PostMore, ModalPostDetails, ModalReports, ModalThanksReport,
    ModalUnFollowConfirm, ModalBlockConfirm, ModalPostMoreLogged, ModalSendPost, SkilReelVideo
} from '../../Exports'; import { useSelector } from 'react-redux';
import { preventScroll } from '../../../Helpers/PreventScroll';
import ClipAlerts from '../../Layouts/Alerts';
import { AnimatePresence } from 'framer-motion';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Link } from 'react-router-dom';
const ReelsSecion = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const { data, isFetching, isError, error } = useGetAllReelsQuery(1);
    const { AllReels, totalCount, count } = data || {};
    const {
        isModalPostDetails, isPostMore, isClipAlert, isModalReports, isShare,
        isModalThanksReport, isModalUnfollowConfirm, isModalBlockConfirm, isModalPostMoreLogged
    } = useSelector(state => state.Features);

    preventScroll(isModalPostDetails || isPostMore || isModalReports ||
        isModalThanksReport || isModalUnfollowConfirm || isModalBlockConfirm || isModalPostMoreLogged);

    const [postID, setPostID] = useState('');
    const [postDetails, setPostDetails] = useState('');

    useEffect(() => {
        if (page > 1) {
            dispatch(
                ReelsApi.endpoints.GetMoreAllReels.initiate(page)
            );
        }
    }, [page, dispatch]);
    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1)
    }

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);

    return (

        <>
            <AnimatePresence>
                {isClipAlert && <ClipAlerts />}
            </AnimatePresence>
            <AnimatePresence>
                {isModalPostDetails && <ModalPostDetails id={postID} postDetails={postDetails} />}
            </AnimatePresence>
            {isModalReports && <ModalReports />}
            {isShare && <ModalSendPost PostId={postID} />}
            {isModalThanksReport && <ModalThanksReport userById={postDetails?.user} />}
            {isModalUnfollowConfirm && <ModalUnFollowConfirm userById={postDetails?.user} />}
            {isModalBlockConfirm && <ModalBlockConfirm UserByIdDetails={postDetails?.user} />}
            {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
            {isModalPostMoreLogged && <ModalPostMoreLogged PostId={postID} postDetails={postDetails} onDeleteSuccess={() => { isModalPostDetails && dispatch(FeatureAction.Show_ModalPostDetails(false)) }} />}
            <div className='text-white p-5 w-full fixed justify-between z-10 hidden lg:flex'>
                <Link to='/'> <img className="h-8 " src="/Images/Font.png" alt="" /></Link>
                <Link to='/'><BsX size={30} /></Link>
            </div>
            <div className='fixed inset-0 bg-[#1A1A1A]'>
                <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    // onScroll={() => {
                    //     if (totalCount !== 0) {
                    //         setPage((prevPage) => prevPage + 1)
                    //     }
                    // }}
                    onSlideChange={() => {
                        if (totalCount !== 0) {
                            setPage((prevPage) => prevPage + 1)
                        }
                    }}
                    modules={[Mousewheel, Pagination]}
                    className="flex justify-center items-center max-w-3xl h-screen !fixed !inset-x-0 container px-0 cursor-pointer text-white"
                >
                    {isFetching ?
                        <SwiperSlide className='bg-zinc-800 animate-pulse relative w-full'>
                            <SkilReelVideo />
                        </SwiperSlide>
                        : isError ? <p>{error?.data?.msg}</p> :
                            <InfiniteScroll
                                dataLength={AllReels.length}
                                next={fetchMore}
                                hasMore={hasMore}
                                className='h-full'
                                // height={window.innerHeight - 50}
                                loader={
                                    <SwiperSlide className='bg-zinc-800 animate-pulse relative w-full'>
                                        <SkilReelVideo />
                                    </SwiperSlide>
                                }
                                endMessage={
                                    <div className='flex justify-center my-5 text-lg font-semibold'>
                                        <p>You see it all</p>
                                    </div>}
                            // style={{ marginBottom: '3rem', overflow: 'hidden', height: '100%' }}
                            >
                                {AllReels?.map((Reel, index) => (
                                    <SwiperSlide className='h-full' key={Reel._id}>
                                        <Video Reel={Reel} setPostID={setPostID} setPostDetails={setPostDetails} count={count} index={index} />
                                    </SwiperSlide>
                                ))}
                            </InfiniteScroll>
                    }

                </Swiper>
            </div>
        </>
    )
}

export default ReelsSecion
