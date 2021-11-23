import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../../constants'
import * as planActions from '../../actions/Plan'
import { toast } from "react-toastify";

export const UpdatePlan = inject("plansStore")(observer((props) => {
	const planId = props.plansStore.plan.id
	const name = props.plansStore.plan.name
	const userId = JSON.parse(localStorage.getItem('user'))._id
	const [newName, setNewName] = useState('')
	const [updateDialog, setUpdateDialog] = useState(false)
	const [validation, setValidation] = useState(false)
	const classes = useStyles();

	const updatename = (value) => {
		setNewName(value)
	}

	const toggleUptadeDialog = () => {
		setUpdateDialog(!updateDialog);
	}

	const onUpdatePlanClicked = async (name, planId, userId) => {
		if (planId) {
			if (newName) {
				const plan = planActions.updatePlanName(name, planId, userId)
				if (plan) {
					setNewName('')
					toggleUptadeDialog()
					setValidation(false)
					toast.success('Plan name is updated!')
				} else {
					setValidation(false)
					toast.error('Something went wrong, Please try again!')
				}

			} else {
				setValidation(true)
				toast.error('Name is requierd!')
			}
		} else {
			toggleUptadeDialog()
			toast.error('There is no active plan!')
		}
		
	}

	return (
		<div>
			<Button onClick={toggleUptadeDialog}>Update Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={updateDialog} onClose={toggleUptadeDialog}>
				<DialogTitle>Update Plan Name</DialogTitle>
				<DialogContent>
					<FormControl >

						<TextField
							id='name'
							name='name'
							type='text'
							label='Plan Name'
							required
							error={validation}
							helperText={validation ? 'name is requierd!' : ''}
							onChange={(e) => updatename(e.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleUptadeDialog} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						onUpdatePlanClicked(newName === '' ? name : newName, planId, userId)
					}} color="primary">
						update
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}))