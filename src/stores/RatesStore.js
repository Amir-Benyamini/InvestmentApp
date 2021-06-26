import { observable, makeObservable, action } from 'mobx'

export class RatesStore {

	constructor() {
		this.latestRates = {}


		makeObservable(this, {
			latestRates: observable,
			fetchLatests: action

		})
	}
	
	fetchLatests() {
		 fetch(`http://api.currencylayer.com/live?access_key=01a14970a9a45aa2120f57b17f9f08e7`)
			.then(response => response.json())
			.then(data => this.latestRates = data);
	}

	convertUSDILS(amount){
		let converted = this.latestRates.quotes.USDILS * parseInt(amount)
		return Math.round(converted)
	}
}

