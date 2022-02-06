import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useStyles } from '../../constans/styling'
import {
  currencies,
  investmentTypes,
  liquidityLables,
} from "../../constans/inputs";
import { investmentIn, inputValidation } from "../../constans/validations";
import * as investmentsActions from '../../actions/investments'
import { toast } from "react-toastify";

export const AddInvestment = inject("plansStore")(observer((props) => {
	// const classes = useStyles();
	const planId = props.plansStore.plan.id
	const [investmentMenu, setInvestmentMenu] = useState(false)
	const [investmentInput, setInvestmentInput] = useState(investmentIn)
	const [validation, setValidation] = useState(inputValidation)
	
	const validate = () => {
		if (investmentInput.name === '') {
			const newValidation = { ...validation }
			newValidation.name.error = true
			setValidation(newValidation)
			return false
		} else {
			const newValidation = { ...validation }
			newValidation.name.error = false
			setValidation(newValidation)
		}
		if (investmentInput.company === '') {
			const newValidation = { ...validation }
			newValidation.company.error = true
			setValidation(newValidation)
			return false
		}
		if (investmentInput.company !== '') {
			const newValidation = { ...validation }
			newValidation.company.error = false
			setValidation(newValidation)
		}
		if (investmentInput.currency === '') {
			const newValidation = { ...validation }
			newValidation.currency.error = true
			setValidation(newValidation)
			return false
		} if (investmentInput.currency !== '') {
			const newValidation = { ...validation }
			newValidation.currency.error = false
			setValidation(newValidation)
		}
		if (investmentInput.revPerYear === 0) {
			const newValidation = { ...validation }
			newValidation.revPerYear.error = true
			setValidation(newValidation)
			return false
		} if (investmentInput.revPerYear !== 0) {
			const newValidation = { ...validation }
			newValidation.revPerYear.error = false
			setValidation(newValidation)
		}
		if (investmentInput.amount === 0) {
			const newValidation = { ...validation }
			newValidation.amount.error = true
			setValidation(newValidation)
			return false
		} if (investmentInput.amount !== 0) {
			const newValidation = { ...validation }
			newValidation.amount.error = false
			setValidation(newValidation)
		}
		if (investmentInput.type === '') {
			const newValidation = { ...validation }
			newValidation.type.error = true
			setValidation(newValidation)
			return false
		} if (investmentInput.type !== '') {
			const newValidation = { ...validation }
			newValidation.type.error = false
			setValidation(newValidation)
		}
		if (investmentInput.liquidity === '') {
			const newValidation = { ...validation }
			newValidation.liquidity.error = true
			setValidation(newValidation)
			return false
		} if (investmentInput.liquidity !== '') {
			const newValidation = { ...validation }
			newValidation.liquidity.error = false
			setValidation(newValidation)
		}

		return true
	}
	// const Investments = props.planStore.investments

	const userId = JSON.parse(localStorage.getItem('user'))._id

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
		if(planId !== undefined){
			setInvestmentInput(investmentIn)
			setInvestmentMenu(!investmentMenu);
		} else {
			toast.error('Please set plan first!')
		}
		
	}

	const addInvestment = async () => {
			if (validate()) {
				investmentsActions.addInvestment(investmentInput, userId)
				handleInvestmentMentu()
				toast.success('Investment succesfully added!')
			} else {
				toast.error('Please fill all requierd fields!')
			}
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
								error={validation.name.error}
								helperText={validation.name.error ? validation.name.text : ''}
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id='company'
								name='company'
								label="Company"
								type='text'
								required
								error={validation.company.error}
								helperText={validation.company.error ? validation.company.text : ''}
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>
							<TextField
								id="currency"
								name='currency'
								label="Currency"
								required
								error={validation.currency.error}
								helperText={validation.currency.error ? validation.currency.text : ''}
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
								error={validation.revPerYear.error}
								helperText={validation.revPerYear.error ? validation.revPerYear.text : ''}
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id='amount'
								name='amount'
								type='number'
								label='Investment Amount'
								required
								error={validation.amount.error}
								helperText={validation.amount.error ? validation.amount.text : ''}
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}
							/>

							<TextField
								id="type"
								name='type'
								label="Investment Type"
								required
								error={validation.type.error}
								helperText={validation.type.error ? validation.type.text : ''}
								select
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
								error={validation.liquidity.error}
								helperText={validation.liquidity.error ? validation.liquidity.text : ''}
								select
								onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)}>

								{liquidityLables.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<FormGroup>
								<FormControlLabel
									control={<Switch />}
									label="Regulated"
									name="isRegulated"
									onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />

								<FormControlLabel
									control={<Switch />}
									label="Shared Risk"
									name="isCompanyCapital"
									onChange={(e) => updateInvestmentInput(e.target.value, e.target.name)} />
							</FormGroup>
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
}))