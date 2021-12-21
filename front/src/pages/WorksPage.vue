<template>
  <div class="main">
    <ul v-if="workList">
      <li v-for="work in workList" :key="work.adress" class="todo">
        <div>ФИО заказчика: {{ work.full_name }}</div>
        <div>Телефон заказчика: {{ work.phone_number }}</div>
        <div>Оплата: {{ work.price_per_hour }}руб. в час</div>
        <div>Дата начала работ: {{ work.work_date_start }}</div>
        <div>Дата окончания работ: {{ work.work_date_end }}</div>
        <div>Описание работ: {{ work.description }}</div>
        <div>Характер объекта: {{ work.object_character }}</div>
        <div>Описание объекта: {{ work.obj_description }}</div>
        <div>Адрес объекта: {{ work.adress }}</div>
        <button
          class="submit-btn"
          @click="deleteWorking(work.sec_id, work.ord_id)"
          type="submit"
        >
          Отказаться от работы
        </button>
      </li>
    </ul>
    <div v-else>Нет работ</div>
  </div>
</template>

<script>
import {
  fetchWorkList,
  deleteWorking,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    workList: false,
  }),
  computed: {
    isWorks() {
      return this.workList;
    },
  },
  async mounted() {
    this.fetchWorkList();
  },
  methods: {
    async fetchWorkList() {
      try {
        this.workList = await fetchWorkList();
      } catch (error) {
        console.error({ error });
      }
    },
    async deleteWorking(sec, ord) {
      try {
        await deleteWorking(sec, ord);
        this.fetchWorkList();
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

