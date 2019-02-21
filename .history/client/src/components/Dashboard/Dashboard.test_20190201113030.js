import React from 'react';
import {mount} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../data/fixtures'
import Dashboard from './Dashboard';

const props = {
    modalCancelHandler : fixtures.releases,
    showReleasesModal : "Joe Jon James",
    playTrack: stub(),
    activeReleases: stub(),
    activeSets: stub(),
    dashboard: stub(),
    newReleasesHandler: stub(),
    setMapHandler: stub(),
    scrollHandler: stub(),
    windowOffset: stub(),
    basePath: stub(),
    activeReleasesArtist: stub(),
    activeSetsArtist: stub(),
    location: stub(),
    navFilters: stub(),
    timeHandler: stub(),
    artistMostPlayed: stub(),
    artistFollowed: stub(),
};
describe('Dashboard', () => {

    let artistList = shallow(<Dashboard {...props} />)

    it('render dashboard', () => {
        expect(artistList.find('div').exists()).toBe(true);
    });


});