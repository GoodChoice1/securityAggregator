<template>
  <form @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="login"></label>
      Логин
      <br />
      <input v-model="login" id="login" type="text" required />
    </div>
    <div class="form-field">
      <label for="password"></label>
      Пароль
      <br />
      <input v-model="password" id="password" type="password" required />
    </div>
    <button class="submit-btn" type="submit">Войти</button>
  </form>
</template>

<script>
import { login } from "@/netClient/services/authService";

export default {
  name: "LoginPage",
  methods: {
    async onFormSubmit() {
      try {
        await login(this.login.trim(), this.password.trim());
        if (sessionStorage.userRole == "Охранник") this.$router.push("/offers");
        else if (sessionStorage.userRole == "Клиент") this.$router.push("/");
        else if (sessionStorage.userRole == "Рабочий в нашей организации")
          this.$router.push("/");
      } catch (error) {
        if (
          error.response.data.message == "Connection terminated unexpectedly"
        ) {
          alert("Неправильный логин или пароль");
        }
        console.error({ error });
      }
    },
  },
};
</script>

