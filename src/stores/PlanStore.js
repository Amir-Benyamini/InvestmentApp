import { observable, makeObservable, action } from 'mobx'

export class PlanStore {

	constructor() {
		this.investments = []
		this.timeFrame = 1

		makeObservable(this, {
			investments: observable,
			addInvestment: action,
			deleteInvestment: action,
			timeFrame: observable,
			changeTimeFrame: action,
			
		})
	}

	addInvestment(investment) {
		this.investments.push(investment)
	}

	deleteInvestment(investment) {
		const indexOfInvestment = this.investments.indexOf(investment)
		this.investments.splice(indexOfInvestment, 1)
	}

	changeTimeFrame(Years) {
		this.timeFrame = Years
	}
}
