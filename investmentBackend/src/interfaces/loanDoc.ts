import mongoose, { Types } from "mongoose";

interface LoanInput {
  type: string
  amount: number;
  name: string;
  company: String,
  currency: string;
  interest: number;
  subType: string;

}

export default interface LoanDoc
  extends Types.Subdocument,
  LoanInput {
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
}
