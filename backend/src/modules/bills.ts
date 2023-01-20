import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

export const getBills = async (req, res) => {
  const groupId = req.params.group_id;
  const accessToken = req.headers.authorization;
  let payload = null;

  try {
    payload = jwt.verify(accessToken.replace("Bearer ", ""), jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised groups" }).end();
    }
    return res.status(400).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const result = await con.execute(
      `SELECT users.full_name, bills.id AS "bill_id", bills.description, bills.ammount,${MYSQL_CONFIG.database}.groups.name, ${MYSQL_CONFIG.database}.groups.id AS "group_id"  
        FROM (${MYSQL_CONFIG.database}.groups INNER JOIN bills ON ${MYSQL_CONFIG.database}.groups.id = bills.group_id) INNER JOIN users ON bills.user_id = users.id
        WHERE ${MYSQL_CONFIG.database}.groups.id= ${groupId};`
    );
    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const postBill = async (req, res) => {
  const groupId = req.body.groupId;
  const ammount = +req.body.ammount;
  const description = req.body.description;

  const accessToken = req.headers.authorization;
  let payload = null;

  try {
    payload = jwt.verify(accessToken.replace("Bearer ", ""), jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .send({ error: "User unauthorised accounts" })
        .end();
    }
    return res.status(400).end();
  }

  const cleanGroupId = mysql.escape(groupId).replaceAll("'", "");
  const cleanAmmount = mysql.escape(ammount).replaceAll("'", "");
  const cleanDescription = mysql.escape(description).replaceAll("'", "");

  if (typeof groupId !== "number" || !groupId) {
    return res
      .status(400)
      .send(`Incorrect group ID provided: ${groupId}`)
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO bills (group_id, ammount, description, user_id) VALUES('${cleanGroupId}', '${cleanAmmount}', '${cleanDescription}','${payload.id}')`
    );

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
