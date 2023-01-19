

export const register = async (req, res) => {
  console.log(req.body);
  const email = req.body.email.trim();
  const fullName = req.body.fullName.trim();
  const password = req.body.password;

  const cleanEmail = mysql.escape(email).replaceAll("'", "");
  const cleanFullName = mysql.escape(fullName).replaceAll("'", "");
  const cleanPassword = +mysql.escape(password).replaceAll("'", "");
  
  

  console.log(cleanEmail,cleanFullName, cleanPassword);
  //const id = new Date().getTime().toString(36);

  if (typeof email !== "string" || !email) {
    return res.status(400).send(`Incorrect email provided: ${email}`).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO users ( id, email, password, full_name) VALUES( '${cleanEmail}', '${cleanPassword}', '${cleanFullName}')`
    );

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
});


