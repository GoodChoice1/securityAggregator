<template>
  <div class="main">
      <ul>
          <li v-for="contract in contractList" :key="contract.date_of_expiration">
              <div>Номер контракта: {{contract.id}}</div>
           <div>Дата окончания контракта: {{contract.date_of_expiration}}</div>
          </li>
      </ul>
  </div>
</template>

<script>
import {
  fetchContracts,
} from "@/netClient/services/orderService";
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
        console.error({ error });
      }
    },
    
  },
};
</script>

