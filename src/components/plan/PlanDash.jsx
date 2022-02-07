import React from "react";
import { PlanHeader } from './PlanHeader'
import { observer, inject } from "mobx-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { StyledTableRow, StyledTableCell } from "../../constans/styling";
import * as investmentsActions from "../../actions/investments";

export const PlanDash = inject("plansStore")(
  observer((props) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const selectedPlan = props.plansStore.plan;

    return (
      <div>
        <PlanHeader plan={selectedPlan} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Asset</StyledTableCell>
                <StyledTableCell align="center">Company</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">
                  Investment Amount&nbsp;(₪)
                </StyledTableCell>
                <StyledTableCell align="center">Currancy</StyledTableCell>

                <StyledTableCell align="center">
                  Interest Amount&nbsp;(₪)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Risk Grade&nbsp;(0-100)
                </StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedPlan.investments.map((investment) => (
                <StyledTableRow key={investment.name}>
                  <StyledTableCell>{investment.name}</StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.company}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.type}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.currency === "USD"
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(investment.baseAmount)
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(investment.amount)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.currency === "" ? "ILS" : investment.currency}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.type === "Stock-Market"
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(
                          investment.compoundInterest(selectedPlan.timeFrame)
                        )
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(investment.interest(selectedPlan.timeFrame))}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {new Intl.NumberFormat("en-US", {
                      style: "percent",
                    }).format(investment.risk(selectedPlan.timeFrame))}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        investmentsActions.deleteInvestment(
                          investment.id,
                          userId
                        );
                      }}
                      disableRipple={true}
                      color="error"
                    >
                      <DeleteForeverIcon color="error" fontSize="large" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  })
);