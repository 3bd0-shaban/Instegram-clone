import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const ImageSwiper = ({ post }) => {
    return (
        <div className='mt-3 z-0 h-full overflow-hidden'>
            <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className='!h-full overflow-hidden'
            // onSlideChange={() => console.log('slide change')}    
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {post?.videos?.length > 0 &&
                    post?.videos?.map(vid =>
                        <SwiperSlide key={vid?._id} className='!h-[30rem] overflow-hidden'>
                            <video className='h-full object-cover relative overflow-hidden' autoPlay loop playsInline>
                                <source src={vid?.url} />
                            </video>
                        </SwiperSlide>
                    )
                }
                {post?.images?.map(image => (
                    <SwiperSlide key={image?.url}>
                        <img className='rounded-md h-[30rem] min-w-full object-cover'
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
