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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

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

							<TableCell className={classes.headerCells} align='center'>Investment Amount&nbsp;(₪)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Currency</TableCell>

							<TableCell className={classes.headerCells} align='center'>Interest Amount&nbsp;(₪)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Compound Interest Amount&nbsp;(₪)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Risk Grade&nbsp;(0-100)</TableCell>

							<TableCell className={classes.headerCells} align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{Investments.map((investment) => (
							<TableRow key={investment.name}>
								<TableCell align="center">{investment.name}</TableCell>
								<TableCell align="center">{investment.company}</TableCell>
								<TableCell align="center">{investment.currency === 'USD' ? rateStore.convertUSDILS(investment.amount) : investment.amount}</TableCell>
								<TableCell align="center">{investment.currency}</TableCell>
								<TableCell align="center">{investment.currency === 'USD' ? rateStore.convertUSDILS(investment.interest(timeFrame)) : investment.interest(timeFrame)}</TableCell>
								<TableCell align="center">{investment.currency === 'USD' ? rateStore.convertUSDILS(investment.compoundInterest(timeFrame)) : investment.compoundInterest(timeFrame)}</TableCell>
								<TableCell align="center">{investment.risk(timeFrame)}</TableCell>
								<TableCell align="center"><IconButton onClick={() => {
									props.planStore.deleteInvestment(investment)
								}} variant="contained" color="secondary"><DeleteForeverIcon fontSize="large" /></IconButton></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</div>
	)
}))