import { observable, makeObservable, action, computed } from 'mobx'

export class PlansStore {

	constructor() {
		this.plan = {
			investments: [],
			timeFrame: 1,
			name: ''
		}
		this.plans = []

		makeObservable(this, {
			plans: observable,
			setPlans: action,
			plan: observable,
			addInvestment: action,
			deleteInvestment: action,
			changeTimeFrame: action,
			// currencyRate: observable,
			// updateCurrencyRates: action,
			// interestAmount: computed,
			// totalInvestmentAmount: computed,
			// totalAmount: computed,
			setPlan: action,
		})
	}

	async setPlans(plans) {
		this.plans = plans
	}

	addInvestment(investment) {
		this.plan.investments.push(investment)
	}

	addPlan(newPlan) {
		// this.plans.push(newPlan)
		this.plan = newPlan
	}

	setPlan(plan) {
		this.plan = plan
	}

	updatePlanName(name) {
		this.plan.name = name
	}

	async deleteInvestment(investmentId) {
		this.plan.investments = this.plan.investments.filter(function( investment ) {
			return investment.id !== investmentId;
		});
	}

	changeTimeFrame(Years) {
		this.plan.timeFrame = Years
	}
}
