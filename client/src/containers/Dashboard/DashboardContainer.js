import React, {Component} from 'react';
import {connect} from 'react-redux';
import {playItem} from "../../store/actions";
import axios from "axios";
import {getLocation, getUserFollows, playTrack} from "../../store/actions";
import Dashboard from "../../components/Dashboard/Dashboard";
import * as constants from '../../constants/constants';
import {MOST_PLAYED_ARTIST} from "../../constants/constants";
import {FOLLOWING} from "../../constants/constants";
import {UNSEEN_RELEASES} from "../../constants/constants";

class DashboardContainer extends Component {
    state = {
        page : 0,
        follows : this.props.dashboard.follows,
        activeReleasesArtist : "",
        activeSetsArtist : "",
        activeSets : [],
        activeReleases : [],
        showReleasesModal : false,
        showSetsModal : false,
        init : false
    };

    dashNavFilter = [
        {
            label : FOLLOWING,
            onClick : () =>{ return true},
            active : true
        },
        {
            label : MOST_PLAYED_ARTIST,
            onClick : () =>{ return true},
        },
        {
            label : UNSEEN_RELEASES,
            onClick : () =>{ return true},
        }
    ];

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.init && !this.state.init){
            this.props.getUserFollows(this.props.location.latitude, this.props.location.longitude)
            this.setState({init : true});
        }
    };

    playTrack = async (track) => {
        this.props.playTrack(track, this.props.player.active_device);
    };

    newReleasesHandler = (artist, releases) => {
        this.setState({
            activeReleases : releases,
            activeReleasesArtist : artist,
            showReleasesModal : true,
            showSetsModal : false
        });
    };

    setMapHandler = (artist, sets) => {
        this.setState({
            activeSets : sets,
            activeSetsArtist : artist,
            showReleasesModal : false,
            showSetsModal : true
        });
    };

    modalCancelHandler = () => {
        this.setState({
            showReleasesModal : false,
            showSetsModal : false
        })
    };

    render(){
        return (
            <Dashboard
                {...this.props}
                {...this.state}
                navFilters={this.dashNavFilter}
                setMapHandler={this.setMapHandler}
                modalCancelHandler={this.modalCancelHandler}
                newReleasesHandler={this.newReleasesHandler}
            />
        );
    }
}

function mapStateToProps({auth, player, location, dashboard}) {
    return { auth, player, location, dashboard };
}

export default connect(
    mapStateToProps,
    {playTrack,
     getLocation,
     getUserFollows})(DashboardContainer);