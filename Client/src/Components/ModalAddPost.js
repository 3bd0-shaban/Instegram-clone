import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { BsCloudUpload } from 'react-icons/bs'
const ModalAddPost = (props) => {
    return (
        <div>
            <div class="flex  bg-gray-700 bg-opacity-60 transition-opacity fixed z-50 w-full inset-0 justify-center items-center">
                <div class="relative p-4 w-full max-w-4xl ">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 class="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                            <button onClick={props.onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                                text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <IoIosClose style={{ 'fontSize': '1.5rem' }} />
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 py-20 sm:py-40 space-y-6 text-center">
                            <div class="flex justify-center items-center w-full">
                                <label class="flex flex-col justify-center items-center h-[30rem] w-full cursor-pointer ">
                                    <div class="flex flex-col justify-center items-center pt-5 pb-6 gap-y-5">
                                        <div className='text-gray-500'>
                                            <BsCloudUpload style={{ 'fontSize': '4rem' }} />
                                        </div>
                                        <p class=" text-gray-500 font-[200] text-[30px]">Drag photos and videos here</p>
                                        <div className='bg-blue-500 rounded-md text-base font-bold px-4 my-5 text-white py-2 mb-3 hover:bg-blue-400 '>Select from computer</div>
                                    </div>
                                    <input id="dropzone-file" type="file" multiple class="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddPost
