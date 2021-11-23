"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvestment = exports.addInvestment = void 0;
const user_1 = __importDefault(require("../db/user"));
const Investment_1 = require("./../db/Investment");
const addInvestment = async function (req, res) {
    console.log("addInvestment");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const investment = req.body.investment;
    const newInvestment = new Investment_1.Investment(investment);
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            plan.investments.push(newInvestment);
            await user.save();
            res.send(newInvestment);
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
exports.addInvestment = addInvestment;
const deleteInvestment = async function (req, res) {
    console.log("deleteInvestment");
    const investmentId = req.params.investmentId;
    const planId = req.params.planId;
    const userId = req.params.userId;
    const options = { new: true };
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            let investments = await plan.investments.pull(investmentId, options);
            await user.save();
            res.send(investments);
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
exports.deleteInvestment = deleteInvestment;
