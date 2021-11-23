import React, { useState } from "react";
import { useStyles } from '../../constants'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as planActions from '../../actions/Plan'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NewPlan = () => {
	const classes = useStyles();
	const userId = JSON.parse(localStorage.getItem('user'))._id
	const [name, setName] = useState('')
	const [nameDialog, setNameDialog] = useState(false)
	const [validation, setValidation] = useState(false)

	const toggleNameDialog = () => {
		setNameDialog(!nameDialog);
	}

	const updateName = (value) => {
		setName(value)
	}

	const onNewPlanClicked = async () => {
		if (name) {
			const res = await planActions.createPlan(name, userId)
			toast.success(`plan ${res.name} created`)
			toggleNameDialog()
			updateName('')
			setValidation(false)
		} else {
			setValidation(true)
			toast.error(`Name is requierd!`)
		}

	};

	return (
		<div>
			<ToastContainer />
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
							error={validation}
							helperText={validation ? 'name is requierd!' : ''}
							onChange={(e) => updateName(e.target.value)}
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