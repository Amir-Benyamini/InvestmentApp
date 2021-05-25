import React, { useState } from "react";
import { observer, inject } from 'mobx-react'

export const AddInvestmentComp = inject("planStore")(observer((props) => {

	const [investmentInput, setInvestmentInput] = useState({
		name: '',
		company: '',
		currency: '',
		revPerYear: 0,
		amount: 0,
		endDate: '',
		liquidity: '',
		type: '',
		isCompanyCapital: false,
		isRegulated: false,
	})

	const updateInvestmentInput = (value, name) => {
		const updatedInputs = { ...investmentInput }

		if (name === 'isRegulated' || name === 'isCompanyCapital') {
			updatedInputs[name] = !investmentInput[name]

		} else {
			updatedInputs[name] = value
		}


		setInvestmentInput(updatedInputs)
	}

	return (
		<div>
			{console.log(props.planStore.investments)}

			<input name='name' type="text" placeholder='investment-name' value={investmentInput.name} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<input name='company' type="text" placeholder='company' value={investmentInput.company} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<label for="currency">currency:</label>
			<select name="currency" id="currency" value={investmentInput.currency} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>
				<option value="">choose currency</option>
				<option value="USD">USD</option>
				<option value="ILS">ILS</option>
			</select>

			<label >yield per year:</label><input name='revPerYear' type="number" value={investmentInput.revPerYear} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
			<label>investment amount:</label><input name='amount' type="number" value={investmentInput.amount} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<label for="type">type:</label>
			<select name="type" id="type" value={investmentInput.type} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>
				<option value="choose">choose</option>
				<option value="stock-market">stock-market</option>
				<option value="real-estat">real-estat</option>
				<option value="crypto">crypto-currency</option>
				<option value="loans">loans</option>
			</select>

			<label for="liquidity">liquidity:</label>
			<select name="liquidity" id="liquidity" value={investmentInput.liquidity} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>
				<option value="choose">choose</option>
				<option value="days">few days</option>
				<option value="weeks">few weeks</option>
				<option value="months">few months</option>
				<option value="years">few years</option>
			</select>

			<label>regulated?</label>
			<input name='isRegulated' type="checkbox" value={investmentInput.isRegulated} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<label>company risk own capital?</label>
			<input name='isCompanyCapital' type="checkbox" value={investmentInput.isCompanyCapital} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<label>end date:</label>
			<input name='endDate' type="date" value={investmentInput.endDate} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

			<button onClick={() => {
				props.planStore.addInvestment(investmentInput)
				console.log(props)
			}}>invest</button>
		</div>

	)
}))