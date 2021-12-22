<template>
  <div class="main">
    <div>Ваш профиль</div>
    <div><br /></div>
    <div>ФИО: {{ worker.full_name }}</div>
    <div>Телефон: {{ worker.phone_number }}</div>
    <div>Эл. почта: {{ worker.email }}</div>
    <div>Логин: {{ worker.login }}</div>
    <div>Рост в см: {{ worker.height }}</div>
    <div>Опыт работы в месяцах: {{ worker.work_experience }}</div>
    <div v-if="worker.is_certificated">
      Есть удостоверение частного охранника
    </div>
    <div v-if="worker.weapon_license">Есть лицензию на оружие</div>
    <div v-if="worker.driver_license">Есть водительское удостоверение</div>
  </div>
</template>

<script>
import { fetchGuard, toLogin } from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    worker: {},
  }),
  async mounted() {
    this.fetchGuard();
  },
  methods: {
    async fetchGuard() {
      try {
        this.worker = await fetchGuard();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
  },
};
</script>

