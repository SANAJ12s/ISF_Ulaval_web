<template>
  <main class="admin-page">
    <div class="container py-5">
      <h1 class="title">Admin</h1>

      <div v-if="!admin.isLoggedIn" class="card">
        <h2 class="h5 fw-bold mb-3">Connexion</h2>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Mot de passe</label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <div class="col-12 d-flex gap-2">
            <button class="btn btn-warning fw-bold" @click="doLogin">Se connecter</button>
          </div>
        </div>

        <p v-if="err" class="text-danger mt-3 mb-0">{{ err }}</p>
      </div>

      <div v-else class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <div class="fw-bold">Connecté :</div>
            <div class="text-muted">{{ admin.user.email }}</div>
            <div class="badge bg-success mt-2" v-if="admin.isAdmin">ADMIN</div>
          </div>

          <button class="btn btn-outline-light" @click="admin.logout()">Se déconnecter</button>
        </div>

        <hr class="my-4" />

        <h2 class="h5 fw-bold mb-3">Gestion du site</h2>
        <div class="grid">
          <router-link class="tile" to="/admin/activites">Activités</router-link>
          <router-link class="tile" to="/admin/projets">Projets</router-link>
          <router-link class="tile" to="/admin/evenements">Événements</router-link>
          <router-link class="tile" to="/admin/executif">Exécutif</router-link>
          <router-link class="tile" to="/admin/documents">Documents</router-link>
        </div>

        <p class="text-muted mt-3 mb-0">
          (Prochaine étape : on crée ces sous-pages + CRUD Firestore + upload Storage)
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "@/stores/admin";

const admin = useAdminStore();
const email = ref("");
const password = ref("");
const err = ref("");

const doLogin = async () => {
  err.value = "";
  try {
    await admin.login(email.value, password.value);
  } catch (e) {
    err.value = e?.message || "Erreur de connexion";
  }
};
</script>

<style scoped>
.admin-page { background: #000; min-height: 100vh; color: #fff; padding-top: 90px; }
.title { font-weight: 900; margin-bottom: 18px; }
.card {
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.tile {
  text-decoration: none;
  color: #fff;
  font-weight: 900;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
  transition: transform .15s ease, border-color .2s ease, background .2s ease;
}
.tile:hover {
  transform: translateY(-2px);
  border-color: rgba(249,115,22,0.55);
  background: rgba(249,115,22,0.12);
}
@media (max-width: 992px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
