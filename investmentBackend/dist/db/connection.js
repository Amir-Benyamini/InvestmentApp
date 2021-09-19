"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://bini:dn278dn278@investmentappcluster.1jghv.mongodb.net/investmentsDB?retryWrites=true&w=majority";
const connectDB = async function () {
    const conn = await mongoose_1.default.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB is connected');
    // conn.connection.db.dropDatabase();
};
exports.default = connectDB;
