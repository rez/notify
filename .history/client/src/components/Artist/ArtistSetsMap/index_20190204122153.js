import React from 'react';
import ArtistSetsMap from './ArtistSetsMap';
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
export default compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgLxp7-qNqKr9GzQ_TQSrcLw4v74Q1-I0&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            console.log(markerClusterer);
            // const clickedMarkers = markerClusterer.getMarkers()
            // console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            // console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
);