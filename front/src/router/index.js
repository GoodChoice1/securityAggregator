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
  {
    path: "/contracts",
    name: "contracts",
    meta: {
      title: "контракты",
      layout: "main-layout",
    },
    component: () => import("@/pages/ContractsPage.vue"),
  },
  {
    path: "/registerClient",
    name: "registerClient",
    meta: {
      title: "регистрация",
      layout: "main-layout",
    },
    component: () => import("@/pages/RegisterClientPage.vue"),
  },
  {
    path: "/registerGuard",
    name: "registerGuard",
    meta: {
      title: "регистрация",
      layout: "main-layout",
    },
    component: () => import("@/pages/RegisterGuardPage.vue"),
  },
  {
    path: "/client",
    name: "client",
    meta: {
      title: "client",
      layout: "main-layout",
    },
    component: () => import("@/pages/ClientPage.vue"),
  },
  {
    path: "/guard",
    name: "guard",
    meta: {
      title: "guard",
      layout: "main-layout",
    },
    component: () => import("@/pages/GuardPage.vue"),
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
    if (to.name == "login"){
      next();
    }
    else if (userRole == "Клиент" && (to.name == "orders" || to.name == "order" || to.name == "objects" || to.name == "object" || to.name == "contracts" || to.name == "client")){
      next();
    }
    else if(userRole == "Охранник" && (to.name == "offers" || to.name == "works" || to.name == "guard")){
      next();
    }
    else if(userRole == "Администратор" && (to.name == "registerClient" || to.name == "registerGuard" )){
      next();
    }
    else if(userRole == "Охранник"){
      next("/offers")
    }
    else if(userRole == "Клиент"){
      next("/orders")
    }
    else if(userRole == "Администратор"){
      next("/registerClient")
    }
    else{
      next("/login")
    }
  }
   else {
    next("/login");
  }
});

export default router;
