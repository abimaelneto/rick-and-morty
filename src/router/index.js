import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LocationDetails from "../views/LocationDetails.vue";
import DetailView from "../views/DetailView.vue";
import EpisodeView from "../views/EpisodesView.vue"

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
    {
      path: "/character/:id",
      name: "characterView",
      component: DetailView,
    },
    {
      path: "/episode/:id",
      name: "EpisodeView",
      component: EpisodeView,
    }
  ],
});

export default router;
