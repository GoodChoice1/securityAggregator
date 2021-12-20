import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Авторизация",
      layout: "auth-layout",
    },
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/offers",
    name: "offers",
    meta: {
      title: "Предложения на работу",
      layout: "main-layout",
    },
    component: () => import("@/pages/OffersPage.vue"),
  },
  {
    path: "/works",
    name: "works",
    meta: {
      title: "Работа",
      layout: "main-layout",
    },
    component: () => import("@/pages/WorksPage.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    meta: {
      title: "Заявки",
      layout: "main-layout",
    },
    component: () => import("@/pages/OrdersPage.vue"),
  },
  {
    path: "/order",
    name: "order",
    meta: {
      title: "Заявка",
      layout: "main-layout",
    },
    component: () => import("@/pages/OrderPage.vue"),
  },
  {
    path: "/objects",
    name: "objects",
    meta: {
      title: "объекты",
      layout: "main-layout",
    },
    component: () => import("@/pages/ObjectsPage.vue"),
  },
  {
    path: "/object",
    name: "object",
    meta: {
      title: "объект",
      layout: "main-layout",
    },
    component: () => import("@/pages/ObjectPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { userRole, login, password } = sessionStorage;
  if ((userRole && login && password) || to.name == "login") {
    next();
  }
   else {
    next("/login");
  }
});

export default router;
