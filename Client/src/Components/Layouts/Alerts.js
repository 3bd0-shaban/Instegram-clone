import { motion } from 'framer-motion';
import AnimSlideUp from '../../Animation/AnimSlideUp';
import { ImSpinner7 } from 'react-icons/im';
export const ClipAlerts = () => {
    return (
        <motion.div
            variants={AnimSlideUp}
            initial='initial'
            animate='animate'
            exit='exit'
            className="fixed bottom-6 inset-x-0 z-40 container max-w-xs text-center cursor-pointer bg-black/70 text-white rounded-lg py-4 font-lg font-medium">
            <p>Post link copied to clipboard</p>
        </motion.div>
    )
}
export const LoadingAlerts = () => {
    return (
        <motion.div
            variants={AnimSlideUp}
            initial='initial'
            animate='animate'
            exit='exit'
            className="fixed bottom-6 inset-x-0 z-40 container max-w-[10rem] text-center cursor-pointer bg-black/70 text-white rounded-lg py-4 font-lg font-medium">
            <div className='flex justify-center items-center w-full animate-spin'><ImSpinner7 /></div>
        </motion.div>
    )
}


export default ClipAlerts
