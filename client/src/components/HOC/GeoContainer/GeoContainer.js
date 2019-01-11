import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLocation} from "../../../store/actions";

const withGeo = (WrappedComponent) => {
    class GeoContainer extends Component {
        componentDidMount(){
            this.props.getLocation();
        }

        render(){
            return (
                <WrappedComponent
                    latitude={this.props.location.latitude}
                    longitude={this.props.location.longitude}
                    {...this.props}
                />
            )
        }
    }
    function mapStateToProps({location}) {
        return {location };
    }


    return connect(mapStateToProps,{getLocation})(GeoContainer);
};



export default withGeo;