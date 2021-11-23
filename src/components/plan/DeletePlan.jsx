import React from "react";
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import { useStyles } from '../../constants'
import { deletePlan } from '../../actions/Plan'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DeletePlan = inject("plansStore")(observer((props) => {
	const userId = JSON.parse(localStorage.getItem('user'))._id
	const classes = useStyles();
	const onDeletePlanClicked = async () => {
		if (props.plansStore.plan.id) {
			let result = window.confirm(`are you sure you want to delete "${props.plansStore.plan.name}"?`)
			if (result) {
				deletePlan(userId)
				toast.success('Plan successfuly deleted!')
			}
		} else {
			toast.error('There is no active plan!')
		}
	}

	return (
		<div>
			<ToastContainer />
			<Button color="secondary" onClick={() => {
				onDeletePlanClicked()
			}}>Delete Plan</Button>
		</div>
	)
}))