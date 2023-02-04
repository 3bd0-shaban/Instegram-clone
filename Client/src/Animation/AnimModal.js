const AnimModal = {
    initial: {
        opacity: 0,
        scale: 1.2
    },
    animate: {
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: {
            duration: .2,
            ease: 'easeInOut',
            type: 'spring'
        }

    },
    exit: {
        opacity: 0,
        scale: 3,
        transition: { duration: 0.15, ease: 'easeInOut' }
    }
}
export default AnimModal