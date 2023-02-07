import { useEffect, useState } from 'react';


const useBreakpoint = () => {
    const breakpoints = {
        0: 'xs',
        370: 'sm',
        576: 'md',
        768: 'lg',
        992: 'xl',
        1200: 'xxl',
        1400: 'xxxl',
    };
    const [breakpoint, setBreakPoint] = useState('');
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (0 < windowSize.width && windowSize.width < 370) {
            setBreakPoint(breakpoints[0]); //xs mbile
        }
        if (370 < windowSize.width && windowSize.width < 576) {
            setBreakPoint(breakpoints[370]); //sm
        }
        if (576 < windowSize.width && windowSize.width < 768) {
            setBreakPoint(breakpoints[576]); //md
        }
        if (768 < windowSize.width && windowSize.width < 992) {
            setBreakPoint(breakpoints[768]); //lg
        }
        if (992 < windowSize.width && windowSize.width < 1200) {
            setBreakPoint(breakpoints[992]); //xl
        }
        if (1200 < windowSize.width && windowSize.width < 1400) {
            setBreakPoint(breakpoints[1200]); //xxl
        }
        if (windowSize.width >= 1400) { //xxxl
            setBreakPoint(breakpoints[1400]);
        }
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line
    }, [windowSize.width]);
    return breakpoint;
};

export default useBreakpoint;