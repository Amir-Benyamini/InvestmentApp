import React from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import {useStyles} from '../../constants'
import {deletePlan} from '../../actions/Plan'

export const DeletePlan = inject("plansStore")(observer((props) => {
	const classes = useStyles();
	const onDeletePlanClicked = async () => {
		let result = window.confirm(`are you sure you want to delete "${props.plansStore.plan.name}"?`)
		if (result){
			deletePlan()
		}
	}

	return (
		<div>
			<Button color="secondary" onClick={() => {
						onDeletePlanClicked()
					}}>Delete Plan</Button>
		</div>
	)
}))