import express from "express";
const investmentsRouter = express.Router();
import { addInvestment, deleteInvestment } from "../actions/investments";

investmentsRouter.put("/addInvestment/:planId/:userId", addInvestment);

investmentsRouter.delete(
  "/deleteInvestment/:investmentId/:planId/:userId",
  deleteInvestment
);

export default investmentsRouter;
