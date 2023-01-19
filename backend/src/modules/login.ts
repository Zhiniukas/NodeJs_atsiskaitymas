import jwt from "jsonwebtoken";
import { TUserPayload } from "./getHome";
import mysql from "mysql2/promise";

const jwtSecret = process.env.jwtSecret; 
const MYSQL_CONFIG = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: +process.env.databasePort,
  database: process.env.database,
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const expiresIn = process.env.jwtExpires;
  const issuedAt = new Date().getTime();

  const userPayload: TUserPayload = { email, issuedAt };


  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).send({ error: "Data is incorrect" });
  }

  if (!email || !password) {
    return res
      .status(400)
      .send({ error: "Please provide userName and password" });
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT FROM users (id, email, password, full_name) WHERE email=${email}` );

    await con.end();

    console.log(result);

    // if (password !== result.password) {
    //   return res.status(400).send({ error: "Incorrect login data" });
    // }

    const token = jwt.sign(userPayload, jwtSecret, {
      algorithm: "HS256",
      expiresIn,
    }); 
  
    res.send({"accessToken":token, "issuedAt":issuedAt}).end();

  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
