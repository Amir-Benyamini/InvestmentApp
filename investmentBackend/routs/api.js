const express = require('express')
const router = express.Router()

const Plan = require('../db/model/plan')

router.get('/', function (req, res) {
	res.send('Hello welcome to my server')
})

router.get('/getPlans', function (req, res) {
	console.log('fetching plans')
	Plan.find({}, function (err, plans) {
		res.send(plans)
	})
})

router.post('/savePlan', function (req, res) {
	console.log('saving plan')
	const investments = req.body.investments
	const planName = req.body.planName

	const plan = new Plan({ planName, investments })
	plan.save()
	res.send('plan saved')
})


module.exports = router