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
import {changePlanTimeFrame} from '../actions/Plan'

export const TimeFrame = inject("plansStore")(observer((props) => {
	const [planTimeFrame, setPlanTimeFrame] = useState(1)
	const [timeMenu, setTimeMenu] = useState(false)
	const classes = useStyles();
	
	const updatePlanTimeRange = (value) => {
		setPlanTimeFrame(value)
	}

	const handleTimeMenu = () => {
		setTimeMenu(!timeMenu);
	}

	const onChangeTimeFrameClick = () => {
		const parsedValue = parseInt(planTimeFrame)
		changePlanTimeFrame(parsedValue)
		handleTimeMenu()
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
								value={planTimeFrame}
								onChange={(e) => updatePlanTimeRange(e.target.value)}
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
						onChangeTimeFrameClick()
					}} color="primary">
						Ok
          </Button>
				</DialogActions>
			</Dialog>


		</div>
	)

	}))