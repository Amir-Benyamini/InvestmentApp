import { observable, makeObservable, action, computed } from 'mobx'
import { Investment } from '../objects/Investment';
import { Plan } from '../objects/Plan';
import API from '../services/api';

export class Plans {

	constructor(ratesStore) {
		this.plans = []
		this.ratesStore = ratesStore
		makeObservable(this, {
			plans: observable,
			fetch: action
		})
	}

	getUSDRate() {
		return this.ratesStore.latestRates.quotes.USDILS
	}

	async fetch() {
		if (this.plans.length === 0) {
			const plansJson = await API.getPlans();
			this.plans = plansJson.map((plan) => new Plan(plan, this.getUSDRate()))
		}
	}
}
