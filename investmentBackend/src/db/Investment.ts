import mongoose from 'mongoose';

const Schema = mongoose.Schema

export const InvestmentSchema = new Schema({
	amount: { type: Number, required: true },
	// currencyRate: { type: Number, required: true },
	name: { type: String, required: true },
	currency: { type: String, required: true },
	revPerYear: { type: Number, required: true },
	company: { type: String, required: true },
	endDate: { type: Date, required: false },
	liquidity: { type: String, required: true },
	type: { type: String, required: true },
	isCompanyCapital: { type: Boolean, required: true },
	isRegulated: { type: Boolean, required: true }
})

export const Investment = mongoose.model("Investment", InvestmentSchema, "investments")
