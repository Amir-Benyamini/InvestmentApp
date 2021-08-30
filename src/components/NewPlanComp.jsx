import React from "react";
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import {useStyles} from '../constants'

export const NewPlanComp = inject("planStore")(observer((props) => {
	const classes = useStyles();
	const planStore = props.planStore
	
	const onNewPlanClicked = async () => {
		planStore.setPlan([], '', '')
	};

	return (
		<div>
		<Button color="primary" onClick={onNewPlanClicked}>New Plan</Button>
		</div>
	)
}));