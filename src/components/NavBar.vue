<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <div class="logo-icon me-2">
          <i class="fas fa-graduation-cap text-primary"></i>
        </div>
        <span class="fw-bold">ISF Université Laval</span>
      </a>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
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
              <li><router-link to="/qui-sommes-nous" class="dropdown-item">Qui sommes-nous ?</router-link></li>
              <li><router-link to="/comite-executif" class="dropdown-item">Comité exécutif</router-link></li>
              <li><router-link to="/charte" class="dropdown-item">Charte</router-link></li>
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
  name: 'NavBar'
}
</script>

<style scoped>
.navbar-brand img {
  filter: brightness(0) invert(1);
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fbbf24 !important;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.dropdown-item {
  padding: 8px 20px;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: var(--primary-color);
}

/* Router link active state */
.router-link-active {
  color: #fbbf24 !important;
}
</style>
