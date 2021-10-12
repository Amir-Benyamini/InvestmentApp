"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
// const Plan = require('./plan')
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const plan_1 = __importDefault(require("../db/plan"));
const Investment_1 = require("./../db/Investment");
router.get('/', function (req, res) {
    res.send('Hello welcome to my server');
});
router.post('/signUp', async function (req, res) {
    console.log('signing up');
});
router.get('/getPlans', async function (req, res) {
    console.log('fetching plans');
    const plans = await plan_1.default.find({}).populate('investments').exec();
    res.send(plans);
});
router.get('/getPlan/:planId', async function (req, res) {
    console.log('fetching plan');
    const _id = req.params.planId;
    let plan = await plan_1.default.findById(_id).exec();
    res.send(plan);
});
router.post('/createPlan', function (req, res) {
    console.log('creating plan');
    const name = req.body.name;
    const plan = new plan_1.default({ name });
    plan.save();
    res.json(plan);
});
router.put('/updatePlan/:id/:name', async function (req, res) {
    console.log('updating plan');
    const _id = req.params.id;
    const name = req.params.name;
    const options = { new: true };
    const plan = await plan_1.default.findByIdAndUpdate(_id, { name }, options);
    res.send(plan);
});
router.put('/addInvestment/:id', async function (req, res) {
    console.log('addInvestment');
    const _id = req.params.id;
    const investment = req.body.investment;
    const newInvestment = new Investment_1.Investment(investment);
    const plan = await plan_1.default.findById(_id).populate("investments").exec();
    plan.investments.push(newInvestment);
    await plan.save();
    res.send(newInvestment);
});
router.delete('/deleteInvestment/:id/:planId', async function (req, res) {
    console.log('deleteInvestment');
    const _id = req.params.id;
    const planId = req.params.planId;
    const plan = await plan_1.default.findById(planId).populate("investments").exec();
    plan.investments.pull({ _id });
    await plan.save();
    res.status(200).send('Success!');
});
router.delete('/deletePlan/:planId', async function (req, res) {
    console.log('delete plan');
    const _id = req.params.planId;
    let plan = await plan_1.default.findByIdAndDelete(_id);
    res.send(plan);
});
exports.default = router;
