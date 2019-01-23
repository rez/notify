import React from 'react';
import styles from './Dashboard.module.css';
import PropTypes from 'prop-types';
import Modal from '..//UI/Modal/Modal';
import Loader from '../UI/Loader/Loader'
import ArtistReleaseList from "..//Artist/ArtistReleaseList/ArtistReleaseList";
import ArtistSetsMap from "../Artist/ArtistSetsMap/ArtistSetsMap";
import ArtistGrid from '../Artist/ArtistGrid/ArtistGrid.js';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import FilterNav from '../FilterNav/FilterNav';
import loader from '../UI/Loader/images/loader.gif';
import * as constants from '../../constants/constants';



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
    scrollHandler : PropTypes.func.isRequired,
    activeReleasesArtist :PropTypes.string.isRe4quired,
    basePath :PropTypes.string.isRequired,
    activeSetsArtist : PropTypes.string.isRequired,
    location : PropTypes.shape({}).isRequired,
    navFilters :PropTypes.array.isRequired,
};

const Dashboard = ({
    modalCancelHandler,
    scrollHandler,
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
    location,
    navFilters,
    basePath
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
            <FilterNav basePath={basePath} active={dashboard.activeGrid} navFilters={navFilters} />
            <InfiniteScroll   onScroll={scrollHandler}>
            {dashboard.follows.length ?
                    <ArtistGrid
                        show={dashboard.activeGrid === constants.FOLLOWING ? true : false}
                        items={dashboard.follows}
                        showNewReleases={newReleasesHandler}
                        showSetMap={setMapHandler}
                    >
                    </ArtistGrid>
                : null

            }
            {dashboard.mostPlayed.length ?
                    <ArtistGrid
                        show={dashboard.activeGrid === constants.MOST_PLAYED_ARTIST ? true : false}
                        items={dashboard.mostPlayed}
                        showNewReleases={newReleasesHandler}
                        showSetMap={setMapHandler}
                    >
                    </ArtistGrid>
               : null
            }
            </InfiniteScroll>
            {dashboard.fetching ? <Loader/> : null}

        </div>
    )
};

Dashboard.propTypes = propTypes;

export default Dashboard;