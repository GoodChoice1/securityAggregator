<template>
  <div class="main">
    <div v-if="isChosen">
      <div>
        <button
          v-if="order.amount_of_people_needed > 0"
          class="submit-btn"
          @click="offerSecurity"
          type="submit"
        >
          Отправить предложения подходящим кандидатам
        </button>
        <div>Осталось требуемых людей: {{ order.amount_of_people_needed }}</div>
        <div>Ставка за час: {{ order.price_per_hour }}руб.</div>
        <div>Дата начала работ: {{ order.work_date_start }}</div>
        <div>Дата окончания работ: {{ order.work_date_end }}</div>
        <div>Описание работ: {{ order.description }}</div>
        <div>Характер объекта: {{ order.object_character }}</div>
        <div>Адрес: {{ order.adress }}</div>
        <div>
          Минимальный опыт работы в месяцах: {{ order.work_experience }}
        </div>
        <div>Минимальный рост охранника: {{ order.height }}</div>
        <div v-if="order.driver_license">
          Требуется водительское удостоверение
        </div>
        <div v-if="order.is_certificated">
          Требуется удостоверение частного охранника
        </div>
        <div v-if="order.weapon_license">Требуется лицензия на оружие</div>
        <button class="submit-btn" @click="deleteOrder" type="submit">
          Удалить задание
        </button>
        <div><br/></div>
        <form @submit.prevent="onFormSubmit">
          <label for="amountPeople"></label>
          Изменить количество людей требуемых в заявке на
          <br />
          <input
            v-model="amountPeople"
            id="amountPeople"
            type="number"
            required
            min="0"
            max="10000"
          />
          <button class="submit-btn" type="submit">Изменить задание</button>
        </form>
      </div>
      <br />
      <ul v-if="workingList.length > 0">
        Работающие охранники:
        <li
          class="list"
          v-for="worker in workingList"
          :key="worker.phone_number"
        >
          <br />
          <div>ФИО охранника: {{ worker.full_name }}</div>
          <div>Телефон охранника: {{ worker.phone_number }}</div>
          <div>Эл. почта охранника: {{ worker.email }}</div>
        </li>
      </ul>
      <ul v-if="order.amount_of_people_needed > 0 && offeredList.length > 0">
        Охранники которым отправлено предложение на работу:
        <li
          class="list"
          v-for="worker in offeredList"
          :key="worker.phone_number"
        >
          <br />
          <div>Имя охранника: {{ worker.full_name.split(" ")[1] }}</div>
          <div>Рост охранника в см: {{ worker.height }}</div>
          <div v-if="worker.is_certificated">
            Имеет удостоверение частного охранника
          </div>
          <div v-if="worker.weapon_license">Имеет лицензию на оружие</div>
          <div>Опыт работы в месяцах: {{ worker.work_experience }}</div>
          <div v-if="worker.driver_license">
            Имеет водительское удостоверение
          </div>
        </li>
      </ul>

      <ul v-if="order.amount_of_people_needed > 0 && toOfferList.length > 0">
        Подходящие охранники:
        <li
          class="list"
          v-for="worker in toOfferList"
          :key="worker.phone_number"
        >
          <br />
          <div>Имя охранника: {{ worker.full_name.split(" ")[1] }}</div>
          <div>Рост охранника в см: {{ worker.height }}</div>
          <div v-if="worker.is_certificated">
            Имеет удостоверение частного охранника
          </div>
          <div v-if="worker.weapon_license">Имеет лицензию на оружие</div>
          <div>Опыт работы в месяцах: {{ worker.work_experience }}</div>
          <div v-if="worker.driver_license">
            Имеет водительское удостоверение
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Заявка не выбрана</div>
  </div>
</template>

<script>
import {
  fetchOrder,
  deleteOrder,
  fetchWorking,
  fetchToOffer,
  offerSecurity,
  fetchOffered,
  changeTask,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    order: {},
    workingList: [],
    toOfferList: [],
    offeredList: [],
    amountPeople: 0,
  }),
  async mounted() {
    if (sessionStorage?.order_id) {
      this.fetchOrder();
      this.fetchWorking();
      this.fetchToOffer();
      this.fetchOffered();
    }
  },
  computed: {
    isChosen() {
      return sessionStorage?.order_id;
    },
  },
  methods: {
    async fetchOrder() {
      try {
        this.order = await fetchOrder();
      } catch (error) {
        console.error({ error });
      }
    },
    async deleteOrder() {
      try {
        await deleteOrder(sessionStorage.order_id);
        sessionStorage.removeItem("order_id");
        this.$router.push("/orders");
      } catch (error) {
        console.error({ error });
      }
    },
    async fetchWorking() {
      try {
        this.workingList = await fetchWorking(sessionStorage.order_id);
      } catch (error) {
        console.error({ error });
      }
    },
    async fetchToOffer() {
      try {
        this.toOfferList = await fetchToOffer(sessionStorage.order_id);
      } catch (error) {
        console.error({ error });
      }
    },
    async offerSecurity() {
      try {
        await offerSecurity(sessionStorage.order_id);
        this.fetchToOffer();
        this.fetchOffered();
      } catch (error) {
        console.error({ error });
      }
    },
    async fetchOffered() {
      try {
        this.offeredList = await fetchOffered(sessionStorage.order_id);
      } catch (error) {
        console.error({ error });
      }
    },
    async onFormSubmit() {
      try {
        await changeTask(this.amountPeople, sessionStorage.order_id);
        this.fetchOrder();
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

