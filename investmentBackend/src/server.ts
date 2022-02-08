import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import { initializeRoutes } from "./routes/index";
import connectDB from "./db/connection";
import bodyParser from "body-parser";
import path from "path";

const app = express();
connectDB();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
initializeRoutes(app);

// app.get("/", function (req, res) {
//   res.send("Hello welcome to my server");
// });


  const publicPath = path.join(__dirname, "..", "..", "build");
  app.use(express.static(path.resolve(__dirname, "..", "..", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });


console.log(`${__dirname}`);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
