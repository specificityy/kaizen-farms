import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash/debounce';
import { useTheme } from 'emotion-theming';

import styles from './styles';

export const Map = () => {
    const mapElement = useRef(null);
    const map = useRef(null);
    const { mediaQueries } = useTheme();

    useEffect(() => {
        const calcZoomAndLocation = () => {
            const { matches } = window.matchMedia(`(${mediaQueries.m})`);
            return {
                zoom: matches ? 1.7 : 3.5,
                center: matches ? { lat: 50.79, lng: -55.78 } : { lat: 22.79, lng: -43.93 },
            };
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_MAPS_API_KEY}&callback=initMap`;
        script.defer = true;
        script.async = true;
        window.initMap = () => {
            const styledMapType = new window.google.maps.StyledMapType(styles, { name: 'Styled Map' });
            map.current = new window.google.maps.Map(mapElement.current, {
                ...calcZoomAndLocation(),
                fullscreenControl: false,
                clickableIcons: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                gestureHandling: 'none',
            });

            map.current.mapTypes.set('styled_map', styledMapType);
            map.current.setMapTypeId('styled_map');
            // map.current.addListener('zoom_changed', handleZoomChanged);
        };

        // const handleZoomChanged = () => {
        //     const zoom = map.current.getZoom();

        //     if (inRange(zoom, 5, 10)) {
        //         map.current.setOptions({ gestureHandling: 'greedy' });
        //     } else {
        //         map.current.setOptions({ gestureHandling: 'none' }); //, zoom: clamp(zoom, 5, 8) });
        //     }
        // };

        const handleWindowResize = debounce(() => map.current.setOptions(calcZoomAndLocation()), 300);

        window.document.head.appendChild(script);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            // map.current !== null && map.current.removeListener(handleZoomChanged);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [mediaQueries.m]);

    return <StyledMap name="map" ref={mapElement} />;
};

const StyledMap = styled.div`
    height: 100%;
`;
