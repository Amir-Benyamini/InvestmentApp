const express = require('express')
const router = express.Router()

const Plan = require('../db/model/plan')

router.get('/', function (req, res) {
	res.send('Hello welcome to my server')
});

router.get('/getPlans', function (req, res) {
	console.log('fetching plans')
	Plan.find({}, function (err, plans) {
		res.send(plans)
	})
});

router.get('/getPlan/:planId',async function (req, res) {
	console.log('fetching plan')
	const _id = req.params.planId
	 let plan = await Plan.findById(_id).exec();
	res.send(plan)
});



router.post('/savePlan', function (req, res) {
	console.log('saving plan')
	const investments = req.body.investments
	const planName = req.body.planName

	const plan = new Plan({ planName, investments })
	plan.save()
	res.send('plan saved')
});

router.put('/updatePlan/:planId/:planName',async function (req, res) {
	console.log('updating plan')
	const _id = req.params.planId
	const planName = req.params.planName
	const investments = req.body.investments
	const options = {new:true}
	 let plan = await Plan.findByIdAndUpdate(_id, {planName: planName, investments: investments }, options)
	res.send(plan)
});

router.delete('/deletePlan/:planId',async function (req, res) {
	console.log('delete plan')
	const _id = req.params.planId

	 let plan = await Plan.findByIdAndDelete(_id)
	res.send(plan)
});
module.exports = router