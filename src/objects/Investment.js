export class Investment {
	constructor(investmentInput) {

		this.amount = investmentInput.amount
		this.name = investmentInput.name
		this.company = investmentInput.company
		this.currency = investmentInput.currency
		this.revPerYear = investmentInput.revPerYear
		this.endDate = investmentInput.endDate
		this.liquidity = investmentInput.liquidity
		this.type = investmentInput.type
		this.isCompanyCapital = investmentInput.isCompanyCapital
		this.isRegulated = investmentInput.isRegulated

	}

	compoundInterest(investmentsTimeRange) {
		const rate = this.revPerYear / 100
		const base = (1 + rate / 1)
		const compundInterest = this.amount * Math.pow(base, investmentsTimeRange) - this.amount

		return Math.round(compundInterest)
	}

	interest(investmentsTimeRange) {
		const rate = this.revPerYear / 100

		const interest = this.amount * rate * investmentsTimeRange

		return Math.round(interest)
	}

	risk() {

		let riskIndicators = 0

		if (this.isRegulated) {
			riskIndicators += 1
		}
		if (this.isCompanyCapital) {
			riskIndicators += 1
		}
		if (this.currency !== 'ILS') {
			riskIndicators += 1
		}
		if (this.liquidity) {
			if (this.liquidity === 'days') {
				riskIndicators += 0.25
			}
			if (this.liquidity === 'weeks') {
				riskIndicators += 0.50
			}
			if (this.liquidity === 'months') {
				riskIndicators += 0.75
			}
			if (this.liquidity === 'years') {
				riskIndicators += 1
			}
		}
		const riskCal = riskIndicators / 4 * 100
		return riskCal
	}

}