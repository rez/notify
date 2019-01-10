import React from 'react';
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const ArtistSetsMap = compose(
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
)(props =>
    <div>
        {/*<ul className="tabs">*/}
            {/*<li className="tab col s3"><a href="#test1">Test 1</a></li>*/}
            {/*<li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>*/}
            {/*<li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>*/}
            {/*<li className="tab col s3"><a href="#test4">Test 4</a></li>*/}
        {/*</ul>*/}
        {console.log("SHOW MAP LNG " + props.lon)}
        <GoogleMap
        defaultZoom={props.lon ? 5 : 3}
        defaultCenter={{ lat: props.lat ? props.lat : 40.7128, lng: props.lon ? props.lon : -74.0060 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick()}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.sets.map(event => (
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

export default ArtistSetsMap;