<template>
  <div class="main">
    <div v-if="isChosen">
      <div>
        <div>Характер объекта: {{ object.object_character }}</div>
        <div>Адрес: {{ object.adress }}</div>
        <div>Описание объекта: {{ object.description }}</div>
        <button class="submit-btn" @click="deleteObject" type="submit">
          Удалить объект
        </button>
      </div>
    </div>
    <div v-else>Объект не выбран</div>
  </div>
</template>

<script>
import {
  fetchObject,
  deleteObject,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    object: {},
  }),
  async mounted() {
    if (sessionStorage?.object_id) {
      this.fetchObject();
    }
  },
  computed: {
    isChosen() {
      return sessionStorage?.object_id;
    },
  },
  methods: {
    async fetchObject() {
      try {
        this.object = await fetchObject();
      } catch (error) {
        console.error({ error });
      }
    },
    async deleteObject() {
      try {
        await deleteObject(sessionStorage.object_id);
        sessionStorage.removeItem("object_id");
        this.$router.push("/objects");
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

