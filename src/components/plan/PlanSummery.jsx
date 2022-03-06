import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { observer } from "mobx-react";
import { TimeFrame } from "./TimeFrame";
import { DoughnutChart } from "../Analytics/DoughnutChart";
import { BarChart } from "../Analytics/BarChart";
export const PlanSummery = observer((props) => {
  const plan = props.plan;

  return (
    <div>
      <Card variant="outlined">
        {plan.id && plan.investments.length > 0 ? <TimeFrame /> : null}
        <CardContent className="plan-summery-container">
          {!plan.id ? (
            <Typography gutterBottom={true} variant="h5" color="textSecondary">
              Please set a plan.
            </Typography>
          ) : plan.id && plan.investments.length <= 0 ? (
            <Typography gutterBottom={true} variant="h5" color="textSecondary">
              Please add an investment.
            </Typography>
          ) : (
            <div>
              <Typography gutterBottom={true} variant="h5">
                {`${plan.name} Summery`}
              </Typography>
              <Divider />
              <div>
                <Typography
                  gutterBottom={true}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {`${plan.timeFrame} `}
                  {plan.timeFrame > 1 ? "Years Plan" : "Year Plan"}
                </Typography>

                <Typography
                  gutterBottom={true}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {`Capital Befor Investment: ${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ILS",
                    notation: "compact",
                  }).format(plan.totalInvestmentAmount)}`}
                </Typography>

                <Typography
                  gutterBottom={true}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {`Capital After Investment: ${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ILS",
                    notation: "compact",
                  }).format(plan.totalAmount)}`}
                </Typography>

                <Typography
                  gutterBottom={true}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {`Net Profit: ${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ILS",
                    notation: "compact",
                  }).format(plan.interestAmount)}`}
                </Typography>
                <Divider />
              </div>
            </div>
          )}
        </CardContent>
        {plan.id && plan.investments.length > 0 ? (
          <DoughnutChart plan={plan} />
        ) : null}
        {plan.id && plan.investments.length > 0 ? (
          <BarChart plan={plan} />
        ) : null}
      </Card>
    </div>
  );
});
