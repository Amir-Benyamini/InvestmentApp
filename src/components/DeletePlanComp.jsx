import React from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import API from '../services/api';
import {useStyles} from '../constants'

export const DeletePlanComp = inject("planStore")(observer((props) => {
	const planId = props.planStore.id
	const classes = useStyles();
	const onDeletePlanClicked = async (id) => {
		let result = window.confirm(`are you sure you want to delete "${props.planStore.planName}"?`)
		if(result){
			API.deletePlan(id)
			props.planStore.setPlan([], '', '')
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