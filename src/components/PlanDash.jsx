import React, { useEffect } from "react";
import { PlanDetails } from './PlanDetails'
import { observer, inject } from 'mobx-react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../constants'

// useEffect(() => {
// 	//update latest rates from rateStore to planStore
//  });

export const PlanDash = inject("plansStore")(observer((props) => {
	const classes = useStyles();
	const investments = props.plansStore.plan.investments
	const timeFrame = props.plansStore.plan.timeFrame

	return (
		<div>
			<PlanDetails plan={props.plansStore}/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow >
							<TableCell className={classes.headerCells} align='center'>Name</TableCell>

							<TableCell className={classes.headerCells} align='center'>Company</TableCell>

							<TableCell className={classes.headerCells} align='center'>Type</TableCell>

							<TableCell className={classes.headerCells} align='center'>Investment Amount&nbsp;(₪)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Currency</TableCell>

							<TableCell className={classes.headerCells} align='center'>Interest Amount&nbsp;(₪)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Risk Grade&nbsp;(0-100)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{investments.map((investment) => (
							<TableRow key={investment.name}>
								<TableCell align="center">{investment.name}</TableCell>

								<TableCell align="center">{investment.company}</TableCell>

								<TableCell align="center">{investment.type}</TableCell>

								<TableCell align="center">{investment.currency === 'USD' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(investment.baseAmount) : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(investment.amount)}</TableCell>

								<TableCell align="center">{investment.currency === '' ? 'ILS' : investment.currency}</TableCell>

								<TableCell align="center">{investment.type === 'Stock-Market' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(investment.compoundInterest(timeFrame)) : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(investment.interest(timeFrame))}</TableCell>

								<TableCell align="center">{new Intl.NumberFormat('en-US', { style: 'percent' }).format(investment.risk(timeFrame))}</TableCell>

								<TableCell align="center"><IconButton onClick={() => {
									props.plansStore.deleteInvestment(investment.id)
								}} variant="contained" color="secondary"><DeleteForeverIcon fontSize="large" /></IconButton></TableCell>
							</TableRow>
						))}

						{investments.length > 0 ? <TableRow >
							<TableCell className={classes.headerCells} align='center'>Total Amount: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS' }).format(props.plansStore.totalAmount)}</TableCell>

							<TableCell className={classes.headerCells} align='center'></TableCell>

							<TableCell className={classes.headerCells} align='center'></TableCell>

							<TableCell className={classes.headerCells} align='center'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.plansStore.totalInvestmentAmount)}</TableCell>

							<TableCell className={classes.headerCells} align='center'></TableCell>

							<TableCell className={classes.headerCells} align='center'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', notation: 'compact' }).format(props.plansStore.interestAmount)}</TableCell>

						</TableRow> : <TableRow ></TableRow>}


					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}))