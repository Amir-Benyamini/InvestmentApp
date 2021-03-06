import mongoose, { Types } from "mongoose";
import InvestmentDoc from "./investmentDoc";
import LoantDoc from "./loanDoc";
interface PlanInput {
  name: string;
}
export default interface PlanDoc extends Types.Subdocument, PlanInput {
  name: string;
  investments: Types.DocumentArray<InvestmentDoc>;
  loans: Types.DocumentArray<LoantDoc>;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
}
