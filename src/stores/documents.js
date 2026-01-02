// src/stores/documents.js
import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useDocumentsStore = defineStore("documents", {
  state: () => ({
    items: [],
    ready: false,
    _unsub: null,
  }),

  getters: {
    visibleDocs: (s) => s.items.filter((d) => d.isVisible !== false),
  },

  actions: {
    subscribe() {
      if (this._unsub) return; // déjà abonné

      const q = query(collection(db, "documents"), orderBy("order", "asc"));
      this._unsub = onSnapshot(
        q,
        (snap) => {
          this.items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          this.ready = true;
        },
        (err) => {
          console.error("documents subscribe error:", err);
          this.ready = true;
        }
      );
    },

    unsubscribe() {
      if (this._unsub) this._unsub();
      this._unsub = null;
    },
  },
});
