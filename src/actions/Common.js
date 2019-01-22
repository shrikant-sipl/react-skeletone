import _ from "lodash";
import {reactLocalStorage} from "reactjs-localstorage";
import {langs} from "../config/localization";
import {
    stripHtml,
    formatVideoDuration, timeAgo, urlify
} from "../utils";
import {DEFAULT_USER_IMAGE} from "../config/config";



/**
 * Check if user is logged in or not
 * @returns {boolean}
 */
export function isUserLoggedIn() {
    //if(!_.isEmpty(reactLocalStorage.getObject("user_auth_details"))) {

    if(!_.isEmpty(getAuthUserDetails())) {
        return true;
    } else {
        return false;
    }
}

/**
 * Get logged in user's auth token
 * @returns {string}
 */
export function getAuthToken() {
    let authToken = '';

    if(isUserLoggedIn()) {
        const user = getAuthUserDetails();
        authToken = user.token;
    }

    return authToken;
}



/**
 * Get logged in user's auth token
 * @returns {string}
 */
export function getAuthUserProfilePic() {
    let profilePic = DEFAULT_USER_IMAGE;

    if(isUserLoggedIn()) {
        /*const avatar = reactLocalStorage.getObject("user_auth_details").avatar;
        const customAvatar = reactLocalStorage.getObject("user_auth_details").customAvatar;*/

        const authUser = getAuthUserDetails();
        const avatar = authUser.avatar;
        const customAvatar = authUser.customAvatar;

        profilePic = getUserCustomAvatar(customAvatar, avatar);
    }

    return profilePic;
}



/**
 * Get user's profile pic
 * @param userImage
 * @returns {*}
 */
export function getUserProfilePic(userImage) {
    return (userImage != '' && userImage != null) ? userImage : DEFAULT_USER_IMAGE;
}



/**
 * Get auth user details
 * @returns {*}
 */
export function getAuthUserDetails() {
    return reactLocalStorage.getObject("user_auth_details");
}

/**
 * Prepare user attributes
 * @param user
 * @returns {{name: string, userImage: string, averageRating: number, followingCount: number, followersCount: number}}
 */
export function userAttributes(user) {

    let attributes = {
        id              : '',
        firstName       : '',
        lastName        : '',
        fullName        : '',
        username        : '',
        email           : ''
    };

    const userData = user;

    attributes.id           = userData.user_id;
    attributes.firstName    = userData.user_firstname;
    attributes.lastName     = userData.user_lastname;
    attributes.username     = userData.user_display_name;
    attributes.email        = userData.user_email;

    const fullName = `${attributes.firstName} ${attributes.lastName}`;

    attributes.fullName = fullName.trim();

    return attributes;
}



/**
 * Update user details in local storage
 * @param user
 */
export function updateUserDetailsLocalStorage(user) {
    reactLocalStorage.setObject("user_auth_details", user);
}

/**
 * Update user attributes in local storage
 * @param key
 * @param value
 */
export function updateUserAttributesLocalStorage(key, value) {
    const user  = getAuthUserDetails();
    user[key]   = value;
    updateUserDetailsLocalStorage(user);
}

/**
 * Get auth user's language
 */
export function getAuthUserLanguage() {
    let language = 'en';

    if(isUserLoggedIn()) {
        language = getAuthUserDetails().language;
    }

    return language;
}



/**
 * Check whether paid courses exist or not
 * @param profileData
 * @returns {boolean}
 */
export function paidCoursesExist(profileData) {
    let paidCourses = [];

    if(profileData != undefined) {
        //Get paid courses from my profile
        paidCourses = profileData.paidCourses;
    }

    return paidCourses.length > 0 ? true : false;
}




/**
 * Get auth user id
 */
export function getAuthUserId() {
    const userData  = getAuthUserDetails();
    const {id}      = userAttributes(userData);
    return id;
}

/**
 * Get user fullname
 */
export function getAuthUserFullName() {
    const userData  = getAuthUserDetails();
    const {fullName} = userAttributes(userData);
    return fullName;
}



