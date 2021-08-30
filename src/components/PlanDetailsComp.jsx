import React from "react";
import { observer, inject } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../constants'
import { AddInvestmentComp } from './AddInvestment'
import { TimeFrameComp } from './TimeFrameComp'
import { SavePlanComp } from './SavePlanComp'
import { SetPlanComp } from './SetPlanComp'
import { UpdatePlanComp } from './UpdatePlanComp'
import { NewPlanComp } from './NewPlanComp'
import { DeletePlanComp } from './DeletePlanComp'

export const PlanDetailsComp = inject("planStore")(observer((props) => {
	const classes = useStyles();
	const planStore = props.planStore


	return (
		<div>
			<Card variant="outlined">
				<div className={classes.planSummeryContainer}>
					<div className={classes.planSummerySubContainers}>
						<AddInvestmentComp />
						<TimeFrameComp />
					</div>
					<Card variant="outlined" >
						<CardContent>
							<Typography className={classes.planSummeryCardTitle} color="textSecondary" gutterBottom>
								{planStore.planName} Plan Summery
       						</Typography>
							<div className={classes.planSummeryCard}>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									{planStore.timeFrame} {planStore.timeFrame > 1 ? 'years plan' : 'year plan'}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									Invested: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.planStore.totalInvestmentAmount)}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									revenue: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.planStore.interestAmount)}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.planStore.totalAmount)}
								</Typography>
							</div>
						</CardContent>
					</Card>
					<div className={classes.planSummerySubContainers}>
						<NewPlanComp />
						<SetPlanComp />
						<UpdatePlanComp />
						<SavePlanComp />
						<DeletePlanComp />
					</div>
				</div>
			</Card>
		</div>
	)
}));