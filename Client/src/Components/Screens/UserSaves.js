import React, { useState } from 'react'
import { BsBookmarks, BsFillChatFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { useGetSaveQuery } from '../../Redux/APIs/SavesApi';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { ModalPostDetails } from '../Exports';

const UserSaves = () => {
    const { data: usersaves, isFeatching, error, isError } = useGetSaveQuery() || {};
    const dispatch = useDispatch()
    const [postID, setPostID] = useState('');
    const remove = usersaves?._id
    const saves = usersaves?.filter(item => item !== remove);
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
    console.log(saves)
    return (
        <>
            <ModalPostDetails ID={postID} />
            <div className='container max-w-6xl px-0'>
                {isError && <p>{error?.data?.msg}</p>}
                {isFeatching && <p className='flex justify-center items-center text-3xl font-medium '>Loading ....</p>}
                {(saves === [] || !saves || saves?.length === 0) && <EmptyTagges />}
                <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                    {saves && saves?.map((item) => (
                        <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(item?._id) }} key={item?._id} className='h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                            {/* <img className='object-cover w-full h-full' src={item[0]?.url} alt='' /> */}
                            <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                <div><BsFillChatFill size={25} /></div>
                                <p className='inline-block'>0</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserSaves
