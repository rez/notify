import React from 'react';
import styles from './Dashboard.module.css';
import PropTypes from 'prop-types';
import Modal from '..//UI/Modal/Modal';
import ArtistReleaseList from "..//Artist/ArtistReleaseList/ArtistReleaseList";
import ArtistSetsMap from "../Artist/ArtistSetsMap/ArtistSetsMap";
import FollowGrid from '../Follow/FollowGrid.js';
import loader from './images/loader.gif';


const propTypes = {
    modalCancelHandler: PropTypes.func.isRequired,
    showReleasesModal: PropTypes.bool.isRequired,
    showSetsModal: PropTypes.bool.isRequired,
    playTrack: PropTypes.func.isRequired,
    activeReleases: PropTypes.array.isRequired,
    activeSets: PropTypes.array.isRequired,
    dashboard : PropTypes.shape({}).isRequired,
    newReleasesHandler : PropTypes.func.isRequired,
    setMapHandler : PropTypes.func.isRequired,
    activeReleasesArtist :PropTypes.string.isRequired,
    activeSetsArtist : PropTypes.string.isRequired,
    location : PropTypes.shape({}).isRequired,

};

const Dashboard = ({
    modalCancelHandler,
    showReleasesModal,
    showSetsModal,
    playTrack,
    activeReleases,
    activeSets,
    dashboard,
    newReleasesHandler,
    setMapHandler,
    activeReleasesArtist,
    activeSetsArtist,
    location
}) => {

    return (
        <div className={styles.dashWrapper}>

            <Modal show={showReleasesModal} modalClosed={modalCancelHandler}>
                {activeReleases ?
                    <ArtistReleaseList play={playTrack} releases={activeReleases} artist={activeReleasesArtist}/> :
                    null}
            </Modal>
            <Modal show={showSetsModal} modalClosed={modalCancelHandler}>
                {activeSets ?
                    <ArtistSetsMap lat={location.latitude} lon={location.longitude} sets={activeSets} artist={activeSetsArtist}/> :
                    null}
            </Modal>
            {!dashboard.follows.length ?
                <img className={styles.loader} src={loader}/> :
                <FollowGrid
                    items={dashboard.follows}
                    showNewReleases={newReleasesHandler}
                    showSetMap={setMapHandler}
                >
                </FollowGrid>
            }

        </div>
    )
};

Dashboard.propTypes = propTypes;

export default Dashboard;