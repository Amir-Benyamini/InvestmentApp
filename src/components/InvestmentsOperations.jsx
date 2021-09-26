import React from "react";
import { useStyles } from '../constants'
import { AddInvestment } from './AddInvestment'
import { TimeFrame } from './TimeFrame'

export const InvestmentsOperations = () => {
	const classes = useStyles();

	return (
		<div className={classes.planSummerySubContainers}>
			<AddInvestment />
			<TimeFrame />
		</div>
	)
};


