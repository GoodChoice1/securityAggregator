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

export async function agreeForWork(offer_id) {
  try {
    await http.patch(
      "/order/security/offer",
      {
        offer_id,
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
