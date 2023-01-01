import React from 'react'
import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
const ModalConfirm = (props) => {
    const dispatch = useDispatch();
    const discartall = () => {
        dispatch(FeatureAction.Show_ModalConfirm(false));
        dispatch(FeatureAction.Show_ModalPreviewImages(false));
    }
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-40 transition-opacity z-40" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(false))}></div>
            <div className="flex fixed z-50 inset-0 justify-center items-center">
                <div className="relative max-w-xl ">
                    <div className="relative bg-white rounded-lg shadow-[0_0px_100px_10px_rgba(0,0,0,0.3)]">
                        <div className="text-center pt-4">
                            <div className='px-28 py-6'>
                                <p className='text-2xl font-medium py-2'>Discard post?</p>
                                <h3 className="mb-5 text-lg font-light text-gray-800">If you leave, your edits will not be saved.</h3>
                            </div><hr />
                            <div className='block text-lg text-red-600 font-medium py-3 cursor-pointer hover:bg-gray-100' onClick={discartall}>Discard</div><hr />
                        <div className='block text-lg text-gray-700 font-normal py-3 cursor-pointer hover:bg-gray-100 hover:rounded-lg' onClick={() => dispatch(FeatureAction.Show_ModalConfirm(false))}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ModalConfirm
