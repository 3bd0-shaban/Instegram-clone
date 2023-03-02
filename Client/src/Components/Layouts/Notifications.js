import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimSlide from './../../Animation/AnimSlode';
import { useGetNotifiesQuery, NotifiesApi } from '../../Redux/APIs/NotifiesApi';
import { useConfirmFollowingMutation, useRefuseFollowRequestMutation } from '../../Redux/APIs/UserApi';
import { ImSpinner3 } from 'react-icons/im';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsPatchCheckFill } from 'react-icons/bs';

const Notifications = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const { data, isFetching, isError, error } = useGetNotifiesQuery(1)
    const { notifies, totalCount } = data || {};
    const [ConfirmFollowing, { isLoading: loadingconfirm }] = useConfirmFollowingMutation()
    const [RefuseFollowRequest, { isLoading: loadingCancel }] = useRefuseFollowRequestMutation()
    const HandleConfirmFollow = async (id) => {
        await ConfirmFollowing(id).unwrap()
    }
    const HandleRequestDelete = async (id) => {
        await RefuseFollowRequest(id).unwrap()
    }

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
                NotifiesApi.endpoints.GetMoreNotifies.initiate({
                    page
                })
            );
        }
    }, [page, dispatch]);


    return (
        <motion.div
            variants={AnimSlide}
            initial='initial'
            animate='animate'
            exit='exit'
            className='bg-white h-screen z-20 p-3 w-[28rem] shadow-sm hidden lg:block rounded-tr-2xl rounded-br-2xl hideScrollBare overflow-y-scroll rounded-md border'>
            <p className='m-2 mb-5 font-medium text-2xl'>Notification</p>
            {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
                <InfiniteScroll
                    dataLength={notifies.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className='overflow-y-scroll space-y-3 !h-full hideScrollBare mt-10 lg:mt-0'
                >
                    {notifies?.map(res => (
                        <div
                            key={res._id}
                            className='flex items-center justify-between'
                        >
                            <Link
                                to={`/${res.sender?.username}`}
                                className='flex gap-1'>
                                <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
                                    src={res?.sender?.avatar?.url ? res?.sender?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                                    alt=""
                                />
                                <div className='ml-1'>
                                    <div className='flex gap-2'>
                                        <p className='text-md font-poppins font-medium'>{res?.sender?.username}</p>
                                        {res?.sender?.isVerified &&
                                            <div className='text-blue-600 mt-1'>
                                                <BsPatchCheckFill size={15} />
                                            </div>
                                        }
                                    </div>
                                    <p className='text-sm font-poppins text-gray-500'>{res?.sender?.fullname}</p>
                                </div>
                            </Link>

                            <div className='flex gap-3'>

                                <button
                                    onClick={() => HandleConfirmFollow(res?.sender?._id)}
                                    className='bg-blue-500 text-white font-medium text-lg rounded-md px-3 py-1'>
                                    {loadingconfirm ?
                                        <div className='flex justify-center items-center px-3 animate-spin'>
                                            <ImSpinner3 />
                                        </div> :
                                        'Confirm'}
                                </button>
                                <button
                                    onClick={() => HandleRequestDelete(res?.sender?._id)}
                                    className='bg-gray-200 text-slate-800 font-medium text-lg rounded-md px-3 py-1'>
                                    {loadingCancel ?
                                        <div className='flex justify-center items-center px-3 animate-spin'>
                                            <ImSpinner3 />
                                        </div> :
                                        'Delete'}
                                </button>

                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            }
        </motion.div>
    )
}

export default Notifications
