// src/stores/admin.js
import { defineStore } from "pinia";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    ready: false,
    _initPromise: null, // ✅ pour ne pas init plusieurs fois
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
    isAdmin: (s) => !!s.user && s.user.uid === import.meta.env.VITE_ADMIN_UID,
  },

  actions: {
    init() {
      // ✅ si déjà prêt, on ne refait rien
      if (this.ready) return Promise.resolve(this.user);

      // ✅ si init déjà lancé, on renvoie la même promesse
      if (this._initPromise) return this._initPromise;

      this._initPromise = new Promise((resolve) => {
        onAuthStateChanged(auth, (u) => {
          this.user = u || null;
          this.ready = true;
          resolve(this.user);
        });
      });

      return this._initPromise;
    },

    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
      // l’état se mettra à jour via onAuthStateChanged
    },

    async logout() {
      await signOut(auth);
      // l’état se mettra à jour via onAuthStateChanged
    },
  },
});
