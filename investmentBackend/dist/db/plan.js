"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = exports.PlanSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Investment_1 = require("./Investment");
const Schema = mongoose_1.default.Schema;
exports.PlanSchema = new Schema({
    name: { type: String, required: true },
    investments: [Investment_1.InvestmentSchema]
}, { timestamps: true });
exports.Plan = mongoose_1.default.model("Plan", exports.PlanSchema, "plans");
