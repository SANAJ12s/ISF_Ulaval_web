import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // ✅ utilise ton export

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

onAuthStateChanged(auth, (user) => {
  console.log("🔥FIREBASE AUTH USER =", user);
  console.log("🔥UID =", user?.uid);
  console.log("🔥EMAIL =", user?.email);
});

app.use(router);
app.mount("#app");
