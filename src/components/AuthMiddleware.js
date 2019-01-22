import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router'
import _ from 'lodash';
import {reactLocalStorage} from 'reactjs-localstorage';
import {isUserLoggedIn} from "../actions/Common";

export default function(ComposedComponent, isGuestPages) {
    class AuthMiddleware extends Component {
        //Get the route properties via context
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if(this.props.authenticated && isGuestPages) {
                //If logged in user tries to go to guest pages (login, signup, forgot-password and reset-password) then redirect him to home page
                window.location.assign('/');
                return false;
            } else if(!this.props.authenticated && isGuestPages == undefined) {
                //If non logged in user to go to the pages which requires authentication then redirect him to login page
                window.location.assign('/login');
                return false;
            }
        }

        render() {
            //Render the component with all props
            return <ComposedComponent {...this.props} />
        }
    }

    /**
     * Assign user's authentication status
     * @returns {{authenticated: *}}
     */
    function mapStateToProps() {
        let isAuthenticated;

        //if(!_.isEmpty(reactLocalStorage.getObject("user_auth_details"))) {
        if(isUserLoggedIn()) {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }

        return {
            authenticated: isAuthenticated
        }
    }

    return connect(mapStateToProps)(AuthMiddleware);
}