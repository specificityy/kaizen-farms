import React, { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export const useScrollPercent = (ref, pageHeight) => {
    const [percent, setPercent] = useState();

    useEffect(() => {
        if (!ref.current) return;

        const onScroll = throttle(event => {
            // console.log(window.pageYOffset);
            setPercent(Number.parseInt((window.pageYOffset / pageHeight) * 100, 10));
        }, 10);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [ref, pageHeight]);

    return percent;
};
