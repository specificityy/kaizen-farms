import React, { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

let lastScrollTop = 0;
let direction = 'up';
export const useScrollPercent = (ref, pageHeight, treshold = 50) => {
    // const [above, setAbove] = useState(true);
    const [scrollPercent, setScrollPercent] = useState();
    // let scrollPercent = 0;

    const workingHeight = pageHeight * 1;

    useEffect(() => {
        if (!ref.current) return;

        const onScroll = throttle(event => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            direction = st > lastScrollTop ? 'down' : 'up';
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

            setScrollPercent(
                pageHeight - st === workingHeight
                    ? 0
                    : Number(Number.parseFloat(window.pageYOffset / workingHeight).toFixed(2))
            );

            // setAbove(scrollPercent <= treshold);

            // if (scrollPercent > treshold && above === true) {
            //     console.log(scrollPercent, above);
            //     setAbove(false);
            // } else if (scrollPercent <= treshold && above === false) {
            //     console.log(scrollPercent, above);
            //     setAbove(true);
            // }
        }, 0);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [ref, pageHeight]);

    return { scrollPercent, direction };
};
