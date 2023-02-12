import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='container max-w4xl whitespace-nowrap py-10 mb-10 text-sm'>
            <ul className='lg:flex justify-center gap-3'>
                <div className='flex gap-3 justify-center mb-2' >
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Meta</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>About</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Blog</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Jobs</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Help</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Api</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Privacy</Link></li>

                </div>
                <div className='flex gap-3 justify-center'>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Terms</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Top Accounts</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Hashtags</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Locations</Link></li>
                    <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Instegram Lite</Link></li>
                </div>
            </ul>
            <ul className='flex justify-center gap-3 mt-2'>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Dance</Link></li>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Food & Drink</Link></li>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Home & Garden</Link></li>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Music</Link></li>
            </ul>
            <ul className='flex justify-center gap-3 mt-5'>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>Visual Arts</Link></li>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>English</Link></li>
                <li className='text-gray-400 focus:text-gray-200 text-[13px]'><Link to='/'>2022 Instegram from Meta</Link></li>

            </ul>
        </div>
    )
}

export default Footer
