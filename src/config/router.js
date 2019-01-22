import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';
import Unauthorized from '../components/Unauthorized';
import AuthMiddleware from '../components/AuthMiddleware';
import EditProfile from "../components/User/EditProfile";


export default class Router extends Component{

render(){
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/edit-profile" component={AuthMiddleware(EditProfile)}/>
                        <Route path="/forgot-password" component={AuthMiddleware(ForgotPassword, [true])} />
                        <Route path="/reset-password" component={AuthMiddleware(ResetPassword, [true])} />
                        <Route path='/unauthorized' component={Unauthorized} />
                        <Route path="/login" component={AuthMiddleware(Login, [true])} />
                        <Route path="/signup" component={AuthMiddleware(Signup, [true])} />
                        <Route path="/" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
      );
    }
}
