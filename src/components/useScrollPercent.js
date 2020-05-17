import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

let lastScrollTop = 0;
let direction = 'up';
export const useScrollPercent = pageHeight => {
    const [scrollPercent, setScrollPercent] = useState();

    const workingHeight = pageHeight || window.innerHeight;

    useEffect(() => {
        const onScroll = throttle(event => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            direction = st > lastScrollTop ? 'down' : 'up';
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

            setScrollPercent(st); //st === 0 ? 0 : Number(Number.parseFloat(st / workingHeight).toFixed(2)));
        }, 0);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return { scrollPercent, direction };
};
