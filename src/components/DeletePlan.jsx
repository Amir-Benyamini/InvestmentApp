import React from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import {useStyles} from '../constants'
import {deletePlan} from '../actions/Plan'

export const DeletePlan = inject("selectedPlan")(observer((props) => {
	const planId = props.selectedPlan.id
	const classes = useStyles();
	const onDeletePlanClicked = async (id) => {
		let result = window.confirm(`are you sure you want to delete "${props.selectedPlan.planName}"?`)
		if (result){
			deletePlan(id)
		}
	}

	return (
		<div>
			<Button color="secondary" onClick={() => {
						onDeletePlanClicked(planId)
					}}>Delete Plan</Button>
		</div>
	)
}))