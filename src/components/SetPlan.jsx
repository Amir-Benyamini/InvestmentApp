import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useStyles} from '../constants'
import * as planActions from '../actions/Plan'

export const SetPlan = inject("selectedPlan", "rates")(observer((props) => {
	const classes = useStyles();
	const [plansMenu, setPlansMenu] = useState(false)
//	const [plans, setPlans] = useState([])

	useEffect(async () => {
		planActions.fetchPlans()
		//let plansMaped = plansDB.map(plan =>
		//	plan = { name: plan.name, _id: plan._id }
		//)
		//setPlans(plansMaped)
	}, [plansMenu]);

	const togglePlansMenu = () => {
		setPlansMenu(!plansMenu);
	};

	const onPlanClicked = async (plan) => {
		planActions.setPlan(plan)
		togglePlansMenu()
	};

	// const onDeletePlanClicked = async (id) => {
	// 	let deletedPlan = await API.deletePlan(id)
	// 	let newPlans = [...plans]

	// 	newPlans.forEach(plan => {
	// 		if(plan._id == id){
	// 			let index = plans.indexOf(plan)
	// 			newPlans.splice(index, 1)
	// 		} 
	// 	})
	// 	setPlans(newPlans)
	// 	return console.log(deletedPlan)
	// }
{/* <IconButton onClick={onDeletePlanClicked(plan._id)} variant="contained" color="secondary"><DeleteForeverIcon fontSize="large" /></IconButton> */}
	function renderRow(props) {
		const { index, plan } = props;

		return (
			<ListItem button
				key={index}
				onClick={() => { onPlanClicked(plan) }}>
				<ListItemText primary={plan.name} /> 
			</ListItem>
		);
	}

	// const onNewPlanClicked = async () => {
	// 	planStore.setPlan([])
	// 	togglePlansMenu()
	// };

	const plans = props.selectedPlan.plans
	return (
		<div>
			<Button onClick={togglePlansMenu}>Set Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={plansMenu} onClose={togglePlansMenu}>
				<DialogTitle>Select Plan</DialogTitle>
				<DialogContent>
					<List itemCount={plans.length}>
						{/* <ListItem button
							onClick={() => { onNewPlanClicked() }}>
							<ListItemText primary={'New Plan'} />
						</ListItem> */}
						{plans.map((plan, index) => {
							return renderRow({ index, plan });
						})}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={togglePlansMenu} color="primary">
						Cancel
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}));