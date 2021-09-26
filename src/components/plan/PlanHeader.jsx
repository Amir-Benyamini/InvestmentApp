import React from "react";
import { useStyles } from '../../constants'
import Card from '@material-ui/core/Card';
import {InvestmentsOperations} from '../InvestmentsOperations'
import {PlanOperations} from './PlanOperations'
import {PlanSummery} from './PlanSummery'

export const PlanHeader = (props) => {
	const classes = useStyles();
	const plan = props.plan
	
	return (
		<div>
			<Card className={classes.planSummeryContainer} variant="outlined">
			<InvestmentsOperations />
			<PlanSummery plan={plan}/>
			<PlanOperations />
			</Card>
		</div>
	)
};