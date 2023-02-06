import moment from "moment"

const Comments = ({ postDetails, id }) => {
    return (
        postDetails?.comments?.length === 0 ?
            <div className='mt-10 md:mt-0 flex h-[70%] justify-center items-center'>
                <div className='text-center space-y-3'>
                    <p className='font-semibold text-3xl'>No comments yet.</p>
                    <p className='text-base font-light '>Start the conversation.</p>
                </div>
            </div>
            :
            <div className='overflow-y-scroll hideScrollBare md:h-[80%] pb-14'>
                {postDetails?.comments?.map((comment) => (
                    <div key={comment?._id} className={`py-3 ${!id && 'px-3'}`}>
                        <div className='flex gap-3'>
                            <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={comment?.user?.avatar?.url} alt="" />
                            <div className='mt-2'>
                                <div className='flex gap-3'>
                                    <span className='text-[1.1rem] font-poppins font-medium inline'>{comment?.user?.username}
                                        <p className='font-poppins text-[1rem] font-thin inline mx-3'>{comment?.comment}</p>
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500'>{moment(comment?.time).from()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    )
}
export default Comments