import User from "../db/user";
import { Investment } from "./../db/Investment";
import { Request, Response } from "express";

export const addInvestment = async function (req: Request, res: Response) {
  console.log("addInvestment");
  const planId = req.params.planId;
  const userId = req.params.userId;
  const investment = req.body.investment;

  const newInvestment = new Investment(investment);
  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    const plan = await user.plans.id(planId);
    if (plan) {
      plan.investments.push(newInvestment);
      await user.save();
      res.send(newInvestment);
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

export const deleteInvestment = async function (req: Request, res: Response) {
  console.log("deleteInvestment");
  const investmentId = req.params.investmentId;
  const planId = req.params.planId;
  const userId = req.params.userId;
  const options = { new: true };

  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    const plan = await user.plans.id(planId);
    if (plan) {
      let investments = await plan.investments.pull(investmentId, options);
      await user.save();
      res.send(investments);
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
