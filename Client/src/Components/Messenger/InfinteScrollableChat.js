import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import { MessageApi, useGetMessagesQuery } from './../../Redux/APIs/MessageApi';
import { useDispatch } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';
import { useBreakpoint, SkilMSGs } from '../Exports';

const InfinteScrollableChat = ({ userById, id, image, isLoading }) => {
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');

    const ScrollRef = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { data, isLoading: loadingMSGs, isError, error } = useGetMessagesQuery({ id }, {
        refetchOnMountOrArgChange: true,
    });
    const { MSGs, totalCount, typing } = data || {}
    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        // ScrollRef.current?.focus();
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    }, [MSGs]);

    useEffect(() => {
        window.scrollTo({
            bottom: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [MSGs])
    useEffect(() => {
        if (page > 1) {
            dispatch(
                MessageApi.endpoints.GetMoreMessages.initiate({
                    id,
                    page,
                })
            );
        }
    }, [page, dispatch, id]);

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);

    return (
        loadingMSGs ? <SkilMSGs /> : isError ? <p>{error?.data?.msg}</p> :
            <div id="scrollableDiv">
                <InfiniteScroll
                    dataLength={MSGs.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    inverse={true}
                    // hasChildren={true}
                    loader={
                        <div className='flex justify-center items-center my-5 animate-spin'>
                            <ImSpinner3 size={25} />
                        </div>
                    }
                    endMessage={
                        <div className='flex justify-center my-5 text-lg font-semibold'>
                            <p>You see it all</p>
                        </div>}
                    height={MobileView ? (window.innerHeight - 80) : (window.innerHeight - 110)}
                    className='hideScrollBare flex flex-col-reverse'
                    scrollableTarget="scrollableDiv"
                >
                    {image &&
                        <div className='flex justify-end m-3'>
                            <div className='max-w-[10rem] md:max-w-[15rem] relative'>
                                <img src={image} accept="image/*" alt='' className='rounded-xl w-full flex justify-end' />
                                {isLoading && <div className='absolute inset-0 bg-white/50 flex justify-center items-center text-gray-500'>
                                    <span className=' animate-spin'> <ImSpinner3 size={30} /></span>
                                </div>}
                            </div>
                        </div>}
                    {typing && <p className='m-3'>typing ....</p>}
                    {MSGs?.map((message, index) => (
                        <div ref={ScrollRef} key={index}>
                            <Message message={message} FollowerChating={message?.sender === userById?._id} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
    )
}

export default InfinteScrollableChat
