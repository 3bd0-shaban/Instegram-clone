import { IoIosClose } from 'react-icons/io'
import { BsCloudUpload } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import ModalPreviewImages from './ModalPreviewImages';
const ModalAddPost = (props) => {
    const { isModalAddPost } = useSelector(state => state.Features);
    const dispatch = useDispatch();

    return (
        isModalAddPost &&
        <>
            <ModalPreviewImages />
            <div onClick={() => dispatch(FeatureAction.ShowModalAddPost(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-10"></div>
            <div className="fixed inset-0 top-[10%] w-screen p-4 container max-w-4xl z-20 ">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between items-start p-4 rounded-t border-b">
                        <h3 className="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                        <button onClick={props.onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                                text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                            <IoIosClose style={{ 'fontSize': '1.5rem' }} />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 py-20 sm:py-40 space-y-6 text-center">
                        <div className="flex justify-center items-center w-full">
                            <label className="flex flex-col justify-center items-center h-[30rem] w-full cursor-pointer ">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-y-5">
                                    <div className='text-gray-500'>
                                        <BsCloudUpload style={{ 'fontSize': '4rem' }} />
                                    </div>
                                    <p className=" text-gray-500 font-[200] text-[30px]">Drag photos and videos here</p>
                                    <div className='bg-blue-500 rounded-md text-base font-bold px-4 my-5 text-white py-2 mb-3 hover:bg-blue-400 '>Select from computer</div>
                                </div>
                                <input onChange={props.ImageFun} id="dropzone-file" type="file" multiple className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddPost
