import { BiChevronLeft } from 'react-icons/bi'
import { MdOutlineInfo } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteAllMSGsMutation } from '../../Redux/APIs/MessageApi'
import { FeatureAction } from './../../Redux/Slices/FeaturesSlice'
import { ModalBlockConfirm } from './../Exports'

const CoversationCTRL = ({ setDetails, setSelected, details, id, userById }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isModalBlockConfirm } = useSelector(state => state.Features);
    const [DeleteAllMSGs, { isLoading, isError, error }] = useDeleteAllMSGsMutation();
    const DeleteAll = async () => {
        await DeleteAllMSGs(id).unwrap()
            .then(() => {
                setDetails(false);
                setSelected(false)
                navigate('/messages');
            })
    }

    return (
        <>
            {isModalBlockConfirm && <ModalBlockConfirm UserByIdDetails={userById} />}
            <div className='px-5 py-1 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <button onClick={() => setDetails(!details)}><BiChevronLeft size={30} /></button>
                    <p className='text-xl font-medium'>Details</p>
                </div>
                <button onClick={() => setDetails(!details)}><MdOutlineInfo size={25} /></button>
            </div><hr />
            <div className='p-5'>
                <p>Members</p>
                <Link to={userById?.username ? `/${userById?.username}` : ''} className='flex gap-2 py-3 lg:items-center'>
                    <img className="p-1 w-24 h-24 rounded-full object-cover focus:ring-2 focus:ring-gray-300"
                        src={userById?.avatar?.url ? userById?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
                    <div>
                        <p className='my-auto font-medium text-lg'>{userById?.username ? userById?.username : 'Instegram user'}</p>
                        <p className='my-auto'>{userById?.fullname ? userById?.fullname : 'Instegram user'}</p>
                    </div>
                </Link>
            </div><hr />
            <div className='p-5 space-y-3'>
                <button onClick={DeleteAll} className='text-red-500 font-normal block' disabled={isLoading}>{isLoading ? 'Deleting ...' : 'Delete Chat'}</button>
                <button onClick={() => dispatch(FeatureAction.setIsModalBlockConfirm(true))}
                    className='text-red-500 font-normal block'>Block</button>
                <div className='py-5 w-full text-center'>
                    {isError && <p className='text-red-500 font-semibold '>{error?.data?.msg}</p>}
                </div>
            </div>
        </>
    )
}

export default CoversationCTRL
