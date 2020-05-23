import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import inRange from 'lodash/inRange';
import clamp from 'lodash/clamp';

import styles from './styles';

export const Map = () => {
    const mapElement = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_MAPS_API_KEY}&callback=initMap`;
        script.defer = true;
        script.async = true;
        window.initMap = () => {
            const styledMapType = new window.google.maps.StyledMapType(styles, { name: 'Styled Map' });
            map.current = new window.google.maps.Map(mapElement.current, {
                center: { lat: 18.796986, lng: -23.930993 }, // -69.78747 }, // Monte Plata
                zoom: 4,
                fullscreenControl: false,
                clickableIcons: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                gestureHandling: 'greedy',
            });

            map.current.mapTypes.set('styled_map', styledMapType);
            map.current.setMapTypeId('styled_map');
            map.current.addListener('zoom_changed', handleZoomChanged);
        };

        const handleZoomChanged = () => {
            const zoom = map.current.getZoom();

            console.log(clamp(zoom, 5, 8));
            if (inRange(zoom, 5, 10)) {
                map.current.setOptions({ gestureHandling: 'greedy' });
            } else {
                map.current.setOptions({ gestureHandling: 'none' }); //, zoom: clamp(zoom, 5, 8) });
            }
        };

        window.document.head.appendChild(script);

        return () => {
            // map.current !== null && map.current.removeListener(handleZoomChanged);
        };
    }, []);

    return <StyledMap name="map" ref={mapElement} />;
};

const StyledMap = styled.div`
    height: 100%;
`;
