import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useGetUsersWithActiveReelsQuery } from '../../Redux/APIs/ReelsApi';
const Stories = () => {
  const { data } = useGetUsersWithActiveReelsQuery()
  const { ActiveReels, totalCount } = data || {}
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
          620: {
            slidesPerView: 6,
            spaceBetween: 30
          },
          800: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 30
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 30
          }
        }}
        className='!h-full overflow-hidden'
      >

        {ActiveReels?.map((item, index) => (
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
