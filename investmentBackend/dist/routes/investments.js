"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const investmentsRouter = express_1.default.Router();
const investments_1 = require("../actions/investments");
investmentsRouter.put("/addInvestment/:planId/:userId", investments_1.addInvestment);
investmentsRouter.delete("/deleteInvestment/:investmentId/:planId/:userId", investments_1.deleteInvestment);
exports.default = investmentsRouter;
