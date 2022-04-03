"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rates = exports.RatesSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.RatesSchema = new Schema({
    latest: Object
}, { timestamps: true });
exports.Rates = mongoose_1.default.model("Rates", exports.RatesSchema);
