import React from 'react'
import { BsBookmarks } from 'react-icons/bs'

const UserReelsById = () => {
    const EmptyTagges = () => {
        return (
            <>
                <div className='flex mt-28 justify-center'>
                    <div className='border-black border-[3px] flex items-center rounded-full p-5'>
                        <BsBookmarks size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p>Only you can see what you've saved.</p>
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

export default UserReelsById
