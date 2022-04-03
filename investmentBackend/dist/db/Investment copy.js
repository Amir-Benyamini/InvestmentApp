"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Investment = exports.InvestmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.InvestmentSchema = new Schema({
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
}, { timestamps: true });
exports.Investment = mongoose_1.default.model("Investment", exports.InvestmentSchema, "investments");
