import React from "react";
import { useStyles } from '../../constants'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { observer } from "mobx-react";

export const PlanSummery = observer((props) => {
	const classes = useStyles();
	const plan = props.plan

	return (
		<div>
			<Card variant="outlined" >
				<CardContent>
					<Typography variant='h5' className={classes.planSummeryCardTitle} color="textSecondary" gutterBottom>
						{plan.id  ? `${plan.name} Summery` : 'There is no plan yet, please set plan.'}
					</Typography>
				</CardContent>
				<div className={classes.planSummeryCard}>
					{plan.id && plan.investments.length > 0 ?
					<CardContent>
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
					</CardContent>
						:
						<CardContent>
							<Typography className={classes.planSummeryCardTitle} color="subtitle1" gutterBottom>
								There is no investments yet, please add investments.
						 </Typography>
						</CardContent>
					}
				</div>
			</Card>
		</div >
	)
});