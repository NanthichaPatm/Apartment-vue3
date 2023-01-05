import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap";

const app = createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.component("BootstrapIcon", BootstrapIcon);
app.mount("#app");
