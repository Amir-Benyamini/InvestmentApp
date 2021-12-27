import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import investmentsRoutes from "./routes/investments";
import plansRoutes from "./routes/plans";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import connectDB from "./db/connection";
import bodyParser from "body-parser";
import path from "path";
const app = express();
connectDB();

//middlewares
app.use(cors()); //allow all origins
// if(process.env.NODE_ENV === 'development'){
// 	app.use(cors({origin: `http://localhost:300`}))
// };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/investments", investmentsRoutes);
app.use("/plans", plansRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get("/", function (req, res) {
  res.send("Hello welcome to my server");
});
//serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("../../build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
