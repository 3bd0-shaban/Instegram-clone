import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { BsPlayFill } from 'react-icons/bs';

const ImageSwiper = ({ post }) => {
    const [ispaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = useRef([]);


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
        <div className='mt-3 z-0 h-full overflow-hidden'>
            <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className='!h-full overflow-hidden'
            >
                {post?.videos?.length > 0 &&
                    post?.videos?.map((vid, index) =>
                        <SwiperSlide key={index} className='!h-[30rem] relative w-full overflow-hidden'>
                            <video
                                onClick={() => handleVideoClick(index)}
                                ref={(el) => (videoRefs.current[index] = el)}
                                className='h-full object-cover rounded-md relative w-full cursor-pointer overflow-hidden' loop playsInline>
                                <source src={vid?.url} />
                            </video>
                            {ispaused &&
                                <div className='absolute bottom-0 top-[40%] left-[40%] cursor-pointer pointer-events-none text-white/50 text-3xl rounded-full h-28 w-28 flex justify-center items-center border-white/50 border-2'>
                                    <BsPlayFill size={100} />
                                </div>
                            }
                        </SwiperSlide>
                    )
                }
                {post?.images?.map((image,index) => (
                    <SwiperSlide key={index}>
                        <img className='rounded-md overflow-hidden h-[30rem] min-w-full object-cover'
                            src={image?.url}
                            alt={post?.user?.username}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ImageSwiper
