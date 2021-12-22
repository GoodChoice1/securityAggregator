<template>
  <div class="main">
    <div>Ваши контракты</div>
    <ul>
      <li v-for="contract in contractList" :key="contract.date_of_expiration">
        <div>Номер контракта: {{ contract.id }}</div>
        <div>Дата окончания контракта: {{ contract.date_of_expiration }}</div>
        <div><br /></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchContracts, toLogin } from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    contractList: [],
  }),
  async mounted() {
    this.fetchContracts();
  },
  methods: {
    async fetchContracts() {
      try {
        this.contractList = await fetchContracts();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
  },
};
</script>

