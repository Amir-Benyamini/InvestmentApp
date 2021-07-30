import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import { PlanStore } from './stores/PlanStore'
import { RatesStore} from './stores/RatesStore'

const planStore = new PlanStore()
const ratesStore = new RatesStore()
ratesStore.fetchLatests()

const stores = {
	planStore,
	ratesStore
}

ReactDOM.render(
	<React.StrictMode>
		<Provider {...stores}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();