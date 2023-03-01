import React, { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSearchQuery } from '../../Redux/APIs/UserApi'
import { motion } from 'framer-motion';
import AnimSlide from './../../Animation/AnimSlode';
import { Scrollup } from '../../Helpers/Scroll';
import { SkilSuggestion } from '../Exports';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  // eslint-disable-next-line
  const [pagnum, setPagenum] = useState(1);
  const { data: result, isLoading, isError, error } = useSearchQuery({ keyword, pagnum }) || {};
  Scrollup()
  return (
    <motion.div
      variants={AnimSlide}
      initial='initial'
      animate='animate'
      exit='exit'
      className='bg-white h-screen z-20 p-5 w-[28rem] shadow-sm hidden lg:block rounded-tr-2xl rounded-br-2xl hideScrollBare overflow-y-scroll rounded-md border'>
      <p className='m-2 mb-5 font-medium text-3xl'>Search</p>
      <div className='ml-auto '>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none font-extralight text-2xl text-gray-400">
            <MdOutlineSearch />
          </div>
          <input type="search"
            // onFocus={() => setOpenSearch(true)}
            // onBlur={() => setOpenSearch(false)}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            autoComplete='off'
            name='keyword'
            className="block p-3 w-full pl-10 outline-none text-sm text-gray-900 bg-gray-100  rounded-xl placeholder:font-extralight placeholder:text-base"
            placeholder="Search" required="" />
        </div>
      </div><hr className='mt-5' />
      {isLoading ?
        <div className='space-y-7 py-5'>
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
        </div>
        : isError ? <p>{error?.data?.msg}</p> :
          result?.map(res => (
            <Link
              to={`/${res.username}`}
              key={res._id}
              className='flex items-center py-3'
            // onMouseEnter={() => setOpenSearch(true)}
            >
              <img className="p-1 w-16 h-16 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url ? res?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
              <div className='ml-2'>
                <p className='text-md font-poppins font-medium'>{res?.username}</p>
                <p className='text-sm font-poppins text-gray-500'>{res?.fullname}</p>
              </div>
            </Link>
          ))}
    </motion.div>
  )
}

export default Search
