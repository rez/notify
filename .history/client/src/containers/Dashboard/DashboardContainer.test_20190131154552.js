import React from 'react';
import { Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as fixtures from '../../data/fixtures';
import {stub} from 'sinon';
import configureStore from 'redux-mock-store'
import {DashboardContainer} from '../../containers/Dashboard/DashboardContainer'
import {defaultState} from '../../store/reducers/dashboard/initialState';
const mockStore = configureStore()

const props = {
    playTrack : stub(),
    windowOffset : "0",
    location: {},
    artistMostPlayed : [],
    artistFollowed : []
}; 

describe('Private Route HOC', () => {

    const store = mockStore({dashboard:fixtures.dashboard, auth : {fetching : true}});
    const wrapper = shallow(<DashboardContainer {...props} dashboard={defaultState} />);

    it('should render dashboard', () => {
        expect(wrapper.find('Dashboard').exists()).toBe(true);
    });

    it('handle artist release clicked', () => {
        wrapper.instance().newReleasesHandler("Testy testerson", fixtures.releases[0].releases);
        console.log(wrapper.state());
        expect(wrapper.state().activeReleases).toEqual(fixtures.releases[0].releases);
        expect(wrapper.state().activeReleasesArtist).toEqual("Testy testerson");
        expect(wrapper.state().showSetsModal).toEqual(false);
        expect(wrapper.state().showReleasesModal).toEqual(true);

    });
   
});