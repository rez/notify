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
describe('Private Route HOC', () => {

    it('should not render while fetching', () => {
        const store = mockStore({auth : {fetching : true}});
        const PrivateRoute = withAuth(DashboardContainer);
        const wrapper = shallow(<Provider store={store}><PrivateRoute  /></Provider>);
        expect(wrapper.html()).toEqual("<div></div>");
    });
    it('should redirect if not logged in', () => {
        const store = mockStore({auth : {fetching : false}});
        const PrivateRoute = withAuth(DashboardContainer);
        const wrapper = mount(<Provider store={store}><BrowserRouter><PrivateRoute  /></BrowserRouter></Provider>);
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    it('should load protected page if logged in', () => {
        const store = mockStore({dashboard:fixtures.dashboard, auth : {fetching : false, auth : fixtures.user}});
        const PrivateRoute = withAuth(DashboardContainer);
        const wrapper = shallow(<Provider store={store}><PrivateRoute  /> </Provider>);
        console.log(wrapper.find("ContextProvider"));  
        //expect(wrapper.find("DashboardContainer").length).toEqual(1);
       // expect(wrapper.find('Redirect').exists()).toBe(true);
    });
});