import mongoose, { Types } from "mongoose";
import InvestmentDoc from "./investmentDoc";

interface PlanInput {
  name: string;
}
export default interface PlanDoc extends Types.Subdocument, PlanInput {
  name: string;
  investments: Types.DocumentArray<InvestmentDoc>;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
}
