<template>
  <div id="app">
    <NavBar />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
}


.app-main {
  padding-top: 78px; /* ajuste à la hauteur de ta navbar (70-80px) */
}

/* optionnel: sur mobile, navbar un peu plus petite */
@media (max-width: 992px) {
  .app-main {
    padding-top: 70px;
  }
}
</style>
