import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {resetPassword} from '../../actions/Index';
import {renderTextInputField, renderPasswordInputField} from '../Layout/FormInputs'
import {toastr} from "react-redux-toastr";
import {langs} from "../../config/localization";

class ResetPassword extends Component {
    /**
     * Class constructor
     * @param props
     */
    constructor(props){
        super(props);

        //Get password reset token from url
        const qString = new URLSearchParams(location.search);
        const token = qString.get('token');

        //Assign token to class property
        this.passwordResetToken = token;
    }

    /**
     * Page load and component mount
     */
    componentWillMount(){
        //If page url does not contain the reset password token then redirect user to login page
        if(!this.passwordResetToken || this.passwordResetToken === '') {
            window.location.assign('/login');
        }
    }

    /**
     * Submit reset password form
     * @param values
     */
    onSubmit(values){
        values = {...values, token: this.passwordResetToken};
        //Call the forgot password action
        this.props.resetPassword(values, (response)=>{

            if(response.status === 204){
                //On successful password reset redirect user to login page
                toastr.success(langs.success, langs.messages.reset_password_success);

                //Delay the page redirection for 1 second to show toastr message
                setTimeout(function() {
                    window.location.assign('/login');
                }.bind(this), 1000);
            } else if(response.status === 400){
                toastr.error(langs.error, langs.messages.invalid_reset_password_token);
            } else {
                toastr.error(langs.error, langs.messages.default_error);
            }
        });
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

                    <form noValidate onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                        <div className="login-card-box">
                            <div className="login-form">
                                <p>{langs.reset_your_password}</p>
                                <Field
                                    name="username"
                                    label={langs.username}
                                    component={renderTextInputField}
                                />

                                <Field
                                    name="password"
                                    label={langs.password}
                                    component={renderPasswordInputField}
                                />

                                <Field
                                    name="confirm_password"
                                    label={langs.confirm_password}
                                    component={renderPasswordInputField}
                                />

                                <div className="login-button-wrapper">
                                    <a href="/login" className="back-to-login">
                                        <i className="icon-ic-back-black"></i>
                                    </a>
                                    <button type="submit" className="cta login-submit right"><span>Enviar</span></button>
                                </div>
                            </div>
                            <div className="login-form-footer">
                                <a href="/signup">
                                    <strong>{langs.create_an_account}</strong>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


/*
  @method: validate
  @desc: validating form
*/
function validate(values){
    let errors = {};

    if(!values.username){
        errors.account = langs.validation_messages.username_required;
    }

    if(!values.password){
        errors.password = langs.validation_messages.password_required;
    }

    if(values.password && (values.password.length < 6 || values.password.length > 32)){
        errors.password = langs.validation_messages.password_length;
    }

    if(values.password && values.confirm_password && values.password !== values.confirm_password){
        errors.confirm_password = langs.validation_messages.password_confirm_password;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ResetPassword'
})(
    connect(null,{resetPassword})(ResetPassword)
);
