const { Router } = require("express");
const {
  asyncHandler,
  connectionHandler,
} = require("../middlewares/middlewares");
const sha256 = require("js-sha256");
const ErrorResponse = require("../classes/error-response");
const { resolveSoa } = require("dns");
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
  router.delete(
    "/url/working",
    asyncHandler(connectionHandler),
    asyncHandler(deleteWorking)
  );
  router.post(
    "/admin/guard",
    asyncHandler(connectionHandler),
    asyncHandler(createGuard)
  );
  router.get(
    "/admin/guard",
    asyncHandler(connectionHandler),
    asyncHandler(getGuards)
  );
  router.delete(
    "/admin/guard",
    asyncHandler(connectionHandler),
    asyncHandler(deleteGuard)
  );
  router.get(
    "/admin/client",
    asyncHandler(connectionHandler),
    asyncHandler(getClients)
  );
  router.delete(
    "/admin/client",
    asyncHandler(connectionHandler),
    asyncHandler(deleteClient)
  );
  router.get(
    "/url/client",
    asyncHandler(connectionHandler),
    asyncHandler(getClient)
  );
  router.get(
    "/security/guard",
    asyncHandler(connectionHandler),
    asyncHandler(getGuard)
  );
  router.post(
    "/admin/client",
    asyncHandler(connectionHandler),
    asyncHandler(createClient)
  );
  router.get(
    "/admin/1client",
    asyncHandler(connectionHandler),
    asyncHandler(getOneClient)
  );
  router.get(
    "/admin/1guard",
    asyncHandler(connectionHandler),
    asyncHandler(getOneGuard)
  );
  router.get(
    "/admin/contract",
    asyncHandler(connectionHandler),
    asyncHandler(getOneContract)
  );
  router.patch(
    "/admin/client",
    asyncHandler(connectionHandler),
    asyncHandler(updateClient)
  );
  router.patch(
    "/admin/client/login",
    asyncHandler(connectionHandler),
    asyncHandler(changeLoginManager)
  );
  router.patch(
    "/admin/client/password",
    asyncHandler(connectionHandler),
    asyncHandler(changePasswordManager)
  );
  router.post(
    "/admin/contract",
    asyncHandler(connectionHandler),
    asyncHandler(addContract)
  );
  router.patch(
    "/admin/guards",
    asyncHandler(connectionHandler),
    asyncHandler(updateGuard)
  );
}

