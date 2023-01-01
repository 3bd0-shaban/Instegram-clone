import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-screen flex items-center justify-center '>
        <img src='/images/LOGO.png' alt=''></img>
      <div className='flex items-end justify-center absolute inset-x-0 bottom-9'>
        <img src='/images/Meta.png' className='h-16' alt=''></img>
      </div>
    </div>
  )
}

export default LoadingScreen
