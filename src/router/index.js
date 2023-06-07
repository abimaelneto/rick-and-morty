import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LocationDetails from "../views/LocationDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/LocationDetails/:id",
      name: "LocationDetails",
      component: LocationDetails,
    },
  ],
});

export default router;
