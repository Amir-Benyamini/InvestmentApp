import mongoose from 'mongoose';
import InvestmentDoc from '../interfaces/investmentDoc';

const Schema = mongoose.Schema


export const InvestmentSchema = new Schema({
	amount: { type: Number, required: true },
	name: { type: String, required: true },
	currency: { type: String, required: true },
	revPerYear: { type: Number, required: true },
	company: { type: String, required: true },
	endDate: { type: Date, required: false },
	liquidity: { type: String, required: true },
	type: { type: String, required: true },
	subType: { type: String, required: false },
	isCompanyCapital: { type: Boolean, required: true },
	isRegulated: { type: Boolean, required: true }
}, { timestamps: true })

export const Investment = mongoose.model<InvestmentDoc>("Investment", InvestmentSchema, "investments")
