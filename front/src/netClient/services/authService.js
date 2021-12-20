import http from "@/netClient/config";
const sha256 = require("js-sha256");

export async function login(login, password) {
  try {
    console.log(password)
    password = sha256(password);
    const responce = await http.post(
      "/auth/login",
      {},
      {
        headers: {
          login: login,
          password: password,
        },
      }
    );
    sessionStorage.login = login;
    sessionStorage.password = password;
    sessionStorage.userRole = responce.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}