import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    loading: true,
    initialized: false,
  }),

  getters: {
    adminUid() {
      // Mets ton UID admin ici via .env (recommandé)
      // VITE_ADMIN_UID=Tcgiu1FJg6XmXG1PAE8hEj08kg12
      return import.meta.env.VITE_ADMIN_UID || "";
    },
    isLoggedIn(state) {
      return !!state.user;
    },
    isAdmin(state) {
      return !!state.user && !!this.adminUid && state.user.uid === this.adminUid;
    },
  },

  actions: {
    init() {
      if (this.initialized) return;

      this.initialized = true;
      this.loading = true;

      onAuthStateChanged(auth, (user) => {
        this.user = user || null;
        this.loading = false;
      });
    },
  },
});
