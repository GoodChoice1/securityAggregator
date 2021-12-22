<template>
  <div class="main">
    Создать заявку
    <div><br /></div>
    <form @submit="onFormSubmit">
      <div class="form-field">
        <label for="amountPeople"></label>
        Количество людей требуемых в заявке
        <br />
        <input
          v-model="amountPeople"
          id="amountPeople"
          type="number"
          required
          min="1"
          max="10000"
        />
      </div>
      <div class="form-field">
        <label for="description"></label>
        Описание работ
        <br />
        <input v-model="description" id="description" type="text" required />
      </div>
      <div class="form-field">
        <label for="price"></label>
        Ставка за час в рублях
        <br />
        <input
          v-model="price"
          id="price"
          type="number"
          min="0"
          max="999999"
          required
        />
      </div>
      <div class="form-field">
        <label for="dateStart"></label>
        Дата начала работ
        <br />
        <input
          v-model="dateStart"
          id="dateStart"
          min="2010-01-01"
          max="2050-01-01"
          type="date"
          required
        />
      </div>
      <div class="form-field">
        <label for="dateEnd"></label>
        Дата окончания работ
        <br />
        <input
          v-model="dateEnd"
          id="dateEnd"
          min="2010-01-01"
          max="2050-01-01"
          type="date"
          required
        />
      </div>
      <div class="form-field">
        <label for="object">Объект<br /></label>
        <select v-model="object" class="select" id="object" required>
          <option v-for="obj in objList" :key="obj.id">
            {{ obj.description }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="experience"></label>
        Минимальный опыт работы в месяцах
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
        Минимальный рост в см
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
        Требуется ли водительское удостоверение
        <br />
        <input v-model="driver" id="driver" type="checkbox" />
      </div>
      <div class="form-field">
        <label for="certificated"></label>
        Требуется ли удостоверение частного охранника
        <br />
        <input v-model="certificated" id="certificated" type="checkbox" />
      </div>
      <div class="form-field">
        <label for="weapon"></label>
        Требуется ли лицензия на оружие
        <br />
        <input v-model="weapon" id="weapon" type="checkbox" />
      </div>
      <button class="submit-btn" type="submit">Создать</button>
    </form>
    <ul v-if="isOffers">
      <li v-for="order in orderList" :key="order.id" class="todo">
        <a @click="redirect(order.id)">
          <div>
            Осталось требуемых людей: {{ order.amount_of_people_needed }}
          </div>
          <div>Ставка за час: {{ order.price_per_hour }}руб.</div>
          <div>Дата начала работ: {{ order.work_date_start }}</div>
          <div>Дата окончания работ: {{ order.work_date_end }}</div>
          <div>Описание работ: {{ order.description }}</div>
          <div>Характер объекта: {{ order.object_character }}</div>
          <div>Адрес: {{ order.adress }}</div>
          <div>Описание объекта: {{ order.ob_description }}</div>
          <br />
        </a>
      </li>
    </ul>
    <div v-else>Нет заявок</div>
  </div>
</template>

<script>
import {
  fetchOrderList,
  fetchObjectList,
  createOrder,
  toLogin,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    orderList: false,
    objList: [],
    amountPeople: "",
    description: "",
    price: "",
    dateStart: "",
    dateEnd: "",
    object: "",
    experience: "",
    height: "",
    driver: false,
    certificated: false,
    weapon: false,
  }),
  computed: {
    isOffers() {
      return this.orderList;
    },
  },
  async mounted() {
    this.fetchOrderList();
    this.fetchObjectList();
  },
  methods: {
    async fetchOrderList() {
      try {
        this.orderList = await fetchOrderList();
      } catch (error) {
        console.error({ error });
      }
    },
    async fetchObjectList() {
      try {
        this.objList = await fetchObjectList();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
    async onFormSubmit() {
      try {
        let object_id = 0;
        for (let i = 0; i < this.objList.length; i++) {
          if (this.objList[i].description === this.object)
            object_id = this.objList[i].id;
        }
        if (this.description.search('\\"') != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.description.search("\\'") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.description.search("\\$") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.description.search("\\-") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.description.search("\\*") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.description.search("\\/") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (this.dateStart > this.dateEnd) {
          alert(
            "Дата окончания работы не может быть раньше даты начала работы"
          );
          throw "Error input";
        }
        await createOrder(
          this.amountPeople,
          this.description.trim(),
          this.price,
          this.dateStart,
          this.dateEnd,
          object_id,
          this.experience,
          this.height,
          this.driver,
          this.certificated,
          this.weapon
        );
      } catch (error) {
        console.error({ error });
      }
    },
    async redirect(id) {
      sessionStorage.order_id = id;
      this.$router.push("/order");
    },
  },
};
</script>

