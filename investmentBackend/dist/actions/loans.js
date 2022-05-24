"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoan = exports.addLoan = void 0;
const user_1 = __importDefault(require("../db/user"));
const Loan_1 = require("./../db/Loan");
const addLoan = async function (req, res) {
    console.log("addLoan");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const loan = req.body.loan;
    const newLoan = new Loan_1.Loan(loan);
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            plan.loans.push(newLoan);
            await user.save();
            res.send(newLoan);
        }
        else {
            return res.status(404).json({
                error: "Plan not found",
            });
        }
    }
    else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};
exports.addLoan = addLoan;
const deleteLoan = async function (req, res) {
    console.log("deleteLoan");
    const loanId = req.params.loanId;
    const planId = req.params.planId;
    const userId = req.params.userId;
    const options = { new: true };
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            let loans = await plan.loans.pull(loanId, options);
            await user.save();
            res.send(loans);
        }
        else {
            return res.status(404).json({
                error: "Plan not found",
            });
        }
    }
    else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};
exports.deleteLoan = deleteLoan;
