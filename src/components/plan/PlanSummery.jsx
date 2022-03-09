import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { observer } from "mobx-react";
import { TimeFrame } from "./TimeFrame";
import { DoughnutChart } from "../Analytics/DoughnutChart";
import { BarChart } from "../Analytics/BarChart";
import { LineChart } from "../Analytics/LineChart";
import { styled } from "@mui/material/styles";

export const PlanSummery = observer((props) => {
  const plan = props.plan;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <Card variant="outlined">
        <CardContent className="center-content-container">
          {!plan.id ? (
            <Typography gutterBottom={true} variant="h5" color="textSecondary">
              Please set a plan.
            </Typography>
          ) : plan.id && plan.investments.length <= 0 ? (
            <Typography gutterBottom={true} variant="h5" color="textSecondary">
              Please add an investment.
            </Typography>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs="auto" md="auto" lg="auto">
                  <Card className="summery-card-container">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <Grid item xs={12}>
                        <Typography
                          gutterBottom={true}
                          variant="subtitle1"
                          color="textSecondary"
                          sx={{ marginTop: 1 }}
                        >
                          {`${plan.name} Summery `}
                        </Typography>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          gutterBottom={true}
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {`Total Capital: ${new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "ILS",
                            notation: "compact",
                          }).format(plan.totalAmount)}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          gutterBottom={true}
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {`Total Yield: ${new Intl.NumberFormat("en-US", {
                            style: "percent",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(plan.yield)}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          gutterBottom={true}
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {`${plan.timeFrame} `}
                          {plan.timeFrame > 1 ? "Years Plan" : "Year Plan"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                        <TimeFrame />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs="auto" md="auto" lg="auto">
                  <Card className="summery-card-container">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <Grid item xs="auto" md="auto" lg="auto">
                        <DoughnutChart plan={plan} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs="auto" md="auto" lg="auto">
                  <Card className="summery-card-container">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <Grid item xs="auto" md="auto" lg="auto">
                        <LineChart plan={plan} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs="auto" md="auto" lg="auto">
                  <Card className="summery-card-container">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <Grid item xs="auto" md="auto" lg="auto">
                        <BarChart plan={plan} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
});
