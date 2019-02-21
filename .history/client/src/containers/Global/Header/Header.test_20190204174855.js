import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import { Provider} from 'react-redux';
import {HeaderContainer} from './Header';
import {BrowserRouter} from 'react-router-dom';
import defaultState from '../../../store/reducers/auth/initialState';
import configureStore from 'redux-mock-store'
const mockStore = configureStore()
const props = {
    sticky : false,
    mounted : false,
    getMeasure : stub(),
    auth : {}
}; 
describe('HeaderContainer', () => {

    it('render component', () => {
        let header = shallow(<HeaderContainer {...props} />)
       expect(header.find('div').length).toEqual(1);
       expect(header.find('Header').length).toEqual(1);
       expect(header.state("mounted")).toBe(false);
    }); 
    it('should update mount state and call measure on mounting', () => {
        let header = shallow(<HeaderContainer {...props} />)
        header.instance().componentDidMount();
        expect(header.state("mounted")).toBe(true);
        expect(props.getMeasure.calledOnce).toBe(true);
    });
    it("should set ref", () => {
        const store = mockStore({auth : {auth :{ spotifyID : 123}}});
        let header = mount(<Provider store={store}><BrowserRouter><HeaderContainer {...props} /></BrowserRouter></Provider>)
        console.log(header.debug());
        const spy = spyOn(header.find('HeaderContainer').instance(), "setRef");
        //header.find('HeaderContainer').instance().setRef();
        header.find('HeaderContainer').instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
    });
});