function dateToString(date) {
  let day = "";
  let month = "";
  if (parseInt(date.getDate()) < 10) {
    day = "0";
  }
  if (parseInt(date.getMonth()) < 10) {
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
    SELECT adress, amount_of_people_needed, o.description, ob.description as obj_description, o.id, price_per_hour, weapon_license, work_date_start, work_date_end, work_experience, height, is_certificated, driver_license, object_character
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
  query = `INSERT INTO orders (id_object,id_character,amount_of_people_needed, price_per_hour, work_date_start, work_date_end, description)
  VALUES (${req.body.object_id},${id_char},${req.body.amountPeople},${req.body.price},'${req.body.dateStart}','${req.body.dateEnd}',$nononon$${req.body.description}$nononon$)
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
  let query = `
  DELETE FROM objects WHERE id = ${req.headers.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("Удалено успешно");
}

async function getOffered(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  DELETE FROM offers WHERE id_order = (SELECT obj_id FROM guardsOffered  WHERE amount_of_people_needed<1 AND obj_id = ${req.headers.id} LIMIT 1);
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

  let query = `
  UPDATE orders SET amount_of_people_needed = ${req.headers.amount} WHERE id = ${req.headers.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function changeObject(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  UPDATE objects SET adress = $nonono$${req.body.adress}$nonono$, description = $nonono$${req.body.description}$nonono$, 
  object_character = $nonono$${req.body.character}$nonono$ WHERE id = ${req.body.id};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function getContracts(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT * FROM contract ORDER BY date_of_expiration DESC;
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

async function deleteWorking(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  BEGIN;
  UPDATE orders SET amount_of_people_needed = amount_of_people_needed + 1 WHERE id = ${req.headers.id_order};
  DELETE FROM working_securities WHERE id_security = ${req.headers.id_security} AND id_order = ${req.headers.id_order};
  COMMIT;
  `;
  await client.query(query);
  client.end();
  res.status(200).json("Успешно");
}

async function createGuard(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT count(*) FROM persons WHERE phone_number = ${req.body.phone};
  SELECT count(*) FROM persons WHERE login = $nonono$${req.body.login}$nonono$;
  SELECT count(*) FROM persons WHERE email = $nonono$${req.body.email}$nonono$;
  `;
  let result = await client.query(query);
  if (result[0].rows[0].count > 0) {
    throw new ErrorResponse("Телефон занят", 401);
  } else if (result[1].rows[0].count > 0) {
    throw new ErrorResponse("Логин занят", 401);
  } else if (result[2].rows[0].count > 0) {
    throw new ErrorResponse("Почта занята", 401);
  }
  let password = sha256(req.body.pass);
  query = `
  INSERT INTO guard_character(weapon_license,work_experience, height, driver_license, is_certificated)
  VALUES (${req.body.weapon},${req.body.experience},${req.body.height},${req.body.driver},${req.body.certificated});
  INSERT INTO persons(id_role,phone_number,full_name,login,email)
  VALUES (1, ${req.body.phone},$nonono$${req.body.fio}$nonono$,$nonono$${req.body.login}$nonono$,$nonono$${req.body.email}$nonono$);
  SELECT id FROM persons WHERE login = $nonono$${req.body.login}$nonono$;
  SELECT id FROM guard_character WHERE weapon_license = ${req.body.weapon} AND work_experience =  ${req.body.experience} AND height =  ${req.body.height} AND driver_license =  ${req.body.driver} AND is_certificated =  ${req.body.certificated};
  CREATE USER ${req.body.login} PASSWORD $nonono$${password}$nonono$;
  GRANT guard TO ${req.body.login};
  `;

  result = await client.query(query);
  query = `
  INSERT INTO security_guards (id_person, id_character)
  VALUES (${result[2].rows[0].id},${result[3].rows[0].id})
  `;

  await client.query(query);

  client.end();
  res.status(200).json("OK");
}

async function getGuards(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT s.id as sid, p.id as pid, g.id as gid, p.phone_number, p.full_name, p.login, p.email, g.weapon_license, g.work_experience, g.height, g.driver_license, g.is_certificated
  FROM security_guards s 
  JOIN persons p ON p.id = s.id_person
  JOIN guard_character g ON g.id = s.id_character
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function deleteGuard(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
  DELETE FROM working_securities WHERE id_security = ${req.headers.sid};
  DELETE FROM offers WHERE id_security = ${req.headers.sid};
  DELETE FROM security_guards  WHERE id = ${req.headers.sid};
  DELETE FROM persons WHERE id = ${req.headers.pid};
  DELETE FROM guard_character WHERE id = ${req.headers.gid};
  DROP ROLE ${req.headers.loginguard}
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function getClients(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT l.id,id_person, legal_name, inn, ogrn, kpp, legal_addres, physical_addres, phone_number, full_name, login, email
  FROM legal_entitys l
  JOIN persons p ON p.id = l.id_person
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function deleteClient(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
  SELECT o.id AS oid, g.id AS gid FROM orders o
  JOIN guard_character g ON o.id_character = g.id
  JOIN objects ob ON ob.id = o.id_object
  WHERE ob.id_legal_entity = ${req.headers.lid};
  `;
  let result = await client.query(query);
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    query = `
    DELETE FROM offers WHERE id_order = ${result[i].oid};
    DELETE FROM working_securities WHERE id_order = ${result[i].oid};
    DELETE FROM orders WHERE id = ${result[i].oid};
    DELETE FROM guard_character WHERE id = ${result[i].gid};
    `;

    await client.query(query);
  }

  query = `
  DELETE FROM objects WHERE id_legal_entity = ${req.headers.lid};
  DELETE FROM contract WHERE id_legal_entity = ${req.headers.lid};
  DELETE FROM legal_entitys WHERE id = ${req.headers.lid};
  DELETE FROM persons WHERE id = ${req.headers.pid};
  DROP ROLE ${req.headers.logincl};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function getClient(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT *
  FROM legal_entitys l
  JOIN persons p ON p.id = l.id_person
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function getGuard(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT *
  FROM security_guards s
  JOIN persons p ON p.id = s.id_person
  JOIN guard_character g ON g.id = s.id_character
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function createClient(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT count(*) FROM persons WHERE phone_number = ${req.body.phone};
  SELECT count(*) FROM persons WHERE login = $nonono$${req.body.login}$nonono$;
  SELECT count(*) FROM persons WHERE email = $nonono$${req.body.email}$nonono$;
  SELECT count(*) FROM legal_entitys WHERE legal_name = $nonono$${req.body.orgname}$nonono$;
  SELECT count(*) FROM legal_entitys WHERE inn = $nonono$${req.body.inn}$nonono$;
  SELECT count(*) FROM legal_entitys WHERE ogrn = $nonono$${req.body.ogrn}$nonono$;
  
  `;
  let result = await client.query(query);
  if (result[0].rows[0].count > 0) {
    throw new ErrorResponse("Телефон занят", 401);
  } else if (result[1].rows[0].count > 0) {
    throw new ErrorResponse("Логин занят", 401);
  } else if (result[2].rows[0].count > 0) {
    throw new ErrorResponse("Почта занята", 401);
  } else if (result[3].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким названием существует", 401);
  } else if (result[4].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким инн существует", 401);
  } else if (result[5].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким огрн существует", 401);
  }
  let password = sha256(req.body.pass);
  query = `
  INSERT INTO persons(id_role,phone_number,full_name,login,email)
  VALUES (2, ${req.body.phone},$nonono$${req.body.fio}$nonono$,$nonono$${req.body.login}$nonono$,$nonono$${req.body.email}$nonono$);
  SELECT id FROM persons WHERE login = $nonono$${req.body.login}$nonono$;
  CREATE USER ${req.body.login} PASSWORD $nonono$${password}$nonono$;
  GRANT urLico TO ${req.body.login};
  `;
  result = await client.query(query);
  query = `
  INSERT INTO legal_entitys (id_person, legal_name, inn, ogrn, kpp, legal_addres, physical_addres)
  VALUES (${result[1].rows[0].id}, $nonono$${req.body.orgname}$nonono$,${req.body.inn},${req.body.ogrn},${req.body.kpp},$nonono$${req.body.uradres}$nonono$,$nonono$${req.body.fizadres}$nonono$)
  `;

  await client.query(query);

  client.end();
  res.status(200).json("OK");
}

async function getOneGuard(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT g.id as gid, p.id as pid, weapon_license, height, work_experience, driver_license, is_certificated, phone_number, full_name, login, email
  FROM security_guards s
  JOIN persons p ON p.id = s.id_person
  JOIN guard_character g ON g.id = s.id_character 
  WHERE s.id = ${req.headers.id}
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function getOneClient(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT l.id as lid, p.id as pid, legal_name, inn, ogrn, kpp, legal_addres, physical_addres, phone_number, full_name, login, email
  FROM legal_entitys l
  JOIN persons p ON p.id = l.id_person
  WHERE l.id = ${req.headers.id};
  `;
  let result = await client.query(query);
  result = result.rows;
  client.end();
  res.status(200).json(result);
}

async function getOneContract(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT * FROM contract WHERE id_legal_entity = ${req.headers.id} ORDER BY date_of_expiration DESC;
  `;
  let result = await client.query(query);
  result = result.rows;
  for (let i = 0; i < result.length; i++) {
    if (result[i].date_of_expiration)
      result[i].date_of_expiration = dateToString(result[i].date_of_expiration);
  }
  client.end();
  res.status(200).json(result);
}

async function updateClient(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT count(*) FROM persons WHERE phone_number = ${req.body.phone} AND id != ${req.body.pid};
  SELECT count(*) FROM persons WHERE email = $nonono$${req.body.email}$nonono$ AND id != ${req.body.pid};
  SELECT count(*) FROM legal_entitys WHERE legal_name = $nonono$${req.body.orgname}$nonono$ AND id != ${req.body.lid};
  SELECT count(*) FROM legal_entitys WHERE inn = $nonono$${req.body.inn}$nonono$ AND id != ${req.body.lid};
  SELECT count(*) FROM legal_entitys WHERE ogrn = $nonono$${req.body.ogrn}$nonono$ AND id != ${req.body.lid};
  `;
  let result = await client.query(query);
  if (result[0].rows[0].count > 0) {
    throw new ErrorResponse("Телефон занят", 401);
  } else if (result[1].rows[0].count > 0) {
    throw new ErrorResponse("Почта занята", 401);
  } else if (result[2].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким названием существует", 401);
  } else if (result[3].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким инн существует", 401);
  } else if (result[4].rows[0].count > 0) {
    throw new ErrorResponse("Юр лицо с таким огрн существует", 401);
  }
  query = `
  UPDATE legal_entitys SET legal_name = $nonono$${req.body.orgname}$nonono$, inn = ${req.body.inn}, ogrn = ${req.body.ogrn}, kpp = ${req.body.kpp}, 
  legal_addres = $nonono$${req.body.uradres}$nonono$, physical_addres = $nonono$${req.body.fizadres}$nonono$ WHERE id = ${req.body.lid};
  UPDATE persons SET full_name = $nonono$${req.body.fio}$nonono$, phone_number =  ${req.body.phone}, email =  $nonono$${req.body.email}$nonono$ WHERE id=${req.body.pid}
  `;
  result = await client.query(query);

  client.end();
  res.status(200).json("OK");
}

async function changeLoginManager(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT count(*) FROM persons WHERE login = $nonono$${req.body.newlogin}$nonono$;
  `;
  let result = await client.query(query);
  if (result.rows[0].count > 0) {
    throw new ErrorResponse("Логин занят", 401);
  }
  query = `
  SELECT login FROM persons WHERE id=${req.body.id};
  UPDATE persons SET login = $nonono$${req.body.newlogin}$nonono$ WHERE id=${req.body.id};
  `;
  result = await client.query(query);
  query = `
  ALTER USER ${result[0].rows[0].login}
  RENAME TO ${req.body.newlogin};
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function changePasswordManager(req, res, next) {
  let client = req.client;
  client.connect();
  let password = sha256(req.body.password);
  let query = `
  ALTER USER ${req.body.login} WITH PASSWORD $nonono$${password}$nonono$;
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function addContract(req, res, next) {
  let client = req.client;
  client.connect();
  let query = `
  INSERT INTO contract VALUES(${req.body.cid},${req.body.lid},'${req.body.date}')
  `;
  await client.query(query);
  client.end();
  res.status(200).json("OK");
}

async function updateGuard(req, res, next) {
  let client = req.client;
  client.connect();

  let query = `
  SELECT count(*) FROM persons WHERE phone_number = ${req.body.phone} AND id != ${req.body.pid};
  SELECT count(*) FROM persons WHERE email = $nonono$${req.body.email}$nonono$ AND id != ${req.body.pid};
  `;
  let result = await client.query(query);
  if (result[0].rows[0].count > 0) {
    throw new ErrorResponse("Телефон занят", 401);
  } else if (result[1].rows[0].count > 0) {
    throw new ErrorResponse("Почта занята", 401);
  }
  query = `
  UPDATE guard_character SET weapon_license = ${req.body.weapon}, work_experience = ${req.body.experience}, height = ${req.body.height}, driver_license = ${req.body.driver}, is_certificated = ${req.body.certificated} WHERE id = ${req.body.gid};
  UPDATE persons SET phone_number = ${req.body.phone}, full_name = $nononon$${req.body.fio}$nononon$, email = $nononon$${req.body.email}$nononon$ WHERE id = ${req.body.pid}
  `;

  await client.query(query);

  client.end();
  res.status(200).json("OK");
}

initRoutes();

module.exports = router;
