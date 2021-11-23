"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plansRouter = express_1.default.Router();
const plans_1 = require("../actions/plans");
//plans
plansRouter.get("/getPlans/:userId", plans_1.getPlans);
plansRouter.get("/getPlan/:planId/:userId", plans_1.getPlan);
plansRouter.post("/createPlan/:userId", plans_1.createPlan);
plansRouter.put("/updatePlan/:planId/:name/:userId", plans_1.updatePlan);
plansRouter.delete("/deletePlan/:planId/:userId", plans_1.deletePlan);
exports.default = plansRouter;
