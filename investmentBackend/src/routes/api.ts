// const express = require('express')
// const Plan = require('./plan')
import express from 'express';
const router = express.Router()
import Plan from '../db/plan';
import {Investment} from './../db/Investment';

router.get('/', function (req, res) {
	res.send('Hello welcome to my server')
});

router.get('/getPlans', async function (req, res) {
	console.log('fetching plans')
	const plans = await Plan.find({}).populate('investments').exec()
	res.send(plans)
});

router.get('/getPlan/:planId',async function (req, res) {
	console.log('fetching plan')
	const _id = req.params.planId
	 let plan = await Plan.findById(_id).exec();
	res.send(plan)
});

router.post('/createPlan', function (req, res) {
	console.log('creating plan')
	const name = req.body.name

	const plan = new Plan({ name })
	plan.save()
	res.json(plan)
});

router.put('/updatePlan/:id/:name',async function (req, res) {
	console.log('updating plan')
	const _id = req.params.id
	const name = req.params.name
	const options = {new:true}
	const plan = await Plan.findByIdAndUpdate(_id, { name }, options)
	res.send(plan)
});

router.put('/addInvestment/:id',async function (req, res) {
	console.log('addInvestment')
	const _id = req.params.id
	const investment = req.body.investment
	
	const newInvestment = new Investment(investment)
	const plan = await Plan.findById(_id).populate("investments").exec()
	plan.investments.push(newInvestment)
	await plan.save()

	res.send(newInvestment)
});

router.delete('/deleteInvestment/:id/:planId',async function (req, res) {
	console.log('deleteInvestment')
	const _id = req.params.id
	const planId = req.params.planId

	const plan = await Plan.findById(planId).populate("investments").exec()
	plan.investments.pull({ _id })
	await plan.save()

	res.status(200).send('Success!');
});

router.delete('/deletePlan/:planId',async function (req, res) {
	console.log('delete plan')
	const _id = req.params.planId

	 let plan = await Plan.findByIdAndDelete(_id)
	res.send(plan)
});

export default router