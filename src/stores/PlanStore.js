import { observable, makeObservable, action } from 'mobx'

export class PlanStore {

	constructor() {
		this.investments = []
		this.timeFrame = 1

		makeObservable(this, {
			investments: observable,
			addInvestment: action,
			timeFrame: observable,
			changeTimeFrame: action,
		})
	}

	addInvestment(investment) {
		this.investments.push(investment)
	}

	changeTimeFrame(Years) {
		this.timeFrame = Years
	}
}
