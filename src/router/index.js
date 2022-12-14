import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import daybookRouter from "@/modules/daybook/router";
import authRouter from "@/modules/auth/router";
import authGuard from "@/modules/auth/router/auth-guard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/daybook",
    beforeEnter: [authGuard],
    ...daybookRouter,
  },
  {
    path: "/auth",
    ...authRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
