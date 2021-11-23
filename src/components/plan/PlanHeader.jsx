import React from "react";
import { useStyles } from '../../constants'
import Card from '@material-ui/core/Card';
import {InvestmentsOperations} from '../Assets/InvestmentsOperations'
import {PlanOperations} from './PlanOperations'
import {PlanSummery} from './PlanSummery'

export const PlanHeader = (props) => {
	const classes = useStyles();
	const plan = props.plan
	
	return (
		<div>
			<PlanSummery plan={plan}/>
			<Card className={classes.planSummeryContainer} variant="outlined">
			<InvestmentsOperations />
			<PlanOperations />
			</Card>
		</div>
	)
};