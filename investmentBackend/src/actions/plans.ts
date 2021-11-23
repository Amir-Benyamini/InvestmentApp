import { Request, Response } from "express";
import { Plan } from "../db/plan";
import User from "../db/user";

export const getPlans = async function (req: Request, res: Response) {
  console.log("fetching plans");
  const userId = req.params.userId;
  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    const plans = user.plans;
    if (plans) {
      return res.send(plans);
    } else {
      return res.status(404).json({
        error: "Plans not found",
      });
    }
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }
};

export const getPlan = async function (req: Request, res: Response) {
  console.log("fetching plan");
  const planId = req.params.planId;
  const userId = req.params.userId;
  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    const plan = await user.plans.id(planId);

    if (plan) {
      res.send(plan);
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

export const createPlan = async function (req: Request, res: Response) {
  console.log("creating plan");
  const name = req.body.name;
  const userId = req.params.userId;

  const plan = new Plan({ name });
  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    user.plans.push(plan);
    user.save();
    return res.json(plan);
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }
};

export const updatePlan = async function (req: Request, res: Response) {
  console.log("updating plan");
  const planId = req.params.planId;
  const userId = req.params.userId;
  const name = req.params.name;
  const user = await User.findById(userId).populate("plans").exec();
  if (user) {
    const plan = await user.plans.id(planId);
    if (plan) {
      plan.name = name;
      return res.json(plan);
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

export const deletePlan = async function (req: Request, res: Response) {
  console.log("delete plan");
  const planId = req.params.planId;
  const userId = req.params.userId;
  const user = await User.findById(userId).populate("plans").exec();
  const options = { new: true };
  if (user) {
    let plans = await user.plans.pull(planId, options);
    user.save();
    return res.json(plans);
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }
};
