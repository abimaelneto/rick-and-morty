import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import LocationDetails from "../views/LocationDetails.vue";
import DetailView from "../views/Detail.vue";
import EpisodeView from "../views/Episodes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/location-details/:id",
      name: "locationDetails",
      component: LocationDetails,
    },
    {
      path: "/character/:id",
      name: "characterView",
      component: DetailView,
    },
    {
      path: "/episode/:id",
      name: "episodeView",
      component: EpisodeView,
    },
  ],
});

export default router;
