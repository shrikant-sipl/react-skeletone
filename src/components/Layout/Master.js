import React, { Component } from 'react';
import _ from 'lodash';
import { reactLocalStorage } from 'reactjs-localstorage';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import Router from '../../config/router';
import Dropdown from '../Elements/Dropdown';
import { langs } from "../../config/localization";
import { connect } from "react-redux";
import {getAuthUserDetails, getAuthUserFullName, getAuthUserProfilePic, isUserLoggedIn} from "../../actions/Common";

class Layout extends Component {

    /**
     * Logout
     */
    logout = () => {
        reactLocalStorage.clear();
        window.location.assign('/login');
    }

    /**
     * Switch layout based on the current url
     * @returns {*}
     */
    switchLayout() {
        let currentUrl = window.location.href;

        if (currentUrl.includes('login') || currentUrl.includes('signup') || currentUrl.includes('forgot-password') || currentUrl.includes('reset-password')) {
            return (
                <div className="auth-pages">
                    <div className="row">
                        <div className="login-header">
                            <a href="/">Trip Planner</a>
                        </div>
                        <Router />
                    </div>
                    <ReduxToastr
                        timeOut={5000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar />
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <header className="ie-header">
                        <div className="nav-left">
                            <div className="logo">
                                <a href="/">
                                    <span className="p-l15">Trip Planner</span>
                                </a>
                            </div>
                        </div>
                        <div className="nav-right">
                            {this.menuBar()}
                        </div>
                    </header>
                    <Router />
                    <footer className="ie-footer">
                        <div className="row">
                            <div className="footer-top">

                            </div>
                        </div>
                    </footer>
                    <ReduxToastr
                        timeOut={5000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                    />
                </div>
            )
        }
    }

    /**
     * Profile pic HTML
     * @returns {*}
     */
    userIconView() {
        const userFullName = getAuthUserFullName();
        const fullName = userFullName != '' ? userFullName : 'Admin';

        return (
            <span id="menu_profile_pic">{fullName}</span>
        )
    }

    /**
     * Print Notification text and Number of Notification 
     * @returns {*}
     */
    notificationNav() {
        return (
            <span className="item"><span>{langs.notifications}</span>&nbsp;<span className="notification">3</span></span>
        )
    }

    /**
     * Get currently active menu
     * @returns {string}
     */
    getActiveMenu() {
        let currentUrl = window.location.href;
        let activePage = '';

        if (currentUrl == undefined) {
            activePage = 'post';
        }

        return activePage;
    }

    /**
     * Authenticated user's navigation HTML
     * @returns {*}
     */
    authenticatedUserNav() {
        const activePage = this.getActiveMenu();
        return (
            <ul className="navbar">
                {this.commonUserNav()}
                <li className="user-profile">
                    <Dropdown Title={this.userIconView()} ToggleDropdown={false}>
                        <ul className="dropdown-menu-list">
                            <li>
                                <a className="nav-link" href="/edit-profile">{langs.edit_profile}</a>
                                <a className="nav-link" onClick={this.logout.bind(this)} href="javascript:void(0);">{langs.logout}</a>
                            </li>
                        </ul>
                    </Dropdown>
                </li>
            </ul>
        );
    }

    /**
     * Common navigation HTML for both authneticated and non authenticated users
     * @returns {*}
     */
    commonUserNav() {
        const activePage = this.getActiveMenu();
        return (
            <ul className="navbar">
                <li><a href="/" className={activePage === 'post' ? 'active nav-link' : 'nav-link'}>Post</a></li>
                {this.unAuthenticatedUserNav()}
            </ul>
        );
    }

    /**
     * Unauthenticated user's navigation HTML
     * @returns {*}
     */
    unAuthenticatedUserNav() {
        if (!isUserLoggedIn()) {
            const activePage = this.getActiveMenu();
            return (
                <li><a href="/login" className={activePage === 'login' ? 'active nav-link' : 'nav-link'}>{langs.login_for_nav}</a></li>
            );
        }
    }

    /**
     * Prepare menu bar html
     * @returns {*}
     */
    menuBar() {
        //if (!_.isEmpty(reactLocalStorage.getObject("user_auth_details"))) {
        if (isUserLoggedIn()) {
            return this.authenticatedUserNav();
        } else {
            return this.commonUserNav();
        }
    }

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        return (
            this.switchLayout()
        );
    }
}

//Connect action to component
export default connect(null)(Layout)
