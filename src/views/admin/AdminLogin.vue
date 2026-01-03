<template>
  <main class="admin-login">
    <div class="card">
      <h1>Admin – Connexion</h1>
      <p class="muted">Accès réservé au responsable du site.</p>

      <form @submit.prevent="login">
        <label>Email</label>
        <input v-model="email" type="email" required />

        <label>Mot de passe</label>
        <input v-model="password" type="password" required />

        <button class="btn" :disabled="loading">
          {{ loading ? "Connexion..." : "Se connecter" }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </main>
</template>

<script>
import { useAdminStore } from "@/stores/admin";

export default {
  name: "AdminLogin",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;

      try {
        const admin = useAdminStore();
        await admin.login(this.email, this.password); // vérifie UID admin dans le store
        await this.$router.replace("/admin");
      } catch (e) {
        this.error = e?.message || "Email ou mot de passe incorrect.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #000;
  padding: 90px 16px 24px;
  color: #fff;
}
.card {
  width: min(420px, 100%);
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 22px;
}
.muted {
  color: rgba(255, 255, 255, 0.65);
  margin-top: -6px;
}
label {
  display: block;
  margin-top: 14px;
  font-weight: 800;
}
input {
  width: 100%;
  margin-top: 6px;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #050505;
  color: #fff;
}
.btn {
  width: 100%;
  margin-top: 18px;
  padding: 12px;
  border-radius: 14px;
  border: 0;
  background: #f97316;
  font-weight: 900;
  cursor: pointer;
}
.error {
  margin-top: 12px;
  color: #ff6b6b;
  font-weight: 800;
}
</style>
