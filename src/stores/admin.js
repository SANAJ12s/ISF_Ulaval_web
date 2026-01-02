// src/stores/admin.js
import { defineStore } from "pinia";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    ready: false,
    _initPromise: null,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,

    isAdmin: (s) => {
      const adminUid = import.meta.env.VITE_ADMIN_UID;
      if (!adminUid) return false; 
      return !!s.user && s.user.uid === adminUid;
    },
  },

  actions: {
    init() {
      if (this.ready) return Promise.resolve(this.user);
      if (this._initPromise) return this._initPromise;

      this._initPromise = new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          this.user = u || null;
          this.ready = true;
          resolve(this.user);

          unsubscribe();
        });
      });

      return this._initPromise;
    },

    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
      await signOut(auth);
    },
  },
});
