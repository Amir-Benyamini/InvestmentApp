import React, { useState } from "react";
import { observer, inject } from 'mobx-react';
import { useStyles } from '../constants'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as planActions from '../actions/Plan'

export const NewPlan = (props) => {
	const classes = useStyles();

	const [name, setname] = useState('')
	const [nameDialog, setNameDialog] = useState(false)

	const toggleNameDialog = () => {
		setNameDialog(!nameDialog);
	}

	const updatename = (value) => {
		setname(value)
	}

	const onNewPlanClicked = async () => {
		planActions.createPlan(name)
		toggleNameDialog()
	};

	return (
		<div>
			<Button color="primary" onClick={toggleNameDialog}>New Plan</Button>
			<Dialog open={nameDialog} onClose={toggleNameDialog}>
				<DialogTitle>Choose Plan Name</DialogTitle>
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
					<Button onClick={toggleNameDialog} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						onNewPlanClicked()
					}} color="primary">
						save
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}