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
import { observer, inject } from 'mobx-react'

const App = inject("ratesStore") (observer((props) => {
	return ( 
		<div>
			{props.ratesStore.fetchLatests('https://v6.exchangerate-api.com/v6','af42bef5c66bb270bf4cd243', 'ILS')}
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
}))

export default App;
