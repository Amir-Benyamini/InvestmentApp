import mongoose from 'mongoose';
import {InvestmentSchema} from './Investment';

const Schema = mongoose.Schema

export const PlanSchema = new Schema({
	 name: { type: String, required: true },
	 investments: [InvestmentSchema]
})



export const Plan = mongoose.model("Plan", PlanSchema, "plans")