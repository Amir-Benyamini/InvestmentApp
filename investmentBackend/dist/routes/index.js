"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = void 0;
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const investments_1 = __importDefault(require("./investments"));
const loans_1 = __importDefault(require("./loans"));
const plans_1 = __importDefault(require("./plans"));
const rates_1 = __importDefault(require("./rates"));
const initializeRoutes = (app) => {
    app.use("/auth", auth_1.default);
    app.use("/user", user_1.default);
    app.use("/investments", investments_1.default);
    app.use("/loans", loans_1.default);
    app.use("/plans", plans_1.default);
    app.use("/rates", rates_1.default);
};
exports.initializeRoutes = initializeRoutes;
