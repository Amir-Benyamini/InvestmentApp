import User from "../db/user";
import { Loan } from "./../db/Loan";
import { Request, Response } from "express";

export const addLoan = async function (req: Request, res: Response) {
    console.log("addLoan");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const loan = req.body.loan;

    const newLoan = new Loan(loan);
    const user = await User.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            plan.loans.push(newLoan);
            await user.save();
            res.send(newLoan);
        } else {
            return res.status(404).json({
                error: "Plan not found",
            });
        }
    } else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};

export const deleteLoan = async function (req: Request, res: Response) {
    console.log("deleteLoan");
    const loanId = req.params.loanId;
    const planId = req.params.planId;
    const userId = req.params.userId;
    const options = { new: true };

    const user = await User.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            let loans = await plan.loans.pull(loanId, options);
            await user.save();
            res.send(loans);
        } else {
            return res.status(404).json({
                error: "Plan not found",
            });
        }
    } else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};