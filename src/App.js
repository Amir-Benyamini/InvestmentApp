import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { observer, inject } from 'mobx-react'

import { NavBar } from './components/Navbar';
import { PlanDash } from './components/plan/PlanDash';
import { MonitorDash } from './components/monitor/MonitorDash';
import { AnalyticsDash } from './components/AnalyticsDash'
import { Signup } from "./components/UserAuth/Signup";
import { Login } from "./components/UserAuth/Login";

const App = inject("rates", "auth")(observer((props) => {
	
	return (
		<div>
			<Router>
				<NavBar />
				<Switch>
					<Route path="/plan">
						<PlanDash />
					</Route>
					<Route path="/monitor">
						<MonitorDash />
					</Route>
					<Route path="/analytics">
						<AnalyticsDash />
					</Route>
					{/* <Route path="/profile">
						<Profiler />
					</Route> */}
					<Route path="/signup">
					<Signup />
					</Route>
					<Route path="/login">
					<Login />
					</Route>
				</Switch>
			</Router>
		</div>

	);
}))

export default App;
