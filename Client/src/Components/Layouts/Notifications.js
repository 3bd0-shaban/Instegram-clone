import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimSlide from './../../Animation/AnimSlode';

const Notifications = () => {
    const result = []
    return (
        <motion.div
            variants={AnimSlide}
            initial='initial'
            animate='animate'
            exit='exit'
            className='bg-white h-screen z-20 p-5 w-[28rem] shadow-sm hidden lg:block rounded-tr-2xl rounded-br-2xl hideScrollBare overflow-y-scroll rounded-md border'>
            <p className='m-2 mb-5 font-medium text-3xl'>Notification</p>
            <hr className='mt-5' />
            {result?.map(res => (
                <Link
                    to={`/${res.username}`}
                    key={res._id}
                    className='flex items-center'
                // onMouseEnter={() => setOpenSearch(true)}
                >
                    <img className="p-1 w-20 h-20 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url} alt="" />
                    <div className='ml-2'>
                        <p className='text-md font-poppins font-medium'>{res?.username}</p>
                        <p className='text-sm font-poppins text-gray-500'>{res?.fullname}</p>
                    </div>
                </Link>
            ))}
        </motion.div>
    )
}

export default Notifications
