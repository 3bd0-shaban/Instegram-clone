import moment from 'moment'
import PostMore from './PostMore';
// import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useGetPostDetailsQuery } from '../../../Redux/APIs/PostsApi';
import { useGetUserQuery } from '../../../Redux/APIs/UserApi';
import { BsBookmark, BsBookmarkFill, BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { ImSpinner3 } from 'react-icons/im';
import AnimModal from '../../../Animation/AnimModal';
import { motion, AnimatePresence } from 'framer-motion'
import { useSaveMutation, useUnsaveMutation } from '../../../Redux/APIs/SavesApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import ImagesSlider from '../ImagesSlider';
const ModalPostDetails = ({ ID }) => {
    const { isModalPostDetails } = useSelector(state => state.Features);
    const { data: postDetails, isFeatching, isError, error } = useGetPostDetailsQuery(ID) || {};
    const [createComment] = useCreateCommentMutation();
    const { data: userInfo } = useGetUserQuery() || {};
    const [Save] = useSaveMutation();
    const [Unsave] = useUnsaveMutation();
    const [Like] = useLikeMutation();
    const [UnLike] = useUnLikeMutation();
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // const [emoji, setEmoji] = useState();
    const dispatch = useDispatch();
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

    useEffect(() => {// eslint-disable-next-line
        const isInclude = postDetails?.likes?.some(p => p == userInfo?._id);
        // eslint-disable-next-line
        const Save = userInfo?.saves?.some(p => p == postDetails?._id);
        isInclude ? setIsLiked(true) : setIsLiked(false);
        Save ? setIsSaved(true) : setIsSaved(false);
    }, [postDetails, userInfo]);

    const Comment = async (id) => {
        if (!data) return {};
        await createComment({ data, id }).unwrap()
            .then((payload) => setData({ comment: '' }))
            .catch((error) => console.log(error));
    }

    const SaveSubmit = async (id) => {
        await Save(id).unwrap()
    }
    const UnSaveSubmit = async (id) => {
        await Unsave(id).unwrap()
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
            postDetails?.comments?.length === 0 ?
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
                        {isLiked ? <button onClick={() => UnLikeSubmit(postDetails?._id)} className='hover:text-gray-500 text-red-500'><FaHeart size={28} style={{ color: 'red' }} /></button> :
                            <button onClick={() => LikeSubmit(postDetails?._id)} className='hover:text-gray-500'><FaRegHeart size={28} /></button>}
                        <div className='cursor-pointer focus:animate-bounce hover:text-gray-500'>
                            <FaRegComment size={28} />
                        </div>
                        <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane size={28} /></button>
                    </div>
                    {isSaved ?
                        <button onClick={() => UnSaveSubmit(postDetails?._id)} className='hover:text-gray-500 cursor-pointer'><BsBookmarkFill size={28} /></button> :
                        <button onClick={() => SaveSubmit(postDetails?._id)} className='hover:text-gray-500 cursor-pointer'><BsBookmark size={28} /></button>
                    }
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
            {isModalPostDetails &&
                <AnimatePresence>
                    <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(false)); setData({ comment: '' }) }} className="fixed inset-0 bg-black/40 z-10"></div>
                    <motion.div
                        variants={AnimModal}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className='ModalPostDetails'>
                        <div className="relative bg-white rounded-lg shadow md:h-[90%]">
                            {isError && <p>{error?.data?.msg}</p>}
                            <div className='grid grid-cols-6 h-full'>
                                <div className='col-span-6 md:col-span-3 xl:col-span-4 relative h-full flex justify-center overflow-hidden'>
                                    {isFeatching ? <div className='h-full flex items-center justify-center animate-spin'><ImSpinner3 /></div> :
                                        <ImagesSlider Details={postDetails} />
                                    }
                                </div>
                                <div className='col-span-6 md:col-span-3 xl:col-span-2 max-h-1/2 relative md:border-l overflow-hidden'>
                                    <ShowUpperPart /><hr />
                                    <ShowComment />
                                    <ShowPostCtrl />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    )
}

export default ModalPostDetails
