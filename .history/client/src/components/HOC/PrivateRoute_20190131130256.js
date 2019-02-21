import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {connect} from "react-redux";

export const withAuth  =(WrappedComponent) => {

     class PrivateRoute extends Component {
        render(){
            return (
                <div>
                  
                </div>
            )
        }
    }
    function mapStateToProps({auth}) {
        return { auth };
    }
    return connect(mapStateToProps)(PrivateRoute);
};
export default withAuth;