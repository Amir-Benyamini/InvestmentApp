"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loansRouter = express_1.default.Router();
const loans_1 = require("../actions/loans");
loansRouter.put("/addLoan/:planId/:userId", loans_1.addLoan);
loansRouter.delete("/deleteLoan/:loanId/:planId/:userId", loans_1.deleteLoan);
exports.default = loansRouter;
