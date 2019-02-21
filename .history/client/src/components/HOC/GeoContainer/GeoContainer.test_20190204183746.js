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
const props = { getLocation: stub(), location : {lat : -1, lon : -1}};
const props2 = {getLocation : stub()}
describe('GeoContainer', () => {

    it('render component', () => {
        const store = mockStore(props);
        const GeoContainer = withGeo(Landing)
        const landing = mount(<Provider store={store}><GeoContainer {...props2} /></Provider>)
        console.log(landing.debug())
        landing.find("GeoContainer").instance().componentDidMount();
       expect(landing.find('Landing').length).toEqual(1);
       expect(landing.find('Landing').prop('latitude')).toEqual(-1);
       expect(landing.find('Landing').prop('longitude')).toEqual(-1);
    }); 
});