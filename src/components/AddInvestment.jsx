import React, { useState } from "react";
import { observer, inject } from 'mobx-react'

export const AddInvestmentComp = inject("planStore")(observer((props) => {
	
	const [investmentInput, setInvestmentInput] = useState({
		name: '',
		company: '',
		currency: '',
		revPerYear: 0,
		date: {
			start: 0,
			end: 0,
		}
	})

	const updateInvestmentInput = (value, name) => {
		
		const updatedInputs = { ...investmentInput }

		if (name === 'start' || name === 'end') {
			updatedInputs.date[name] = value
		} else {
			updatedInputs[name] = value
		}

		setInvestmentInput(updatedInputs)
	}

	return (
		<div>
			{console.log(props.planStore.investments)}
				<input name='name' type="text" placeholder='investment-name' value={investmentInput.name} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
				<input name='company' type="text" placeholder='Company' value={investmentInput.company} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
				<label for="currency">currency:</label>
				<select name="currency" id="currency" value={investmentInput.currency} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>
					<option value="">choose currency</option>
					<option value="USD">USD</option>
					<option value="ILS">ILS</option>
				</select>

				{/* <label for="types">type:</label>
			<select name="types" id="types">
				<option value="stock-market">stock-market</option>
				<option value="real-estat">real-estat</option>
			</select>
			
			<label for="types">sub type:</label>
			<select name="sub-types" id="sub-types">
				<option value="multi family">multi family</option>
				<option value="single family">single family</option>
				<option value="buy fix sale">buy fix sale</option>
				<option value="stocks">stocks</option>
				<option value="general">general</option>
			</select> */}


				<label >yield per year:</label><input name='revPerYear' type="number" value={investmentInput.revPerYear} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
				<label >start date:</label><input name='start' type="date" value={investmentInput.date.start} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
				<label >end date:</label><input name='end' type="date" value={investmentInput.date.end} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

				
				<button onClick={() => {
				props.planStore.addInvestment(investmentInput)
				console.log(props)
			}}>invest</button>
		</div>
	)
}))