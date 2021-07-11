const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema({
    planName: { type: String, required: true },
    investments: Array
})

const Plan = mongoose.model("plan", planSchema)

module.exports = Plan