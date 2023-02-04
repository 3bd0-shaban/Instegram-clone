import React from 'react'
const Message = ({ message, FollowerChating }) => {
    return (
        <div className='pt-3 p-3'>
            <div className={`flex ${FollowerChating ? 'justify-start' : 'justify-end'}`}>
                <div className={`border h-10 rounded-3xl flex items-center px-5 py-8 ${FollowerChating ? 'justify-start' : 'justify-end bg-gray-200'}`}>
                    <p>{message?.msg}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
