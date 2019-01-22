import {
    AUTH_USER_DETAILS
} from './Types';
import axios from "axios/index";
import {API_URL} from "../config/config";
import {getAuthToken, getAuthUserDetails} from "./Common";

/**
 * Edit profile
 * @param data
 * @param callback
 * @returns {function(*)}
 */
export function editProfile(data, userId, callback) {
    const authToken = getAuthToken();
    const request = axios.patch(`${API_URL}/users/${userId}`, data, {
        headers: {Authorization: `Bearer ${authToken}`}
    });

    return ()=> {
        request.then((data) => {
            callback(data);
        })
        .catch(function (error) {
            callback(error.response);
        });
    }
}

/**
 * Get profile details from local storage
 * @returns {function(*)}
 */
export function getProfileDetailsLocalStorage() {
    const userDetails = getAuthUserDetails();

    return (dispatch)=> {
        dispatch({
            type    : AUTH_USER_DETAILS,
            payload : userDetails
        });
    }
}

