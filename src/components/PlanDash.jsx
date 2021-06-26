import { AddInvestmentComp } from './AddInvestment'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	headerCells: {
		fontWeight: 'bold'
	}

});

export const PlanComp = inject("planStore", "ratesStore")(observer((props) => {

	const rateStore = props.ratesStore
	const Investments = props.planStore.investments
	const timeFrame = props.planStore.timeFrame

	const classes = useStyles();

	return (
		<div>
			<AddInvestmentComp />

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow >
							<TableCell className={classes.headerCells} align='center'>Name</TableCell>
							<TableCell className={classes.headerCells} align='center'>Company</TableCell>
							<TableCell className={classes.headerCells} align='center'>Investment Amount</TableCell>
							<TableCell className={classes.headerCells} align='center'>Currency</TableCell>
							<TableCell className={classes.headerCells} align='center'>Interest</TableCell>
							<TableCell className={classes.headerCells} align='center'>Compound Interest</TableCell>
							<TableCell className={classes.headerCells} align='center'>Risk Grade&nbsp;(0-100)</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{Investments.map((row) => (
							<TableRow key={row.name}>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">{row.company}</TableCell>
								<TableCell align="center">{row.currency === 'USD' ? rateStore.convertUSDILS(row.amount) : row.amount}</TableCell>
								<TableCell align="center">{row.currency}</TableCell>
								<TableCell align="center">{row.currency === 'USD' ? rateStore.convertUSDILS(row.interest(timeFrame)) : row.interest(timeFrame)}</TableCell>
								<TableCell align="center">{row.currency === 'USD' ? rateStore.convertUSDILS(row.compoundInterest(timeFrame)):row.compoundInterest(timeFrame)}</TableCell>
								<TableCell align="center">{row.risk(timeFrame)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</div>
	)
}))