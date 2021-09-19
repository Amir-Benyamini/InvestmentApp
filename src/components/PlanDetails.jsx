import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../constants'
import { AddInvestment } from './AddInvestment'
import { TimeFrame } from './TimeFrame'
import { SetPlan } from './SetPlan'
import { UpdatePlan } from './UpdatePlan'
import { NewPlan } from './NewPlan'
import { DeletePlan } from './DeletePlan'

export const PlanDetails = (props) => {
	const classes = useStyles();
	const plan = props.plan
	
	return (
		<div>
			<Card variant="outlined">
				<div className={classes.planSummeryContainer}>
					<div className={classes.planSummerySubContainers}>
						<AddInvestment />
						<TimeFrame />
					</div>
					<Card variant="outlined" >
						<CardContent>
							<Typography className={classes.planSummeryCardTitle} color="textSecondary" gutterBottom>
								{plan.name} Plan Summery
       						</Typography>
							<div className={classes.planSummeryCard}>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									{plan.timeFrame} {plan.timeFrame > 1 ? 'years plan' : 'year plan'}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									Invested: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.plan.totalInvestmentAmount)}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									revenue: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.plan.interestAmount)}
								</Typography>
								<Typography className={classes.planSummeryCardItems} color='primary' variant="subtitle1">
									Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.plan.totalAmount)}
								</Typography>
							</div>
						</CardContent>
					</Card>
					<div className={classes.planSummerySubContainers}>
						<NewPlan />
						<SetPlan />
						<UpdatePlan />
						{/* <SavePlan investments={investments}/> */}
						<DeletePlan />
					</div>
				</div>
			</Card>
		</div>
	)
};