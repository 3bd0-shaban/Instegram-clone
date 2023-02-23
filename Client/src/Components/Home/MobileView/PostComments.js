import React, { useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { ImSpinner3 } from 'react-icons/im'
import { IoMdPaperPlane } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useCreateCommentMutation } from '../../../Redux/APIs/CommentsApi'
import { useGetPostDetailsQuery } from '../../../Redux/APIs/PostsApi'
import { selectCurrentUser } from '../../../Redux/Slices/UserSlice'
import { Comments, SideBar } from '../../Exports'
import { Scrollup } from './../../../Helpers/Scroll';

const PostComments = () => {
    Scrollup()
    const userInfo = useSelector(selectCurrentUser)
    const { id } = useParams();
    const [searchQuery] = useSearchParams();
    const user = searchQuery.get('profile')
    const { data: postDetails, isFetching } = useGetPostDetailsQuery(id) || {};
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const [comment, setComment] = useState('');
    const data = { comment }
    const CommentHandle = async (e) => {
        if (!comment) return;
        e.preventDefault();
        if (!comment) return;
        await createComment({ data, id }).unwrap()
            .then((payload) => setComment(''))
            .catch((error) => console.log(error));
    }
    return (
        <>
            <SideBar />
            <div className='container px-0 max-w-6xl gap-5 flex bg-white border'>
                <div className='container px-2 max-w-5xl'>
                    <div className='flex justify-between items-center border-b'>
                        <Link to={user ? `/${user}` : '/'} className=''><BiChevronLeft size={30} /></Link>
                        <p className='m-2 font-medium text-3xl'>Comments</p>
                        <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane size={30} /></button>
                    </div>
                    {(!postDetails?.turnoffcomments) &&
                        <div className='flex gap-2 justify-center items-center my-5 px-2'>
                            <img className="p-1 w-14 h-14 rounded-full focus:ring-2 object-cover focus:ring-gray-300" src={userInfo?.avatar?.url ? userInfo?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
                            <form onSubmit={CommentHandle} className='relative w-full'>
                                <input type="text"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    autoComplete='off'
                                    name='keyword'
                                    className="block py-3 w-full pl-3 outline-none text-sm text-gray-900 bg-gray-100  rounded-xl placeholder:font-extralight placeholder:text-base"
                                    placeholder="Add a comment ..." required=""
                                />
                                {comment && <button className='absolute inset-y-0 -top-1 right-3 text-blue-500 font-semibold' disabled={isLoading}>{isLoading ? 'sending' : 'Post'}</button>}
                            </form>
                        </div>}
                    <hr />
                    {isFetching ? <p className='flex justify-center items-center text-4xl font-medium h-[80vh] animate-spin'><ImSpinner3 /></p> :
                        <div className='min-h-[90vh] overflow-hidden'>
                            <Comments postDetails={postDetails} id={id} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PostComments
