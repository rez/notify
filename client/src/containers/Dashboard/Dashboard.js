import React, {Component} from 'react';
import {connect} from 'react-redux';
import FollowGrid from '../../components/Follow/FollowGrid.js';
import {playItem} from "../../store/actions";
import axios from "axios";
import styles from './Dashboard.module.css'
import Modal from '../../components/UI/Modal/Modal';
import ArtistReleaseList from "../../components/Artist/ArtistReleaseList/ArtistReleaseList";
import ArtistSetsMap from "../../components/Artist/ArtistSetsMap/ArtistSetsMap";
import {getLocation, getUserFollows, playTrack} from "../../store/actions";
import loader from './images/loader.gif';

class Dashboard extends Component {
    state = {
        page : 0,
        items : this.props.dashboard.follows,
        activeReleasesArtist : null,
        activeSetsArtist : null,
        activeSets : null,
        activeReleases : null,
        showReleasesModal : false,
        showSetsModal : false,
        init : false
    };

    componentDidMount() {
        this.props.getLocation();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.init && !this.state.init){
            this.props.getUserFollows(this.props.location.latitude, this.props.location.longitude)
            this.setState({init : true});
        }
        console.log(this.props.dashboard.follows);
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
            <div className={styles.dashWrapper}>
                <Modal show={this.state.showReleasesModal} modalClosed={this.modalCancelHandler}>
                    {this.state.activeReleases ? <ArtistReleaseList play={this.playTrack} releases={this.state.activeReleases} artist={this.state.activeReleasesArtist}/> : null}
                </Modal>
                <Modal show={this.state.showSetsModal} modalClosed={this.modalCancelHandler}>
                    {this.state.activeSets ? <ArtistSetsMap lat={this.props.location.latitude} lon={this.props.location.longitude} sets={this.state.activeSets} artist={this.state.activeSetsArtist}/> : null}
                </Modal>

                {!this.props.dashboard.follows ?
                    <img className={styles.loader} src={loader}/> :
                    <FollowGrid
                        items={this.props.dashboard.follows}
                        showNewReleases={this.newReleasesHandler}
                        showSetMap={this.setMapHandler}
                    >
                    </FollowGrid>
                }

            </div>
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
     getUserFollows})(Dashboard);