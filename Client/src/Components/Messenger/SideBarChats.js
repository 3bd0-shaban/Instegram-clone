import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import FollowerCart from './FollowerCart';
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatApi } from './../../Redux/APIs/ChatApi';
import { useDispatch, useSelector } from 'react-redux';
import { useUserChatsQuery } from './../../Redux/APIs/ChatApi';
import { selectCurrentUser } from '../../Redux/Slices/UserSlice';

const SideBarChats = () => {
    const [page, setPage] = useState(1);
    // eslint-disable-next-line 
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const { data, isError, isFetching, error } = useUserChatsQuery(1, {
        // refetchOnMountOrArgChange: true
    });
    const userInfo = useSelector(selectCurrentUser)

    const { Chats, totalCount } = data || {};
    const { username } = useParams()
    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (totalCount === 0) {
            setHasMore(false);
        }
    }, [totalCount, page]);

    useEffect(() => {
        if (page > 1) {
            dispatch(
                ChatApi.endpoints.getMoreChats.initiate({
                    page
                })
            );
        }
    }, [page, dispatch]);

    return (

        <>
            <div className='fixed lg:static top-0 inset-x-0 bg-white flex border-b py-2 '>
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
            {isFetching ?
                <div>

                </div> : isError ? <p>{error?.data?.msg}</p> :
                    <InfiniteScroll
                        dataLength={Chats.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        className='overflow-y-scroll !h-full hideScrollBare mt-10 lg:mt-0'
                    >
                        {Chats?.map(chat => (
                            <div key={chat?._id}>
                                <FollowerCart chat={chat} username={username} />
                            </div>
                        ))}
                    </InfiniteScroll>
            }
        </>
    )
}

export default SideBarChats
