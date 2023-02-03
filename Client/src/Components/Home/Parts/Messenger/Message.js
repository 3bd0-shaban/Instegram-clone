import React from 'react'
const Message = (message) => {
    console.log(message)
    return (
        <div className='pt-3 p-3'>
            <div className='flex justify-start '>
                <div className='border h-10 rounded-3xl flex items-center px-5 py-8'>
                    <p>{message?.msg}</p>
                </div>
            </div>
            <div className='flex justify-end'>
                <div className='border h-10 rounded-3xl items-center px-5 py-8 mt-3 flex justify-end bg-gray-200 '>
                    <p>Hello man ! what's up</p>
                </div>
            </div>
        </div>
    )
}

export default Message
