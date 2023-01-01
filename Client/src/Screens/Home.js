import React from 'react'
import { Header, Stories, Suggestions, Posts } from '../Components/Exports'
import useTitle from './../Hooks/useTitle';
const Home = () => {
  useTitle('Instegram')
  return (
    <div>
      <Header />
      <div className='container max-w-5xl py-3 px-2 mt-5'>
        <div className='grid md:grid-cols-5 gap-3'>
          <div className='gap-3 col-span-3'>
            <Stories />
            <div className='mt-5'>
              <Posts />
              <Posts />
              <Posts />
              <Posts />
            </div>
          </div>
          <div className='col-span-2 hidden md:block'>
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
