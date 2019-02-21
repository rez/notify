import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import {HeaderContainer} from './Header';


const props = {
    sticky : false,
    mounted : false,
    getMeasure : stub()
}; 
describe('HeaderContainer', () => {
    
    let header = shallow(<HeaderContainer {...props} />)
    
    it('render component', () => {
       expect(header.find('div').length).toEqual(1);
       expect(header.find('Header').length).toEqual(1);
       expect(header.state("mounted")).toBe(false);
    }); 
    it('should update mount state and call measure on mounting', () => {
        header.instance().componentDidMount();
        expect(header.state("mounted")).toBe(true);
        expect(props.getMeasure.calledOnce).toBe(true);
    });
    it("should set ref", () => {
        const spy = spyOn(header.instance(), "setRef");
        expect(spy).toHaveBeenCalled();
    });
});