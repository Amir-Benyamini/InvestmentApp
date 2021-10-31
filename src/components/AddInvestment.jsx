import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { currencies, investmentTypes, liquidity } from '../constants';
import { useStyles } from '../constants'
import * as planActions from '../actions/Plan'

export const AddInvestment = (props) => {
	const classes = useStyles();
	const [investmentInput, setInvestmentInput] = useState({
		name: '',
		company: '',
		currency: 'ILS',
		revPerYear: 0,
		amount: 0,
		endDate: '',
		liquidity: '',
		type: '',
		isCompanyCapital: false,
		isRegulated: false,
	})

	// const Investments = props.planStore.investments

	const userId = JSON.parse(localStorage.getItem('user'))._id

	const [investmentMenu, setInvestmentMenu] = useState(false)


	const updateInvestmentInput = (value, name) => {
		const updatedInputs = { ...investmentInput }

		if (name === 'isRegulated' || name === 'isCompanyCapital') {
			updatedInputs[name] = !investmentInput[name]

		} else {
			updatedInputs[name] = value
		}


		setInvestmentInput(updatedInputs)
	}

	const handleInvestmentMentu = () => {
		setInvestmentInput({
			name: '',
			company: '',
			currency: 'ILS',
			revPerYear: 0,
			amount: 0,
			endDate: '',
			liquidity: '',
			type: '',
			isCompanyCapital: false,
			isRegulated: false,
		})

		setInvestmentMenu(!investmentMenu);
	}

	const addInvestment = () => {
		planActions.addInvestment(investmentInput, userId)
		handleInvestmentMentu()
	};

	return (
		<div>
			<Button onClick={handleInvestmentMentu}>Add Investment</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={investmentMenu} onClose={handleInvestmentMentu}>
				<DialogTitle>Fill Investment Data</DialogTitle>
				<DialogContent>
					<form >
						<FormControl >
							<TextField
								id='name'
								name='name'
								type='text'
								label='Investment Name'
								required
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id='company'
								name='company'
								label="Company"
								type='text'
								required
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>
							<TextField
								id="currency"
								name='currency'
								label="Currency"
								required
								select
								helperText="Select Currency"
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>

								{currencies.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.value}
									</MenuItem>
								))}
							</TextField>

							<TextField
								id='revPerYear'
								name='revPerYear'
								type='number'
								label='Yield Per Year'
								required
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id='amount'
								name='amount'
								type='number'
								label='Investment Amount'
								required
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id="type"
								name='type'
								label="Investment Type"
								required
								select
								helperText="Select Investment Type"
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>

								{investmentTypes.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.value}
									</MenuItem>
								))}
							</TextField>

							<TextField
								id="liquidity"
								name='liquidity'
								label="Liquidity"
								required
								select
								helperText="Select liquidity"
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>

								{liquidity.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
										name="isRegulated"
										color="primary"
									/>
								}
								label="Rgulated?"
							/>

							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
										name="isCompanyCapital"
										color="primary"
									/>
								}
								label="Company Risk Own Capital?"
							/>

						</FormControl>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleInvestmentMentu} color="primary">
						Cancel
          </Button>
					<Button onClick={addInvestment} color="primary">
						Invest
          </Button>
				</DialogActions>
			</Dialog>
			{/* <label>end date:</label>
			<input name='endDate' type="date" value={investmentInput.endDate} onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} /> */}
		</div>

	)
}