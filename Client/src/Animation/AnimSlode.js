const AnimSlide = {
    initial: {
        x: "-100vw",
        opacity: 0,
    },
    animate: {
        x: "0",
        opacity: 1,
        transition: { duration: 0.4 }
    },
    exit: {
        x: 250,
        opacity: 0,
        transition: { ease: 'easeInOut' }
    }
};
export default AnimSlide