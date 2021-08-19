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

export const NewPlanComp = inject("planStore")(observer((props) => {

	const planStore = props.planStore
	
	const onNewPlanClicked = async () => {
		planStore.setPlan([])
	};

	return (
		<div>
		<Button color="primary" onClick={onNewPlanClicked}>New Plan</Button>
		</div>
	)
}));