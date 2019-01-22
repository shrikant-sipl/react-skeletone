import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
    login,
    resendConfirmationEmail
} from '../../actions/Index';
import {renderPasswordInputField, renderEmailInputField} from '../Layout/FormInputs'
import {toastr} from 'react-redux-toastr';
import {langs} from '../../config/localization';
import Modal from '../Elements/Modal';
import {updateUserDetailsLocalStorage} from "../../actions/Common";
import {Loader} from "../Common/Loader";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleModal     : false,
            modalType       : '',
            username        : '',
            accessToken     : '',
            tokenType       : '',
            showLoader      : false
        };
    }

    /**
     * Submit the login form
     * @param values
     */
    onSubmit(values){
        this.setState({showLoader : true});
        //Call the login action
        this.props.login(values, (response)=>{
            this.setState({showLoader : false});
            if(response.status === 200){
                updateUserDetailsLocalStorage(response.data);
                window.location.assign('/');
            }else {
                if(response.status === 403) {
                    toastr.error(langs.error, langs.messages.invalid_credentials);
                } else {
                    toastr.error(langs.error, langs.messages.default_error);
                }
            }
        });
    }

    /**
     * Inner html to show in modal
     * @param type
     * @returns {*}
     */
    modalInnerHtml(type) {
        switch (type) {
            case "email-not-confirmed":
                return (
                    <div className="confirm-your-email-popup">
                        <h4>{langs.confirm_email_first}</h4>
                        <button onClick={() => { this.resendConfirmationEmail() }} className="cta medium-12 m-b15">Resend e-mail</button>
                        <button onClick={() => { this.closeModal() }} className="cta medium-12">Cancel</button>
                    </div>
                );
                break;
        }
    }

    /**
     * Resend confirmation email
     */
    resendConfirmationEmail() {
        let values = {};

        if(this.state.username != '') {
            values = {username: this.state.username};
        } else if(this.state.accessToken != '') {
            values = {
                access_token: this.state.accessToken,
                tokenType   : this.state.tokenType
            };
        }

        //Call the resend confirm email action
        this.props.resendConfirmationEmail(values, (response)=>{
            if(response.status === 200){
                this.setState({toggleModal : false});
                toastr.success(langs.success, langs.messages.confirmation_email_sent_success);
            }else {
                toastr.error(langs.error, langs.messages.default_error);
            }
        });
    }

    /**
     * Close modal
     */
    closeModal() {
        this.setState({toggleModal : false});
    }

    /**
     * Render the login form
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
                                <div className="login-form">
                                    <Field
                                        name="username"
                                        label={`${langs.username}`}
                                        component={renderEmailInputField}
                                    />

                                    <Field
                                        name="password"
                                        label={langs.password}
                                        component={renderPasswordInputField}
                                    />

                                    <div className="login-button-wrapper">
                                        <button type="submit" className="cta login-submit right">
                                            <span>{langs.login}</span></button>
                                    </div>
                                </div>
                                <div className="login-form-footer">
                                    <a href="/signup"><strong>{langs.create_an_account}</strong></a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Modal ToggleModal={this.state.toggleModal}>
                        {this.modalInnerHtml(this.state.modalType)}
                    </Modal>
                </div>
            );
        } else {
            return <Loader/>
        }
    }
}

/**
 * Form validations
 * @param values
 * @returns {{}}
 */
function validate(values){
    let errors = {};

    if(!values.username){
        errors.username = langs.validation_messages.email_username_required;
    }

    if(!values.password){
        errors.password = langs.validation_messages.password_required;
    }

    if(values.password && values.password.length > 20){
        errors.password = langs.validation_messages.password_length;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'Login'
})(
    connect(null, {login, resendConfirmationEmail})(Login)
);
