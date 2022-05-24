import express from "express";
const loansRouter = express.Router();
import { addLoan, deleteLoan } from "../actions/loans";

loansRouter.put("/addLoan/:planId/:userId", addLoan);

loansRouter.delete(
    "/deleteLoan/:loanId/:planId/:userId",
    deleteLoan
);

export default loansRouter;