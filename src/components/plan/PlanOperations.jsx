import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SetPlan } from "./SetPlan";
import { UpdatePlan } from "./UpdatePlan";
import { NewPlan } from "./NewPlan";
import { DeletePlan } from "./DeletePlan";


export const PlanOperations = (props) => {
  const plan = props.plan;

  return (
    <div className="planControlContainer">
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
};