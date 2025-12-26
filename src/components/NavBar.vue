<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark fixed-top navbar-orange"
    :class="{ 'navbar-hidden': !showNavbar }"
  >
    <div class="container">
      <!-- Brand -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <div class="logo-icon me-2">
          <i class="fas fa-graduation-cap text-white"></i>
        </div>
        <span class="fw-bold">ISF Université Laval</span>
      </router-link>

      <!-- Burger -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto nav-links">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              À propos
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/qui-sommes-nous" class="dropdown-item">
                  Qui sommes-nous ?
                </router-link>
              </li>
              <li>
                <router-link to="/comite-executif" class="dropdown-item">
                  Comité exécutif
                </router-link>
              </li>
              <li>
                <router-link to="/charte" class="dropdown-item">Charte</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/nos-projets" class="nav-link">Nos projets</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/bibliotheque" class="nav-link">Bibliothèque</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/devenir-membre" class="nav-link">Deviens membre !</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/partenaires" class="nav-link">Partenaires</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/stages" class="nav-link">Stages</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/articles-promotionnels" class="nav-link">Merch</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/faire-un-don" class="nav-link">Don</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/nous-joindre" class="nav-link">Nous joindre</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showNavbar: false,
      threshold: 120, // nb de pixels avant affichage
    };
  },
  mounted() {
    this.onScroll(); // init
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.showNavbar = window.scrollY > this.threshold;
    },
  },
};
</script>

<style scoped>

.navbar-orange {
  background: rgba(249, 115, 22, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);

  /* Réduire l'épaisseur */
  padding-top: 8px;
  padding-bottom: 8px;

  /* Animation */
  transition: transform 0.25s ease, opacity 0.25s ease, background 0.25s ease;
}

/* Invisible au début */
.navbar-hidden {
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none; /* évite de cliquer sur du "vide" */
}

/* Brand + liens */
.navbar-orange .navbar-brand,
.navbar-orange .nav-link {
  color: #fff !important;
  font-weight: 600;
  transition: color 0.2s ease;
}

/* Espacement propre à droite */
.nav-links {
  gap: 18px;              /* espace régulier entre les items */
  align-items: center;
  white-space: nowrap;    /* évite les retours à la ligne */
}

/* Hover */
.navbar-orange .nav-link:hover {
  color: #fde68a !important;
}

/* Actif */
.router-link-active {
  color: #fde68a !important;
}

/* Dropdown */
.dropdown-menu {
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.dropdown-item {
  padding: 10px 20px;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #fff7ed;
  color: #f97316;
}

/* Burger */
.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  box-shadow: none;
}

/* Mobile : on autorise le retour à la ligne, et on réduit l'espace */
@media (max-width: 992px) {
  .nav-links {
    gap: 8px;
    white-space: normal;
  }

  .navbar-orange {
    background: rgba(249, 115, 22, 0.95);
  }
}
</style>
