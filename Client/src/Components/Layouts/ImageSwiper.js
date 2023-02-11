import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const ImageSwiper = ({ post }) => {
    return (
        <div className='mt-3 z-0 '>
            <Swiper
                modules={[Pagination]}
                spaceBetween={25}
                slidesPerView={1}
                pagination={{ clickable: true }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
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
