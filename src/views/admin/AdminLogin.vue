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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default {
  name: "AdminLogin",
  data() {
    return { email: "", password: "", loading: false, error: "" };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;
      try {
        const cred = await signInWithEmailAndPassword(auth, this.email, this.password);

        // Optionnel: check UID (utile si tu veux bloquer même si quelqu’un a un compte)
        const adminUid = import.meta.env.VITE_ADMIN_UID;
        if (adminUid && cred.user.uid !== adminUid) {
          this.error = "Compte non autorisé.";
          await auth.signOut();
          return;
        }

        this.$router.push("/admin");
      } catch (e) {
        this.error = "Email ou mot de passe incorrect.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.admin-login { min-height: 100vh; display:grid; place-items:center; background:#000; padding:90px 16px 24px; color:#fff; }
.card { width:min(420px, 100%); background:#0b0b0b; border:1px solid rgba(255,255,255,.12); border-radius:18px; padding:22px; }
.muted { color: rgba(255,255,255,.65); margin-top:-6px; }
label { display:block; margin-top:14px; font-weight:800; }
input { width:100%; margin-top:6px; padding:12px 12px; border-radius:12px; border:1px solid rgba(255,255,255,.12); background:#050505; color:#fff; }
.btn { width:100%; margin-top:18px; padding:12px; border-radius:14px; border:0; background:#f97316; font-weight:900; }
.error { margin-top:12px; color:#ff6b6b; font-weight:800; }
</style>
