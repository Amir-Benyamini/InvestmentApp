import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SetPlan } from "./SetPlan";
import { UpdatePlan } from "./UpdatePlan";
import { NewPlan } from "./NewPlan";
import { DeletePlan } from "./DeletePlan";
import { AddInvestment } from "../Assets/AddInvestment";

export const PlanOperations = (props) => {
  const plan = props.plan;
  if (plan.id) {
    return (
      <div className="planControlContainer">
        <ButtonGroup
          className="button-group"
          variant="text"
          aria-label="Investments Operations"
        >
          <AddInvestment />
        </ButtonGroup>

        <ButtonGroup
          className="button-group"
          variant="text"
          aria-label="Plans Operations"
        >
          <NewPlan />
          <SetPlan />
          <UpdatePlan />
          <DeletePlan />
        </ButtonGroup>
      </div>
    );
  } else {
    return (
      <div className="planShortControlContainer">
        <ButtonGroup
          className="button-group"
          variant="outlined"
          aria-label="Plans Operations"
        >
          <NewPlan />
          <SetPlan />
        </ButtonGroup>
      </div>
    );
  }
};