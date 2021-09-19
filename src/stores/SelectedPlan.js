import { observable, makeObservable, action, computed } from 'mobx'

export class SelectedPlan {

	constructor() {
		this.investments = []
		this.plan = {
			investments: this.investments,
			timeFrame: 1,
			name: ''
		}
		this.plans = []

		makeObservable(this, {
			plans: observable,
			setPlans: action,
			plan: observable,
			investments: observable,
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
		this.investments.push(investment)
	}

	addPlan(newPlan) {
		// this.plans.push(newPlan)
		this.plan = newPlan
	}

	setPlan(plan) {
		this.plan = plan
		this.investments = plan.investments
	}

	updatePlanName(name) {
		this.plan.name = name
	}

	async deleteInvestment(investmentId) {
		this.investments = this.investments.filter(function( investment ) {
			return investment.id !== investmentId;
		});
	}

	changeTimeFrame(Years) {
		this.plan.timeFrame = Years
	}
}
