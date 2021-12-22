<template>
  <div>
    Зарегистрировать клиента
    <div><br /></div>
    <form @submit.prevent="onFormSubmit">
      <div class="form-field">
        <div class="form-field">
          <label for="fio"></label>
          ФИО
          <br />
          <input v-model="fio" id="fio" type="text" required />
        </div>
        <label for="phone"></label>
        Телефонный номер с восьмеркой
        <br />
        <input
          v-model="phone"
          id="phone"
          type="number"
          min="80000000000"
          max="89999999999"
          required
        />
      </div>
      <div class="form-field">
        <label for="email"></label>
        Email
        <br />
        <input v-model="email" id="email" type="text" required />
      </div>
      <div class="form-field">
        <label for="login"></label>
        Логин на английском
        <br />
        <input v-model="login" id="login" type="text" required />
      </div>
      <div class="form-field">
        <label for="pass"></label>
        Пароль
        <br />
        <input v-model="pass" id="pass" type="text" required />
      </div>
      <div class="form-field">
        <label for="orgname"></label>
        Название организации
        <br />
        <input v-model="orgname" id="orgname" type="text" required />
      </div>
      <div class="form-field">
        <label for="inn"></label>
        ИНН
        <br />
        <input
          v-model="inn"
          id="inn"
          type="number"
          max="999999999999"
          min="100000000000"
          required
        />
      </div>
      <div class="form-field">
        <label for="ogrn"></label>
        ОГРН
        <br />
        <input
          v-model="ogrn"
          id="ogrn"
          type="number"
          max="9999999999999"
          min="1000000000000"
          required
        />
      </div>
      <div class="form-field">
        <label for="kpp"></label>
        КПП
        <br />
        <input
          v-model="kpp"
          id="kpp"
          type="number"
          max="999999999"
          min="100000000"
          required
        />
      </div>
      <div class="form-field">
        <label for="uradres"></label>
        Юр. адрес
        <br />
        <input v-model="uradres" id="uradres" type="text" required />
      </div>
      <div class="form-field">
        <label for="fizadres"></label>
        Физ. адрес
        <br />
        <input v-model="fizadres" id="fizadres" type="text" required />
      </div>
      <button class="submit-btn" type="submit">Создать</button>
    </form>

    <ul>
      <li v-for="client in clientList" :key="client.id">
        <a @click="redirect(client.id)">
          <div>ФИО клиента: {{ client.full_name }}</div>
          <div>Логин: {{ client.login }}</div>
          <div>Телефон: {{ client.phone_number }}</div>
          <div>Наименование юр. лица: {{ client.legal_name }}</div>
          <div>Эл.почта: {{ client.email }}</div>
          <button
            class="submit-btn"
            @click="deleteClient(client.id, client.id_person, client.login)"
            type="submit"
          >
            Удалить клиента
          </button>
        </a>
        <div><br /></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  regClient,
  fetchClientList,
  deleteClient,
} from "@/netClient/services/orderService";
export default {
  name: "RegGuardPage",
  data: () => ({
    clientList: [],
    fio: "",
    phone: "",
    email: "",
    login: "",
    pass: "",
    orgname: "",
    inn: "",
    ogrn: "",
    kpp: "",
    uradres: "",
    fizadres: "",
  }),
  async mounted() {
    this.fetchClientList();
  },
  methods: {
    async onFormSubmit() {
      try {
        let sqlCheck =
          this.fio +
          this.email +
          this.login +
          this.pass +
          this.orgname +
          this.orgname +
          this.uradres +
          this.fizadres;
        if (sqlCheck.search('\\"') != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (sqlCheck.search("\\'") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (sqlCheck.search("\\$") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (sqlCheck.search("\\-") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (sqlCheck.search("\\*") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (sqlCheck.search("\\/") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        let arr = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];
        let bebra = String(this.login.trim()).split("");
        for (let i = 0; i < bebra.length; i++) {
          if (arr.indexOf(bebra[i]) == -1) {
            alert("В логине должны быть только английские строчные буквы");
            throw "Error input";
          }
        }
        await regClient(
          this.fio.trim(),
          this.phone,
          this.email.trim(),
          this.login.trim(),
          this.pass.trim(),
          this.orgname.trim(),
          this.inn,
          this.ogrn,
          this.kpp,
          this.uradres.trim(),
          this.fizadres.trim()
        );
        document.getElementById("fio").value = " ";
        document.getElementById("phone").value = " ";
        document.getElementById("email").value = " ";
        document.getElementById("login").value = " ";
        document.getElementById("pass").value = " ";
        document.getElementById("orgname").value = " ";
        document.getElementById("inn").value = "0";
        document.getElementById("ogrn").value = "0";
        document.getElementById("kpp").value = "0";
        document.getElementById("uradres").value = " ";
        document.getElementById("fizadres").value = " ";
        this.fio = "";
        this.phone = "";
        this.email = "";
        this.login = "";
        this.pass = "";
        this.orgname = "";
        this.inn = "";
        this.ogrn = "";
        this.kpp = "";
        this.uradres = "";
        this.fizadres = "";
        alert("Клиент зарегистрирован");
        this.fetchClientList();
      } catch (error) {
        alert(error.response.data.message);
        console.error({ error });
      }
    },
    async fetchClientList() {
      try {
        this.clientList = await fetchClientList();
      } catch (error) {
        console.error({ error });
      }
    },
    async deleteClient(lid, pid, login) {
      try {
        await deleteClient(lid, pid, login);
        this.fetchClientList();
      } catch (error) {
        console.error({ error });
      }
    },
    async redirect(id) {
      try {
        sessionStorage.clientId = id;
        this.$router.push("/changeClient");
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

