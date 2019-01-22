import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import { renderEmailInputField, renderTextInputField } from '../Layout/FormInputs';
import { langs } from "../../config/localization";
import {
    getAuthToken
} from "../../actions/Common";
import { Loader } from "../Common/Loader";

import { editProfile, getProfileDetailsLocalStorage, changePassword, updateProfilePic } from "../../actions/UserAction";

class EditProfile extends Component {
    /**
     * Class constructor
     * @param props
     */
    constructor(props) {
        super(props);

        //Keep values in state
        this.state = {
            showLoader: false,
        };
    }

    componentWillMount() {
        //Call the get all courses action
        this.props.getProfileDetailsLocalStorage();
    }

    /**
     * Submit edit profile form
     * @param values
     */
    onSubmit(values) {
        this.setState({ showLoader: true });

        //Call the edit profile action
        this.props.editProfile(values, this.props.initialValues.id, (response) => {
            if (response != undefined) {
                this.setState({ showLoader: false });

                if (response.status == 200) {
                    const responseData = response.data;
                    responseData.token = getAuthToken();
                    //On successful profile update store response data in local storage
                    //updateUserDetailsLocalStorage(responseData);

                    toastr.success(langs.success, langs.messages.profile_update_success);
                } else if (response.status == 401) {
                    toastr.error(langs.error, langs.messages.unauthenticated_user);
                } else if (response.status == 404) {
                    toastr.error(langs.error, langs.messages.resource_not_found);
                } else {
                    toastr.error(langs.error, langs.messages.default_error);
                }
            }
        });
    }

    /**
     * Edit profile form
     * @returns {*}
     */
    editProfileForm() {
        const { handleSubmit } = this.props;

        return (
            <form name="EditProfileForm" noValidate className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h5 className="page-title uc">{langs.edit_profile}</h5>
                <div className="row">
                    <div className="columns medium-6 m-t30">
                        <Field
                            name="first_name"
                            label="First Name"
                            component={renderTextInputField}
                        />
                    </div>
                    <div className="columns medium-6 m-t30">
                        <Field
                            name="last_name"
                            label="Last Name"
                            component={renderTextInputField}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-6 m-t30">
                        <Field
                            name="username"
                            label={langs.username}
                            component={renderTextInputField}
                            readOnly={true}
                        />
                    </div>
                    <div className="columns medium-6 m-t30">
                        <Field
                            name="email"
                            label={langs.email}
                            component={renderEmailInputField}
                            onChange={this.handleEmailChange}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-centered medium-6 m-t30 p-t30 text-center">
                        <button className="cta cta-large medium-12" type="submit">
                            <span className="uc">{langs.save_profile}</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    render() {
        if (this.props.initialValues != undefined && !this.state.showLoader) {
            return (
                <div className="row">
                    <div className="row">
                        <div className="columns medium-12">
                            <div className="edit-profile">
                                {this.editProfileForm()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }
}

/**
 * Form validation
 * @param values
 * @returns {{}}
 */
function validate(values) {
    let errors = {};

    if(!values.first_name){
        errors.first_name = "Please enter your first name";
    }

    if(!values.last_name){
        errors.last_name = "Please enter your last name";
    }

    return errors;
}

const mapStateToProps = ({ user }) => {
    const {authUserDetails} = user;
    let initialValues       = {};

    if(authUserDetails != undefined) {
        initialValues = {
            id              : authUserDetails.id,
            first_name      : authUserDetails.firstName,
            last_name       : authUserDetails.lastName,
            username        : authUserDetails.username,
            email           : authUserDetails.email
        }
    }

    return {
        initialValues: initialValues
    };
};

export default connect(mapStateToProps, {editProfile, getProfileDetailsLocalStorage})(reduxForm({
    form: 'EditProfileForm',
    validate: validate,
    enableReinitialize: true
})(EditProfile));
