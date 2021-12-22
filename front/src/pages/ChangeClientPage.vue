<template>
  <div class="main">
    Выбранное ЮрЛицо
    <div><br /></div>
    <div>ФИО: {{ client.full_name }}</div>
    <div>Логин: {{ client.login }}</div>
    <div>Телефон: {{ client.phone_number }}</div>
    <div>Наименование юр.лица: {{ client.legal_name }}</div>
    <div>ИНН: {{ client.inn }}</div>
    <div>ОГРН: {{ client.ogrn }}</div>
    <div>КПП: {{ client.kpp }}</div>
    <div>Эл.почта: {{ client.email }}</div>
    <div>Юр. адрес: {{ client.legal_addres }}</div>
    <div>Физ. адрес: {{ client.physical_addres }}</div>

    <ul v-if="contractList">
      Подписанные контракты:
      <li v-for="contract in contractList" :key="contract.date_of_expiration">
        <div>Номер контракта: {{ contract.id }}</div>
        <div>Дата истечения контракта: {{ contract.date_of_expiration }}</div>
        <br />
      </li>
    </ul>

    <form @submit="addContract()">
      Добавить контракт
      <div class="form-field">
        <label for="cid"></label>
        Номер контракта
        <br />
        <input
          v-model="cid"
          id="cid"
          type="number"
          min="1"
          max="99999999"
          required
        />
      </div>
      <div class="form-field">
        <label for="cdate"></label>
        Дата окончания контракта
        <br />
        <input v-model="cdate" id="cdate" type="date" required />
        <br />
        <button class="submit-btn" type="submit">Изменить</button>
      </div>
    </form>

    <form @submit.prevent="onFormSubmit(client.lid, client.pid)">
      <div class="form-field">
        <div><br /></div>
        Изменить информацию о клиенте
        <div><br /></div>
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
      <button class="submit-btn" type="submit">Изменить клиента</button>
    </form>
    <div><br /></div>
    <form @submit="changeLogin(client.pid)">
      <div class="form-field">
        <label for="login"></label>
        Изменить логин
        <br />
        <input v-model="login" id="login" type="text" required />
        <br />
        <button class="submit-btn" type="submit">Изменить логин</button>
      </div>
      <div><br /></div>
    </form>
    <form @submit="changePassword(client.login)">
      <div class="form-field">
        <label for="password"></label>
        Изменить пароль
        <br />
        <input v-model="password" id="password" type="text" required />
        <br />
        <button class="submit-btn" type="submit">Изменить пароль</button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  fetchExactClient,
  fetchOneContract,
  changeClient,
  changeLoginManager,
  changePassword,
  addContract,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    client: {},
    contractList: false,
    fio: "",
    phone: "",
    email: "",
    login: "",
    orgname: "",
    inn: "",
    ogrn: "",
    kpp: "",
    uradres: "",
    fizadres: "",
    cid: "",
    cdate: "",
  }),
  async mounted() {
    this.fetchExactClient();
  },
  methods: {
    async fetchExactClient() {
      try {
        this.client = await fetchExactClient(sessionStorage.clientId);
        this.contractList = await fetchOneContract(sessionStorage.clientId);
        this.fio = this.client.full_name;
        this.phone = this.client.phone_number;
        this.email = this.client.email;
        this.login = this.client.login;
        this.orgname = this.client.legal_name;
        this.inn = this.client.inn;
        this.ogrn = this.client.ogrn;
        this.kpp = this.client.kpp;
        this.uradres = this.client.legal_addres;
        this.fizadres = this.client.physical_addres;
      } catch (error) {
        console.error({ error });
      }
    },
    async onFormSubmit(lid, pid) {
      try {
        let sqlCheck =
          this.fio + this.email + this.orgname + this.uradres + this.fizadres;
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
        await changeClient(
          this.fio.trim(),
          this.phone,
          this.email.trim(),
          this.orgname.trim(),
          this.inn,
          this.ogrn,
          this.kpp,
          this.uradres.trim(),
          this.fizadres.trim(),
          lid,
          pid
        );
        this.fetchExactClient();
      } catch (error) {
        alert(error.response.data.message);
        console.error({ error });
      }
    },
    async changeLogin(pid) {
      try {
        let sqlCheck = this.login;
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
        await changeLoginManager(this.login.trim(), pid);
      } catch (error) {
        console.error({ error });
      }
    },
    async changePassword(login) {
      try {
        let sqlCheck = this.password.trim();
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
        await changePassword(login, this.password.trim());
      } catch (error) {
        console.error({ error });
      }
    },
    async addContract() {
      try {
        await addContract(this.cid, this.cdate, this.client.lid);
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

