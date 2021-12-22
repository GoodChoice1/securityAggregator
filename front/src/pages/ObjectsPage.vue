<template>
  <div class="main">
    Добавить объект
    <div><br /></div>
    <form @submit="onFormSubmit">
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
      <button class="submit-btn" type="submit">Добавить</button>
    </form>
    <ul v-if="isOffers">
      <li v-for="object in objectList" :key="object.id" class="todo">
        <a @click="redirect(object.id)">
          <div>{{ object.description }}</div>
          <br />
        </a>
      </li>
    </ul>
    <div v-else>Нет добавленных объектов</div>
  </div>
</template>

<script>
import {
  fetchObjectList,
  createObject,
  toLogin,
} from "@/netClient/services/orderService";
export default {
  name: "HomePage",
  data: () => ({
    objectList: false,
    character: "",
    adress: "",
    description: "",
  }),
  computed: {
    isOffers() {
      return this.objectList;
    },
  },
  async mounted() {
    this.fetchObjectList();
  },
  methods: {
    async fetchObjectList() {
      try {
        this.objectList = await fetchObjectList();
      } catch (error) {
        toLogin();
        this.$router.push("/login");
        console.error({ error });
      }
    },
    async redirect(id) {
      sessionStorage.object_id = id;
      this.$router.push("/object");
    },
    async onFormSubmit() {
      try {
        let findSql = this.character + this.adress + this.description;
        if (findSql.search('\\"') != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (findSql.search("\\'") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (findSql.search("\\$") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (findSql.search("\\-") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (findSql.search("\\*") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        if (findSql.search("\\/") != -1) {
          alert(
            "Не используйте в полях ввода такие знаки как ' , \" , $ , - , * или / "
          );
          throw "Error input";
        }
        await createObject(
          this.character.trim(),
          this.adress.trim(),
          this.description.trim()
        );
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

