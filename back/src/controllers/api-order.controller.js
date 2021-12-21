const { Router } = require("express");
const {
  asyncHandler,
  connectionHandler,
} = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get(
    "/security/offers",
    asyncHandler(connectionHandler),
    asyncHandler(getOffers)
  );
  router.get(
    "/security/works",
    asyncHandler(connectionHandler),
    asyncHandler(getWorks)
  );
  router.get(
    "/url/toOffer",
    asyncHandler(connectionHandler),
    asyncHandler(toOffer)
  );
  router.get(
    "/url/toWork",
    asyncHandler(connectionHandler),
    asyncHandler(toWork)
  );
  router.post(
    "/url/offer",
    asyncHandler(connectionHandler),
    asyncHandler(makeOffer)
  );
  router.patch(
    "/security/offer",
    asyncHandler(connectionHandler),
    asyncHandler(acceptOffer)
  );
  router.delete(
    "/offer",
    asyncHandler(connectionHandler),
    asyncHandler(deleteOffer)
  );
  router.delete(
    "/url/order",
    asyncHandler(connectionHandler),
    asyncHandler(deleteOrder)
  );
  router.get(
    "/url/orders",
    asyncHandler(connectionHandler),
    asyncHandler(getOrders)
  );
  router.patch(
    "/security/work",
    asyncHandler(connectionHandler),
    asyncHandler(deleteWork)
  );
  router.get(
    "/url/objects",
    asyncHandler(connectionHandler),
    asyncHandler(getObjects)
  );
  router.get(
    "/url/object",
    asyncHandler(connectionHandler),
    asyncHandler(getObject)
  );
  router.get(
    "/url/offered",
    asyncHandler(connectionHandler),
    asyncHandler(getOffered)
  );
  router.get(
    "/url/order",
    asyncHandler(connectionHandler),
    asyncHandler(getOrder)
  );
  router.post(
    "/url/order",
    asyncHandler(connectionHandler),
    asyncHandler(createOrder)
  );
  router.post(
    "/url/object",
    asyncHandler(connectionHandler),
    asyncHandler(createObject)
  );
  router.delete(
    "/url/object",
    asyncHandler(connectionHandler),
    asyncHandler(deleteObject)
  );
  router.patch(
    "/url/changeOrder",
    asyncHandler(connectionHandler),
    asyncHandler(changeOrder)
  );
  router.patch(
    "/url/changeObject",
    asyncHandler(connectionHandler),
    asyncHandler(changeObject)
  );
  router.get(
    "/url/contracts",
    asyncHandler(connectionHandler),
    asyncHandler(getContracts)
  );
}

function dateToString(date) {
  let day = "";
  let month = "";
  if (parseInt(date.getDate()) < 10){
    day = "0";
  }
  if (parseInt(date.getMonth())<10){
    month = "0";
  }
  return (
    parseInt(date.getYear()) +
    1900 +
    "-" +
    month +
    (parseInt(date.getMonth()) + 1) +
    "-" +
    day +
    date.getDate()
  );
}

async function getOffers(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    DELETE FROM offers WHERE id = (SELECT id FROM viewOffers WHERE amount_of_people_needed<1)
    `;
  let result = await client.query(query);
  query = `
    SELECT * 
    FROM viewOffers;
    `;
  result = await client.query(query);
  client.end();
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    if (result[i].work_date_start)
      result[i].work_date_start = dateToString(result[i].work_date_start);
    if (result[i].work_date_end)
      result[i].work_date_end = dateToString(result[i].work_date_end);
  }
  res.status(200).json(result);
}

async function getOrders(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    SELECT o.id, amount_of_people_needed, price_per_hour, work_date_start, work_date_end, o.description, object_character, adress, ob.description as ob_description 
    FROM orders o
    JOIN objects ob ON ob.id = o.id_object
    JOIN guard_character g ON g.id = o.id_character ;
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    if (result[i].work_date_start)
      result[i].work_date_start = dateToString(result[i].work_date_start);
    if (result[i].work_date_end)
      result[i].work_date_end = dateToString(result[i].work_date_end);
  }
  res.status(200).json(result);
}

async function getOrder(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    SELECT * 
    FROM orders o
    JOIN objects ob ON ob.id = o.id_object
    JOIN guard_character g ON g.id = o.id_character 
    WHERE o.id = ${req.headers.order_id};
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows[0];
  if (result.work_date_start)
    result.work_date_start = dateToString(result.work_date_start);
  if (result.work_date_end)
    result.work_date_end = dateToString(result.work_date_end);
  res.status(200).json(result);
}

async function getWorks(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT * 
    FROM viewWork; 
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    if (result[i].work_date_start)
      result[i].work_date_start = dateToString(result[i].work_date_start);
    if (result[i].work_date_end)
      result[i].work_date_end = dateToString(result[i].work_date_end);
  }
  res.status(200).json(result);
}

async function toOffer(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    SELECT * FROM getOfferGuards(${req.headers.id}); 
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function toWork(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT * 
    FROM guardsWorking WHERE ord_id = ${req.headers.id}; 
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function makeOffer(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    SELECT * FROM getOfferGuards(${req.headers.id});
    `;
  let result = await client.query(query);
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    query = `
    CALL makeOffer(${result[i].id},${req.headers.id});
    `;
    await client.query(query);
  }
  client.end();
  res.status(200).json("Успешно!");
}

