import React from 'react'
import { BsPersonCircle } from 'react-icons/bs';

const UsersTagesById = () => {
    const EmptyTagges = () => {
        return (
            <>
                <div className='flex mt-[8.55rem] justify-center'>
                    <div className='border-black border-[3px] flex items-center rounded-full p-5'>
                        <BsPersonCircle size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p className='block font-bold text-4xl'>Photos of you</p>
                        <p>When people tag you in photos, they'll appear here.</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <EmptyTagges />
        </div>
    )
}

export default UsersTagesById
