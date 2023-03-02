import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/pagination';
import { BsArrowLeft, BsPlayFill } from 'react-icons/bs';
import { selectCurrentUser } from './../../../Redux/Slices/UserSlice';
import { AnimatePresence, motion } from 'framer-motion';
import AnimDropdown from './../../../Animation/AnimDropdown';
import { Emoji } from '../../Exports';
import { FaRegSmile } from 'react-icons/fa';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const ModalPreviewImages = ({ images, setImages, setVideos, videos, setSuccess, createPost }) => {
    const { IsModalPreviewImages } = useSelector(state => state.Features);
    const userInfo = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    const [next, setNext] = useState(false);
    // const [accessbility, setAccessbility] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [hiddenlikes, setHideLikes] = useState(false);
    const [isReel, setIsReel] = useState(false);
    const [turnoffcomments, setTurnOffComments] = useState(false);
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    const [des, setDes] = useState('');
    const [location, setLocation] = useState('');
    const HandleBack = () => {
        if (next) {
            setNext(false)
            return
        }
        dispatch(FeatureAction.Show_ModalPreviewImages(false));
        dispatch(FeatureAction.ShowModalAddPost(true));
        setImages([])
        setVideos()
    }

    const handlesubmit = async (e) => {
        if (next) {
            dispatch(FeatureAction.Show_ModalPreviewImages(false));
            dispatch(FeatureAction.setIsModalLoadingUpload(true));
            if (videos) {
                setIsReel(true)
            }
            const data = { des, location, images, hiddenlikes, turnoffcomments, videos, isReel };
            e.preventDefault();
            await createPost(data).unwrap()
                .then(payload => {
                    setSuccess(true)
                    setImages([])
                    setVideos([])
                }).catch(err => {
                    console.log(err?.data?.msg)
                })
        }
        setNext(true)
    }
    const [ispaused, setIsPaused] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        const firstVideoRef = videoRefs?.current[0];
        firstVideoRef?.play();
        setIsPlaying(true);

    }, []);

    const handleVideoClick = (index) => {
        const currentVideoRef = videoRefs.current[index];

        if (currentVideoRef.paused) {
            currentVideoRef.play();
            setIsPlaying(true);
        } else {
            currentVideoRef.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (isPlaying === false) {
            return setIsPaused(true);
        }
        setIsPaused(false);
    }, [isPlaying]);

    return (
        <>
            {IsModalPreviewImages &&
                <>
                    <div className="fixed inset-0 bg-black/30 z-10" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(true))}></div>
                    <div className={`fixed inset-x-0 top-[10%] container px-0 duration-500 max-w-[26rem] sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-4xl 
                                        min-h-[35rem] sm:h-[47.5rem] md:h-[52rem] z-20 bg-white rounded-lg max-h-[60rem] overflow-hidden shadow ${next && 'lg:!max-w-7xl'}`}>
                        <div className="h-full">
                            <div className="flex justify-between items-start py-2 rounded-t border-b px-4">
                                <div
                                    onClick={HandleBack}
                                    className="text-xl cursor-pointer font-semibold text-gray-900 mt-auto"><BsArrowLeft size={25} /></div>
                                <div onClick={handlesubmit} className="text-blue-500 font-semibold text-lg cursor-pointer">{next ? 'Share' : 'Next'}</div>
                            </div>
                            <div className='h-full'>
                                <form onSubmit={handlesubmit} className='h-full'>
                                    <div className='grid grid-cols-8 h-full'>
                                        <div className={`${next ? 'hidden h-full md:block col-span-6' : 'col-span-8'}`}>

                                            <Swiper
                                                modules={[Pagination]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                pagination={{ clickable: true }}
                                                className={videos && 'h-full'}
                                            >
                                                {videos &&
                                                    videos?.map((vid, index) => (
                                                        <SwiperSlide key={index}>
                                                            <video
                                                                onClick={() => handleVideoClick(index)}
                                                                ref={(el) => (videoRefs.current[index] = el)}
                                                                className='h-full w-full object-cover relative' loop playsInline>
                                                                <source src={vid} />
                                                            </video>
                                                            {ispaused &&
                                                                <div className='absolute bottom-0 top-[40%] left-[40%] cursor-pointer pointer-events-none
                                                                         text-white/50 text-3xl rounded-full h-28 w-28 flex justify-center items-center border-white/50 border-2'>
                                                                    <BsPlayFill size={100} />
                                                                </div>
                                                            }
                                                        </SwiperSlide>
                                                    ))
                                                }
                                                {images?.map((image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <img className='h-[33rem] sm:h-[45rem] md:h-[50rem] min-w-full object-cover'
                                                            src={image}
                                                            alt=''
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                        {next && <div className='border-l col-span-8 md:col-span-2'>
                                            <div className='flex px-4 items-center my-3 gap-5'>
                                                <img src={userInfo?.avatar?.url} className='w-12 h-12 object-cover rounded-full' alt='' />
                                                <p>{userInfo?.username}</p>
                                            </div>
                                            <div className='relative px-4'>
                                                <textarea
                                                    onChange={(e) => setDes(e.target.value)}
                                                    onFocus={() => setIsPikerVisable(false)}
                                                    value={des}
                                                    className='outline-none w-full h-52 resize-none'
                                                    placeholder='Write a caption' cols='10' />
                                                <div className='absolute bottom-2 z-20'>
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
                                                                className='absolute top-8 lrft-0 md:right-0'>
                                                                <Emoji
                                                                    setComment={setDes}
                                                                    comment={des} />
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </div>
                                            </div><hr />
                                            <div className='p-4'>
                                                <input onChange={(e) => setLocation(e.target.value)} value={location} className='outline-none w-full h-full' placeholder='Add Location' />
                                            </div><hr />
                                            {/* <div className='p-4'>
                                                <div
                                                    onClick={() => setAccessbility(!accessbility)}
                                                    className='flex justify-between items-center cursor-pointer'>
                                                    <span className='text-base font-semibold'>Accessibility</span>
                                                    {accessbility ? <BiChevronUp size={25} /> : <BiChevronDown size={25} />}
                                                </div>
                                                {accessbility &&
                                                    <div>
                                                        <span className='text-gray-500 text-sm my-3 text-center'>Alt text describes your photos for people with visual impairments.
                                                            Alt text will be automatically created for your photos or you can choose to write your own.</span>
                                                        <div className='space-y-3'>
                                                            {images?.map((image, index) => (
                                                                <ImageDesicription image={image} index={index} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                            </div><hr /> */}
                                            <div className='p-4'>
                                                <div
                                                    onClick={() => setAdvanced(!advanced)}
                                                    className='flex justify-between items-center cursor-pointer'>
                                                    <span className='text-base font-semibold'>Advanced Settings</span>
                                                    {advanced ? <BiChevronUp size={25} /> : <BiChevronDown size={25} />}
                                                </div>
                                                {advanced &&
                                                    <div className='space-y-5'>
                                                        <div>
                                                            <div className='flex justify-between'>
                                                                <span className='font-medium'>Hide like and view counts on this post</span>

                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input onChange={() => setHideLikes(!hiddenlikes)} type="checkbox" value="" className="sr-only peer" />
                                                                    <div className={`rounded-full w-10 h-5 relative ${hiddenlikes ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                                                        <span className={`absolute w-5 h-5 bg-white rounded-full border ${hiddenlikes ? 'right-0' : 'left-0'}`} />                                                            </div>
                                                                </label>

                                                            </div>
                                                            <span className='text-xs text-gray-600'>Only you will see the total number of likes and views on this post. You can change this later by going to the
                                                                ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings.</span>
                                                        </div>
                                                        <div>
                                                            <div className='flex justify-between'>
                                                                <span className='font-medium'>Turn off commenting</span>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input onChange={() => setTurnOffComments(!turnoffcomments)} type="checkbox" value="" className="sr-only peer" />
                                                                    <div className={`rounded-full w-10 h-5 relative ${turnoffcomments ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                                                        <span className={`absolute w-5 h-5 bg-white rounded-full border ${turnoffcomments ? 'right-0' : 'left-0'}`} />                                                            </div>
                                                                </label>
                                                            </div>
                                                            <span className='text-xs text-gray-600'>You can change this later by going to the ··· menu at the top of your post.</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div><hr />
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default ModalPreviewImages
