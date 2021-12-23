import http from "@/netClient/config";
const sha256 = require("js-sha256");

export async function fetchOffersList() {
  try {
    const responce = await http.get("/order/security/offers", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    if (responce.data[0] == null) return false;
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function agreeForWork(sid, orid) {
  try {
    await http.patch(
      "/order/security/offer",
      {
        sid,
        orid,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteOffer(offer_id) {
  try {
    await http.delete("/order/offer", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        offer_id,
      },
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchWorkList() {
  try {
    let responce = await http.get("/order/security/works", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    if (responce.data[0] == null) return false;
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchOrderList() {
  try {
    let responce = await http.get("/order/url/orders", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    if (responce.data[0] == null) return false;
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchObjectList() {
  try {
    let responce = await http.get("/order/url/objects", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    if (responce.data[0] == null) return false;
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchOrder() {
  try {
    let responce = await http.get("/order/url/order", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        order_id: sessionStorage.order_id,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchObject() {
  try {
    let responce = await http.get("/order/url/object", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        object_id: sessionStorage.object_id,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function createOrder(
  amountPeople,
  description,
  price,
  dateStart,
  dateEnd,
  object_id,
  experience,
  height,
  driver,
  certificated,
  weapon
) {
  try {
    let responce = await http.post(
      "/order/url/order",
      {
        amountPeople,
        description,
        price,
        dateStart,
        dateEnd,
        object_id,
        experience,
        height,
        driver,
        certificated,
        weapon,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteOrder(order_id) {
  try {
    let responce = await http.delete("/order/url/order", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        order_id,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function createObject(character, adress, description) {
  try {
    await http.post(
      "/order/url/object",
      { character, adress, description },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteObject(id) {
  try {
    await http.delete("/order/url/object", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id: id,
      },
    });
  } catch (error) {
    console.log({ error });
    alert("Нельзя удалить объекты, на которые существует заявка");
    throw error;
  }
}

export async function fetchWorking(id) {
  try {
    let responce = await http.get("/order/url/toWork", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id: id,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    alert("Нельзя удалить объекты, на которые существует заявка");
    throw error;
  }
}

export async function fetchToOffer(id) {
  try {
    let responce = await http.get("/order/url/toOffer", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id: id,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function offerSecurity(id) {
  try {
    let responce = await http.post(
      "/order/url/offer",
      {},
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
          id: id,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchOffered(id) {
  try {
    let responce = await http.get("/order/url/offered", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id: id,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changeTask(amount, id) {
  try {
    let responce = await http.patch(
      "/order/url/changeOrder",
      {},
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
          amount,
          id,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changeObject(character, adress, description, id) {
  try {
    let responce = await http.patch(
      "/order/url/changeObject",
      {
        character,
        adress,
        description,
        id,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchContracts() {
  try {
    let responce = await http.get("/order/url/contracts", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteWorking(id_security, id_order) {
  try {
    let responce = await http.delete("/order/url/working", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id_security,
        id_order,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function regGuard(
  fio,
  phone,
  email,
  login,
  pass,
  experience,
  height,
  driver,
  certificated,
  weapon
) {
  try {
    login = login.toLowerCase();
    pass = sha256(pass);
    let responce = await http.post(
      "/order/admin/guard",
      {
        fio,
        phone,
        email,
        login,
        pass,
        experience,
        height,
        driver,
        certificated,
        weapon,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchGuardList() {
  try {
    let responce = await http.get("/order/admin/guard", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteGuard(sid, pid, gid, loginGuard) {
  try {
    let responce = await http.delete("/order/admin/guard", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        sid,
        pid,
        gid,
        loginGuard,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchClientList() {
  try {
    let responce = await http.get("/order/admin/client", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteClient(lid, pid, loginCl) {
  try {
    let responce = await http.delete("/order/admin/client", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        lid,
        pid,
        loginCl,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchClient() {
  try {
    let responce = await http.get("/order/url/client", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchGuard() {
  try {
    let responce = await http.get("/order/security/guard", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function toLogin() {
  try {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("object_id");
    sessionStorage.removeItem("order_id");
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function regClient(
  fio,
  phone,
  email,
  login,
  pass,
  orgname,
  inn,
  ogrn,
  kpp,
  uradres,
  fizadres
) {
  try {
    pass = sha256(pass);
    let responce = await http.post(
      "/order/admin/client",
      {
        fio,
        phone,
        email,
        login,
        pass,
        orgname,
        inn,
        ogrn,
        kpp,
        uradres,
        fizadres,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchExactClient(id) {
  try {
    let responce = await http.get("/order/admin/1client", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchExactGuard(id) {
  try {
    let responce = await http.get("/order/admin/1guard", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id,
      },
    });
    return responce.data[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function fetchOneContract(id) {
  try {
    let responce = await http.get("/order/admin/contract", {
      headers: {
        login: sessionStorage.login,
        password: sessionStorage.password,
        id,
      },
    });
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changeClient(
  fio,
  phone,
  email,
  orgname,
  inn,
  ogrn,
  kpp,
  uradres,
  fizadres,
  lid,
  pid
) {
  try {
    let responce = await http.patch(
      "/order/admin/client",
      {
        fio,
        phone,
        email,
        orgname,
        inn,
        ogrn,
        kpp,
        uradres,
        fizadres,
        lid,
        pid,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changeLoginManager(newlogin, id) {
  try {
    let responce = await http.patch(
      "/order/admin/client/login",
      { newlogin, id },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changePassword(login, password) {
  try {
    password = sha256(password);
    let responce = await http.patch(
      "/order/admin/client/password",
      { login, password },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function addContract(cid, date, lid) {
  try {
    let responce = await http.post(
      "/order/admin/contract",
      { cid, date, lid },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function changeGuard(
  fio,
  phone,
  email,
  experience,
  height,
  driver,
  certificated,
  weapon,
  gid,
  pid
) {
  try {
    let responce = await http.patch(
      "/order/admin/guards",
      {
        fio,
        phone,
        email,
        experience,
        height,
        driver,
        certificated,
        weapon,
        gid,
        pid,
      },
      {
        headers: {
          login: sessionStorage.login,
          password: sessionStorage.password,
        },
      }
    );
    return responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
