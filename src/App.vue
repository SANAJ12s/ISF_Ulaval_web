<template>
  <div id="app" :class="isDark ? 'is-dark' : 'is-light'">
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
  data() {
    return {
      // Light par défaut (fond blanc standard)
      isDark: false,
    };
  },
  mounted() {
    // Appliquer le thème sauvegardé (ou Light si rien)
    const saved = localStorage.getItem("theme"); // "dark" | "light" | null
    this.isDark = saved === "dark";

    // La classe .theme-dark est sur <html> (recommandé)
    document.documentElement.classList.toggle("theme-dark", this.isDark);

    // Optionnel: écouter un event global (si tu déclenches depuis NavBar)
    window.addEventListener("theme-change", this.onThemeChange);
  },
  beforeUnmount() {
    window.removeEventListener("theme-change", this.onThemeChange);
  },
  methods: {
    onThemeChange(e) {
      // Attendu: window.dispatchEvent(new CustomEvent("theme-change", { detail: { isDark: true/false } }))
      const next = !!(e && e.detail && e.detail.isDark);
      this.isDark = next;
      document.documentElement.classList.toggle("theme-dark", this.isDark);
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },
  },
};
</script>

<style>
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Idéalement dans main.css, mais ok ici aussi */
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
