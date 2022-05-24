"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = exports.LoanSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.LoanSchema = new Schema({
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    currency: { type: String, required: true },
    interest: { type: Number, required: true },
    type: { type: String, required: true },
    subType: { type: String, required: false },
}, { timestamps: true });
exports.Loan = mongoose_1.default.model("Loan", exports.LoanSchema, "loans");
