import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as  actions from '../store/actions';

import Landing from './Landing/Landing';
import Header from './Global/Header/Header';
import Dashboard from "./Dashboard/DashboardContainer";
import withAuth from "../components/HOC/PrivateRoute";
import Player from "./Global/Player/PlayerContainer";
import withGeo from "../components/HOC/GeoContainer/GeoContainer";

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
                            <Route path="/dashboard" exact component={withAuth(withGeo(Dashboard))} />
                            <Route path="/dashboard/:filter"  component={withAuth(withGeo(Dashboard))} />
                        </div>
                        <Player/>
                    </div>
                </BrowserRouter>
            </div>

     );
    }
};

export default  connect(null,actions)(App);