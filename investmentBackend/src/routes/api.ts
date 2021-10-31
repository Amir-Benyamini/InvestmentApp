// const express = require('express')
// const Plan = require('./plan')
import express from 'express';
const router = express.Router()
import {Plan} from '../db/plan';
import User from '../db/user';
import {Investment} from './../db/Investment';

router.get('/', function (req, res) {
	res.send('Hello welcome to my server')
});

//plans
router.get('/getPlans/:userId', async function (req, res) {
	console.log('fetching plans')
	const userId = req.params.userId
	const user = await User.findById(userId).populate("plans").exec()
	const plans = user.plans
	res.send(plans)
});

router.get('/getPlan/:planId/:userId',async function (req, res) {
	console.log('fetching plan')
	const planId = req.params.planId
	const userId = req.params.userId
	const user = await User.findById(userId).populate("plans").exec()
	const plan = await user.plans.id(planId)
	res.send(plan)
});

router.post('/createPlan/:name/:userId', async function (req, res) {
	console.log('creating plan')
	const name = req.params.name
	const userId = req.params.userId

	const plan = new Plan({ name })
	const user = await User.findById(userId).populate("plans").exec()
	user.plans.push(plan)

	user.save()
	res.json(plan)
});

router.put('/updatePlan/:planId/:name/:userId',async function (req, res) {
	console.log('updating plan')
	const planId = req.params.planId
	const userId = req.params.userId
	const name = req.params.name

	const user = await User.findById(userId).populate("plans").exec()
	const plan = await user.plans.id(planId)
	plan.name = name

	res.send(plan)
});

router.delete('/deletePlan/:planId/:userId',async function (req, res) {
	console.log('delete plan')
	const planId = req.params.planId
	const userId = req.params.userId
	const user = await User.findById(userId).populate("plans").exec()
	const options = {new:true}
	let plans = await user.plans.pull(planId, options)

	user.save()
	
	res.send(plans)
});

//investments
router.put('/addInvestment/:planId/:userId',async function (req, res) {
	console.log('addInvestment')
	const planId = req.params.planId
	const userId = req.params.userId
	const investment = req.body.investment
	
	const newInvestment = new Investment(investment)

	const user = await User.findById(userId).populate("plans").exec()
	const plan = await user.plans.id(planId)

	plan.investments.push(newInvestment)
	await user.save()
	res.send(newInvestment)
});

router.delete('/deleteInvestment/:investmentId/:planId/:userId',async function (req, res) {
	console.log('deleteInvestment')
	const investmentId = req.params.investmentId
	const planId = req.params.planId
	const userId = req.params.userId
	const options = {new:true}

	const user = await User.findById(userId).populate("plans").exec()
	const plan = await user.plans.id(planId)

	let investments = await plan.investments.pull(investmentId, options)

	// const plan = await Plan.findById(planId).populate("investments").exec()
	// plan.investments.pull({ _id })
	await user.save()

	res.send(investments);
});


export default router