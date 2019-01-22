import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {reducer as formReducer} from  'redux-form';
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
   form           : formReducer,
   toastr         : toastrReducer,
   auth           : AuthReducer,
   user           : UserReducer,
});

export default rootReducer; 
