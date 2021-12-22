<template>
  <div>
    Зарегистрировать охранника
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
        <label for="experience"></label>
        Опыт работы в месяцах
        <br />
        <input
          v-model="experience"
          id="experience"
          type="number"
          min="0"
          max="10000"
          required
        />
      </div>
      <div class="form-field">
        <label for="height"></label>
        Рост в см
        <br />
        <input
          v-model="height"
          id="height"
          type="number"
          min="0"
          max="250"
          required
        />
      </div>
      <div class="form-field">
        <label for="driver"></label>
        Имеется водительское удостоверение
        <br />
        <input v-model="driver" id="driver" type="checkbox" />
      </div>
      <div class="form-field">
        <label for="certificated"></label>
        Имеется удостоверение частного охранника
        <br />
        <input v-model="certificated" id="certificated" type="checkbox" />
      </div>
      <div class="form-field">
        <label for="weapon"></label>
        Имеется лицензия на оружие
        <br />
        <input v-model="weapon" id="weapon" type="checkbox" />
      </div>
      <button class="submit-btn" type="submit">Создать</button>
    </form>

    <ul>
      <li v-for="guard in guardList" :key="guard.id">
        <a @click="redirect(guard.sid)">
          <div>ФИО охранника: {{ guard.full_name }}</div>
          <div>Логин: {{ guard.login }}</div>
          <div>Телефон: {{ guard.phone_number }}</div>
          <div>Эл.почта: {{ guard.email }}</div>
          <button
            class="submit-btn"
            @click="deleteGuard(guard.sid, guard.pid, guard.gid, guard.login)"
            type="submit"
          >
            Удалить охранника
          </button>
        </a>
        <div><br /></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  regGuard,
  fetchGuardList,
  deleteGuard,
} from "@/netClient/services/orderService";
export default {
  name: "RegGuardPage",
  data: () => ({
    guardList: [],
    fio: "",
    phone: "",
    email: "",
    login: "",
    pass: "",
    experience: "",
    height: "",
    driver: false,
    certificated: false,
    weapon: false,
  }),
  async mounted() {
    this.fetchGuardList();
  },
  methods: {
    async onFormSubmit() {
      try {
        let sqlCheck = this.fio + this.email + this.login + this.pass;
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
        await regGuard(
          this.fio.trim(),
          this.phone,
          this.email.trim(),
          this.login.trim(),
          this.pass.trim(),
          this.experience,
          this.height,
          this.driver,
          this.certificated,
          this.weapon
        );
        document.getElementById("fio").value = " ";
        document.getElementById("phone").value = " ";
        document.getElementById("email").value = " ";
        document.getElementById("login").value = " ";
        document.getElementById("pass").value = " ";
        document.getElementById("experience").value = "0";
        document.getElementById("height").value = "0";
        document.getElementById("driver").value = "false";
        document.getElementById("certificated").value = "false";
        document.getElementById("weapon").value = "false";
        this.driver = false;
        this.certificated = false;
        this.weapon = false;
        this.fio = "";
        this.phone = "";
        this.email = "";
        this.login = "";
        this.pass = "";
        this.experience = "";
        this.height = "";
        this.driver = "";
        this.certificated = "";
        this.weapon = "";
        alert("Охранник зарегистрирован");
        this.fetchGuardList();
      } catch (error) {
        alert(error.response.data.message);
        console.error({ error });
      }
    },
    async fetchGuardList() {
      try {
        this.guardList = await fetchGuardList();
      } catch (error) {
        console.error({ error });
      }
    },
    async deleteGuard(sid, pid, gid, login) {
      try {
        await deleteGuard(sid, pid, gid, login);
        this.fetchGuardList();
      } catch (error) {
        console.error({ error });
      }
    },
    async redirect(id) {
      try {
        sessionStorage.guardId = id;
        this.$router.push("/changeGuard");
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

