import {GET_LOCATION} from './ActionTypes';

export const getLocation = () => async dispatch => {

    console.log("GETTING LOCATION");
    if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                // for when getting location is a success
                console.log(position.coords);
                dispatch({type : GET_LOCATION, latitude:position.coords.latitude, init: true, longitude : position.coords.longitude});
            },
            function error(error_message) {
                // for when getting location results in an error
                console.error(`An error has occured while retrieving location`, error_message);
                dispatch({type : GET_LOCATION, longitude : "DENIED", latitude : "DENIED", init: true});
            });
    } else {
        // geolocation is not supported
        // get your location some other way
        console.log('geolocation is not enabled on this browser');
        dispatch({type : GET_LOCATION, longitude : "DENIED", latitude : "DENIED", init: true});
    }
};