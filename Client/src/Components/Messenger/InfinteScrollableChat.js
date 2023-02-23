import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import { MessageApi } from './../../Redux/APIs/MessageApi';
import { useDispatch } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';

const InfinteScrollableChat = ({ userById, allMSGs, totalCount, id, isLoading, isError, error }) => {
    const ScrollRef = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        // ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        ScrollRef.current?.focus();
    }, [allMSGs]);
    const fetchMore = () => {
        console.log('it is working')
        setPage((prevPage) => prevPage + 1);
    };
    useEffect(() => {
        window.scrollTo({
            bottom: 0,
            left: 0,
            behavior: "smooth"
          })
      }, [allMSGs])
    useEffect(() => {
        if (page > 1) {
            const t = dispatch(
                MessageApi.endpoints.GetMoreMessages.initiate({
                    id,
                    page,
                })
            );
            console.log(t)
        }
    }, [page, dispatch, id]);

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);

    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (!isLoading && isError) {
        content = (
            <div>
                error
            </div>
        );
    }

    else if (!isLoading && !isError && allMSGs?.length === 0) {
        content = <div>No messages found!</div>;
    } else if (!isLoading && !isError && allMSGs?.length > 0) {
        content = (
            <div id="scrollableDiv" tyle={{
                // height: 300,
                overflow: 'auto',
                display: 'flex',
                // flexDirection: 'column-reverse',
            }} className="hideScrollBare">
                <InfiniteScroll
                    dataLength={allMSGs.length}
                    next={fetchMore}
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
                    style={{ display: 'flex', flexDirection: 'column-reverse', 'transitionDuration': '300ms' }} //To put endMessage and loader to the top.
                    className='hideScrollBare'
                    scrollableTarget="scrollableDiv"
                >
                    {allMSGs?.map((message, index) => (
                        <div ref={ScrollRef} key={index}>
                            <Message message={message} FollowerChating={message?.sender === userById?._id} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        )
    }
    return content
}

export default InfinteScrollableChat
