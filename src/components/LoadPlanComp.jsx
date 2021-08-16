//first load all plan names from db and render them in a card, then choose a name so you can fetch  it from db and push it to plan store so its render on plandash.
import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react'
import { Investment } from "../objects/Investment";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../services/api';
import { useStyles } from '../constants'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts'
import { PanTool } from "@material-ui/icons";



export const LoadPlanComp = inject("planStore", "ratesStore")(observer((props) => {
	const classes = useStyles();
	const [loadMenu, setLoadMenu] = useState(false)
	const [plans, setPlans] = useState([])
	const planStore = props.planStore

	useEffect(async () => {
		let plans = await API.getPlans()
		let plansMaped = plans.map(plan => 
			plan = {planName: plan.planName, _id: plan._id}
		)
		setPlans(plansMaped)
	}, []);

	const toggleLoadMenu = () => {
		setLoadMenu(!loadMenu);
	}

	const onLoadPlanClicked = async (planId) => {
		let plan = await API.getPlan(planId)

		const investmentsInstances = []
		plan.investments.forEach((investment) => {
			const investmentInstance = new Investment(investment, props.ratesStore.latestRates.quotes.USDILS)
			investmentsInstances.push(investmentInstance)
		})
		planStore.setPlan(investmentsInstances)
		toggleLoadMenu()
	};

	function renderRow(props) {
		const { index, plan } = props;

		return (
			<ListItem button
				key={index}
				onClick={() => { onLoadPlanClicked(plan._id) }}>
				<ListItemText primary={plan.planName} />
			</ListItem>
		);
	}



	return (
		<div>

			<Button onClick={toggleLoadMenu}>load Plan</Button>
			<Dialog disableBackdropClick disableEscapeKeyDown open={loadMenu} onClose={toggleLoadMenu}>
				<DialogTitle>Select Plan</DialogTitle>
				<DialogContent>
					<List itemCount={plans.length}>
						{plans.map((plan, index) => {
							return renderRow({ index, plan });
						})}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleLoadMenu} color="primary">
						Cancel
          </Button>
				</DialogActions>
			</Dialog>


		</div>

	)
}))