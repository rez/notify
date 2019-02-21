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
        expect(dashboard.find('Modal').length).toEqual(2);
    });
    it('renders Filter Nav', () => {
        expect(dashboard.find('FilterNav').exists()).toBe(true);
    });
    it('renders Dropdown', () => {
        expect(dashboard.find('Dropdown').exists()).toBe(true);
    });
    it('renders Infinite Scroll', () => {
        expect(dashboard.find('InfiniteScroll').exists()).toBe(true);
    });
    it('does not render Follow Grid', () => {
        expect(dashboard.find('ArtistGrid').exists()).toBe(false);
    });
    dashboard.setProps({...props, dashboard : { ...dashboard, follows : fixtures.releases}});
    it('does render 1 follow grid', () => {
        expect(dashboard.find('ArtistGrid').length).toEqual(1);
    });
    // dashboard.setProps({...props, dashboard : { ...dashboard, mostPlayed : fixtures.releases}});
    // it('does render 2 grids', () => {
    //     console.log("what are props" , dashboard.props());
    //     expect(dashboard.find('ArtistGrid').length).toEqual(2);
    // });




});