<template>
  <main class="admin">
    <header class="top">
      <h1>Dashboard Admin</h1>
      <button class="logout" @click="logout">Déconnexion</button>
    </header>

    <div class="grid">
      <router-link class="tile" to="/admin/activities">Gérer Activités</router-link>
      <router-link class="tile" to="/admin/projects">Gérer Projets</router-link>
      <router-link class="tile" to="/admin/events">Gérer Événements</router-link>
      <router-link class="tile" to="/admin/executive">Gérer Exécutif</router-link>
      <router-link class="tile" to="/admin/documents">Gérer Documents</router-link>
    </div>
  </main>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default {
  name: "AdminDashboard",
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
.admin { min-height:100vh; padding:96px 18px 26px; background:#000; color:#fff; }
.top { display:flex; align-items:center; justify-content:space-between; gap:12px; max-width:1100px; margin:0 auto 22px; }
.logout { background:#111; color:#fff; border:1px solid rgba(255,255,255,.12); padding:10px 14px; border-radius:14px; font-weight:900; }
.grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; }
.tile { text-decoration:none; background:#0b0b0b; border:1px solid rgba(255,255,255,.10); border-radius:18px; padding:18px; color:#fff; font-weight:900; }
.tile:hover { border-color: rgba(249,115,22,.5); transform: translateY(-1px); }
@media (max-width: 900px) { .grid { grid-template-columns:1fr; } }
</style>
