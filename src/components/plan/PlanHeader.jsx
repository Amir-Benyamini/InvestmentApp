import React from "react";
import { InvestmentsOperations } from "../Assets/InvestmentsOperations";
import { PlanOperations } from "./PlanOperations";
import { PlanSummery } from "./PlanSummery";

export const PlanHeader = (props) => {
  const plan = props.plan;

  return (
    <div>
      <PlanSummery plan={plan} />

      <PlanOperations />
    </div>
  );
};