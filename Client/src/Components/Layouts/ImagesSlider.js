import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/pagination';
import { useLocation } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

const ImagesSlider = ({ Details }) => {
    const location = useLocation();

    const Reels = (location.search === `?reels`)
    const [ispaused, setIsPaused] = useState(false);
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
            <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className='!h-full overflow-hidden'
            >
                {Details?.videos?.length > 0 &&
                    Details?.videos?.map((vid, index) => (
                        <SwiperSlide key={vid?._id} className='!h-full w-full relative overflow-hidden'>
                            <video
                                onClick={() => handleVideoClick(index)}
                                ref={(el) => (videoRefs.current[index] = el)}
                                className='h-full relative object-cover w-full cursor-pointer overflow-hidden' loop playsInline>
                                <source src={vid?.url} />
                            </video>
                            {ispaused &&
                                <div
                                    className='absolute bottom-0 top-[40%] left-[40%] cursor-pointer pointer-events-none
                                     text-white/50 text-3xl rounded-full h-28 w-28 flex justify-center items-center border-white/50 border-2'>
                                    <BsPlayFill size={100} />
                                </div>
                            }
                        </SwiperSlide>
                    ))
                }
                {!Reels &&
                    Details?.images?.map(image => (
                        <SwiperSlide key={image?.url}>
                            <img className='rounded-md h-full min-w-full object-cover'
                                src={image?.url}
                                alt={Details?.user?.username}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    )
}

export default ImagesSlider
