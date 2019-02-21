import React from 'react';
import styles from './Dashboard.module.css';
import PropTypes from 'prop-types';
import Modal from '..//UI/Modal/Modal';
import Loader from '../UI/Loader/Loader'
import ArtistReleaseList from "..//Artist/ArtistReleaseList/ArtistReleaseList";
import ArtistSetsMap from "../Artist/ArtistSetsMap/";
import ArtistGrid from '../Artist/ArtistGrid/ArtistGrid.js';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import FilterNav from '../FilterNav/FilterNav';
import loader from '../UI/Loader/images/loader.gif';
import * as constants from '../../constants/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {dropOptions} from "./DropdownOptions";

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
    windowOffset : PropTypes.string.isRequired,
    activeReleasesArtist :PropTypes.string.isRequired,
    basePath :PropTypes.string.isRequired,
    activeSetsArtist : PropTypes.string.isRequired,
    location : PropTypes.shape({}).isRequired,
    navFilters :PropTypes.array.isRequired,
    timeHandler : PropTypes.func.isRequired,
    artistMostPlayed : PropTypes.array.isRequired,
    artistFollowed : PropTypes.array.isRequired,
    onAlert : PropTypes.func.isRequired
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
    basePath,
    timeHandler,
    artistMostPlayed,
    artistFollowed,
    windowOffset,
    onAlert
}) => {

    return (
        <div className={styles.dashWrapper}>
            <Modal offset={windowOffset} show={showReleasesModal} modalClosed={modalCancelHandler}>
                {activeReleases ?
                    <ArtistReleaseList play={playTrack} releases={activeReleases} artist={activeReleasesArtist}/> :
                    null}
            </Modal>
            <Modal offset={windowOffset} show={showSetsModal} modalClosed={modalCancelHandler}>
                {activeSets ?
                    <ArtistSetsMap onAlert={onAlert} lat={location.latitude} lon={location.longitude} sets={activeSets} artist={activeSetsArtist}/> :
                    null}
            </Modal>
            <FilterNav basePath={basePath} active={dashboard.activeGrid} navFilters={navFilters} />
            <Dropdown onChange={timeHandler} className={styles.TimeFilter} options={dropOptions} value={dropOptions.find( it => it.value === dashboard.timeSpan)} />
            <InfiniteScroll   onScroll={scrollHandler}>
            {dashboard.follows.length ?
                    <ArtistGrid
                        show={dashboard.activeGrid === constants.FOLLOWING ? true : false}
                        items={artistFollowed}
                        showNewReleases={newReleasesHandler}
                        showSetMap={setMapHandler}
                    >
                    </ArtistGrid>
                : null
            }
            {dashboard.mostPlayed.length ?
                    <ArtistGrid
                        show={dashboard.activeGrid === constants.MOST_PLAYED_ARTIST ? true : false}
                        items={artistMostPlayed}
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