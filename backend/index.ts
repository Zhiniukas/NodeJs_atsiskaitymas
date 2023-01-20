import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { login } from "./src/modules/login";
import { register } from "./src/modules/register";
import { isLoggedIn } from "./src/utils/isLoggedIn";
import { getGroups } from "./src/modules/groups";
import { postGroup } from "./src/modules/groups";
import { getBills } from "./src/modules/bills";
import { postBill } from "./src/modules/bills";
import { getAccounts } from "./src/modules/accounts";
import { postAccount } from "./src/modules/accounts";
import { PORT } from "./config";

const app = express();

app.use(cors(), express.json(), cookieParser());

app.post("/login", login);
app.post("/register", register);
app.post("/groups", isLoggedIn, postGroup);
app.get("/groups", isLoggedIn, getGroups);
app.post("/accounts", isLoggedIn, postAccount);
app.get("/accounts", isLoggedIn, getAccounts);
app.post("/bills", isLoggedIn, postBill);
app.get("/bills/:group_id", isLoggedIn, getBills);

app.get("/", (_, res) => {
  res.send({ msg: "Server is running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
