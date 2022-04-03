import mongoose from 'mongoose';

const Schema = mongoose.Schema


export const RatesSchema = new Schema({
	latest: Object
}, { timestamps: true })

export const Rates = mongoose.model("Rates", RatesSchema)
