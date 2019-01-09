import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as  actions from '../store/actions';

import Landing from './Landing/Landing';
import Header from './Global/Header/Header';
import Dashboard from "./Dashboard/Dashboard";
import Player from "./Global/Player/Player";

class App extends Component{
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchDevices();
    }

    render(){
        return (
            <div>
                <BrowserRouter>
                    <div style={{'marginBottom' : '100px'}} className="siteWrap">
                    <Header/>
                        <div className="container">
                            <Route path="/" exact component={Landing} />
                            <Route path="/dashboard" exact component={Dashboard} />
                        </div>
                        <Player/>
                    </div>
                </BrowserRouter>
            </div>

     );
    }
};

export default  connect(null,actions)(App);