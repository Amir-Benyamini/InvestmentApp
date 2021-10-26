import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useStyles} from '../../constants'
import * as planActions from '../../actions/Plan'

export const UpdatePlan = inject("plansStore")(observer((props) => {
	const id = props.plansStore.plan.id
	const name = props.plansStore.plan.name

	const [newName, setNewName] = useState('')
	const [updateDialog, setUpdateDialog] = useState(false)
	const classes = useStyles();

	const updatename = (value) => {
		setNewName(value)
	}

	const toggleUptadeDialog = () => {
		setUpdateDialog(!updateDialog);
	}

	const onUpdatePlanClicked = async (name, id) => {
		planActions.updatePlanName(name, id)
		setNewName('')
		toggleUptadeDialog()
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
								onChange={(e) => updatename(e.target.value)}
							/>
						</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleUptadeDialog} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						onUpdatePlanClicked(newName === '' ? name : newName, id)
					}} color="primary">
						update
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}))