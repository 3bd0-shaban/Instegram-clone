import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useGetUsersWithActiveReelsQuery } from '../../Redux/APIs/ReelsApi';
const Stories = () => {
  const { data, isFetching, isError, error } = useGetUsersWithActiveReelsQuery()
  const { ActiveReels } = data || {}
  return (
    <div className='container max-w-full sm:max-w-xl px-0 xl:px-5'>
      <Swiper
        spaceBetween={0}
        // slidesPerView={6}
        pagination={{ clickable: true }}
        breakpoints={{
          // when window width is >= 320px
          260: {
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

        {isFetching ?
          <>
            <div className='grid justify-center items-center gap-2 grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 animate-pulse'>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16'></div>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16'></div>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16'></div>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16'></div>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16 lg:hidden xl:block'></div>
              <div className='bg-gray-200 rounded-full mx-auto w-16 h-16 hidden xxl:block'></div>
            </div>
          </>
          : isError ? <p>{error?.data?.msg}</p> :
            ActiveReels?.map((item, index) => (
              <SwiperSlide key={item?._id}>
                <Link key={index} to={`/${item?.user?.username}/reel/${item?.user?._id}`} className='w-full'>
                  <img className="w-16 h-16 mx-auto rounded-full p-0.5 bg-origin-border object-cover ringStory" src={item?.user?.avatar?.url ? item?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
                  <p className='text-sm flex justify-center text-start mt-3 overflow-hidden'>{item?.user.username}</p>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}

export default Stories
