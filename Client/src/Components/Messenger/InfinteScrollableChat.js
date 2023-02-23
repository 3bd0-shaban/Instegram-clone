import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import { MessageApi } from './../../Redux/APIs/MessageApi';
import { useDispatch } from 'react-redux';

const InfinteScrollableChat = ({ userById, allMSGs, totalCount, id, isLoading, isError, error }) => {
    const ScrollRef = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        ScrollRef.current?.focus();
    }, [allMSGs]);
    const fetchMore = () => {
        console.log('it is working')
        setPage((prevPage) => prevPage + 1);
    };

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

        if (totalCount > 0) {

            const more =
                Math.ceil(
                    totalCount / 10
                ) > page;
            setHasMore(more);
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
                height: 300,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }} className="relative w-full h-[calc(100vh_-_197px)] flex flex-col-reverse">
                <InfiniteScroll
                    dataLength={allMSGs.length}

                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<div>loading ........</div>}
                    inverse={true}
                    hasChildren={true}

                    height={window.innerHeight - 197}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    scrollableTarget="scrollableDiv"
                >
                    {allMSGs?.map((message, index) => (
                        <div ref={ScrollRef} key={index}>
                            <Message message={message} FollowerChating={message?.sender === userById?._id} />
                        </div>
                    ))}
                    <button onClick={() => setPage(prev => prev + 1)}>click</button>
                </InfiniteScroll>
            </div>
        )
    }
    return content
}

export default InfinteScrollableChat
