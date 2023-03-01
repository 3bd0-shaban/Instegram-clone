import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
const Stories = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className='w-full px-5'>
      <Swiper
        spaceBetween={0}
        slidesPerView={6}
        pagination={{ clickable: true }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 5,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 6,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 30
          }
        }}
        className='!h-full overflow-hidden'
      >

        {array.map((item, index) => (
          <SwiperSlide key={item?._id}>
            <Link key={index} to='/stories/abdo/215' className='w-full'>
              <img className="w-16 h-16 mx-auto rounded-full p-0.5 bg-origin-border ringStory" src="/Images/profile.jpg" alt="" />
              <p className='text-sm flex justify-center text-start mt-3 overflow-hidden'>AbdElrahaman</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Stories
