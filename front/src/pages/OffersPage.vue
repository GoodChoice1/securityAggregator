<template>
  <div class="main">
    <ul v-if="isOffers">
      <li v-for="offer in offersList" :key="offer.id_order" class="todo">
        <div>Описание работы: {{ offer.description }}</div>
        <div>Характер объекта: {{ offer.object_character }}</div>
        <div>Оплата: {{ offer.price_per_hour }}руб. в час</div>
        <div>Дата начала работ: {{ offer.work_date_start }}</div>
        <div>Дата окончания работ: {{ offer.work_date_end }}</div>
        <button
          class="submit-btn"
          type="submit"
          @click="agreeForWork(offer.sid,offer.orid)"
        >
          Согласиться
        </button>
        <button class="submit-btn" type="submit" @click="declineWork(offer.sid,offer.orid)">
          Отказаться
        </button>
      </li>
    </ul>
    <div v-else>Нет предложений</div>
  </div>
</template>

<script>
import {
  fetchOffersList,
  agreeForWork,
  deleteOffer,
  toLogin,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    offersList: false,
  }),
  computed: {
    isOffers() {
      return this.offersList;
    },
  },
  async mounted() {
    this.fetchOffersList();
  },
  methods: {
    async fetchOffersList() {
      try {
        this.offersList = await fetchOffersList();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
    async agreeForWork(sid,orid) {
      try {
        await agreeForWork(sid,orid);
        this.fetchOffersList();
      } catch (error) {
        console.error({ error });
      }
    },
    async declineWork(sid,orid) {
      try {
        await deleteOffer(orid,sid);
        this.fetchOffersList();
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

