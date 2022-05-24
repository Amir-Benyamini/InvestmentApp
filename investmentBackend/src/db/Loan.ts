import mongoose from 'mongoose';

const Schema = mongoose.Schema


export const LoanSchema = new Schema({
	amount: { type: Number, required: true },
	name: { type: String, required: true },
	company: { type: String, required: true },
	currency: { type: String, required: true },
	interest: { type: Number, required: true },
	type: { type: String, required: true },
	subType: { type: String, required: false },
}, { timestamps: true })


export const Loan = mongoose.model("Loan", LoanSchema, "loans")
