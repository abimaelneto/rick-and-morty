import "../src/assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";

const app = createApp(App);

app.use(router);

app.component("Error", Error);
app.component("Loading", Loading);
app.mount("#app");
