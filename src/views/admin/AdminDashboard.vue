<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Dashboard Admin</h1>
          <p class="subtitle">Gère le contenu du site.</p>
        </div>

        <button class="btn-ghost" @click="logout">Se déconnecter</button>
      </div>

      <div class="card">
        <p class="muted">UID: <code>{{ uid }}</code></p>
        <p class="muted">Admin: <strong>{{ isAdmin ? "Oui" : "Non" }}</strong></p>

        <div class="grid">
          <router-link class="tile" to="/admin/projects">Projets</router-link>
          <router-link class="tile" to="/admin/events">Événements</router-link>
          <router-link class="tile" to="/admin/activities">Activités</router-link>
          <router-link class="tile" to="/admin/executif">Comité</router-link>
          <router-link class="tile" to="/admin/documents">Documents</router-link>
          <router-link class="tile" to="/admin/merch">Merch</router-link>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const router = useRouter();
const admin = useAdminStore();

const uid = computed(() => admin.user?.uid || "—");
const isAdmin = computed(() => admin.isAdmin);

async function logout() {
  await admin.logout();
  router.replace("/admin/login");
}
</script>

<style scoped>
.admin { background:#000; min-height:100vh; color:#fff; padding-top:90px; }
.title { font-weight: 900; margin: 0; }
.subtitle { margin: 6px 0 0; color: rgba(255,255,255,.7); }
.card { background:#0b0b0b; border:1px solid rgba(255,255,255,.10); border-radius:18px; padding:20px; }
.muted { color: rgba(255,255,255,.7); }
.btn-ghost { border-radius:14px; padding:10px 14px; font-weight:900; color:#fff; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); }
.grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-top:16px; }
.tile { display:block; padding:14px; border-radius:14px; font-weight:900; text-decoration:none; color:#fff;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.10); }
</style>
