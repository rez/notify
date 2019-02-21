import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import { Provider} from 'react-redux';
import {HeaderContainer} from './Header';
import defaultState from '../../../store/reducers/auth/initialState';
import configureStore from 'redux-mock-store'
const mockStore = configureStore()
const props = {
    sticky : false,
    mounted : false,
    getMeasure : stub()
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
        const store = mockStore({auth : {auth : {fetching : false}}});
        let header = mount(<Provider store={store}><HeaderContainer {...props} /></Provider>)
        const spy = spyOn(header.instance(), "setRef");
        expect(spy).toHaveBeenCalled();
    });
});