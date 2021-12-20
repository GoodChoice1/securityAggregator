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
    FROM persons
    WHERE login = current_user
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows[0].role;
  res.status(200).json(result);
}

initRoutes();

module.exports = router;
