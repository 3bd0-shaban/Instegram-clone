import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { Transition } from 'react-transition-group';
import { useGetPostDetailsQuery } from '../../Redux/APIs/PostsApi';
import { useGetUserQuery } from '../../Redux/APIs/AuthApi';
import { BsBookmarkCheck, BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { ImSpinner3 } from 'react-icons/im';
import moment from 'moment'
const ModalPostDetails = (props) => {

    const { isModalPostDetails } = useSelector(state => state.Features);
    const { data: postDetails, isFeatching, isError, error } = useGetPostDetailsQuery(props.ID) || {};
    const { data: userInfo } = useGetUserQuery() || {};
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalPostDetails ? 'hidden' : 'auto';
    }, [isModalPostDetails]);

    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    return (
        <Transition nodeRef={nodeRef} in={isModalPostDetails} timeout={50} mountOnEnter unmountOnExit>
            {state => (
                <div ref={nodeRef}>
                    <div onClick={() => dispatch(FeatureAction.Show_ModalPostDetails(false))} className="fixed inset-0 bg-black/40 z-10"></div>

                    <div className={state === 'entering' ? 'ModalPostDetails scale-[.96] duration-75'
                        : state === 'exiting' ? 'ModalPostDetails scale-[1.1] duration-200' : 'ModalPostDetails scale-100 duration-75'}>

                        <div className="relative bg-white rounded-lg shadow md:h-[90%]">
                            {isError && <p>{error?.data?.msg}</p>}
                            <div className='grid grid-cols-6 h-full'>
                                <div className='col-span-6 md:col-span-3 xl:col-span-4 h-full'>
                                    {isFeatching ? <div className='h-full flex items-center justify-center animate-spin'><ImSpinner3 /></div> :
                                        <img className=' h-full w-full object-contain rounded-t-lg md:rounded-none' src={postDetails?.images[0]?.url} alt='' />
                                    }
                                </div>
                                <div className='col-span-6 md:col-span-3 xl:col-span-2 relative'>
                                    <div className='flex justify-between items-center py-2 px-3'>
                                        <div className='flex items-center'>
                                            <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                                            <p className='text-md font-poppins font-medium'>{userInfo?.fullname}</p>
                                        </div>
                                        <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2'>
                                            <BsThreeDots />
                                        </button>
                                    </div><hr />
                                    <div className='mt-10 md:mt-0 md:h-[70%] flex justify-center items-center'>
                                        <div className='text-center space-y-3'>
                                            <p className='font-semibold text-3xl'>No comments yet.</p>
                                            <p className='text-base font-light '>Start the conversation.</p>
                                        </div>
                                    </div>
                                    <div className='md:absolute w-full md:bottom-0 mb-5'>
                                        <div className='flex justify-between mt-4 px-4 text-2xl'>
                                            <div className='flex gap-4'>
                                                <FaRegHeart />
                                                <FaRegComment />
                                                <IoMdPaperPlane />
                                            </div>
                                            <div><BsBookmarkCheck /></div>
                                        </div>
                                        <div className='ml-4 mt-4'>
                                            {postDetails?.likesnumber === 0 ? <p className='text-md font-semibold'>Be the first to like this</p> :
                                                <p className='text-md font-semibold'>{postDetails?.likesnumber} Likes</p>
                                            }
                                            <p className=' inline font-semilight'>{postDetails?.des}</p>
                                            <Link className='block text-gray-500 font-lg font-extralight'>View all {postDetails?.commentsnumber} comments</Link>
                                            <p className='font-light text-sm text-gray-800 py-2'>{moment(postDetails?.createtAt).calendar()}</p>
                                        </div>
                                        <div className='flex px-3 border-t pt-3 mt-2'>
                                            <div className='text-2xl pl-1 pr-2'><FaRegSmile /></div>
                                            <input className='outline-none w-full pr-3' placeholder='Add Comment ...' />
                                            <button className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </Transition >
    )
}

export default ModalPostDetails
