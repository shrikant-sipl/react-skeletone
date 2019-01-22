import {
    FACEBOOK_UNREGISTERED_USER,
    GOOGLE_UNREGISTERED_USER
} from '../actions/Types';

const INITIAL_STATE = {
    fullname               : '',
    email                   : '',
    facebookAccessToken   : '',
    googleAccessToken     : '',
};

export default (state = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case FACEBOOK_UNREGISTERED_USER:
            return {...state, facebookAccessToken: action.payload.access_token, fullname: action.payload.fullname, email: action.payload.email};

        case GOOGLE_UNREGISTERED_USER:
            return {...state, googleAccessToken: action.payload.access_token, fullname: action.payload.fullname, email: action.payload.email};

        default:
            return state;
    }
}
