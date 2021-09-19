import mongoose from 'mongoose';
import {InvestmentSchema} from './Investment';

const Schema = mongoose.Schema

const planSchema = new Schema({
	 name: { type: String, required: true },
	 investments: [InvestmentSchema]
})

const Plan = mongoose.model("Plan", planSchema)

export default Plan