async function acceptOffer(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    CALL acceptOffer(${req.body.offer_id});
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function deleteOffer(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    DELETE FROM offers WHERE id = ${req.headers.offer_id} ;
    `;
  await client.query(query);
  client.end();
  res.status(200).json("Удалено успешно");
}

async function deleteOrder(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
  SELECT id_character FROM orders WHERE id = ${req.headers.order_id};
  `;
  let result = await client.query(query);
  console.log(result.rows);
  let id_char = result.rows[0].id_character;
  query = `
    DELETE FROM working_securities WHERE id_order = ${req.headers.order_id};
    DELETE FROM offers WHERE id_order = ${req.headers.order_id};
    DELETE FROM orders WHERE id = ${req.headers.order_id};
    `;
  await client.query(query);

  query = `
  DELETE FROM guard_character WHERE id = ${id_char};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("Удалено успешно");
}

async function deleteWork(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
    UPDATE orders SET amount_of_people_needed = amount_of_people_needed + 1 WHERE id = ${req.headers.order_id};
    DELETE FROM working_securities WHERE id_order = ${req.headers.order_id} AND id_security= ${req.headers.security_id};
    `;
  await client.query(query);
  client.end();
  res.status(200).json("Удалено успешно");
}

async function getObjects(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT * 
    FROM objects; 
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function getObject(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT * 
    FROM objects WHERE id = ${req.headers.object_id}; 
    `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function createOrder(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `SELECT id
    FROM legal_entitys; 
    `;

  let result = await client.query(query);
  let id_client = result.rows[0].id;

  query = `INSERT INTO guard_character(weapon_license,work_experience, height,driver_license,is_certificated)
  VALUES (${req.body.weapon},${req.body.experience},${req.body.height},${req.body.driver},${req.body.certificated});
  SELECT id 
  FROM guard_character 
  WHERE weapon_license = ${req.body.weapon} 
  AND work_experience = ${req.body.experience} 
  AND height = ${req.body.height} 
  AND driver_license = ${req.body.driver}
  AND is_certificated = ${req.body.certificated};
  `;
  result = await client.query(query);
  let id_char = result[1].rows[0].id;
  query = `INSERT INTO orders (id_object,id_character,id_legal,amount_of_people_needed, price_per_hour, work_date_start, work_date_end, description)
  VALUES (${req.body.object_id},${id_char},${id_client},${req.body.amountPeople},${req.body.price},'${req.body.dateStart}','${req.body.dateEnd}',$nononon$${req.body.description}$nononon$)
    `;

  result = await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function createObject(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `SELECT id
    FROM legal_entitys; 
    `;
  let result = await client.query(query);
  let id_client = result.rows[0].id;
  query = `
  INSERT INTO objects(id_legal_entity,object_character,adress,description)
  VALUES (${id_client},$nononon$${req.body.character}$nononon$,$nononon$${req.body.adress}$nononon$,$nononon$${req.body.description}$nononon$)
  `;
  await client.query(query);
  client.end();
  result = result.rows;
  res.status(200).json(result);
}

async function deleteObject(req, res, next) {
  let client = req.client;
  client.connect();
  query = `
  DELETE FROM objects WHERE id = ${req.headers.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("Удалено успешно");
}

async function getOffered(req, res, next) {
  let client = req.client;
  client.connect();

  query = `
  DELETE FROM offers WHERE id_order = (SELECT obj_id FROM guardsOffered  WHERE amount_of_people_needed<1);
  `;
  let result = await client.query(query);
  query = `
  SELECT * FROM guardsOffered  WHERE obj_id = ${req.headers.id};
  `;
  result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function changeOrder(req, res, next) {
  let client = req.client;
  client.connect();

  query = `
  UPDATE orders SET amount_of_people_needed = ${req.headers.amount} WHERE id = ${req.headers.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function changeObject(req, res, next) {
  let client = req.client;
  client.connect();

  query = `
  UPDATE objects SET adress = $nonono$${req.body.adress}$nonono$, description = $nonono$${req.body.description}$nonono$, object_character = $nonono$${req.body.character}$nonono$ WHERE id = ${req.body.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function getContracts(req, res, next) {
  let client = req.client;
  client.connect();

  query = `
  SELECT * FROM contract;
  `;
  let result = await client.query(query);
  client.end();
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    if (result[i].date_of_expiration)
      result[i].date_of_expiration = dateToString(result[i].date_of_expiration);
  }
  res.status(200).json(result);
}


initRoutes();

module.exports = router;
