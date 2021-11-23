import mongoose, { Document, Types } from "mongoose";
import PlanDoc from "./planDoc";

interface UserInput {
  name: string;
  email: string;
  plans: Types.DocumentArray<PlanDoc>;
  _password: string;
}

export default interface UserDoc extends Document, UserInput {
  role: string;
  hashed_password: string | undefined;
  salt: string;
  resetPasswordLink: string;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}
