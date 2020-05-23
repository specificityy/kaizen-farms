import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import inRange from 'lodash/inRange';
import clamp from 'lodash/clamp';

import styles from './styles';

export const Map = () => {
    const mapElement = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyC-ijra3C2lwX-08SJn3Nu2vX5x_LbcxuM&callback=initMap';
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

const url =
    'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBPLu9FvZLlvnLN5ofZW7A-XNoHNETigLo&center=18.96017096856148,-66.59531944140507&zoom=7&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=480x360';
