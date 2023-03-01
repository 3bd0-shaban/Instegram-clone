import { BsX } from 'react-icons/bs'
import { Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from 'react-infinite-scroll-component'; import "swiper/css";
import { useGetFollowersReelsQuery, ReelsApi } from '../../../Redux/APIs/ReelsApi';
import "swiper/css/pagination";
import Video from './Video';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SkilReelVideo } from '../../Exports';
const ReelsSecion = () => {
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
    const fetchMore = () => {
        console.log('ddddddddddddd')
        setPage((prevPage) => prevPage + 1)
    }

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
                    className="flex justify-center items-center max-w-3xl h-screen container px-0 cursor-pointer text-white"
                >
                    {isFetching ?
                        <SwiperSlide className='h-screen bg-zinc-800 animate-pulse relative w-full'>
                            <SkilReelVideo />
                        </SwiperSlide>
                        : isError ? <p>{error?.data?.msg}</p> :
                            <InfiniteScroll
                                dataLength={FollowersReel.length}
                                next={fetchMore}
                                className='h-full'
                                hasMore={hasMore}
                                height={window.innerHeight - 50}
                                loader={
                                    <SwiperSlide className='h-screen bg-zinc-800 animate-pulse relative w-full'>
                                        <SkilReelVideo />
                                    </SwiperSlide>
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

export default ReelsSecion
