import moment from 'moment'
import PostMore from './PostMore';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import { useGetPostDetailsQuery } from '../../Redux/APIs/PostsApi';
import { useGetUserQuery } from '../../Redux/APIs/AuthApi';
import { BsBookmarkCheck, BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { ImSpinner3 } from 'react-icons/im';
import { BiChevronRight } from 'react-icons/bi';
import { useSaveMutation } from '../../Redux/APIs/SavesApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../Redux/APIs/CommentsApi';
const ModalPostDetails = (props) => {
    const { isModalPostDetails } = useSelector(state => state.Features);
    const { data: postDetails, isFeatching, isError, error } = useGetPostDetailsQuery(props.ID) || {};
    const [createComment] = useCreateCommentMutation();
    const { data: userInfo } = useGetUserQuery() || {};
    const [Save] = useSaveMutation();
    const [Like] = useLikeMutation();
    const [UnLike] = useUnLikeMutation();
    const [images, setImages] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [curIndex, setCurIndex] = useState(0);
    const [dirSlide, setDirSlide] = useState('slide-right');
    // const [emoji, setEmoji] = useState();
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    const [data, setData] = useState({
        comment: ''
    });
    // const [chosenEmoji, setChosenEmoji] = useState(null);
    // function handleEmojiClick(newEmoji) {
    //     setChosenEmoji(newEmoji);
    // }
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    useEffect(() => {
        setImages(postDetails?.images)
    }, [postDetails]);
    useEffect(() => {
        const isInclude = postDetails?.likes?.some(p => p == userInfo?._id)
        if (isInclude) {
            setIsLiked(true);
        }
        setIsLiked(false)
        console.log(isInclude)
        console.log(postDetails?.likes)
        console.log(userInfo?._id)
    }, [postDetails, userInfo]);

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
    const Comment = async (id) => {
        if (!data) return {};
        await createComment({ data, id }).unwrap()
            .then((payload) => setData({ comment: '' }))
            .catch((error) => console.log(error));
    }
    const goToSlide = (slideIndex) => {
        setCurIndex(slideIndex);
    };
    const SaveSubmit = async (id) => {
        await Save(id).unwrap()
    }

    const LikeSubmit = async (id) => {
        await Like(id).unwrap()
    }
    const UnLikeSubmit = async (id) => {
        await UnLike(id).unwrap()
    }
    const ShowUpperPart = () => {
        return (
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='flex items-center'>
                    <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                    <p className='text-md font-poppins font-medium'>{postDetails?.user?.username}</p>
                </div>
                <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2'>
                    <BsThreeDots />
                </button>
            </div>
        )
    }

    const ShowComment = () => {
        return (
            postDetails?.comments.length === 0 ?
                <div className='mt-10 md:mt-0 flex h-[70%] justify-center items-center'>
                    <div className='text-center space-y-3'>
                        <p className='font-semibold text-3xl'>No comments yet.</p>
                        <p className='text-base font-light '>Start the conversation.</p>
                    </div>
                </div>
                :
                <div className='overflow-y-scroll md:h-[80%] pb-14'>
                    {postDetails?.comments?.map((comment) => (
                        <div key={comment?._id} className='px-3 py-3 '>
                            <div className='flex'>
                                <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={comment?.user?.avatar?.url} alt="" />
                                <div className='mt-2'>
                                    <div className='flex gap-3'>
                                        <span className='text-[1.1rem] font-poppins font-medium inline'>{comment?.user?.username}
                                            <p className='font-poppins text-[1rem] font-thin inline mx-3'>{comment?.comment}</p>
                                        </span>
                                    </div>
                                    <p className='text-sm text-gray-500'>{moment(comment?.time).from()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        )
    }
    const ShowPostCtrl = () => {
        return (
            <div className='md:absolute w-full z-20 bg-white md:bottom-0 mb-5 border-t'>
                <div className='flex justify-between mt-4 px-4 text-2xl py-3'>
                    <div className='flex gap-6'>
                        {isLiked ? <button onClick={() => UnLikeSubmit(postDetails?._id)} className='hover:text-gray-500 text-red-500'><FaHeart style={{ color: 'red' }} /></button> :
                            <button onClick={() => LikeSubmit(postDetails?._id)} className='hover:text-gray-500'><FaRegHeart size={28} /></button>}
                        <div className='cursor-pointer focus:animate-bounce hover:text-gray-500'>
                            <FaRegComment size={28} />
                        </div>
                        <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane size={28} /></button>
                    </div>
                    <button onClick={() => SaveSubmit(postDetails?._id)} className='hover:text-gray-500 cursor-pointer'><BsBookmarkCheck size={28} /></button>
                </div>
                <div className='ml-4 my-3 mb-5 space-y-2'>
                    {postDetails?.numLikes === 0 ? <p className='text-[1.1rem] font-semibold'>Be the first to like this</p> :
                        <p className='text-[1.2rem] font-semibold'>{postDetails?.numLikes} Likes</p>
                    }
                    <p className='font-normal text-sm text-gray-800 uppercase'>{moment(postDetails?.createdAt).from()}</p>
                </div>
                <form onSubmit={(e) => Comment(postDetails?._id, e.preventDefault())} className='flex px-3 border-t pt-3 mt-2'>
                    <div className='text-2xl pl-1 pr-2 cursor-pointer'><FaRegSmile /></div>
                    <input onChange={handleChange} name='comment' value={data.comment} autoComplete='off' className='outline-none w-full pr-3' placeholder='Add Comment ...' />
                    <button type='submit' className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
                </form>
            </div>
        )
    }

    return (
        <>
            <PostMore />
            <Transition nodeRef={nodeRef} in={isModalPostDetails} timeout={50} mountOnEnter unmountOnExit>
                {state => (
                    <div ref={nodeRef}>
                        <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(false)); setData({ comment: '' }) }} className="fixed inset-0 bg-black/40 z-10"></div>

                        <div className={state === 'entering' ? 'ModalPostDetails scale-[.96] duration-75'
                            : state === 'exiting' ? 'ModalPostDetails scale-[1.1] duration-200' : 'ModalPostDetails scale-100 duration-75'}>

                            <div className="relative bg-white rounded-lg shadow md:h-[90%]">
                                {isError && <p>{error?.data?.msg}</p>}
                                <div className='grid grid-cols-6 h-full'>
                                    <div className='col-span-6 md:col-span-3 xl:col-span-4 relative h-full flex justify-center overflow-hidden'>
                                        {isFeatching ? <div className='h-full flex items-center justify-center animate-spin'><ImSpinner3 /></div> :

                                            <TransitionGroup >
                                                <CSSTransition nodeRef={nodeRef} key={images && images[curIndex]?.url} timeout={500} classNames={dirSlide}>
                                                    <img ref={nodeRef} className='imageslide' src={images && images[curIndex]?.url} alt='' />
                                                </CSSTransition>
                                            </TransitionGroup>
                                        }
                                        <div className='absolute inset-y-1/2 flex justify-between w-full px-4'>
                                            <button onClick={prevSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                                            <button onClick={nextSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                                        </div>
                                        <div className='flex gap-2 justify-center text-7xl inset-x-1/2 bottom-0 absolute py-2'>
                                            {images?.map((slide, slideIndex) => (
                                                <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={slideIndex === curIndex ? ' cursor-pointer text-white' : 'text-gray-500 cursor-pointer'}><span className='h-5 w-5'>.</span></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='col-span-6 md:col-span-3 xl:col-span-2 max-h-1/2 relative md:border-l overflow-hidden'>
                                        <ShowUpperPart /><hr />
                                        <ShowComment />
                                        <ShowPostCtrl />
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
