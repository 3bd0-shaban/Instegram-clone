import React, { useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { ImSpinner3 } from 'react-icons/im'
import { IoMdPaperPlane } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useCreateCommentMutation } from '../../../Redux/APIs/CommentsApi'
import { useGetPostDetailsQuery } from '../../../Redux/APIs/PostsApi'
import { useGetUserQuery } from '../../../Redux/APIs/UserApi'
import { Comments, SideBar } from '../../Exports'

const PostComments = () => {
    const { data: userInfo } = useGetUserQuery() || {};
    const { id } = useParams();
    const { data: postDetails, isFetching } = useGetPostDetailsQuery(id) || {};
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState('');
    const data = { comment }
    const CommentHandle = async (e) => {
        e.preventDefault();
        if (!comment) return;
        await createComment({ data, id }).unwrap()
            .then((payload) => setComment(''))
            .catch((error) => console.log(error));
    }
    return (
        <>
            <SideBar />
            <div className='container max-w-5xl mt-16'>
                <div className='flex justify-between items-center border-b'>
                    <Link to='/' className=''><BiChevronLeft size={30} /></Link>
                    <p className='m-2 mb-5 font-medium text-3xl'>Comments</p>
                    <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane size={30} /></button>
                </div>
                <div className='flex gap-5 items-center my-5'>
                    <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                    <form onSubmit={CommentHandle} className='relative w-full'>
                        <input type="text"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            autoComplete='off'
                            name='keyword'
                            className="block py-3 w-full pl-3 outline-none text-sm text-gray-900 bg-gray-100  rounded-xl placeholder:font-extralight placeholder:text-base"
                            placeholder="Add a comment ..." required=""
                        />
                        <button className='absolute inset-y-0 -top-2 right-3 text-blue-500 font-semibold'>Post</button>
                    </form>
                </div>
                <hr />
                {isFetching ? <p className='flex justify-center items-center text-4xl font-medium h-[80vh] animate-spin'><ImSpinner3 /></p> :
                    <Comments postDetails={postDetails} id={id} />
                }
            </div>
        </>
    )
}

export default PostComments
