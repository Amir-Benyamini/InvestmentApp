import { Investment } from "./Investment"
import { makeObservable, observable } from "mobx"

export class Plan {
	investments = []
	timeFrame = 1
	constructor(planJson, usdRate) {
		makeObservable(this, {
			investments: observable,
			timeFrame: observable
	  })

		planJson.investments.forEach((investmentJson) => {
			const investment = new Investment(investmentJson, usdRate)
			this.investments.push(investment)
		})
		
		this.timeFrame = this.timeFrame
		this.name = planJson.name
		this.id = planJson._id
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

	updateCurrencyRates(currencyRate) {
		this.investments.forEach((investment) => {
			investment.currencyRate = currencyRate
		})
	}

	changeTimeFrame(Years) {
		this.timeFrame = Years
	}
}
