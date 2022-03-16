"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlan = exports.getPlans = void 0;
const plan_1 = require("../db/plan");
const user_1 = __importDefault(require("../db/user"));
const getPlans = async function (req, res) {
    console.log("fetching plans");
    const userId = req.params.userId;
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plans = user.plans;
        if (plans) {
            return res.send(plans);
        }
        else {
            return res.status(404).json({
                error: "Plans not found",
            });
        }
    }
    else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};
exports.getPlans = getPlans;
const getPlan = async function (req, res) {
    console.log("fetching plan");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            res.send(plan);
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
exports.getPlan = getPlan;
const createPlan = async function (req, res) {
    console.log("creating plan");
    const name = req.body.name;
    const userId = req.params.userId;
    const plan = new plan_1.Plan({ name });
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        user.plans.push(plan);
        user.save();
        return res.json(plan);
    }
    else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};
exports.createPlan = createPlan;
const updatePlan = async function (req, res) {
    console.log("updating plan");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const name = req.params.name;
    const user = await user_1.default.findById(userId).populate("plans").exec();
    if (user) {
        const plan = await user.plans.id(planId);
        if (plan) {
            plan.name = name;
            user.save();
            return res.json(plan);
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
exports.updatePlan = updatePlan;
const deletePlan = async function (req, res) {
    console.log("delete plan");
    const planId = req.params.planId;
    const userId = req.params.userId;
    const user = await user_1.default.findById(userId).populate("plans").exec();
    const options = { new: true };
    if (user) {
        let plans = await user.plans.pull(planId, options);
        user.save();
        return res.json(plans);
    }
    else {
        return res.status(404).json({
            error: "User not found",
        });
    }
};
exports.deletePlan = deletePlan;
