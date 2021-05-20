import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import { NavComp } from './components/Navbar';
import { PlanComp } from './components/PlanDash';
import { MonitorComp } from './components/MonitorDash';
import {MainComp} from './components/MainDash'

function App() {
	return (
		<div>
			<Router>
				<NavComp />

				<Switch>
					<Route path="/plan">
						<PlanComp />
					</Route>
					<Route path="/monitor">
						<MonitorComp />
					</Route>
					<Route path="/">
						<MainComp />
					</Route>
				</Switch>
			</Router>
		</div>

	);
}

export default App;
