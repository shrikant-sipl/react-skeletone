import {
    PROFILE_DETAILS, NOTIFICATIONS, FOLLOWING_USERS, FOLLOWERS, AUTH_USER_DETAILS
} from '../actions/Types';
import {updateUserAttributesLocalStorage, userAttributes} from "../actions/Common";

export default (state = {}, action) =>
{
    switch(action.type)
    {
        case PROFILE_DETAILS:
            updateUserAttributesLocalStorage('avatar', action.payload.avatar);
            return {...state, profileData: action.payload};

        case NOTIFICATIONS:
            return {...state, notifications: action.payload};

        case FOLLOWING_USERS:
            return {...state, followingUsers: action.payload};

        case FOLLOWERS:
            return {...state, followers: action.payload};

        case AUTH_USER_DETAILS:
            const authUserDetails = userAttributes(action.payload);
            return {...state, authUserDetails: authUserDetails};

        default:
            return state;
    }
}