import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { useStyles } from '../constants'

export const TimeFrame = inject("plansStore")(observer((props) => {
	const [investmentsTimeRange, setInvestmentsTimeRange] = useState(1)
	const [timeMenu, setTimeMenu] = useState(false)
	const classes = useStyles();
	
	const updateInvestmentsTimeRange = (value) => {

		setInvestmentsTimeRange(value)
	}

	const handleTimeMenu = () => {
		setTimeMenu(!timeMenu);
	}

	const handleChange = () => {

	};

	return (
		<div>
			<Button onClick={handleTimeMenu}>Change Time Frame</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={timeMenu} onClose={handleTimeMenu}>
				<DialogTitle>Select Time Frame</DialogTitle>
				<DialogContent>
						<FormControl >
							<InputLabel htmlFor="demo-dialog-native">Time Frame</InputLabel>
							<Select
								native
								value={investmentsTimeRange}
								onChange={(e) => updateInvestmentsTimeRange(e.target.value)}
								input={<Input id="demo-dialog-native" />}
							>
								<option value={1}>One Year</option>
								<option value={3}>Three Years</option>
								<option value={5}>Five Years</option>
								<option value={10}>Ten Years</option>
							</Select>
						</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleTimeMenu} color="primary">
						Cancel
          </Button>
					<Button onClick={() => {
						props.plansStore.plan.changeTimeFrame(investmentsTimeRange)
						handleTimeMenu()
					}} color="primary">
						Ok
          </Button>
				</DialogActions>
			</Dialog>


		</div>
	)

	}))