import React, { useEffect, useRef, useState } from 'react'
import { BsCamera, BsChat, BsHeart, BsHeartFill, BsPlayFill, BsThreeDotsVertical } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { useIntersection, ModalUnFollowConfirm } from '../../Exports';
import { useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { useSaveMutation, useUnsaveMutation } from '../../../Redux/APIs/SavesApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, setCredentials } from '../../../Redux/Slices/UserSlice';
import { AnimatePresence, motion } from 'framer-motion';
import AnimScale from './../../../Animation/AnimScale';
import { BsBookmarkFill, BsBookmark, BsArrowLeft } from 'react-icons/bs';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useFollowMutation } from '../../../Redux/APIs/UserApi';
// import { preventScroll } from './../../../Helpers/PreventScroll';
import { ImSpinner3 } from 'react-icons/im';

const Video = ({ Reel, setPostID, setPostDetails, ID, count, index }) => {

    const { elementRef, isInViewPort } = useIntersection();

    const videoRef = useRef();
    const [play, setPlay] = useState(false);
    const dispatch = useDispatch();
    const [Like] = useLikeMutation();
    const [Save] = useSaveMutation();
    const [Unsave] = useUnsaveMutation();
    const [UnLike] = useUnLikeMutation();
    const [Follow, { isLoading }] = useFollowMutation() || {};
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const userInfo = useSelector(selectCurrentUser)
    const accessToken = useSelector(selectCurrentToken);
    const [ispaused, setIsPaused] = useState(false);
    const naviagte = useNavigate()
    const { isModalUnfollowConfirm } = useSelector(state => state.Features)
    // preventScroll(isReelComments)
    useEffect(() => {// eslint-disable-next-line
        const isInclude = Reel?.likes?.some(p => p == userInfo?._id);
        // eslint-disable-next-line
        const Save = userInfo?.saves?.some(p => p == Reel?._id);
        isInclude ? setIsLiked(true) : setIsLiked(false);
        Save ? setIsSaved(true) : setIsSaved(false);
    }, [Reel, userInfo]);

    console.log(isFollowing)
    useEffect(() => {// eslint-disable-next-line
        const isInclude = Reel?.user?.followers?.some(p => p == userInfo?._id);
        isInclude ? setIsFollowing(true) : setIsFollowing(false);
    }, [Reel, userInfo]);
    const LoopIndicator = () => {
        const Indicator = []
        for (let i = 0; i < count; i++) {
            Indicator.push(<span key={i} className={`bg-white/60 rounded-md h-2 w-full ${(i === index) && 'bg-black/50'}`}></span>);
        }
        return Indicator
    }

    const LikeSubmit = async (id) => {
        await Like(id).unwrap()
    }
    const UnLikeSubmit = async (id) => {
        await UnLike(id).unwrap()
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
    const checkModal = () => {
        const user = Reel.user._id === userInfo?._id
        if (user) {
            dispatch(FeatureAction.Show_ModalPostMoreLogged(false))
            return
        }
        dispatch(FeatureAction.Show_isPostMore(true))
    }

    useEffect(() => {
        if (isInViewPort) {
            videoRef.current.play();
            setIsPaused(false);
            // console.log(`${Reel?._id} In View`)
        } else {
            // console.log(`${Reel?._id} not in`)
            if (videoRef.current.play) {
                videoRef.current.pause();
            }
        }
    }, [isInViewPort, Reel]);

    const handleVideo = () => {
        setPlay(!play);
        if (play === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };
    useEffect(() => {
        if (play === false) {
            return setIsPaused(true);
        }
        setIsPaused(false);
    }, [play]);
    const id = Reel?.user?._id
    const FollowUser = () => {
        Follow(id).unwrap()
            .then(() => {
                setIsFollowing(true)
            })
            .catch(err => console.log(err))
    };
    return (
        <>
            {/* {isReelComments &&
                <div className='z-20 fixed w-full'>
                    <PostComments />
                </div>} */}
            {isModalUnfollowConfirm && <ModalUnFollowConfirm userById={Reel?.user} />}

            <div className='h-full w-full' onClick={handleVideo}>
                <video ref={videoRef} className='h-full w-full object-cover ' autoPlay loop playsInline>
                    <source src={Reel?.videos[0]?.url} />
                </video>
                {ispaused &&
                    <div className='absolute bottom-0 top-[40%] left-[40%] cursor-pointer pointer-events-none text-white/50 text-3xl rounded-full h-28 w-28 flex justify-center items-center border-white/50 border-2'>
                        <BsPlayFill size={100} />
                    </div>
                }
                <div className='absolute top-0 mt-1 w-full flex gap-2'>
                    <LoopIndicator />
                </div>
                <span className='absolute top-0 mt-2 font-medium text-xl p-3 lg:p-5 uppercase font-poppins flex justify-between w-full'>
                    <div className='flex gap-2'>
                        <Link to='/' className='lg:hidden' ><BsArrowLeft size={25} /></Link>
                        <p>Reels</p>
                    </div>
                    <p><BsCamera size={25} /></p>
                </span>
                <div className='w-full absolute bottom-0 mb-14 p-2 lg:p-5'>
                    <div className='flex justify-between items-end z-10'>
                        <div className='space-y-2 flex gap-2 items-start'>
                            <div>
                                <div ref={elementRef} className='flex gap-2'>
                                    <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
                                        src={Reel?.user?.avatar?.url ? Reel?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                                        alt=""
                                    />
                                    <div className='flex-col space-y-1' >
                                        <Link to={`/${Reel?.user?.username}`} className='text-md font-poppins font-medium mt-3'>{Reel?.user?.username}</Link>
                                        {id && (
                                            (isFollowing && (userInfo?._id !== Reel?.user?._id)) ? <button
                                                // onClick={() => dispatch(FeatureAction.setIsModalUnfollowConfirm(true))}
                                                className='block font-then text-sm border px-3 py-1.5 rounded-lg -mt-1'>Following</button>
                                                : (userInfo?._id !== Reel?.user?._id) &&
                                                <button onClick={FollowUser} disabled={isLoading} className='block font-then text-sm px-3 rounded-lg -mt-1'>{isLoading ? <ImSpinner3 size={25} /> : 'Follow'}</button>
                                        )}
                                    </div>
                                </div>
                                <p className='text-sm leading-5 ellipse-2'>{Reel?.des}</p>
                            </div>
                        </div>
                        <div className='z-10'>
                            <div className='space-y-5'>
                                {(isLiked && !Reel?.hiddenlikes) ?
                                    <AnimatePresence>
                                        <motion.button
                                            variants={AnimScale}
                                            initial='initial'
                                            animate='animate'
                                            exit='exit'
                                            onClick={() => UnLikeSubmit(Reel?._id)}

                                            className='hover:text-gray-500 cursor-pointer mx-auto block'>
                                            <BsHeartFill size={28} style={{ color: 'red' }} />
                                            <p className='text-sm hover:text-white'>{Reel?.numLikes}</p>
                                        </motion.button>
                                    </AnimatePresence>
                                    : (!Reel?.hiddenlikes) &&
                                    <motion.button
                                        variants={AnimScale}
                                        initial='initial'
                                        animate='animate'
                                        exit='exit'
                                        onClick={() => LikeSubmit(Reel?._id)}
                                        className='hover:text-gray-500 cursor-pointer mx-auto block'>
                                        <BsHeart size={25} />
                                        <p className='text-sm'>{Reel?.numLikes}</p>
                                    </motion.button>
                                }

                                <button
                                    onClick={() => naviagte(`/p/${Reel?._id}`)}
                                    className='hover:text-gray-500 cursor-pointer mx-auto block'
                                // onClick={() => dispatch(FeatureAction.setIsPostComments(true))}
                                >
                                    <BsChat size={25} />
                                    <p className='text-sm'>{Reel?.numComments}</p>
                                </button>
                                {isSaved ?
                                    <AnimatePresence>
                                        <motion.button
                                            variants={AnimScale}
                                            initial='initial'
                                            animate='animate'
                                            exit='exit'
                                            onClick={() => UnSaveSubmit(Reel?._id)}
                                            className='hover:text-gray-500 cursor-pointer mx-auto block'>
                                            <BsBookmarkFill size={28} />
                                        </motion.button>
                                    </AnimatePresence>
                                    :
                                    <motion.button
                                        variants={AnimScale}
                                        initial='initial'
                                        animate='animate'
                                        exit='exit'
                                        onClick={() => SaveSubmit(Reel?._id)}
                                        className='hover:text-gray-500 cursor-pointer mx-auto block'>
                                        <BsBookmark size={28} />
                                    </motion.button>
                                }
                                {/* <button className='mx-auto block'><IoMdPaperPlane size={25} /></button> */}
                                <button onClick={
                                    () => {
                                        checkModal(); setPostID(Reel?._id); setPostDetails(Reel);
                                        if (videoRef.current.play) {
                                            videoRef.current.pause();
                                        }
                                    }}
                                    className='hover:text-gray-500 mx-auto block'><BsThreeDotsVertical size={25} /></button>
                                <Link to={`/${Reel?.user?.username}`} >
                                    <div className='hover:border-gray-500 w-10 h-10 rounded-md border-2 overflow-hidden'>
                                        <img className="object-cover focus:ring-2 focus:ring-gray-300"
                                            src={Reel?.user?.avatar?.url ? Reel?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                                            alt=""
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video
