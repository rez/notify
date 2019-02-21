import React, {Component} from 'react';
import {connect} from 'react-redux';
import {playItem} from "../../store/actions";
import axios from "axios";
import {getLocation, getUserFollows, playTrack, getUserMostPlayed, updateActiveFilter, setTimeSpan} from "../../store/actions";
import Dashboard from "../../components/Dashboard/Dashboard";
import * as constants from '../../constants/constants';
import {MOST_PLAYED_ARTIST} from "../../constants/constants";
import {FOLLOWING} from "../../constants/constants";
import {UNSEEN_RELEASES} from "../../constants/constants";
import {FOLLOWING_LINK} from "../../constants/constants";
import {MOST_PLAYED_LINK} from "../../constants/constants";
import {UNSEEN_LINK} from "../../constants/constants";
import {DASH_BASE_PATH} from "../../constants/constants";
import {getFollowsByTime, getMostPlayedByTime} from "../../selectors/DashSelectors";

export class DashboardContainer extends Component {
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
            }
        ]
    };

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

    playTrack =  (track) => {
        this.props.playTrack(track, this.props.player.active_device);
    };

    newReleasesHandler = (artist, releases) => {
        this.setState({
            activeReleases : releases,
            activeReleasesArtist : artist,
            showReleasesModal : true,
            showSetsModal : false,
            windowOffset : (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

         });
    };

    setMapHandler = (artist, sets) => {
        this.setState({
            activeSets : sets,
            activeSetsArtist : artist,
            showReleasesModal : false,
            showSetsModal : true,
            windowOffset : (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

         });
    };

    modalCancelHandler = () => {
        this.setState({
            showReleasesModal : false,
            showSetsModal : false
        })
    };

    timeHandler = (t) => {
        const time = t.value ? t.value : new Date(this.props.auth.auth.data.lastView).getTime();
        this.props.setTimeSpan(time);
    };

    scrollHandler = () => {
        if(this.props.dashboard.fetching)return;

        switch (this.props.dashboard.activeGrid) {
            case FOLLOWING:
                this.props.getUserFollows();
                break;
            case MOST_PLAYED_ARTIST:
                this.props.getUserMostPlayed();
                break;
        }
    };
    render(){
        return (
            <Dashboard
                {...this.props}
                {...this.state}
                navFilters={this.state.dashNavFilter}
                timeHandler={this.timeHandler}
                setMapHandler={this.setMapHandler}
                scrollHandler={this.scrollHandler}
                modalCancelHandler={this.modalCancelHandler}
                newReleasesHandler={this.newReleasesHandler}
            />
        );
    }
}

function mapStateToProps(state) {
    const {auth, player, location, dashboard} = state;
    return {
            auth,
            player,
            location,
            dashboard,
            artistMostPlayed : getMostPlayedByTime(state),
            artistFollowed : getFollowsByTime(state)

        };
}

export default connect(
    mapStateToProps,
    {playTrack,
     getLocation,
     getUserFollows,
        setTimeSpan,
     getUserMostPlayed,
     updateActiveFilter})(DashboardContainer);