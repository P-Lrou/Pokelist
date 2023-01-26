import { createRouter, createWebHistory } from "vue-router";
import { store } from "../stores/store.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: (to) => {
        if (store.isAuthenticated === false && to.name !== "Login") {
          return { name: "Login" };
        }
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/SignIn",
      name: "SignIn",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/Profile",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
    },
  ],
});

export default router;
