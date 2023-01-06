import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import { useGetPostDetailsQuery } from '../../Redux/APIs/PostsApi';
import { useGetUserQuery } from '../../Redux/APIs/AuthApi';
import { BsBookmarkCheck, BsDot, BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { ImSpinner3 } from 'react-icons/im';
import moment from 'moment'
import PostMore from './PostMore';
import { BiChevronRight } from 'react-icons/bi';
const ModalPostDetails = (props) => {

    const { isModalPostDetails } = useSelector(state => state.Features);
    const { data: postDetails, isFeatching, isError, error } = useGetPostDetailsQuery(props.ID) || {};
    const { data: userInfo } = useGetUserQuery() || {};
    const [images, setImages] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [dirSlide ,setDirSlide] = useState('slide-right');
    useEffect(() => {
        setImages(postDetails?.images)
    }, [postDetails]);
    const prevSlide = () => {
        const isFirstSlide = curIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : curIndex - 1;
        setCurIndex(newIndex);
        setDirSlide('slide-left');
    };

    const nextSlide = () => {
        const isLastSlide = curIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : curIndex + 1;
        setCurIndex(newIndex);
        setDirSlide('slide-right');
    };

    const goToSlide = (slideIndex) => {
        setCurIndex(slideIndex);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalPostDetails ? 'hidden' : 'auto';
    }, [isModalPostDetails]);

    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    return (
        <>
            <PostMore />
            <Transition nodeRef={nodeRef} in={isModalPostDetails} timeout={50} mountOnEnter unmountOnExit>
                {state => (
                    <div ref={nodeRef}>
                        <div onClick={() => dispatch(FeatureAction.Show_ModalPostDetails(false))} className="fixed inset-0 bg-black/40 z-10"></div>

                        <div className={state === 'entering' ? 'ModalPostDetails scale-[.96] duration-75'
                            : state === 'exiting' ? 'ModalPostDetails scale-[1.1] duration-200' : 'ModalPostDetails scale-100 duration-75'}>

                            <div className="relative bg-white rounded-lg shadow md:h-[90%]">
                                {isError && <p>{error?.data?.msg}</p>}
                                <div className='grid grid-cols-6 h-full'>
                                    <div className='col-span-6 md:col-span-3 xl:col-span-4 h-full relative'>
                                        {isFeatching ? <div className='h-full flex items-center justify-center animate-spin'><ImSpinner3 /></div> :

                                            <div className='relative overflow-hidden'>
                                                <TransitionGroup nodeRef={nodeRef}>
                                                    <CSSTransition key={images && images[curIndex]?.url} timeout={500} classNames={dirSlide}>
                                                        <img className='imageslide' src={images && images[curIndex]?.url} alt='' />
                                                    </CSSTransition>
                                                </TransitionGroup>
                                            </div>
                                        }
                                        <div className='absolute inset-y-1/2 flex justify-between w-full px-4'>
                                            <button onClick={prevSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                                            <button onClick={nextSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                                        </div>
                                        <div className='flex justify-center inset-x-1/2 absolute py-2'>
                                            {images?.map((slide, slideIndex) => (
                                                <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={slideIndex === curIndex ? ' cursor-pointer text-white' : 'text-gray-500 cursor-pointer'}><BsDot size={25} /></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='col-span-6 md:col-span-3 xl:col-span-2 relative md:border-l'>
                                        <div className='flex justify-between items-center py-2 px-3'>
                                            <div className='flex items-center'>
                                                <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                                                <p className='text-md font-poppins font-medium'>{userInfo?.username}</p>
                                            </div>
                                            <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2'>
                                                <BsThreeDots />
                                            </button>
                                        </div><hr />
                                        {postDetails?.comments.length === 0 ?
                                            <div className='mt-10 md:mt-0 md:h-[70%] flex justify-center items-center'>
                                                <div className='text-center space-y-3'>
                                                    <p className='font-semibold text-3xl'>No comments yet.</p>
                                                    <p className='text-base font-light '>Start the conversation.</p>
                                                </div>
                                            </div>
                                            :
                                            <div className='overflow-y-scroll  md:h-[70%]'>
                                                {postDetails?.comments?.map((comment) => (
                                                    <div key={comment?._id} className='px-3 py-3 '>
                                                        <div className='flex items-center'>
                                                            <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                                                            <div className='flex gap-3'>
                                                                <p className='text-md font-poppins font-medium'>{userInfo?.username}</p>
                                                                <p className='font-poppins font-thin'>{comment?.comment}</p>
                                                            </div>
                                                        </div>
                                                        <p className='text-sm px-16 text-gray-500'>{moment(comment?.time).calendar()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        }

                                        <div className='md:absolute w-full md:bottom-0 mb-5 border-t'>
                                            <div className='flex justify-between mt-4 px-4 text-2xl'>
                                                <div className='flex gap-4'>
                                                    <FaRegHeart />
                                                    <FaRegComment />
                                                    <IoMdPaperPlane />
                                                </div>
                                                <div><BsBookmarkCheck /></div>
                                            </div>
                                            <div className='ml-4 mt-4 space-y-3'>
                                                {postDetails?.likesnumber === 0 ? <p className='text-md font-semibold'>Be the first to like this</p> :
                                                    <p className='text-md font-semibold'>{postDetails?.likesnumber} Likes</p>
                                                }
                                                <p className=' inline font-semilight'>{postDetails?.des}</p>
                                                <Link className='block text-gray-500 font-lg font-extralight'>View all {postDetails?.commentsnumber} comments</Link>
                                                <p className='font-light text-sm text-gray-800 mb-2'>{moment(postDetails?.createdAt).calendar()}</p>
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
        </>
    )
}

export default ModalPostDetails
