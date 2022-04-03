import express from "express";
const ratesRouter = express.Router();
import {
  getRates,

} from "../actions/rates";

//plans
ratesRouter.get("/getRates", getRates);

export default ratesRouter;