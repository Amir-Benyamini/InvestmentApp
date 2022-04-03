"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratesRouter = express_1.default.Router();
const rates_1 = require("../actions/rates");
//plans
ratesRouter.get("/getRates", rates_1.getRates);
exports.default = ratesRouter;
