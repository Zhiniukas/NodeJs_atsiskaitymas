import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";

export const getGroups = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    // "${MYSQL_CONFIG.database}.groups.id" ir kitur reikia dėl lokalios MySQL duombazės,
    // kuri eidavo klaidomis dėl "groups" lentelės pavadinimo be database.table formato.

    const result = await con.execute(
      `SELECT ${MYSQL_CONFIG.database}.groups.id AS "group_id" ${MYSQL_CONFIG.database}.groups.name FROM ${MYSQL_CONFIG.database}.groups ORDER BY ${MYSQL_CONFIG.database}.groups.id;`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const postGroup = async (req, res) => {
  const newGroup = req.body.name.trim();

  const cleanGroup = mysql.escape(newGroup).replaceAll("'", "");

  //IF to prevent crashing of the backend server due to code injection
  if (cleanGroup.indexOf("\\") > -1) {
    res
      .status(400)
      .send({
        error:
          "Data provided has reserved characters, like ! * ' ( ) ; : @ & = + $ , / ? % # [ ]",
      })
      .end();
  } else {
    if (typeof newGroup !== "string" || !newGroup) {
      return res
        .status(400)
        .send(`Incorrect group name provided: ${newGroup}`)
        .end();
    }

    try {
      const con = await mysql.createConnection(MYSQL_CONFIG);
      const [data] = await con.execute(
        `SELECT * 
      FROM ${MYSQL_CONFIG.database}.groups 
      WHERE name ='${cleanGroup}' ;`
      );
      await con.end();

      if (Array.isArray(data) && data.length === 0) {
        try {
          const con = await mysql.createConnection(MYSQL_CONFIG);
          const result = await con.execute(
            `INSERT INTO ${MYSQL_CONFIG.database}.groups (name) VALUES('${cleanGroup}')`
          );
          await con.end();

          res.send(result[0]).end();
        } catch (err) {
          res.status(500).send(err).end();
          return console.error(err);
        }
      } else {
        return res
          .status(409)
          .send({ error: "Error! Record already exists" })
          .end();
      }
    } catch (err) {
      res.status(500).send(err).end();
      return console.error(err);
    }
  }
};
