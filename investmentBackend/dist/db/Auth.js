"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const authSchema = new Schema({
    type: { type: String, required: true },
    password: { type: String, required: false },
    token: { type: String, required: false },
    fullName: { type: String, required: false },
    email: { type: String, required: false },
    platformID: { type: String, required: false }
});
const Auth = mongoose_1.default.model("Auth", authSchema);
exports.default = Auth;
