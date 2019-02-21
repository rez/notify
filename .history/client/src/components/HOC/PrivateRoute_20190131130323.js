import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {connect} from "react-redux";

export const withAuth  =(WrappedComponent) => {

     class PrivateRoute extends Component {
        render(){
            return (
                <div>
                    {!this.props.auth.fetching   ?
                        this.props.auth.auth && this.props.auth.auth.spotifyID ?
                                <WrappedComponent
                                    {...this.props}
                                />
                             :
                                <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
                        : null }
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