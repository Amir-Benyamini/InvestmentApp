import mongoose, { Types } from "mongoose";

interface InvestmentInput {
  type: string
  amount: number;
  name: string;
  currency: string;
  revPerYear: number;
  company: string;
  endDate: string;
  liquidity: string;
  subType: string;
  isCompanyCapital: boolean;
  isRegulated: boolean;
}

export default interface InvestmentDoc
  extends Types.Subdocument,
    InvestmentInput {
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
}
