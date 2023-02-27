import React, { useEffect, useState } from 'react'
import { BsBookmarks, BsFillChatFill } from 'react-icons/bs'
import { useGetUserByIdReelsQuery } from '../../../Redux/APIs/ReelsApi'
import { ImSpinner3 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { ModalPostDetails, useBreakpoint, PostMore } from '../../Exports';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReelsApi } from './../../../Redux/APIs/ReelsApi';

const UserReelsById = ({ id, userById }) => {
    let page1 = 1;
    const { data, isFetching, isError, error } = useGetUserByIdReelsQuery({ id, page1 })
    const { userReels, totalCount } = data || {}
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { isModalPostDetails, isPostMore } = useSelector(state => state.Features);
    const [postID, setPostID] = useState('');
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const navigate = useNavigate();
    const [postDetails, setPostDetails] = useState('');

    useEffect(() => {
        if (page > 1) {
            dispatch(
                ReelsApi.endpoints.GetMoreUserByIdReels.initiate({
                    page, id
                })
            );
        }
    }, [page, dispatch, id]);

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
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
                        <BsBookmarks size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p>Only you can see what you've saved.</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className='container max-w-5xl px-0'>
            <AnimatePresence>
                {isModalPostDetails && <ModalPostDetails id={postID} postDetails={postDetails} />}
            </AnimatePresence>
            {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
            {isFetching ? <p className='flex justify-center h-96 items-center text-5xl text-gray-600 font-medium animate-spin'><ImSpinner3 /></p>
                :
                isError ? <p className='w-full text-center py-16 font-medium lg:text-lg'>{error?.data?.msg}</p>
                    :
                    <InfiniteScroll
                        dataLength={userReels.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        style={{ marginBottom: '3rem', overflow: 'hidden' }}
                    >
                        <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                            {userReels && userReels?.map((post) => (
                                <div onClick={
                                    () => {
                                        MobileView ? navigate(`/p/${post?._id}?profile=${userById.username}`)
                                            :
                                            dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id); setPostDetails(post)
                                    }} key={post._id}
                                    className='h-40 md:h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                                    <img className='object-cover w-full h-full' src={post?.images[0]?.url} alt='' />
                                    <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                        <div><BsFillChatFill size={25} /></div>
                                        <p className='inline-block'>0</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
            }
            {(userReels?.length === 0) && <EmptyTagges />}
        </div>
    )
}

export default UserReelsById
