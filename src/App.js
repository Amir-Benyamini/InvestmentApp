import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import { NavBar } from './components/Navbar';
import { PlanDash } from './components/plan/PlanDash';
import { MonitorDash } from './components/monitor/MonitorDash';
import { MainDash } from './components/MainDash'
import { observer, inject } from 'mobx-react'

const App = inject("rates") (observer((props) => {
	
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
					<Route path="/">
						<MainDash />
					</Route>
				</Switch>
			</Router>
		</div>

	);
}))

export default App;
