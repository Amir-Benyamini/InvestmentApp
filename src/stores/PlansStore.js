import { observable, makeObservable, action, computed } from 'mobx'

export class PlansStore {

	constructor() {
		this.plan = {
			investments: [],
			timeFrame: NaN,
			name: ''
		}
		this.plans = []

		makeObservable(this, {
			plans: observable,
			setPlans: action,
			plan: observable,
			addInvestment: action,
			deleteInvestment: action,
			setPlan: action,
		})
	}

	setPlans(plans) {
		this.plans = plans
	}

	addInvestment(investment) {
		this.plan.investments.push(investment)
	}

	addPlan(newPlan) {
		this.plans.push(newPlan)
		this.plan = newPlan
	}

	setPlan(plan) {
		this.plan = plan
	}

	setPlanTimeFrame(timeFrame) {
		this.plan.timeFrame = timeFrame
	}

	updatePlanName(name) {
		this.plan.name = name
	}

	deletePlan(id) {
		this.plan = {
			investments: [],
			timeFrame: 1,
			name: ''
		}
		this.plans = this.plans.filter(function (plan) {
			return plan.id !== id;
		});
	}

	deleteInvestment(investmentId) {
		this.plan.investments = this.plan.investments.filter(function (investment) {
			return investment.id !== investmentId;
		});
	}
}
