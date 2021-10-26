import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { observer, inject } from 'mobx-react'
import PrivateRoute from './components/UserAuth/PrivateRoute'
import { NavBar } from './components/Navbar';
import { PlanDash } from './components/plan/PlanDash';
import { MonitorDash } from './components/monitor/MonitorDash';
import { AnalyticsDash } from './components/AnalyticsDash'
import { Signup } from "./components/UserAuth/Signup";
import { Login } from "./components/UserAuth/Login";
import { Acivate } from "./components/UserAuth/Activate";
import {Profile} from './components/UserAuth/Profile'
import {ForgotPassword} from './components/UserAuth/ForgotPassword';
import {ResetPassword} from './components/UserAuth/ResetPassword';

const App = inject("rates", "auth")(observer((props) => {

	return (
		<div>
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact />
					<Route path="/signup" exact component={Signup} />
					<Route path="/login" exact component={Login} />
					<Route path="/auth/activate/:token" exact component={Acivate} />
					<Route path="/auth/password/forgot" exact component={ForgotPassword} />
					<Route path="/auth/password/reset/:token" exact component={ResetPassword} />

					<PrivateRoute path="/profile" exact component={Profile} />
					<PrivateRoute path="/plan" exact component={PlanDash} />
					<PrivateRoute path="/monitor" exact component={MonitorDash} />
					<PrivateRoute path="/analytics" exact component={AnalyticsDash} />
				</Switch>
			</Router>
		</div>

	);
}))

export default App;
