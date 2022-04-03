"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRates = void 0;
const rates_1 = require("../db/rates");
const axios_1 = __importDefault(require("axios"));
//check if 12 hours have passed from last update, if it passed update if not set update timer to the remaining (if 10 hours have passed set it to update in 2 houres)
//use get time on last update from timestamp - this date to get the remaining millisecounds, if its bigger then 12 hours then update.
//set it to run every 12 hours or less.
const updateRates = async () => {
    let dbRates = await rates_1.Rates.find({});
    if (dbRates[0]) {
        const lastUpdated = dbRates[0].updatedAt.getTime();
        const now = Date.now();
        const timePassed = now - lastUpdated;
        if (timePassed > 43200000) {
            let latestRates = await axios_1.default.get("https://api.currencyapi.com/v3/latest?apikey=86697850-88f9-11ec-a628-3dea19c29d44&base_currency=ILS");
            if (latestRates.status == 200) {
                dbRates[0].latest = latestRates.data.data;
                dbRates[0].save();
            }
        }
    }
    else {
        let latestRates = await axios_1.default.get("https://api.currencyapi.com/v3/latest?apikey=86697850-88f9-11ec-a628-3dea19c29d44&base_currency=ILS");
        if (latestRates.status == 200) {
            const dbRates = new rates_1.Rates();
            dbRates.latest = latestRates.data.data;
            dbRates.save();
        }
    }
};
exports.updateRates = updateRates;
