import moment from 'moment'
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { BsBookmark, BsBookmarkFill, BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import AnimModal from '../../../Animation/AnimModal';
import { AnimatePresence, motion } from 'framer-motion'
import { useSaveMutation, useUnsaveMutation } from '../../../Redux/APIs/SavesApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { Comments, ImagesSlider, Emoji } from '../../Exports'
import AnimDropdown from '../../../Animation/AnimDropdown';
import { selectCurrentToken, selectCurrentUser, setCredentials } from './../../../Redux/Slices/UserSlice';
import AnimScale from '../../../Animation/AnimScale';
import { useGetPostDetailsQuery } from '../../../Redux/APIs/PostsApi';
import { ImSpinner3 } from 'react-icons/im';

const ModalPostDetails = ({ id }) => {
    const { data: postDetails, isFetching, isError, error } = useGetPostDetailsQuery(id) || {};
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const [Save] = useSaveMutation();
    const [Unsave] = useUnsaveMutation();
    const [Like] = useLikeMutation();
    const [UnLike] = useUnLikeMutation();
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const userInfo = useSelector(selectCurrentUser)
    const accessToken = useSelector(selectCurrentToken)

    useEffect(() => {// eslint-disable-next-line
        const isInclude = postDetails?.likes?.some(p => p == userInfo?._id);
        // eslint-disable-next-line
        const Save = userInfo?.saves?.some(p => p == postDetails?._id);
        isInclude ? setIsLiked(true) : setIsLiked(false);
        Save ? setIsSaved(true) : setIsSaved(false);
    }, [postDetails, userInfo]);

    const FocusRef = useRef();
    useEffect(() => {
        FocusRef.current?.focus();
    }, [comment]);
    // dispatch the total posts with new new likes and dislikes
    // const handleReplace = (newObject) => {
    //     const index = posts.findIndex(obj => obj._id === postDetails?._id);
    //     const newArray = [...posts];
    //     newArray[index] = newObject;
    //     dispatch(setTotalPosts(newArray))
    // };
    const data = { comment }
    const CommentHandle = async (e) => {
        if (!comment) return;
        e.preventDefault();
        if (!comment) return;
        await createComment({ data, id }).unwrap()
            .then((payload) => {
                setComment('')
            })
            .catch((error) => console.log(error));
    }
    const SaveSubmit = async (id) => {
        const user = await Save(id).unwrap()
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
        }
    }
    const UnSaveSubmit = async (id) => {
        const user = await Unsave(id).unwrap()
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
        }
    }
    const LikeSubmit = async (id) => {
        await Like(id).unwrap()
    }
    const UnLikeSubmit = async (id) => {
        await UnLike(id).unwrap()
    }
    const checkModal = () => {
        const user = postDetails?.user?._id === userInfo?._id
        if (user) {
            dispatch(FeatureAction.Show_ModalPostMoreLogged(false))
            return
        }
        dispatch(FeatureAction.Show_isPostMore(true))
    }
    const ShowUpperPart = () => {
        return (
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='flex items-center'>
                    <img className="p-1 w-14 h-14 rounded-full object-cover focus:ring-2 focus:ring-gray-300" src={postDetails?.user?.avatar?.url ? postDetails.user?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
                    <p className='text-md font-poppins font-medium'>{postDetails?.user?.username}</p>
                </div>
                <button onClick={checkModal} className='mr-2 py-0 h-1 mt-2'>
                    <BsThreeDots />
                </button>
            </div>
        )
    }
    const ShowPostCtrl = () => {
        return (
            <div className='md:absolute w-full z-20 bg-white md:bottom-0 mb-5 border-t'>
                <div className='flex justify-between mt-4 px-4 text-2xl py-3'>
                    <div className='flex gap-6'>

                        {(isLiked && !postDetails?.hiddenlikes) ?
                            <AnimatePresence>
                                <motion.button
                                    variants={AnimScale}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                    onClick={() => UnLikeSubmit(postDetails?._id)}

                                    className='hover:text-gray-500 cursor-pointer'>
                                    <FaHeart size={28} style={{ color: 'red' }} />
                                </motion.button>
                            </AnimatePresence>
                            : (!postDetails?.hiddenlikes) &&
                            <motion.button
                                variants={AnimScale}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                onClick={() => LikeSubmit(postDetails?._id)}
                                className='hover:text-gray-500 cursor-pointer'>
                                <FaRegHeart size={25} />
                            </motion.button>
                        }


                        {/* {isLiked ? <button onClick={() => UnLikeSubmit(postDetails?._id)} className='hover:text-gray-500 text-red-500'><FaHeart size={28} style={{ color: 'red' }} /></button> :
                            <button onClick={() => LikeSubmit(postDetails?._id)} className='hover:text-gray-500'><FaRegHeart size={28} /></button>} */}
                        {!postDetails?.turnoffcomments &&
                            <div className='cursor-pointer focus:animate-bounce hover:text-gray-500'>
                                <FaRegComment size={28} />
                            </div>}
                        <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane size={28} /></button>
                    </div>


                    {isSaved ?
                        <AnimatePresence>
                            <motion.button
                                variants={AnimScale}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                onClick={() => UnSaveSubmit(postDetails?._id)}
                                className='hover:text-gray-500 cursor-pointer'>
                                <BsBookmarkFill size={28} />
                            </motion.button>
                        </AnimatePresence>
                        :
                        <motion.button
                            variants={AnimScale}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            onClick={() => SaveSubmit(postDetails?._id)}
                            className='hover:text-gray-500 cursor-pointer'>
                            <BsBookmark size={28} />
                        </motion.button>
                    }

                </div>
                {(!postDetails?.hiddenlikes) && <div className='ml-4 my-3 mb-5 space-y-2'>
                    {postDetails?.numLikes === 0 ? <p className='text-[1.1rem] font-semibold'>Be the first to like this</p> :
                        <p className='text-[1.2rem] font-semibold'>{postDetails?.numLikes} Likes</p>
                    }
                    <p className='font-normal text-sm text-gray-800 uppercase'>{moment(postDetails?.createdAt).from()}</p>
                </div>}
                {(!postDetails?.turnoffcomments) &&
                    <form onSubmit={CommentHandle} className='flex px-3 border-t pt-3 mt-2'>
                        <div
                            onClick={() => setIsPikerVisable(!isPikerVisiable)}
                            className='text-2xl text-gray-600 pl-1 pr-2 cursor-pointer'>
                            <FaRegSmile />
                        </div>
                        <AnimatePresence>
                            {isPikerVisiable &&
                                <motion.div
                                    variants={AnimDropdown}
                                    initial='initial'
                                    animate='animated'
                                    exit='exit'
                                    className='absolute z-50 bottom-8 left-0'
                                >
                                    <Emoji
                                        setComment={setComment}
                                        comment={comment} />
                                </motion.div>
                            }
                        </AnimatePresence>
                        <input
                            onChange={(e) => setComment(e.target.value)}
                            onFocus={() => setIsPikerVisable(false)}
                            value={comment}
                            ref={FocusRef}
                            name='comment'
                            autoComplete='off'
                            className='outline-none w-full pr-3'
                            placeholder='Add Comment ...'
                        />
                        {comment &&
                            <button type='submit'
                                className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>{isLoading ? 'sending' : 'Post'}</button>
                        }
                    </form>}
            </div>
        )
    }

    return (
        <>
            <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(false)); setComment() }} className="fixed inset-0 bg-black/40 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 h-[70%] top-[15%] xl:h-full xl:top-[5%] p-4 container max-w-[75%] z-20 duration-300'>
                <div className="relative bg-white rounded-lg shadow md:h-[90%]">
                    {isFetching ? <p className='flex justify-center items-center text-3xl font-medium h-full animate-spin'><ImSpinner3 /></p> :
                        isError ?
                            <div className='flex justify-center items-center text-lg font-medium h-full'><p>{error?.data?.msg}</p></div> :
                            <div className='grid grid-cols-6 h-full'>
                                <div className='col-span-6 md:col-span-3 xl:col-span-4 relative h-full flex justify-center overflow-hidden'>
                                    <ImagesSlider Details={postDetails} />
                                </div>
                                <div className='col-span-6 md:col-span-3 xl:col-span-2 max-h-1/2 relative md:border-l overflow-hidden'>
                                    <ShowUpperPart /><hr />
                                    <Comments postDetails={postDetails} />
                                    <div className='px-3'>
                                    </div>
                                    <ShowPostCtrl />
                                </div>
                            </div>
                    }
                </div>
            </motion.div>
        </>
    )
}

export default ModalPostDetails
