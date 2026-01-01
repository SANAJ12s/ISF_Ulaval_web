import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    user: null,
    loading: true,
  }),
  getters: {
    isAdmin: (state) => !!state.user,
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.loading = false;
      });
    },
  },
});
