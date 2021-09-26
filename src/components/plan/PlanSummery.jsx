import React from "react";
import { useStyles } from '../../constants'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const PlanSummery = (props) => {
	const classes = useStyles();
	const plan = props.plan

	return (
		<div> {plan.id ? <Card variant="outlined" >
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
	</Card> : <h3>Set plan to watch summery</h3> }
			
		</div>
	)
};