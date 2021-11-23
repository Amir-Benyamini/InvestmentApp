import mongoose from 'mongoose';
import {InvestmentSchema} from './Investment';
import PlanDoc from './../interfaces/planDoc';

const Schema = mongoose.Schema

export const PlanSchema = new Schema({
	 name: { type: String, required: true },
	 investments: [InvestmentSchema]
}, { timestamps: true })



export const Plan = mongoose.model<PlanDoc>("Plan", PlanSchema, "plans")