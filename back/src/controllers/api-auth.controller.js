const { Router } = require("express");
const {
  asyncHandler,
  connectionHandler,
} = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/login", asyncHandler(connectionHandler), asyncHandler(login));
}

async function login(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT role
    FROM persons p
    JOIN roles r ON p.id_role = r.id
    WHERE login = current_user
    `;
  let result = await client.query(query);
  result = result.rows[0].role;
  if (result == "Клиент") {
    query = `
    SELECT count(*) FROM contract c 
      JOIN legal_entitys l ON l.id = c.id_legal_entity
      JOIN persons p ON p.id = l.id_person
	    WHERE c.date_of_expiration > current_date AND p.login = current_user
    `;
    let counter = await client.query(query);
    counter = counter.rows[0].count;
    if (counter > 0) {
      counter = true;
    } else {
      counter = false;
    }
    res.status(200).json({ role: result, canLogin: counter });
  } else {
    client.end();
    res.status(200).json({ role: result });
  }
}

initRoutes();

module.exports = router;
