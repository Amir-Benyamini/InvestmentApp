import { observable, makeObservable, action } from 'mobx'

export class PlanStore {

	constructor() {
		this.investments = []

		makeObservable(this, {
			investments: observable,
			addInvestment: action

		})
	}
	addInvestment(investment) {
		this.investments.push(investment)
	}
}
