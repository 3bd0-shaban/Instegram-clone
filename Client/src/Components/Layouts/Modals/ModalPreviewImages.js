import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
const ModalPreviewImages = (props) => {
    const dispatch = useDispatch();
    const { IsModalPreviewImages } = useSelector(state => state.Features);
    return (
        IsModalPreviewImages &&
        <div key={props.mykey}>
            <div className="fixed inset-0 bg-black/40 z-10" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(true))}></div>
            <div className="fixed inset-0 top-[10%] w-screen container px-0 max-w-4xl z-20 bg-white ">
                <div className="relative rounded-lg shadow">
                    <div className="flex justify-between items-start py-4 rounded-t border-b px-4">
                        <h3 className="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                        <div className="text-blue-500 font-semibold text-lg cursor-pointer">Next</div>
                    </div>
                    <img className='w-1/2 object-cover mx-3' src={props.img} alt='' />
                </div>
            </div>
        </div>
    )
}
export default ModalPreviewImages
