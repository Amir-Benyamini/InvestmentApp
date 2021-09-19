"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
// const cors = require('cors')
// const api = require('./api')
// const connectDB = require('./connection')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const connection_1 = __importDefault(require("./db/connection"));
const app = (0, express_1.default)();
(0, connection_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', api_1.default);
const port = 4000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
