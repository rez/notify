import React from 'react';
import {withAuth} from './PrivateRoute';
import { Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as fixtures from '../../data/fixtures';
import {BrowserRouter, Route} from 'react-router-dom';
import configureStore from 'redux-mock-store'
import DashboardContainer from '../../containers/Dashboard/DashboardContainer'
import {defaultState} from '../../store/reducers/dashboard/initialState';
const mockStore = configureStore()

const props = {
    releases : fixtures.releases,
    artist : "Joe Jon James",
    play: stub()
}; 

describe('Private Route HOC', () => {

    const store = mockStore({dashboard:fixtures.dashboard, auth : {fetching : true}});
    const wrapper = shallow(<Provider store={store}><PrivateRoute  /></Provider>);

    it('should render dashboard', () => {
        expect(wrapper.find('Dashboard').exists()).toBE(true);
    });
   
});