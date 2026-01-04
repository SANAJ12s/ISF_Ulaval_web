<template>
  <header class="top-nav" :class="{ scrolled: isScrolled }">
    <div class="container-fluid nav-inner">
      <!-- Logo -->
      <router-link to="/" class="brand" aria-label="Aller à l'accueil">
        <img src="/logo.png" alt="ISF ULaval" class="brand-logo" />
        <span class="brand-text">ISF ULaval</span>
      </router-link>

      <!-- Links (desktop) -->
      <nav class="links" aria-label="Navigation principale">
        <router-link class="nav-link" to="/">Accueil</router-link>
        <router-link class="nav-link" to="/qui-sommes-nous">Qui sommes-nous</router-link>
        <router-link class="nav-link" to="/nos-projets">Projets</router-link>
        <router-link class="nav-link" to="/activites">Activités</router-link>
        <router-link class="nav-link" to="/comite-executif">Exécutif</router-link>
        <router-link class="nav-link" to="/documents">Documents</router-link>
        <router-link class="nav-link" to="/articles-promotionnels">Merch</router-link>
        <router-link class="nav-link" to="/stages">Stages</router-link>
        <router-link class="nav-link" to="/devenir-membre">Devenir membre</router-link>

        <!-- ✅ Admin toujours visible -->
        <router-link
          class="nav-link"
          :to="admin.isAdmin ? '/admin' : '/admin/login'"
        >
          {{ admin.isAdmin ? "Admin" : "admin" }}
        </router-link>

        <!-- ✅ Déconnexion visible seulement si admin -->
        <button
          v-if="admin.isAdmin"
          class="nav-link btn-logout"
          type="button"
          @click="logout"
        >
          Déconnexion
        </button>

        <!-- CTA -->
        <router-link class="nav-cta" to="/nous-joindre">Nous joindre</router-link>
      </nav>

      <!-- Mobile toggle -->
      <button class="burger" type="button" @click="toggleMobile" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile panel -->
    <div class="mobile" v-if="mobileOpen">
      <router-link class="m-link" to="/" @click="closeMobile">Accueil</router-link>
      <router-link class="m-link" to="/qui-sommes-nous" @click="closeMobile">Qui sommes-nous</router-link>
      <router-link class="m-link" to="/nos-projets" @click="closeMobile">Projets</router-link>
      <router-link class="m-link" to="/activites" @click="closeMobile">Activités</router-link>
      <router-link class="m-link" to="/comite-executif" @click="closeMobile">Exécutif</router-link>
      <router-link class="m-link" to="/documents" @click="closeMobile">Documents</router-link>
      <router-link class="m-link" to="/articles-promotionnels" @click="closeMobile">Merch</router-link>
      <router-link class="m-link" to="/stages" @click="closeMobile">Stages</router-link>
      <router-link class="m-link" to="/devenir-membre" @click="closeMobile">Devenir membre</router-link>

      <!-- ✅ Admin toujours visible -->
      <router-link
        class="m-link"
        :to="admin.isAdmin ? '/admin' : '/admin/login'"
        @click="closeMobile"
      >
        {{ admin.isAdmin ? "Admin" : "admin" }}
      </router-link>

      <!-- ✅ Logout si admin -->
      <button
        v-if="admin.isAdmin"
        class="m-link btn-logout-mobile"
        type="button"
        @click="logout"
      >
        Déconnexion
      </button>

      <router-link class="m-cta" to="/nous-joindre" @click="closeMobile">Nous joindre</router-link>
    </div>
  </header>
</template>

<script>
import { useAdminStore } from "@/stores/admin";

export default {
  name: "NavBar",
  data() {
    return {
      isScrolled: false,
      mobileOpen: false,
      admin: useAdminStore(),
    };
  },
  async mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, { passive: true });

    // ✅ Initialise l'état auth pour afficher "Connexion admin" ou "Admin"
    if (!this.admin.ready) {
      await this.admin.init();
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },
    closeMobile() {
      this.mobileOpen = false;
    },
    async logout() {
      await this.admin.logout();
      this.mobileOpen = false;
      this.$router.push("/"); // retour accueil
    },
  },
};
</script>

<style scoped>
/* HEADER ALWAYS VISIBLE */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  height: 78px;
  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(8px);
  transition: background 0.25s ease, box-shadow 0.25s ease, height 0.25s ease;
}

/* Quand on scroll -> bande ORANGE */
.top-nav.scrolled {
  background: rgba(249, 115, 22, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  height: 70px;
}

/* LAYOUT */
.nav-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 18px;
  padding-right: 18px;
}
@media (min-width: 1200px) {
  .nav-inner {
    padding-left: 28px;
    padding-right: 28px;
  }
}

/* Brand */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 190px;
}
.brand-logo {
  width: 46px;
  height: 46px;
  object-fit: contain;
  display: block;
}
.brand-text {
  line-height: 1;
  font-size: 1.05rem;
  color: #fff;
  font-weight: 900;
  letter-spacing: -0.02em;
  transform: translateY(1px);
}
.top-nav.scrolled .brand-text { color: #000; }

/* Links */
.links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  margin-left: 12px;
}

.nav-link {
  text-decoration: none;
  font-weight: 900;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.92);
  padding: 10px 10px;
  border-radius: 12px;
  transition: background 0.2s ease, transform 0.15s ease, color 0.2s ease;
  white-space: nowrap;
}
.nav-link:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.10);
}
.top-nav.scrolled .nav-link { color: rgba(0, 0, 0, 0.9); }
.top-nav.scrolled .nav-link:hover { background: rgba(0, 0, 0, 0.08); }

/* CTA */
.nav-cta {
  text-decoration: none;
  font-weight: 900;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(249, 115, 22, 0.95);
  color: #000;
  border: 2px solid rgba(249, 115, 22, 0.95);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}
.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(249, 115, 22, 0.55);
}
.top-nav.scrolled .nav-cta {
  background: #000;
  color: #fff;
  border-color: #000;
}
.top-nav.scrolled .nav-cta:hover {
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
}

/* ✅ Logout button style (comme un lien) */
.btn-logout,
.btn-logout-mobile {
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
}

/* Burger */
.burger {
  display: none;
  width: 46px;
  height: 40px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
}
.burger span {
  display: block;
  height: 2px;
  width: 22px;
  margin: 5px auto;
  background: #fff;
}
.top-nav.scrolled .burger {
  border-color: rgba(0,0,0,0.18);
  background: rgba(0,0,0,0.08);
}
.top-nav.scrolled .burger span { background: #000; }

/* Mobile panel */
.mobile { display: none; }

@media (max-width: 1100px) {
  .links { display: none; }
  .burger { display: inline-block; }

  .mobile {
    display: grid;
    gap: 10px;
    padding: 14px 18px 18px;
    background: rgba(0,0,0,0.92);
    border-bottom: 1px solid rgba(255,255,255,0.10);
  }

  .m-link, .m-cta {
    text-decoration: none;
    font-weight: 900;
    padding: 12px 12px;
    border-radius: 14px;
  }
  .m-link { color: #fff; background: rgba(255,255,255,0.06); }
  .m-cta { color: #000; background: #fff; }
}
</style>
