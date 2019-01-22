import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {forgotPassword} from '../../actions/Index';
import {renderEmailInputField} from '../Layout/FormInputs'
import {toastr} from "react-redux-toastr";
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID} from '../../config/config';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {langs} from '../../config/localization';
import {updateUserDetailsLocalStorage} from "../../actions/Common";

class ForgotPassword extends Component {
    /**
     * Submit forgot password form
     * @param values
     */
    onSubmit(values){
        //Call the forgot password action
        this.props.forgotPassword(values, (response)=>{
            if(response != undefined){
                if(response.status == 202) {
                    //On successful forgot request redirect user to reset password page
                    toastr.success(langs.success, langs.messages.forgot_password_success);

                    //Delay the page redirection for 1 second to show toastr message
                    setTimeout(function () {
                        window.location.assign('/login');
                    }.bind(this), 3000);
                } else {
                    //Show default error response
                    toastr.error(langs.error, langs.messages.default_error);
                }
            }
        });
    }

    /**
     * Get login response from facebook
     * @param response
     */
    responseFacebook(response) {
        if(response.accessToken) {
            const values = {
                access_token: response.accessToken,
                full_name   : response.name != undefined ? response.name : '',
                email       : response.email != undefined ? response.email : '',
            };

            //Call facebook login action
            this.props.fbLogin(values, (response) => {
                if (response.status === 200) {
                    //On successful login store response data in local storage
                    //reactLocalStorage.setObject("user_auth_details", response.data);
                    updateUserDetailsLocalStorage(response.data);
                    window.location.assign('/');
                } else {
                    if (response.status === 403 && response.data.code === 'login-error') {
                        toastr.success(langs.success, langs.messages.facebook_google_login_failure);

                        //Delay the page redirection for 1 second to show toastr message
                        setTimeout(function() {
                            this.props.history.push('/signup');
                        }.bind(this), 1000);
                    } else {
                        toastr.error(langs.error, langs.messages.default_error);
                    }
                }
            });
        }
    }

    /**
     * Get login response from google
     * @param response
     */
    responseGoogle(response) {
        if(response.tokenObj.access_token) {
            const values = {
                access_token: response.tokenObj.access_token,
                full_name   : response.profileObj.name != undefined ? response.profileObj.name : '',
                email       : response.profileObj.email != undefined ? response.profileObj.email : '',
            };
            //Call google login action
            this.props.gLogin(values, (response) => {
                if (response.status === 200) {
                    //On successful login store response data in local storage
                    //reactLocalStorage.setObject("user_auth_details", response.data);
                    updateUserDetailsLocalStorage(response.data);
                    window.location.assign('/');
                } else {
                    if (response.status === 403 && response.data.code === 'login-error') {
                        toastr.success(langs.success, langs.messages.facebook_google_login_failure);

                        //Delay the page redirection for 1 second to show toastr message
                        setTimeout(function() {
                            this.props.history.push('/signup');
                        }.bind(this), 1000);
                    } else {
                        toastr.error(langs.error, langs.messages.default_error);
                    }
                }
            });
        }
    }

    /**
     * Render the reset password form
     * @returns {*}
     */
    render(){
        const {handleSubmit} = this.props;
        return(
            <div className="row">
                <div className="columns medium-8 medium-centered">
                    <form noValidate className="form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                        <div className="login-card-box">
                            <div className="login-form">
                                <div className="login-with-buttons">
                                    <FacebookLogin
                                        appId={FACEBOOK_APP_ID}
                                        fields="name,email"
                                        cssClass="cta-facebook cta"
                                        textButton=""
                                        callback={this.responseFacebook.bind(this)}
                                    >
                                        <a href="javascript:void(0)" className="cta-facebook cta">
                                            <i className="icon-ic-facebook"></i> <span>{langs.continue_with_facebook}</span>
                                        </a>
                                    </FacebookLogin>
                                    <GoogleLogin
                                        clientId={GOOGLE_CLIENT_ID}
                                        buttonText=""
                                        className="cta-google cta"
                                        onSuccess={this.responseGoogle.bind(this)}
                                        onFailure={this.responseGoogle.bind(this)}
                                    >
                                        <i className="icon-ic-google"></i> <span>{langs.continue_with_google}</span>
                                    </GoogleLogin>
                                </div>

                                <p className="p-r10">{langs.send_new_password_label}.</p>

                                <Field
                                    name="account"
                                    label={`${langs.email} / ${langs.username}`}
                                    component={renderEmailInputField}
                                />

                                <div className="login-button-wrapper">
                                    <a href="/login" className="back-to-login"><i className="icon-ic-back-black"></i></a>
                                    <button type="submit" className="cta login-submit right"><span>{langs.submit}</span></button>
                                </div>
                            </div>
                            <div className="login-form-footer">
                                <a href="/signup"><strong>{langs.create_an_account}</strong></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

/**
 * Form Validations
 * @param values
 * @returns {{}}
 */
function validate(values){
    let errors = {};

    if(!values.account){
        errors.account = langs.validation_messages.email_username_required;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ForgotPassword'
})(
    connect(null, {forgotPassword})(ForgotPassword)
);
