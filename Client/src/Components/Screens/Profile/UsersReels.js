import React, { useEffect, useState } from 'react'
import { BsFillChatFill, BsImages } from 'react-icons/bs'
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { ModalPostDetails, ModalPostMoreLogged } from '../../../Components/Exports'
import { ImSpinner3 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import useBreakpoint from '../../../Hooks/useBreakpoint';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetUserReelsQuery, ReelsApi } from '../../../Redux/APIs/ReelsApi';
import { preventScroll } from '../../../Helpers/PreventScroll';

const UsersReels = ({ userInfo }) => {
    const { data, isFetching, error, isError } = useGetUserReelsQuery(1)
    const { userReels, totalCount } = data || {};
    const { isModalPostDetails, isModalPostMoreLogged } = useSelector(state => state.Features);
    preventScroll(isModalPostDetails || isModalPostMoreLogged)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [postID, setPostID] = useState('');
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const [postDetails, setPostDetails] = useState('');
    const navigate = useNavigate();

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    useEffect(() => {
        if (page > 1) {
            dispatch(
                ReelsApi.endpoints.GetMoreUserReels.initiate(page)
            );
        }
    }, [page, dispatch]);

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);


    const EmptyTagges = () => {
        return (
            <>
                <div className='flex mt-28 justify-center'>
                    <div className='border-black border-[3px] flex items-center rounded-full p-5'>
                        <BsImages size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p className='block font-bold text-4xl'>Reels</p>
                        <p>Upload your first reel</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <AnimatePresence>
                {isModalPostDetails && <ModalPostDetails id={postID} postDetails={postDetails} />}
            </AnimatePresence>
            {isModalPostMoreLogged && <ModalPostMoreLogged PostId={postID} postDetails={postDetails} />}
            <div className='container max-w-5xl px-0'>
                {isFetching ? <p className='flex justify-center h-96 items-center text-5xl text-gray-600 font-medium animate-spin'><ImSpinner3 /></p>
                    :
                    isError ? <p>{error?.data?.msg}</p>
                        :
                        <InfiniteScroll
                            dataLength={userReels.length}
                            next={fetchMore}
                            hasMore={hasMore}
                            style={{ marginBottom: '3rem', overflow: 'hidden' }}
                        >
                            <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                                {userReels && userReels?.map((post) => (
                                    <div onClick={() => {
                                        MobileView ?
                                            navigate(`/p/${post?._id}?profile=${userInfo.username}`)
                                            :
                                            dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id); setPostDetails(post)
                                    }}
                                        key={post?._id}
                                        className='h-40 md:h-80 cursor-pointer hover:brightness-50 duration-200 group relative'
                                    >
                                        <video className='h-full object-cover relative w-full overflow-hidden' playsInline>
                                            <source src={post.videos[0]?.url} />
                                        </video>
                                        <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                            <div><BsFillChatFill size={25} /></div>
                                            <p className='inline-block'>0</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>

                }
                {(userReels === [] || userReels?.length === 0) && <EmptyTagges />}
            </div>
        </>
    )
}

export default UsersReels
