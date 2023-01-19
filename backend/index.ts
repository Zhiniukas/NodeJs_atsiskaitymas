import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { getHome } from "./src/modules/getHome";
import { login } from "./src/modules/login";
import { register } from "./src/modules/register";
import { isLoggedIn } from "./src/utils/isLoggedIn";

const app = express();
const PORT = process.env.port || 5001;


app.use(cors(), express.json(), cookieParser());

app.get("/user-settings", isLoggedIn, getHome);
app.post("/login", login);
app.post("/register", register);

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
