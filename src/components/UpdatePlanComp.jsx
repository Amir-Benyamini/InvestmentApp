import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../services/api';

export const UpdatePlanComp = inject("planStore")(observer((props) => {
	const Investments = props.planStore.investments
	const planId = props.planStore.id
	const planName = props.planStore.planName
	const [newName, setNewName] = useState('')
	const [updateMenu, setUpdateMenu] = useState(false)

	const updatePlanName = (value) => {

		setNewName(value)
	}

	const toggleUptadeMenu = () => {
		setUpdateMenu(!updateMenu);
	}

	const onUpdatePlanClicked = async (planName, id, investments) => {
		API.updatePlan(planName, id, investments)
		setNewName('')
		toggleUptadeMenu()
	}

	return (
		<div>
			<Button onClick={toggleUptadeMenu}>Update Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={updateMenu} onClose={toggleUptadeMenu}>
				<DialogTitle>Update Plan Name</DialogTitle>
				<DialogContent>
					<form >
						<FormControl >

							<TextField
								id='planName'
								name='planName'
								type='text'
								label='Plan Name'
								required
								onChange={(e) => updatePlanName(e.target.value)}
							/>
						</FormControl>

					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleUptadeMenu} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						onUpdatePlanClicked(newName == '' ? planName : newName, planId, Investments)
					}} color="primary">
						update
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}))