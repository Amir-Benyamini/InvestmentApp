"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRates = void 0;
const rates_1 = require("../db/rates");
const getRates = async function (req, res) {
    console.log("fetching rates");
    let allRates = await rates_1.Rates.find({});
    if (allRates[0]) {
        return res.send(allRates[0].latest);
    }
    else {
        return res.status(404).json({
            error: "rates not found",
        });
    }
};
exports.getRates = getRates;
