import { motion } from 'framer-motion';

const AnimatedButton = ({
    onClick,
    infinity,
    className,
    children,
    variants,
}) => {
    return (
        <motion.button
            className={className}
            initial="hidden"
            onClick={onClick}
            variants={variants}
            whileInView="visible"
            viewport={{ once: !infinity }}
        >
            {children}
        </motion.button>
    );
};
export default AnimatedButton;
