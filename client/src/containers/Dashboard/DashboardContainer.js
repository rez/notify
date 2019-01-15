import React, {Component} from 'react';
import {connect} from 'react-redux';
import {playItem} from "../../store/actions";
import axios from "axios";
import {getLocation, getUserFollows, playTrack, getUserMostPlayed, updateActiveFilter} from "../../store/actions";
import Dashboard from "../../components/Dashboard/Dashboard";
import * as constants from '../../constants/constants';
import {MOST_PLAYED_ARTIST} from "../../constants/constants";
import {FOLLOWING} from "../../constants/constants";
import {UNSEEN_RELEASES} from "../../constants/constants";
import {FOLLOWING_LINK} from "../../constants/constants";
import {MOST_PLAYED_LINK} from "../../constants/constants";
import {UNSEEN_LINK} from "../../constants/constants";
import {DASH_BASE_PATH} from "../../constants/constants";

class DashboardContainer extends Component {
    state = {
        page : 0,
        basePath : DASH_BASE_PATH,
        activeReleasesArtist : "",
        activeSetsArtist : "",
        activeSets : [],
        activeReleases : [],
        showReleasesModal : false,
        showSetsModal : false,
        init : false,
        dashNavFilter : [
            {
                label : FOLLOWING,
                action : this.props.getUserFollows,
                active : this.props.dashboard.activeGrid === FOLLOWING,
                path : FOLLOWING_LINK,
                loaded : this.props.dashboard.follows.length ? true : false
            },
            {
                label : MOST_PLAYED_ARTIST,
                action : this.props.getUserMostPlayed,
                active : this.props.dashboard.activeGrid === MOST_PLAYED_ARTIST,
                path : MOST_PLAYED_LINK,
                loaded : this.props.dashboard.mostPlayed.length ? true : false
            },
            {
                label : UNSEEN_RELEASES,
                action : this.props.getUserFollows,
                path : UNSEEN_LINK,
                loaded : false
            }
        ]
    };

    componentDidMount() {
        console.log("MOUNT ME BIOTCH");
    }

    updateActiveFilter(activeFilter){
        this.setState(state => {
            const dashNavFilter = state.dashNavFilter.map(filter => {
                if(filter.path === activeFilter.path){
                    filter.loaded = true;
                    filter.active = true;
                }else filter.active = false;
                return filter;
            });
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const activeFilter = this.state.dashNavFilter.find(({label}) => label ===  this.props.dashboard.activeGrid);
        const activePath = this.props.match.params.filter ? this.props.match.params.filter : FOLLOWING_LINK;
        const detectedFilter = this.state.dashNavFilter.find(({path}) => path ===  activePath);

        if(this.props.location.init && !detectedFilter.loaded){
           detectedFilter.action(this.props.location.latitude, this.props.location.longitude);
           this.updateActiveFilter(detectedFilter);
        }else if((detectedFilter.loaded &&
                 activeFilter.path !== detectedFilter.path )){
            this.updateActiveFilter(detectedFilter);
            this.props.updateActiveFilter(detectedFilter.label);
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
                navFilters={this.state.dashNavFilter}
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
     getUserFollows,
     getUserMostPlayed,
     updateActiveFilter})(DashboardContainer);