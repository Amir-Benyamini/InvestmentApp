import React, {Component} from "react";
import { isAuth } from '../../services/authHelpers'
import { Redirect, Route } from "react-router-dom";

 const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={
		props => isAuth() ? <Component {...props} /> : <Redirect to={
			{
				pathname: '/login',
				state: { from: props.location }
			}} />
	}>

	</Route>
)

export default PrivateRoute