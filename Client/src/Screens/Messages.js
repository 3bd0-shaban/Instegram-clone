import React from 'react'
import { useLocation } from 'react-router-dom';
import { Header, EmptySendChat, Chat } from '../Exports'
import { IoIosArrowDown } from 'react-icons/io'
import { TbMessage2Share } from 'react-icons/tb'
const Messages = () => {
    // eslint-disable-next-line
    let selected = useLocation;
    return (
        <div>
            <Header />
            <div className='container px-0 max-w-[70rem] border rounded-md mt-4 bg-white'>
                <div className='grid grid-cols-3 h-[90vh] '>
                    <div className='col-span-1  border-r mt-5'>
                        <div className='flex border-b pb-2 h-12'>
                            <div className='flex mx-auto text-lg font-semibold'>
                                <p>3bdoo</p>
                                <div className='mt-2 ml-2'>
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <div className='ml-auto text-2xl mr-4'>
                                <button><TbMessage2Share /></button>
                            </div>
                        </div>
                        <div className='pt-3 p-3 flex hover:bg-gray-100'>
                            <img className="p-1 w-20 h-20 rounded-full focus:ring-2 focus:ring-gray-300" src="/Images/profile.jpg" alt="" />
                            <div className='ml-3 my-auto'>
                                <p>AbdElrahjamab</p>
                                <p className='text-gray-500 text-sm'>Active Yesterday</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 mt-5 relative'>
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages
