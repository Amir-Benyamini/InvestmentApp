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

export const PlanOperationsDB = inject("planStore")(observer((props) => {

	const Investments = props.planStore.investments

	const [planName, setplanName] = useState('')
	const [saveMenu, setSaveMenu] = useState(false)


	const updatePlanName = (value) => {

		setplanName(value)
	}


	const toggleSaveMenu = () => {
		setSaveMenu(!saveMenu);
	}

	const onSavePlanClicked = async (planName, investments) => {
		API.savePlan(planName, investments)
		toggleSaveMenu()
	}

	return (
		<div>

			<Button onClick={toggleSaveMenu}>Save Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={saveMenu} onClose={toggleSaveMenu}>
				<DialogTitle>Select Plan Name</DialogTitle>
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
					<Button onClick={toggleSaveMenu} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						onSavePlanClicked(planName, Investments)
					}} color="primary">
						save
          </Button>
				</DialogActions>
			</Dialog>


		</div>

	)
}))