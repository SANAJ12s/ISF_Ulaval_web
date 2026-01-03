import { defineStore } from "pinia";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";

// ⚠️ Doit matcher tes rules Firestore
const ADMIN_UID = "Tcgiu1FJg6XmXG1PAE8hEj08kg12";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    ready: false,
    isAdminValue: false,
    _initPromise: null,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
    isAdmin: (s) => !!s.user && s.isAdminValue,
  },

  actions: {
    init() {
      if (this.ready) return Promise.resolve(this.user);
      if (this._initPromise) return this._initPromise;

      this._initPromise = new Promise((resolve) => {
        onAuthStateChanged(auth, (u) => {
          this.user = u || null;
          this.isAdminValue = !!u && u.uid === ADMIN_UID;
          this.ready = true;
          resolve(this.user);
        });
      });

      return this._initPromise;
    },

    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
      // attendre que user/isAdmin soient en place
      await this.init();

      if (!this.isAdmin) {
        await signOut(auth);
        this.user = null;
        this.isAdminValue = false;
        throw new Error("Compte non autorisé (UID différent).");
      }
    },

    async logout() {
      await signOut(auth);
      this.user = null;
      this.isAdminValue = false;
      // ready reste true
    },
  },
});
