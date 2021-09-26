import React from "react";
import { useStyles } from '../../constants'
import { SetPlan } from './SetPlan'
import { UpdatePlan } from './UpdatePlan'
import { NewPlan } from './NewPlan'
import { DeletePlan } from './DeletePlan'

export const PlanOperations = () => {
	const classes = useStyles();

	return (
		<div className={classes.planSummerySubContainers}>
			<NewPlan />
			<SetPlan />
			<UpdatePlan />
			{/* <SavePlan investments={investments}/> */}
			<DeletePlan />
		</div>
	)
};