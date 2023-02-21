import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export const Scrollup = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

export const Scrolldown = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}