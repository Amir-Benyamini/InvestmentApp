import React from "react";
import { PlanOperations } from "./PlanOperations";
import { PlanSummery } from "./PlanSummery";

export const PlanHeader = (props) => {
  const plan = props.plan;

  return (
    <div>
      <PlanSummery plan={plan} />
      <PlanOperations plan={plan} />
    </div>
  );
};
