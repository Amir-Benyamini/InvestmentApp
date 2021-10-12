"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Investment_1 = require("./Investment");
const Schema = mongoose_1.default.Schema;
const planSchema = new Schema({
    name: { type: String, required: true },
    investments: [Investment_1.InvestmentSchema]
});
const Plan = mongoose_1.default.model("Plan", planSchema);
exports.default = Plan;
