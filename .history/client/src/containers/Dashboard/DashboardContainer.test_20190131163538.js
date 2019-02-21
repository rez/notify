import React from 'react';
import { Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as fixtures from '../../data/fixtures';
import {stub} from 'sinon';
import configureStore from 'redux-mock-store'
import {DashboardContainer} from '../../containers/Dashboard/DashboardContainer'
import {defaultState} from '../../store/reducers/dashboard/initialState';
import * as TimeConstants from '../../constants/TimeConstants';
import { MOST_PLAYED_ARTIST, MOST_PLAYED_LINK } from '../../constants/constants';
const mockStore = configureStore()

const props = {
    playTrack : stub(),
    windowOffset : "0",
    location: {},
    artistMostPlayed : [],
    artistFollowed : [],
    getUserFollows : stub(),
    getUserMostPlayed : stub()
}; 

describe('Private Route HOC', () => {

    const store = mockStore({dashboard:fixtures.dashboard, auth : {auth : fixtures.user}});
    const wrapper = shallow(<DashboardContainer {...props} auth={{auth : fixtures.user}} dashboard={defaultState} />);

    it('should render dashboard', () => {
        expect(wrapper.find('Dashboard').exists()).toBe(true);
    });

    it('handle artist release clicked', () => {
        wrapper.instance().newReleasesHandler("Testy testerson", fixtures.releases[0].releases);
        expect(wrapper.state().activeReleases).toEqual(fixtures.releases[0].releases);
        expect(wrapper.state().activeReleasesArtist).toEqual("Testy testerson");
        expect(wrapper.state().showSetsModal).toEqual(false);
        expect(wrapper.state().showReleasesModal).toEqual(true);

    });

    it('handle artist sets clicked', () => {
        wrapper.instance().setMapHandler("Testy testerson sets", fixtures.releases[0].sets);
        expect(wrapper.state().activeSets).toEqual(fixtures.releases[0].sets);
        expect(wrapper.state().activeSetsArtist).toEqual("Testy testerson sets");
        expect(wrapper.state().showSetsModal).toEqual(true);
        expect(wrapper.state().showReleasesModal).toEqual(false);

    });
    it('handle modal closed', () => {
        wrapper.instance().modalCancelHandler();
        expect(wrapper.state().showSetsModal).toEqual(false);
        expect(wrapper.state().showReleasesModal).toEqual(false);

    });
    it('handle active filter change', () => {
        wrapper.instance().updateActiveFilter({path : MOST_PLAYED_LINK});
        wrapper.props().navFilters.forEach((item,index) => {
            if(item.path === MOST_PLAYED_LINK) expect(item.active).toBe(true);
            else expect(item.active).toBe(false);
        });
        console.log(props);
    });
    it('handle infinite scroll', () => {
        wrapper.setProps({dashboard : {fetching:false}});
        console.log(wrapper.props().dashboard.fetching)
        wrapper.instance().scrollHandler();
        expect(props.getUserFollows.calledOnce).toBe(true);
        
    });
   
});