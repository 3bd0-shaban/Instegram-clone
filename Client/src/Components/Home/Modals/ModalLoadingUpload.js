import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';

const ModalLoadingUpload = ({ isLoading, success, error }) => {
    const dispatch = useDispatch();
    return (
        <>
            <div
                onClick={() => dispatch(FeatureAction.setIsModalLoadingUpload(false))}
                className="fixed inset-0 bg-black/30 z-10"></div>
            <div className='fixed inset-x-0 top-[10%] container max-w-[26rem] sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-4xl z-30 px-0 bg-white rounded-lg h-[35rem] sm:h-[45rem] md:h-[55rem] shadow'>
                <div className="flex justify-center items-start py-3 rounded-t border-b ">
                    <h3 className="text-xl font-semibold text-gray-900 mt-auto">{isLoading ? 'Sharing ....' : success ? 'Shared Post' : 'Error hapened'}</h3>
                </div>
                <div className='mx-auto py-24 lg:py-72 text-center'>
                    <img className='block mx-auto' src={isLoading ? 'https://static.cdninstagram.com/rsrc.php/v3/y4/r/ShFi4iY4Fd9.gif'
                        : success ?
                            'https://static.cdninstagram.com/rsrc.php/v3/yb/r/sHkePOqEDPz.gif' : ''}
                        alt='' />
                    {error &&
                        <div className='flex justify-center text-gray-500'>
                            <AiOutlineQuestionCircle size={100} />
                        </div>}
                    {success && <p className='text-lg font-medium block mt-5'> Your post has been shared.</p>}
                </div>
            </div>
        </>
    )
}
export default ModalLoadingUpload
