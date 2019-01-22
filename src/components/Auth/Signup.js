import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/Index';
import {renderTextInputField,
    renderPasswordInputField,
    renderEmailInputField} from '../Layout/FormInputs'
import {toastr} from "react-redux-toastr";

import {langs} from '../../config/localization';
import {Loader} from "../Common/Loader";

class Signup extends Component {

    /**
     * Class constructor
     * @param props
     */
    constructor (props) {
        super(props);

        //Keep values in state
        this.state = {
            fullname    : this.props.initialValues.name,
            email       : this.props.initialValues.email,
            showLoader  : false
        };

        //Bind the event handlers
        this.handleNameChange   = this.handleNameChange.bind(this);
        this.handleEmailChange  = this.handleEmailChange.bind(this);
    }

    /**
     * Submit signup form
     * @param values
     */
    onSubmit(values){
        this.setState({showLoader : true});

        //Call the register user action
        this.props.registerUser(values, (response)=>{
            this.setState({showLoader : false});
            if(response.status === 200){
                toastr.success(langs.success, langs.messages.registration_success);

                //Delay the page redirection for 1 second to show toastr message
                setTimeout(function() {
                    window.location.assign('/login');
                }.bind(this), 1000);
            }else {
                if(response.status == 400 && response.data.code == 406) {
                    toastr.error(langs.error, response.data.message);
                } else {
                    toastr.error(langs.error, langs.messages.default_error);
                }
            }
        });
    }

    /**
     * Handle name change
     * @param e
     */
    handleNameChange(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    /**
     * Handle email change
     * @param e
     */
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    renderPasswordField() {
        return (
            <Field
                name="password"
                label={langs.password}
                component={renderPasswordInputField}
            />
        );
    }

    renderConfirmPasswordField() {
        return (
            <Field
                name="confirm_password"
                label={langs.confirm_password}
                component={renderPasswordInputField}
            />
        );
    }

    /**
     * Render signup form
     * @returns {*}
     */
    render(){
        const {handleSubmit} = this.props;

        if(!this.state.showLoader) {
            return (
                <div className="row">
                    <div className="columns medium-8 medium-centered">
                        <form noValidate className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="login-card-box">
                                <label>&nbsp;</label>
                                <a href="/login" className="back-to-login"><i className="icon-ic-back-black"></i></a>
                                <div className="login-form">
                                    <Field
                                        name="first_name"
                                        label="First Name"
                                        component={renderTextInputField}
                                    />
                                    <Field
                                        name="last_name"
                                        label="Last Name"
                                        component={renderTextInputField}
                                    />
                                    <Field
                                        name="username"
                                        label={langs.username}
                                        component={renderTextInputField}
                                        maxLength="20"
                                    />
                                    <Field
                                        name="email"
                                        label={langs.email}
                                        component={renderEmailInputField}
                                        onChange={this.handleEmailChange}
                                    />

                                    {this.renderPasswordField()}
                                    {this.renderConfirmPasswordField()}
                                </div>
                                <button type="submit" className="login-form-footer cta-signup">
                                    <span>{langs.create_an_account}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return <Loader/>
        }
    }
}

/**
 * Form validation
 * @param values
 * @returns {{}}
 */
function validate(values){
    let errors = {};

    if(!values.first_name){
        errors.first_name = "Please enter your first name";
    }

    if(values.first_name && /^[a-zA-Z ]{1,}$/.test(values.first_name) == false){
        errors.first_name = "Invalid firstname. Firstname can have alphabets and space only.";
    }

    if(!values.last_name){
        errors.last_name = "Please enter your last name";
    }

    if(values.last_name && /^[a-zA-Z ]{1,}$/.test(values.last_name) == false){
        errors.last_name = "Invalid lasttname. Lastname should have alphabets and space only.";
    }

    if(!values.username){
        errors.username = langs.validation_messages.username_required;
    }

    if(values.username && /^[a-z]{8,20}$/.test(values.username) == false){
        errors.username = "Invalid username, only alphabets are allowed and should be 8-20 characters long";
    }

    if(!values.email){
        errors.email = langs.validation_messages.email_required;
    }

    if (values.email && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email) == false){
        errors.email = langs.validation_messages.email_pattern;
    }

    if(!values.password){
        errors.password = langs.validation_messages.password_required;
    }

    if(values.password && (values.password.length < 8 || values.password.length > 32)){
        errors.password = langs.validation_messages.password_length;
    }

    if(!values.confirm_password){
        errors.confirm_password = langs.validation_messages.confirm_password_required;
    }

    if(values.password && values.confirm_password && values.password !== values.confirm_password){
        errors.confirm_password = langs.validation_messages.password_confirm_password;
    }

    return errors;
}

const mapStateToProps = ({auth}) => {
    const {fullname, email, facebookAccessToken, googleAccessToken} = auth;

    //Keep values in initial values object to be passed on form submit
    return  {
        initialValues : {
            name                        : fullname,
            email                       : email,
            facebookAccessTokenInternal : facebookAccessToken,
            googleAccessTokenInternal   : googleAccessToken
        }
    };
};

//Connect action to component
export default connect(mapStateToProps,
    {registerUser}
)(reduxForm({
    form: 'SignUpForm',
    validate: validate,
})(Signup));
