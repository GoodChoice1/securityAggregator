<template>
  <div class="main">
    <div v-if="isChosen">
      Выбранный охранник
      <div><br /></div>
      <div>ФИО: {{ worker.full_name }}</div>
      <div>Телефон: {{ worker.phone_number }}</div>
      <div>Эл. почта: {{ worker.email }}</div>
      <div>Логин: {{ worker.login }}</div>
      <div>Рост в см: {{ worker.height }}</div>
      <div>Опыт работы в месяцах: {{ worker.work_experience }}</div>
      <div v-if="worker.is_certificated">
        Имеет удостоверение частного охранника
      </div>
      <div v-if="worker.weapon_license">Имеет лицензию на оружие</div>
      <div v-if="worker.driver_license">Имеет водительское удостоверение</div>
      <div><br /></div>
      Изменить информацию об охраннике
      <form @submit.prevent="onFormSubmit(worker.gid, worker.pid)">
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
        <button class="submit-btn" type="submit">Изменить охранника</button>
      </form>
      <div><br /></div>
      <form @submit="changeLogin(worker.pid)">
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
      <form @submit="changePassword(worker.login)">
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
    <div v-else>Охранник не выбран</div>
  </div>
</template>

<script>
import {
  fetchExactGuard,
  changeGuard,
  changeLoginManager,
  changePassword,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    worker: false,
    fio: "",
    phone: "",
    email: "",
    login: "",
    experience: "",
    height: "",
    driver: false,
    certificated: false,
    weapon: false,
  }),
  computed: {
    isChosen() {
      return sessionStorage?.guardId;
    },
  },
  async mounted() {
    if (sessionStorage?.guardId) {
      this.fetchGuard();
    }
  },
  methods: {
    async fetchGuard() {
      try {
        this.worker = await fetchExactGuard(sessionStorage.guardId);
        this.fio = this.worker.full_name;
        this.phone = this.worker.phone_number;
        this.email = this.worker.email;
        this.login = this.worker.login;
        this.experience = this.worker.work_experience;
        this.height = this.worker.height;
        this.driver = this.worker.driver_license;
        this.certificated = this.worker.is_certificated;
        this.weapon = this.worker.weapon_license;
      } catch (error) {
        console.error({ error });
      }
    },
    async onFormSubmit(gid, pid) {
      try {
        let sqlCheck = this.fio + this.email;
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
        await changeGuard(
          this.fio.trim(),
          this.phone,
          this.email.trim(),
          this.experience,
          this.height,
          this.driver,
          this.certificated,
          this.weapon,
          gid,
          pid
        );
        this.fetchGuard();
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
  },
};
</script>

