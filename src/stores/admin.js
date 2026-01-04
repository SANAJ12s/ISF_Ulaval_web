// src/stores/admin.js
import { defineStore } from "pinia";
import { auth } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const ADMIN_UID = "Tcgiu1FJg6XmXG1PAE8hEj08kg12";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    ready: false,

    // internes
    _unsub: null,
    _initPromise: null,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
    isAdmin: (s) => !!s.user && s.user.uid === ADMIN_UID,
  },

  actions: {
    init() {
      // ✅ Important: on attend le PREMIER callback onAuthStateChanged
      if (this._initPromise) return this._initPromise;

      this._initPromise = new Promise((resolve) => {
        if (this._unsub) this._unsub();

        this._unsub = onAuthStateChanged(auth, (u) => {
          this.user = u || null;
          this.ready = true;

          // Debug utile pendant la livraison:
          // console.log("[admin] auth ready:", this.user?.uid || null);

          resolve(true);
        });
      });

      return this._initPromise;
    },

    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
      // user sera mis à jour via onAuthStateChanged
    },

    async logout() {
      await signOut(auth);
      // user sera mis à jour via onAuthStateChanged
    },
  },
});
