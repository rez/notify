import React, {Component} from 'react';
import {connect} from 'react-redux';
import FollowGrid from '../../components/Follow/FollowGrid.js';
import {playItem} from "../../actions";
import axios from "axios";
import Modal from '../../components/UI/Modal/Modal';
import ArtistReleaseList from "../../components/Artist/ArtistReleaseList/ArtistReleaseList";
import ArtistSetsMap from "../../components/Artist/ArtistSetsMap/ArtistSetsMap";
import {PLAY} from "../../actions/types";

class Dashboard extends Component {
    state = {
        page : 0,
        items : [],
        activeReleasesArtist : null,
        activeSetsArtist : null,
        activeSets : null,
        activeReleases : null,
        showReleasesModal : false,
        showSetsModal : false
    }
    componentDidMount() {
        this.getData();
    }

    playTrack = async (track) => {
        const devices = this.props.player.devices;
        const device = devices.find((device) => {
            return device.is_active;
        })

        if(!device) return;

        console.log(track);

        const res = await axios.post('/api/play', {track : track.uri, device : device.id});
        this.props.onPlay(track);
    }

    newReleasesHandler = (artist, releases) => {
        this.setState({
            activeReleases : releases,
            activeReleasesArtist : artist,
            showReleasesModal : true,
            showSetsModal : false
        });
    }

    setMapHandler = (artist, sets) => {
        this.setState({
            activeSets : sets,
            activeSetsArtist : artist,
            showReleasesModal : false,
            showSetsModal : true
        });
    }

    modalCancelHandler = () => {
        this.setState({
            showReleasesModal : false,
            showSetsModal : false
        })
    }

    getData = async () => {
        try {
            const res = await axios.get('/api/releases');
            if(res){

                const page = this.state.page;
                const items = this.state.items;
                const newItems = res.data;
                this.setState(
                    {
                        page : page + 1,
                        items : [...items, ...newItems]
                    }
                )
            }
        }catch(e){

        }
    }

    render(){
        return (
            <div className='dashWrapper'>
                <Modal show={this.state.showReleasesModal} modalClosed={this.modalCancelHandler}>
                    {this.state.activeReleases ? <ArtistReleaseList play={this.playTrack} releases={this.state.activeReleases} artist={this.state.activeReleasesArtist}/> : null}
                </Modal>
                <Modal show={this.state.showSetsModal} modalClosed={this.modalCancelHandler}>
                    {this.state.activeSets ? <ArtistSetsMap sets={this.state.activeSets} artist={this.state.activeSetsArtist}/> : null}
                </Modal>

                <FollowGrid
                items={this.state.items}
                showNewReleases={this.newReleasesHandler}
                showSetMap={this.setMapHandler}
                >
                </FollowGrid>
            </div>
        );
    }
}

function mapStateToProps({auth, player}) {
    return { auth, player };
}

const mapDispatchToProps = dispatch => {
    return{
        onPlay : (track) => dispatch({type : PLAY , track : track})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);