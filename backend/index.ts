import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { getHome } from "./src/modules/getHome";
import { login } from "./src/modules/login";
import { register } from "./src/modules/register";
import { isLoggedIn } from "./src/utils/isLoggedIn";
import { PORT } from "./config";

const app = express();

app.use(cors(), express.json(), cookieParser());

app.post("/login", login);
app.post("/register", register);
app.post("/groups", isLoggedIn, register);
app.get("/groups", isLoggedIn, getHome);
app.get("/bills", isLoggedIn, getHome);

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
