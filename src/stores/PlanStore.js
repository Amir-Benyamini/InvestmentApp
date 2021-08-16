import { observable, makeObservable, action, computed } from 'mobx'

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
			// currencyRate: observable,
			updateCurrencyRates: action,
			interestAmount: computed,
			totalInvestmentAmount: computed,
			totalAmount: computed,
			setPlan: action
		})
	}

	addInvestment(investment) {
		this.investments.push(investment)
	}

	setPlan(investments) {
		const newInvestments = [...investments]
		this.investments = newInvestments
	}

	deleteInvestment(investment) {
		const indexOfInvestment = this.investments.indexOf(investment)
		this.investments.splice(indexOfInvestment, 1)
	}

	changeTimeFrame(Years) {
		this.timeFrame = Years
	}

	updateCurrencyRates(currencyRate) {
		this.investments.forEach((investment) => {
			investment.currencyRate = currencyRate
		})
	}


	get totalInvestmentAmount() {
		let amount = 0

		this.investments.forEach((investment) => {
			if (investment.currency === 'USD') {
				amount += investment.baseAmount
			} else { amount += investment.amount }
		})

		return amount
	}

	get interestAmount() {
		let interest = 0

		this.investments.forEach((investment) => {
			if (investment.type === 'Stock-Market') {
				interest += investment.compoundInterest(this.timeFrame)
			} else {
				interest += investment.interest(this.timeFrame)
			}
		})

		return interest
	}

	get totalAmount() {
		let totalAmount = 0

		this.investments.forEach((investment) => {
			if (investment.currency === 'USD') {
				totalAmount += investment.baseAmount

				if (investment.type === 'Stock-Market') {
					totalAmount += investment.compoundInterest(this.timeFrame)
				} else {
					totalAmount += investment.interest(this.timeFrame)
				}

			} else {
				totalAmount += investment.amount

				if (investment.type === 'Stock-Market') {
					totalAmount += investment.compoundInterest(this.timeFrame)
				} else {
					totalAmount += investment.interest(this.timeFrame)
				}
			}
		})

		return totalAmount
	}
}
