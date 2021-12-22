<template>
  <div id="nav">
    <router-link class="link" to="/offers" v-if="isSecurity()">
      Список предложений на работу
    </router-link>
    <router-link class="link" to="/works" v-if="isSecurity()">
      Список работ
    </router-link>
    <router-link class="link" to="/guard" v-if="isSecurity()">
      Профиль
    </router-link>
    <router-link class="link" to="/orders" v-if="isClient()">
      Заявки
    </router-link>
    <router-link class="link" to="/order" v-if="isClient()">
      Выбранная заявка
    </router-link>
    <router-link class="link" to="/objects" v-if="isClient()">
      Объекты
    </router-link>
    <router-link class="link" to="/object" v-if="isClient()">
      Выбранный объект
    </router-link>
    <router-link class="link" to="/contracts" v-if="isClient()">
      Контракты
    </router-link>
    <router-link class="link" to="/client" v-if="isClient()">
      Профиль
    </router-link>
    <router-link class="link" to="/registerClient" v-if="isAdmin()">
      Юр. лица
    </router-link>
    <router-link class="link" to="/changeClient" v-if="isAdmin()">
      Изменить Юр. лицо
    </router-link>
    <router-link class="link" to="/registerGuard" v-if="isAdmin()">
      Охранники
    </router-link>
    <router-link class="link" to="/changeGuard" v-if="isAdmin()">
      Изменить охранника
    </router-link>
    <a class="link" @click="onLogoutClicked"> Выход </a>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async onLogoutClicked() {
      try {
        sessionStorage.removeItem("login");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("object_id");
        sessionStorage.removeItem("order_id");
        this.$router.push("/login");
      } catch (error) {
        console.error({ error });
      }
    },
    isSecurity() {
      return sessionStorage.userRole == "Охранник";
    },
    isClient() {
      return sessionStorage.userRole == "Клиент";
    },
    isAdmin() {
      return sessionStorage.userRole == "Администратор";
    },
  },
};
</script>