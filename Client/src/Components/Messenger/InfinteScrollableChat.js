import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import { MessageApi, useGetMessagesQuery } from './../../Redux/APIs/MessageApi';
import { useDispatch } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';

const InfinteScrollableChat = ({ userById, id, }) => {
    const ScrollRef = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { data, isLoading: loadingMSGs, isError, error } = useGetMessagesQuery({ id }, {
        refetchOnMountOrArgChange: true,
    });
    const { MSGs, totalCount } = data || {}

    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        ScrollRef.current?.focus();
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
        loadingMSGs ? <p>Loading</p> : isError ? <p>{error?.data?.msg}</p> :
            <div ref={ScrollRef} id="scrollableDiv">
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
                    height={window.innerHeight - 50}
                    className='hideScrollBare flex flex-col-reverse'
                    scrollableTarget="scrollableDiv"
                >
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
