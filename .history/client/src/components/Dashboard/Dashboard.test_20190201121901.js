import React from 'react';
import {mount, shallow} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../data/fixtures'
import {defaultState} from '../../store/reducers/dashboard/initialState';
import Dashboard from './Dashboard';

const props = {
    modalCancelHandler : stub(),
    showReleasesModal : false,
    playTrack: stub(),
    activeReleases:[],
    activeSets: [],
    dashboard: defaultState,
    newReleasesHandler: stub(),
    setMapHandler: stub(),
    scrollHandler: stub(),
    windowOffset: "0",
    basePath: "/dashboard",
    activeReleasesArtist: "",
    activeSetsArtist: "",
    location: {lat:-1,lon : 1},
    navFilters: [],
    timeHandler: stub(),
    artistMostPlayed: [],
    artistFollowed: [],
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
    console.log(dashboard.props());
    it('does render 1 follow grid', () => {
        dashboard.setProps({...props, dashboard : { ...defaultState, follows : fixtures.releases}});
        console.log(dashboard.props())
        expect(dashboard.find('ArtistGrid').length).toEqual();
    });
    // dashboard.setProps({...props, dashboard : { ...dashboard, mostPlayed : fixtures.releases}});
    // it('does render 2 grids', () => {
    //     console.log("what are props" , dashboard.props());
    //     expect(dashboard.find('ArtistGrid').length).toEqual(2);
    // });




});