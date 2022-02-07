import React from "react";
import { AddInvestment } from "./AddInvestment";
import { TimeFrame } from "../plan/TimeFrame";

export const InvestmentsOperations = () => {
  return (
    <div className="control-panel">
      <AddInvestment />
      <TimeFrame />
    </div>
  );
};


