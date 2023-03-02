import { IoIosClose } from 'react-icons/io'
import { BsCloudUpload } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import AnimModal from '../../../Animation/AnimModal';
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ModalConfirm, ModalPreviewImages, ModalLoadingUpload } from '../../Exports';
import { useCreatePostMutation } from '../../../Redux/APIs/PostsApi';
import { preventScroll } from '../../../Helpers/PreventScroll';
const ModalAddPost = () => {
    const { IsModalPreviewImages, isModalConfirm, isModalAddPost, isModalLoadingUpload } = useSelector(state => state.Features);

    preventScroll(isModalAddPost)
    const [createPost, { isLoading, error }] = useCreatePostMutation();
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const loadFile = (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const singlefile = files[i];
            const reader = new FileReader();
            if (singlefile.type.startsWith('video/')) {
                reader.readAsDataURL(singlefile);
                reader.onload = () => {
                    setVideos((vids) => vids ? [...vids, reader.result] : [reader.result]);
                }
                // urls.push(URL.createObjectURL(singlefile));
                // setVideos(urls)
            }
            if (singlefile.type.startsWith('image/')) {
                reader.readAsDataURL(singlefile);
                reader.onload = () => {
                    setImages((imgs) => [...imgs, reader.result]);
                }
                reader.onerror = () => {
                    console.log(reader.error);
                };
            }
        }
        dispatch(FeatureAction.ShowModalAddPost(false))
        dispatch(FeatureAction.Show_ModalPreviewImages(true))
    }
    const discartall = () => {
        dispatch(FeatureAction.Show_ModalConfirm(false));
        dispatch(FeatureAction.Show_ModalPreviewImages(false));
        setImages([])
        setVideos([])
    }
    return (
        <>
            {isModalLoadingUpload && <ModalLoadingUpload isLoading={isLoading} success={success} error={error} />}

            {isModalConfirm && <ModalConfirm OnCloseEvent={discartall} />}
            {IsModalPreviewImages && <ModalPreviewImages images={images} setImages={setImages} videos={videos} setVideos={setVideos} setSuccess={setSuccess} createPost={createPost} />}
            {isModalAddPost &&
                <>
                    <div onClick={() => dispatch(FeatureAction.ShowModalAddPost(false))} className="fixed inset-0 bg-black/30 z-20"></div>
                    <motion.div
                        variants={AnimModal}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className='fixed inset-x-0 top-[10%] p-4 container max-w-md sm:max-w-xl h-[35rem] sm:h-[47.5rem] md:h-[52rem] lg:max-w-4xl z-30 '
                    >
                        <div className="relative bg-white rounded-lg h-full shadow">
                            <div className="flex justify-between items-start p-4 rounded-t border-b">
                                <h3 className="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                                <button
                                    onClick={() => dispatch(FeatureAction.ShowModalAddPost(false))}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                                        text-sm p-1.5 ml-auto inline-flex items-center " >
                                    <IoIosClose style={{ 'fontSize': '1.5rem' }} />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 py-20 sm:py-40 h-full space-y-6 text-center">
                                <div className="flex justify-center items-center w-full">
                                    <label className="flex flex-col justify-center items-center w-full cursor-pointer ">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-y-5">
                                            <div className='text-gray-500'>
                                                <BsCloudUpload style={{ 'fontSize': '4rem' }} />
                                            </div>
                                            <p className=" text-gray-500 font-[200] text-[30px]">Drag photos and videos here</p>
                                            <div className='bg-blue-500 rounded-md text-base font-bold px-4 my-5 text-white py-2 mb-3 hover:bg-blue-400 '>Select from computer</div>
                                        </div>
                                        <input onChange={loadFile} id="dropzone-file" type="file" multiple className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            }
        </>

    )
}

export default ModalAddPost
