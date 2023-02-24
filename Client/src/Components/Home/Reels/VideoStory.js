import { BsX } from 'react-icons/bs'
import { Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from 'react-infinite-scroll-component'; import "swiper/css";
import { useGetFollowersReelsQuery, ReelsApi } from '../../../Redux/APIs/ReelsApi';
import "swiper/css/pagination";
import Video from './Video';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';
const VideoStory = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const { data, isFetching, isError, error } = useGetFollowersReelsQuery(1);
    const { FollowersReel, totalCount } = data || {};

    useEffect(() => {
        if (page > 1) {
            console.log('dddddd')
            dispatch(
                ReelsApi.endpoints.GetMoreFollowersReels.initiate(page)
            );
        }
    }, [page, dispatch]);

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);

    return (
        <>
            <div className='h-[20vh] text-white p-5 w-full fixed justify-between z-10 hidden lg:flex'>
                <img className="h-8 " src="/Images/Font.png" alt="" />
                <BsX size={30} />
            </div>
            <div className='fixed inset-0 bg-[#1A1A1A]'>
                <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    modules={[Mousewheel, Pagination]}
                    className="flex justify-center items-center max-w-3xl h-screen container  px-0 cursor-pointer text-white"
                >
                    {isFetching ? <p></p> : isError ? <p>{error?.data?.msg}</p> :
                        <InfiniteScroll
                            dataLength={FollowersReel.length}
                            next={() => setPage((prevPage) => prevPage + 1)}
                            className='h-full'
                            hasMore={true}
                            loader={
                                <div className='flex justify-center items-center my-5 animate-spin'>
                                    <ImSpinner3 size={25} />
                                </div>
                            }
                            endMessage={
                                <div className='flex justify-center my-5 text-lg font-semibold'>
                                    <p>You see it all</p>
                                </div>}
                            style={{ marginBottom: '3rem', overflow: 'hidden', height: '100%' }}
                        >
                            {FollowersReel?.map(Reel => (
                                <SwiperSlide className='h-full' key={Reel._id}>
                                    <Video Reel={Reel} />
                                </SwiperSlide>
                            ))}
                        </InfiniteScroll>
                    }

                </Swiper>
            </div>
        </>
    )
}

export default VideoStory
