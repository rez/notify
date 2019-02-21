import React from 'react';
import {mount, shallow} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../data/fixtures'
import {defaultState} from '../../store/reducers/dashboard/initialState';
import Dashboard from './Dashboard';

const props = {
    modalCancelHandler : fixtures.releases,
    showReleasesModal : "Joe Jon James",
    playTrack: stub(),
    activeReleases:[],
    activeSets: [],
    dashboard: defaultState,
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

    let dashboard = shallow(<Dashboard {...props} />)

    it('render dashboard', () => {
        expect(dashboard.find('div').exists()).toBe(true);
    });
    it('renders modals', () => {
        console.log(dashboard.debug())
        expect(dashboard.find('Modal').length).toEqual(2);
    });
    it('renders Filter Nav', () => {
        console.log(dashboard.debug())
        expect(dashboard.find('FilterNav').exists).toBe(true);
    });


});