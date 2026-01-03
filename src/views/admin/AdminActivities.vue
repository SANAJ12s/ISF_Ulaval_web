<template>
  <main class="admin-page">
    <div class="container">
      <header class="head">
        <div>
          <h1 class="title">Activités</h1>
          <p class="sub">Gérer les galeries d’activités.</p>
        </div>

        <div class="actions">
          <router-link class="btn ghost" to="/admin">← Dashboard</router-link>
          <button class="btn" @click="openCreate">+ Ajouter</button>
        </div>
      </header>

      <div class="list">
        <div v-for="a in activities" :key="a.id" class="item">
          <div class="left">
            <div class="cover" v-if="a.cover">
              <img :src="a.cover" :alt="a.title" />
            </div>
            <div class="meta">
              <div class="name">{{ a.title }}</div>
              <div class="small">
                {{ (a.images?.length || 0) }} image(s) • order: {{ a.order ?? "-" }} •
                <span :style="{ color: a.isVisible ? '#22c55e' : '#ef4444' }">
                  {{ a.isVisible ? "Visible" : "Masqué" }}
                </span>
              </div>
            </div>
          </div>

          <div class="right">
            <button class="btn ghost" @click="openEdit(a)">Modifier</button>
            <button class="btn danger" @click="remove(a)">Supprimer</button>
          </div>
        </div>
      </div>

      <!-- MODAL -->
      <div v-if="modal.open" class="modal" @click.self="closeModal">
        <div class="modal-card">
          <div class="modal-head">
            <h2 class="m-title">{{ modal.mode === "create" ? "Nouvelle activité" : "Modifier l’activité" }}</h2>
            <button class="x" @click="closeModal" aria-label="Fermer">✕</button>
          </div>

          <div class="modal-body">
            <label class="label">Titre</label>
            <input class="input" v-model.trim="form.title" placeholder="Ex: Gala" />

            <label class="label">Order (tri d’affichage)</label>
            <input class="input" type="number" v-model.number="form.order" />

            <label class="label">Images (upload)</label>
            <input class="input" type="file" multiple accept="image/*" @change="onFiles" />

            <div v-if="uploading" class="info">Upload en cours…</div>

            <div class="preview" v-if="form.images.length">
              <div v-for="(u, i) in form.images" :key="u + i" class="pimg">
                <img :src="u" alt="" />
                <button class="del" @click="removeImg(i)" type="button">Retirer</button>
              </div>
            </div>

            <div class="row">
              <label class="checkbox">
                <input type="checkbox" v-model="form.isVisible" />
                Visible sur le site
              </label>
            </div>
          </div>

          <div class="modal-foot">
            <button class="btn ghost" @click="closeModal">Annuler</button>
            <button class="btn" @click="save" :disabled="saving || !form.title">
              {{ saving ? "Sauvegarde…" : "Enregistrer" }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
  import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase"; 

export default {
  name: "AdminActivities",
  data() {
    return {
      activities: [],
      modal: { open: false, mode: "create", id: null },

      // ✅ nouveau schéma
      form: {
        title: "",
        order: 10,
        isVisible: true,
        images: [],
        cover: "",
      },

      uploading: false,
      saving: false,
      _unsub: null,
    };
  },

  mounted() {
    // ✅ live updates
    const q = query(collection(db, "activities"), orderBy("order", "asc"));
    this._unsub = onSnapshot(q, (snap) => {
      this.activities = snap.docs.map((d) => {
        const data = d.data() || {};

        // ✅ compat lecture ancien schéma
        const images =
          (Array.isArray(data.images) && data.images) ||
          (Array.isArray(data.imageUrls) && data.imageUrls) ||
          [];

        const cover = data.cover || data.coverUrl || images[0] || "";

        const isVisible =
          data.isVisible !== undefined ? !!data.isVisible : (data.published !== false);

        return {
          id: d.id,
          title: data.title || "",
          order: Number.isFinite(data.order) ? data.order : 999,
          images,
          cover,
          isVisible,
        };
      });
    });
  },

  beforeUnmount() {
    if (this._unsub) this._unsub();
  },

  methods: {
    openCreate() {
      this.modal = { open: true, mode: "create", id: null };
      this.form = { title: "", order: 10, isVisible: true, images: [], cover: "" };
    },

    openEdit(a) {
      this.modal = { open: true, mode: "edit", id: a.id };

      this.form = {
        title: a.title || "",
        order: Number.isFinite(a.order) ? a.order : 10,
        isVisible: a.isVisible !== false,
        images: Array.isArray(a.images) ? [...a.images] : [],
        cover: a.cover || (a.images?.[0] || ""),
      };
    },

    closeModal() {
      this.modal.open = false;
    },

    async onFiles(e) {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      this.uploading = true;
      try {
        const urls = [];
        for (const file of files) {
          const path = `activities/${Date.now()}_${file.name}`;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          urls.push(url);
        }

        this.form.images = [...this.form.images, ...urls];
        if (!this.form.cover) this.form.cover = this.form.images[0] || "";
      } finally {
        this.uploading = false;
        e.target.value = "";
      }
    },

    removeImg(i) {
      // ✅ bugfix: on garde l'url supprimée avant splice
      const removedUrl = this.form.images[i];
      this.form.images.splice(i, 1);

      // si cover était celle supprimée → cover devient 1ère restante
      if (this.form.cover && this.form.cover === removedUrl) {
        this.form.cover = this.form.images[0] || "";
      }

      // si cover vide → fallback
      if (!this.form.cover) this.form.cover = this.form.images[0] || "";
    },

    async save() {
      this.saving = true;
      try {
        const images = Array.isArray(this.form.images) ? this.form.images : [];
        const cover = this.form.cover || images[0] || "";
        const isVisible = !!this.form.isVisible;

        // ✅ payload standard + compat temporaire
        const payload = {
          title: (this.form.title || "").trim(),
          order: Number.isFinite(this.form.order) ? this.form.order : 999,

          // nouveau schéma
          images,
          cover,
          isVisible,

          // compat temporaire (pour anciens codes)
          imageUrls: images,
          coverUrl: cover,
          published: isVisible,

          updatedAt: serverTimestamp(),
        };

        if (this.modal.mode === "create") {
          payload.createdAt = serverTimestamp();
          await addDoc(collection(db, "activities"), payload);
        } else {
          await updateDoc(doc(db, "activities", this.modal.id), payload);
        }

        this.closeModal();
      } finally {
        this.saving = false;
      }
    },

    async remove(a) {
      const ok = confirm(`Supprimer "${a.title}" ?`);
      if (!ok) return;
      await deleteDoc(doc(db, "activities", a.id));
    },
  },
};
</script>

<style scoped>
/* (CSS inchangé – je garde ton style) */
.admin-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding-top: 90px;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 18px; }
.head {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 12px; margin-bottom: 18px;
}
.title { font-weight: 900; margin: 0; }
.sub { margin: 6px 0 0; color: rgba(255,255,255,0.7); }
.actions { display: flex; gap: 10px; align-items: center; }
.btn {
  background: #f97316; color: #000; border: 0;
  border-radius: 12px; padding: 10px 14px; font-weight: 900;
}
.btn.ghost {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  color: #fff;
}
.btn.danger {
  background: rgba(255, 80, 80, 0.18);
  border: 1px solid rgba(255, 80, 80, 0.35);
  color: #fff;
}
.list { display: grid; gap: 12px; }
.item {
  display: flex; justify-content: space-between; align-items: center;
  gap: 12px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 12px;
}
.left { display: flex; gap: 12px; align-items: center; }
.cover {
  width: 92px; height: 62px; border-radius: 12px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
  background: #050505;
}
.cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.name { font-weight: 900; }
.small { color: rgba(255,255,255,0.65); font-weight: 700; margin-top: 3px; }
.right { display: flex; gap: 10px; }

/* Modal */
.modal {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.72);
  display: grid; place-items: center;
  padding: 18px;
}
.modal-card {
  width: min(760px, 96vw);
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.65);
}
.modal-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.10);
}
.m-title { margin: 0; font-weight: 900; }
.x {
  width: 42px; height: 42px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: #fff;
}
.modal-body { padding: 16px; display: grid; gap: 10px; }
.label { font-weight: 800; color: rgba(255,255,255,0.9); }
.input {
  background: #050505; color: #fff;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 12px; padding: 10px 12px;
}
.info { color: rgba(255,255,255,0.75); font-weight: 700; }
.preview { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
.pimg {
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  overflow: hidden;
  background: #050505;
}
.pimg img { width: 100%; height: 120px; object-fit: cover; display: block; }
.del {
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 0;
  color: #fff;
  padding: 10px;
  font-weight: 900;
}
.row { margin-top: 4px; }
.checkbox { display: inline-flex; align-items: center; gap: 10px; font-weight: 900; }

.modal-foot {
  display: flex; justify-content: flex-end; gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid rgba(255,255,255,0.10);
}
@media (max-width: 720px) {
  .preview { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
</style>
