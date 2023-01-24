import { createRouter, createWebHistory } from "vue-router";
import { store } from "../stores/store.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/Login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if (store.isAuthenticated === false && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
