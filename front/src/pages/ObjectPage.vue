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
        <div><br /></div>
      </div>
      <form @submit="onFormSubmit">
        Изменить объект
        <div><br /></div>
        <div class="form-field">
          <label for="character"></label>
          Характер объекта
          <br />
          <input v-model="character" id="character" type="text" required />
        </div>
        <div class="form-field">
          <label for="adress"></label>
          Адрес
          <br />
          <input v-model="adress" id="adress" type="text" required />
        </div>
        <div class="form-field">
          <label for="description"></label>
          Описание объекта
          <br />
          <input v-model="description" id="description" type="text" required />
        </div>
        <button class="submit-btn" type="submit">Изменить</button>
      </form>
    </div>
    <div v-else>Объект не выбран</div>
  </div>
</template>

<script>
import {
  fetchObject,
  deleteObject,
  changeObject,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    object: {},
    character: "",
    adress: "",
    description: "",
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
        this.character = this.object.object_character;
        this.adress = this.object.adress;
        this.description = this.object.description;
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
    async onFormSubmit() {
      try {
        let findSql = this.character + this.adress + this.description;
        if (findSql.search('\\"') != -1) {
          alert("Не используйте в полях ввода такие знаки как ' или \" или $");
          throw "Error input";
        }
        if (findSql.search("\\'") != -1) {
          alert("Не используйте в полях ввода такие знаки как ' или \" или $");
          throw "Error input";
        }
        if (findSql.search("\\$") != -1) {
          alert("Не используйте в полях ввода такие знаки как ' или \" или $");
          throw "Error input";
        }
        await changeObject(
          this.character.trim(),
          this.adress.trim(),
          this.description.trim(),
          sessionStorage.object_id
        );
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

