"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const auth_1 = require("../actions/auth");
const index_1 = require("./../validators/index");
const auth_2 = require("./../validators/auth");
authRouter.post('/signup', auth_2.userSighnupValidator, index_1.runValidation, auth_1.signup);
exports.default = authRouter;
