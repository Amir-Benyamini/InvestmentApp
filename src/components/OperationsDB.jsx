import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const OperationsDB = inject("planStore", "ratesStore")(observer((props) => {


	const [planName, setplanName] = useState('')
	const [saveMenu, setSaveMenu] = useState(false)


	const updatePlanName = (value) => {

		setplanName(value)
	}


	const handleSaveMenu = () => {
		setSaveMenu(!saveMenu);
	}


	return (
		<div>

			<Button onClick={handleSaveMenu}>Save</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={saveMenu} onClose={handleSaveMenu}>
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
					<Button onClick={handleSaveMenu} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {

						console.log(planName)
						handleSaveMenu()
					}} color="primary">
						save
          </Button>
				</DialogActions>
			</Dialog>


		</div>

	)
}))