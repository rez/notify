import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import { Provider} from 'react-redux';
import withGeo from './GeoContainer';
import {BrowserRouter} from 'react-router-dom';
import defaultState from '../../../store/reducers/auth/initialState';
import configureStore from 'redux-mock-store'
import Landing from '../../../containers/Landing/Landing';
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const props = {
    getLocation : stub()
}
describe('GeoContainer', () => {

    it('render component', () => {
        const store = mockStore({getLocation : stub(), location : {lat : -1, lon : -1}});
        const GeoContainer = withGeo(Landing)
        const landing = mount(<Provider store={store}><GeoContainer /></Provider>)
       expect(landing.find('Landing').length).toEqual(1);
       expect(landing.find('Landing').prop('location')).toEqual({lat : -1, lon : -1});
    }); 
});