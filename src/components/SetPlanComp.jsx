import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { Investment } from "../objects/Investment";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../services/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

export const SetPlanComp = inject("planStore", "ratesStore")(observer((props) => {

	const [plansMenu, setPlansMenu] = useState(false)
	const [plans, setPlans] = useState([])
	const planStore = props.planStore

	useEffect(async () => {
		let plans = await API.getPlans()
		let plansMaped = plans.map(plan =>
			plan = { planName: plan.planName, _id: plan._id }
		)
		setPlans(plansMaped)
	}, [plansMenu]);

	const togglePlansMenu = () => {
		setPlansMenu(!plansMenu);
	};

	const onPlanClicked = async (planId) => {
		let plan = await API.getPlan(planId)

		const investmentsInstances = []
		plan.investments.forEach((investment) => {
			const investmentInstance = new Investment(investment, props.ratesStore.latestRates.quotes.USDILS)
			investmentsInstances.push(investmentInstance)
		})
		planStore.setPlan(investmentsInstances, planId, plan.planName)
		togglePlansMenu()
	};

	const onDeletePlanClicked = async (id) => {
		let deletedPlan = await API.deletePlan(id)
		return console.log(deletedPlan)
	}

	function renderRow(props) {
		const { index, plan } = props;

		return (
			<ListItem button
				key={index}
				onClick={() => { onPlanClicked(plan._id) }}>
				<ListItemText primary={plan.planName} /> <IconButton onClick={onDeletePlanClicked(plan._id)} variant="contained" color="secondary"><DeleteForeverIcon fontSize="large" /></IconButton>
			</ListItem>
		);
	}

	const onNewPlanClicked = async () => {
		planStore.setPlan([])
		togglePlansMenu()
	};

	return (
		<div>
			<Button onClick={togglePlansMenu}>Set Current Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={plansMenu} onClose={togglePlansMenu}>
				<DialogTitle>Select Plan</DialogTitle>
				<DialogContent>
					<List itemCount={plans.length}>
						<ListItem button
							onClick={() => { onNewPlanClicked() }}>
							<ListItemText primary={'New Plan'} />
						</ListItem>
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