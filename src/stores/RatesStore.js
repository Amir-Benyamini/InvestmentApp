import { observable, makeObservable, action } from 'mobx'

export class RatesStore {

	constructor() {
		this.latestRates = {}


		makeObservable(this, {
			latestRates: observable,
			fetchLatests: action

		})
	}
	fetchLatests(baseURL, apiToken, baseCurrency) {
		fetch(`${baseURL}/${apiToken}/latest/${baseCurrency}`)
			.then(response => response.json())
			.then(data => this.latestRates = data);
	}
}