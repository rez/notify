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
        console.log(wrapper.debug());
        expect(wrapper.find('Dashboard').exists()).toBe(true);
    });

    it('handle artist release clicked', () => {
        console.log(wrapper.instance.newReleasesHandler);
        wrapper.instance.newReleasesHandler("Testy testerson", fixtures.releases[0].releases);
        expect(wrapper.instance.newReleasesHandler.calledOnce).toEqual(true);
    });
   
});