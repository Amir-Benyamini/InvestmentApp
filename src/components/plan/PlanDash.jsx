import React, { useEffect } from "react";
import { PlanHeader } from "./PlanHeader";
import { observer, inject } from "mobx-react";
import {PlusButton} from "../FinancialComponents/PlusButton"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { StyledTableRow, StyledTableCell } from "../../constans/styling";
import * as investmentsActions from "../../actions/Investment";
import * as loanActions from "../../actions/Loan";
import * as planActions from "../../actions/Plan";


export const PlanDash = inject("plansStore")(
  observer((props) => {
    // const userId = JSON.parse(localStorage.getItem("user"))._id;
    const selectedPlan = props.plansStore.plan;
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(async () => {
      planActions.fetchFirstPlan(user);
    }, []);

    return (
      <div>
        <PlanHeader plan={selectedPlan} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Sub Type</StyledTableCell>
                <StyledTableCell align="center">Company</StyledTableCell>
                <StyledTableCell align="center">Currancy</StyledTableCell>
                <StyledTableCell align="center">
                  Amount&nbsp;(₪)
                </StyledTableCell>
                <StyledTableCell align="center">
                  EST. Yield / Interest
                </StyledTableCell>
                <StyledTableCell align="center">
                EST. Profit / Loss&nbsp;(₪)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Risk Grade&nbsp;(0-100)
                </StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedPlan.data.map((item) => (<StyledTableRow key={item.id}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.type} </StyledTableCell>
                  <StyledTableCell align="center">{item.subType ? item.subType : "-" } </StyledTableCell>
                  <StyledTableCell align="center">{item.company} </StyledTableCell>
                  <StyledTableCell align="center">{item.currency} </StyledTableCell>

                  <StyledTableCell align="center">{
                  item.currency !== "ILS"
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(item.convertedAmount)
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(item.amount)} </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.type == "Investment" ? new Intl.NumberFormat("en-US", {
                      style: "percent",
                      maximumFractionDigits: 2,
                    }).format(item.revPerYear / 100) : new Intl.NumberFormat("en-US", {
                      style: "percent",
                      maximumFractionDigits: 2,
                    }).format(item.interest / 100)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.subType === "Stock-Market"
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(
                          item.compoundInterest(selectedPlan.timeFrame)
                        )
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(item.interestAmount(selectedPlan.timeFrame))}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.type === "Investment" ? new Intl.NumberFormat("en-US", {
                      style: "percent",
                    }).format(item.risk(selectedPlan.timeFrame)): "-"}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        if(item.type === "Investment"){
                          investmentsActions.deleteInvestment(
                            item.id,
                            user._id
                          );
                        } if(item.type === "Loan") {
                          loanActions.deleteLoan(
                            item.id,
                            user._id
                            );
                        }
                      }}
                      disableRipple={true}
                      color="error"
                    >
                      <DeleteForeverIcon color="error" fontSize="large" />
                    </IconButton>
                  </StyledTableCell>
                  </StyledTableRow>))}
              {/* {selectedPlan.investments.map((investment) => (
                <StyledTableRow key={investment.id}>
                  <StyledTableCell>{investment.name}</StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.company}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.type}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.currency === "" ? "ILS" : investment.currency}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {investment.currency !== "ILS"
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(investment.convertedAmount)
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "ILS",
                          notation: "compact",
                        }).format(investment.amount)}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {new Intl.NumberFormat("en-US", {
                      style: "percent",
                      maximumFractionDigits: 2,
                    }).format(investment.revPerYear / 100)}
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
                          user._id
                        );
                      }}
                      disableRipple={true}
                      color="error"
                    >
                      <DeleteForeverIcon color="error" fontSize="large" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>

        <PlusButton />
      </div>
    );
  })
);
