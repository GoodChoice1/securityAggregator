<template>
  <div class="main">
    <div>Ваш профиль<br /></div>
    <div><br /></div>
    <div>ФИО: {{ client.full_name }}</div>
    <div>Логин: {{ client.login }}</div>
    <div>Телефон: {{ client.phone_number }}</div>
    <div>Наименование юр. лица: {{ client.legal_name }}</div>
    <div>ИНН: {{ client.inn }}</div>
    <div>ОГРН: {{ client.ogrn }}</div>
    <div>КПП: {{ client.kpp }}</div>
    <div>Эл.почта: {{ client.email }}</div>
    <div>Юр. адрес: {{ client.legal_addres }}</div>
    <div>Физ. адрес: {{ client.physical_addres }}</div>
  </div>
</template>

<script>
import { fetchClient, toLogin } from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    client: {},
  }),
  async mounted() {
    this.fetchClient();
  },
  methods: {
    async fetchClient() {
      try {
        this.client = await fetchClient();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
  },
};
</script>

