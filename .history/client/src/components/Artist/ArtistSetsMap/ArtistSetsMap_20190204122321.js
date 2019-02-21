import React from 'react';
import PropTypes from "prop-types";
const {
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const propTypes = {
    lon: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    sets: PropTypes.array.isRequired,
    onMarkerClustererClick : PropTypes.func.isRequired,
};

export const ArtistSetsMap =({lon,lat,sets,onMarkerClustererClick}) =>(
    <div>
        {/*<ul className="tabs">*/}
            {/*<li className="tab col s3"><a href="#test1">Test 1</a></li>*/}
            {/*<li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>*/}
            {/*<li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>*/}
            {/*<li className="tab col s3"><a href="#test4">Test 4</a></li>*/}
        {/*</ul>*/}
        <GoogleMap
        defaultZoom={lon ? 5 : 3}
        defaultCenter={{ lat: lat ? lat : 40.7128, lng: lon ? lon : -74.0060 }}
    >
        <MarkerClusterer
            onClick={onMarkerClustererClick()}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {sets.map(event => (
                <Marker
                    onClick={() => alert(`${event.title} - ${event.venue.name} - ${event.datetime_utc}`)}
                    key={event.id}
                    position={{ lat: event.venue.location.lat, lng: event.venue.location.lon }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
    </div>
);
ArtistSetsMap.propTypes = propTypes;

export default ArtistSetsMap;