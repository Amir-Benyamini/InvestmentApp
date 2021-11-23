import express from "express";
const plansRouter = express.Router();
import {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} from "../actions/plans";

//plans
plansRouter.get("/getPlans/:userId", getPlans);

plansRouter.get("/getPlan/:planId/:userId", getPlan);

plansRouter.post("/createPlan/:userId", createPlan);

plansRouter.put("/updatePlan/:planId/:name/:userId", updatePlan);

plansRouter.delete("/deletePlan/:planId/:userId", deletePlan);

export default plansRouter;
