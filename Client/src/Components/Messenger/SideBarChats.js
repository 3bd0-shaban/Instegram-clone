import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import FollowerCart from './FollowerCart';
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatApi } from './../../Redux/APIs/ChatApi';
import { useDispatch } from 'react-redux';
import { useUserChatsQuery } from './../../Redux/APIs/ChatApi';

const SideBarChats = ({ userInfo }) => {
    const [page, setPage] = useState(1);
    // eslint-disable-next-line 
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const { data: Chats, isError, isLoading, error } = useUserChatsQuery() || {};

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    useEffect(() => {
        if (page > 1) {
            dispatch(
                ChatApi.endpoints.getMoreChats.initiate({
                    page
                })
            );
        }
    }, [page, dispatch]);

    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <p message={error?.data} />
            </li>
        );
    } else if (!isLoading && !isError && Chats?.length === 0) {
        content = <li className="m-2 text-center">No conversations found!</li>;
    } else if (!isLoading && !isError && Chats?.length > 0) {
        content = (
            <>
                <div className='fixed lg:static top-0 inset-x-0 bg-white flex border-b py-2'>
                    <div className='flex mx-auto text-lg font-semibold '>
                        <Link to={`/${userInfo?.username}`}>
                            <p>{userInfo?.username}</p>
                        </Link>
                        <div className='mt-2 ml-2'>
                            <IoIosArrowDown />
                        </div>
                    </div>
                    <div className='ml-auto text-2xl mr-4'>
                        {/* <button><TbMessage2Share /></button> */}
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={Chats.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    height={window.innerHeight - 129}
                >
                    {Chats?.slice()
                        .sort((a, b) => b.timestamp - a.timestamp).map(chat => (
                            <div key={chat?._id} className='mt-10'>
                                <FollowerCart chat={chat} userInfo={userInfo} />
                            </div>
                        ))}
                </InfiniteScroll>

            </>
        );
        return content;
    }
}

export default SideBarChats
