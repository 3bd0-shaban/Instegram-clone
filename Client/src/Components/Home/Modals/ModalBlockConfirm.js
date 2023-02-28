import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX } from 'react-icons/bs';
import { useBlockMutation } from '../../../Redux/APIs/UserApi';
import { Link } from 'react-router-dom';

const ModalBlockConfirm = ({ userById }) => {
    const dispatch = useDispatch();

    const [Block] = useBlockMutation();
    const BlockHandler = async () => {
        const id = userById._id
        await Block(id).unwrap()
            .then(payload => dispatch(FeatureAction.setIsModalBlockConfirm(false)))
            .catch(err => console.log(err))
    }
    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalBlockConfirm(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container z-30 top-[30%] bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden p-0 max-w-xs sm:max-w-[30rem]  '
            >
                <button
                    onClick={() => dispatch(FeatureAction.setIsModalBlockConfirm(false))}
                    className='absolute right-0 m-2'><BsX size={25} />
                </button>
                <div className='text-center space-y-3 py-4 '>
                    <p className='text-lg flex justify-center font-medium mt-2'>Block {userById?.username} ?</p>
                    <p className='px-8 text-gray-500'>You can block them directly from their profile. If you do, they won't be able to find your profile,
                        posts or story or send you messages on Instagram. Instagram won't let them know you blocked them</p>
                </div>
                <hr className='mt-6' />

                <div className='w-full text-center mx-auto'>
                    <Link
                        onClick={BlockHandler}
                        className='block cursor-pointer text-red-500 font-bold py-4 hover:bg-gray-100'>Block
                    </Link><hr />

                    <span
                        onClick={() => dispatch(FeatureAction.setIsModalBlockConfirm(false))}
                        className='block cursor-pointer font-medium py-4 hover:bg-gray-100'>Cancel
                    </span><hr />
                </div>
            </motion.div>
        </>
    )
}

export default ModalBlockConfirm
