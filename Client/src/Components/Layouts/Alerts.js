import { motion } from 'framer-motion';
import AnimSlideUp from '../../Animation/AnimSlideUp';
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

export default ClipAlerts