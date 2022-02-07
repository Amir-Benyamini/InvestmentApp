import React from "react";
import { SetPlan } from "./SetPlan";
import { UpdatePlan } from "./UpdatePlan";
import { NewPlan } from "./NewPlan";
import { DeletePlan } from "./DeletePlan";

export const PlanOperations = () => {
  return (
    <div className="control-panel">
      <NewPlan />
      <SetPlan />
      <UpdatePlan />
      <DeletePlan />
    </div>
  );
};