import * as actions from "./";
import { RESUME, PAUSE, PREVIOUS, PLAY, PLAYING, FETCH_USER,GET_USER_MOST_PLAYED, FETCH_USER_IN_PROGRESS, UPDATE_ACTIVE_FILTER, SET_TIME_SPAN, FETCH_REQUEST, GET_USER_FOLLOWS, UPDATE_TIMER, NEXT, FETCH_DEVICES, UPDATE_TRACK_INFO } from "./ActionTypes";
import * as fixtures from "../../data/fixtures";
jest.unmock('redux-mock-store')
jest.unmock('redux-thunk')
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import * as constants from "../../constants/constants";
import * as TimeConstants from "../../constants/TimeConstants";
import {defaultState as defaultDashState}  from "../../store/reducers/dashboard/initialState";
import {defaultState as defaultPlayerState}  from "../../store/reducers/player/initialState";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('actions', () =>{

    describe("non asyncronous actions for dashboard", () => {
        it("creates action to updateActiveFilter", () => {
            const expectedAction = {
                type : UPDATE_ACTIVE_FILTER,
                filter : constants.FOLLOWING
            };
            expect(actions.updateActiveFilter(constants.FOLLOWING)).toEqual(expectedAction);
        });
        it("creates action to set time spand", () => {
            const expectedAction = {
                type : SET_TIME_SPAN,
                timeSpan : TimeConstants.TIME_MONTH
            };
            expect(actions.setTimeSpan(TimeConstants.TIME_MONTH)).toEqual(expectedAction);
        });
    });
    describe("non async actions for player", () =>{
        const expectedAction = {
            type : UPDATE_TIMER,
            duration : 1000,
            progress : 0
        };
        it("updates player progress", () =>{
            expect(actions.onProgress(0,1000)).toEqual(expectedAction);
        });
    });
    beforeEach(function () {
        moxios.install();
      });
    
    afterEach(function () {
        moxios.uninstall();
    });
    describe("async actions for dashboard", () =>{ 
        it("play a track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: PLAY }
               ];
               return store.dispatch(actions.playTrack(fixtures.release,false,false,null)).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("play previous track track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: PREVIOUS }
               ];
               return store.dispatch(actions.previousTrack()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("resume track track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: RESUME }
               ];
               return store.dispatch(actions.resumeTrack()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("play previous track track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: PAUSE }
               ];
               return store.dispatch(actions.pauseTrack()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("play previous track track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: NEXT }
               ];
               return store.dispatch(actions.nextTrack()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("play previous track", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200});
              })
            const store = mockStore({})
             const expectedActions = [
                 { type: NEXT }
               ];
               return store.dispatch(actions.nextTrack()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("fetch devices", () => {
            moxios.stubRequest('/api/devices',{status : 200, response : fixtures.devices});
        
            const store = mockStore({player : defaultPlayerState})
             const expectedActions = [
                { type: FETCH_DEVICES,
                    devices : fixtures.devices.devices,
                    active_device : fixtures.devices.devices[0]
                 }
               ];
               return store.dispatch(actions.fetchDevices()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
        it("fetch devices", () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({status: 200, response  : fixtures.playerState});
              });
           // moxios.stubRequest('https://api.spotify.com/v1/me/player',{status : 200, response : fixtures.playerState});
        
            const store = mockStore({player : defaultPlayerState})
             const expectedActions = [
                { type: UPDATE_TRACK_INFO,
                    payload : {
                        id : fixtures.playerState.item.uri,
                        track : fixtures.playerState.item,
                        state : fixtures.playerState.is_playing ? PLAYING : PAUSE,
                        duration : fixtures.playerState.item.duration_ms,
                        progress : fixtures.playerState.progress_ms,
                        active_device : fixtures.playerState.device.id,

                    }
                 }
               ];
               return store.dispatch(actions.requestPlayerState()).then(() => {
                 expect(store.getActions()).toEqual(expectedActions);
               });
        });
    });
    describe("async actions for dashboard", () =>{
        it("get most played items", async () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                  status: 200,
                  response: fixtures.releases
                });
              })
            const store = mockStore({dashboard : defaultDashState})
            const expectedActions = [
                { type: FETCH_REQUEST }, 
                { type: GET_USER_MOST_PLAYED, data:  fixtures.releases },
              ];
              return store.dispatch(actions.getUserMostPlayed(-1,-1)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
              });
        });
        
        it("get following items", async () => {
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                  status: 200,
                  response: fixtures.releases
                });
              })
            const store = mockStore({dashboard : defaultDashState})
           // store.setState({dashboard : defaultDashState});
            const expectedActions = [
                { type: FETCH_REQUEST }, 
                { type: GET_USER_FOLLOWS, data:  fixtures.releases },
              ];
              return store.dispatch(actions.getUserFollows(-1,-1)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
              });
        });
    });
    it('action creator checking current user', async () =>{
        moxios.stubRequest('/api/current_user',{status : 200, response : fixtures.user});
        const store = mockStore({})
        const expectedActions = [
            { type: FETCH_USER_IN_PROGRESS },
            { type: FETCH_USER, payload:  fixtures.user },
          ];
          return store.dispatch(actions.fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
}); 