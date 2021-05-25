import { AddInvestmentComp } from './AddInvestment'
import { observer, inject } from 'mobx-react'
import React, { useState } from "react";

export const PlanComp = inject("planStore", 'ratesStore')(observer((props) => {

	const [investmentsTimeRange, setInvestmentsTimeRange] = useState(1)

	const updateInvestmentsTimeRange = (value) => {

		setInvestmentsTimeRange(value)
	}

	//make a function for every calculation you need for this table (for example show revenu per year)

	const compoundInterest = (investmentObj, investmentsTimeRange) => {
		const rate = investmentObj.revPerYear / 100
		const base = (1 + rate / 1)
		const compundInterest = investmentObj.amount *  Math.pow(base, investmentsTimeRange) - investmentObj.amount

		return compundInterest
	}

	const interest = (investmentObj, investmentsTimeRange) => {
		const rate = investmentObj.revPerYear / 100
		
		const interest = investmentObj.amount * rate * investmentsTimeRange

		return interest
	}

	const ILSRates = props.ratesStore.latestRates.conversion_rates

	return (
		<div>
			{console.log(ILSRates.USD)}
			<div><AddInvestmentComp /></div>
			<br />
			<label for="timeRange">time range:</label>
			<select name="timeRange" id="timeRange" value={investmentsTimeRange} onChange={(e) => updateInvestmentsTimeRange(e.target.value)}>
				<option value="1">one year</option>
				<option value="3">three years</option>
				<option value="5">five years</option>
				<option value="10">ten years</option>
			</select>
			{props.planStore.investments.map(i => <h1>{i.name} - {i.amount} - {compoundInterest(i, investmentsTimeRange)}  - {interest(i, investmentsTimeRange)} isRegulated: {i.isRegulated}</h1>)}

		</div>
	)
}))