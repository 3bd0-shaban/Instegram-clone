import React from 'react'
import { TbAlertCircle } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
const ModalConfirm = (props) => {
    return (
        <div>
            <div class="flex fixed z-50 inset-0 justify-center items-center">
                <div class="relative p-4  max-w-md ">
                    <div class="relative bg-white rounded-lg shadow-[0_0px_100px_10px_rgba(0,0,0,0.3)]">
                        <button onClick={props.onClose} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="popup-modal">
                            <IoIosClose style={{ 'fontSize': '1.5rem' }} />
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <div className='mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200'>
                                <TbAlertCircle style={{ 'fontSize': '3rem' }} />
                            </div>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                            <button onClick={props.onDrop} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={props.onClose} class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalConfirm
