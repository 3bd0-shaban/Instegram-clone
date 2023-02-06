import React from 'react'
import { SideBar, Suggestions, Posts } from '../Components/Exports'
import useTitle from './../Hooks/useTitle';
const Home = () => {
  useTitle('Instegram');
  return (
    <div className='bg-white'>
      {/* <Header /> */}
      <SideBar />
      <div className='container max-w-5xl md:max-w-3xl xl:max-w-4xl xxl:max-w-5xl py-3 mt-16 px-2 lg:mt-0 xl:mr-60 xxxl:mr-[26rem]'>
        <div className='grid xl:grid-cols-5 gap-3 duration-300 lg:mt-10'>
          <div className='gap-3 col-span-3'>
            {/* <Stories /> */}
            <div className='mt-5'>
              <Posts />
            </div>
          </div>
          <div className='col-span-2 hidden xl:block'>
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
