import { Request, Response } from "express";
import { Rates } from "../db/rates";

export const getRates = async function (req: Request, res: Response) {
  console.log("fetching rates");
  let allRates = await Rates.find({})
  if (allRates[0]) {
    return res.send(allRates[0].latest);
  } else {
    return res.status(404).json({
      error: "rates not found",
    });
  }
};