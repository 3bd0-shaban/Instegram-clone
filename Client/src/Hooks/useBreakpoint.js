import { useEffect, useState } from 'react';


const useBreakpoint = () => {
    const breakpoints = {
        0: 'xs',
        370: 'sm',
        576: 'md',
        620: 'lg',
        800: 'xl',
        1000: 'xxl',
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
        if (576 < windowSize.width && windowSize.width < 620) {
            setBreakPoint(breakpoints[576]); //md
        }
        if (620 < windowSize.width && windowSize.width < 800) {
            setBreakPoint(breakpoints[620]); //lg
        }
        if (800 < windowSize.width && windowSize.width < 1000) {
            setBreakPoint(breakpoints[800]); //xl
        }
        if (1000 < windowSize.width && windowSize.width < 1400) {
            setBreakPoint(breakpoints[1000]); //xxl
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