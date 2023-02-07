const AnimModal = {
    initial: {
        opacity: 0.7,
        scale: 1.08
    },
    animate: {
        opacity: 1,
        scale: 1,
        // transition: {
        //     duration: 0.01,
        //     // ease: 'easeInOut',
        //     // type: 'spring'
        // }

    },
    exit: {
        opacity: 0,
        scale: 3,
        transition: { duration: 0.15, ease: 'easeInOut' }
    }
}
export default AnimModal