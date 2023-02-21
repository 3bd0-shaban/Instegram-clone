import moment from 'moment'
import React from 'react'
const Message = ({ message, FollowerChating }) => {
    return (
        <div className='pt-3 p-3'>
            {message?.msg &&
                <>
                    <div className={`flex ${FollowerChating ? 'justify-start' : 'justify-end'}`}>
                        <div className={`border h-10 rounded-2xl flex items-center px-5 py-5 ${FollowerChating ? 'justify-start' : 'justify-end bg-gray-200'}`}>
                            <p>{message?.msg}</p>
                        </div>
                    </div>
                    <div className={`flex ${FollowerChating ? 'justify-start' : 'justify-end'}`}>
                        <p className={`text-[.75rem] mx-1 text-gray-500 ${FollowerChating ? 'justify-start' : 'justify-end'}`}>{moment(message.createdAt).from()}</p>
                    </div>
                </>
            }
            {message?.image?.url &&
                <div className={`flex text-right ${FollowerChating ? 'justify-start' : 'justify-end'}`}>
                    <img src={message?.image?.url} className='max-w-[10rem] md:max-w-[15rem] rounded-xl' alt='' />
                </div>
            }
        </div>
    )
}

export default Message
