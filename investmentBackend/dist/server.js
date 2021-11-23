"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const investments_1 = __importDefault(require("./routes/investments"));
const plans_1 = __importDefault(require("./routes/plans"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const connection_1 = __importDefault(require("./db/connection"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
(0, connection_1.default)();
//middlewares
app.use((0, cors_1.default)()); //allow all origins
// if(process.env.NODE_ENV === 'development'){
// 	app.use(cors({origin: `http://localhost:300`}))
// };
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
//routes
app.use("/investments", investments_1.default);
app.use("/plans", plans_1.default);
app.use("/user", user_1.default);
app.use("/auth", auth_1.default);
app.get("/", function (req, res) {
    res.send("Hello welcome to my server");
});
const port = process.env.PORT;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
