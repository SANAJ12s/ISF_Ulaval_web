<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Gestion — Projets</h1>
          <p class="subtitle">Ajoute, modifie et supprime les projets affichés sur le site.</p>
        </div>

        <router-link class="btn-back" to="/admin">← Retour au dashboard</router-link>
      </div>

      <!-- Form -->
      <div class="card mb-4">
        <h2 class="h5 fw-bold mb-3">{{ editingId ? "Modifier un projet" : "Nouveau projet" }}</h2>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Titre</label>
            <input v-model.trim="form.title" class="form-control" placeholder="Ex: Filtration d’eau potable" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Statut</label>
            <select v-model="form.status" class="form-select">
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="À venir">À venir</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Image (URL)</label>
            <input v-model.trim="form.image" class="form-control" placeholder="https://..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Lien (optionnel)</label>
            <input v-model.trim="form.link" class="form-control" placeholder="https://..." />
          </div>

          <div class="col-12">
            <label class="form-label">Résumé</label>
            <textarea
              v-model.trim="form.summary"
              class="form-control"
              rows="3"
              placeholder="Courte description du projet..."
            ></textarea>
          </div>

          <div class="col-md-6">
            <label class="form-label">Ordre d’affichage</label>
            <input v-model.number="form.order" type="number" class="form-control" placeholder="1" />
            <small class="muted">Plus petit = affiché en premier.</small>
          </div>

          <div class="col-md-6">
            <label class="form-label">Afficher sur le site</label>
            <select v-model="form.isVisible" class="form-select">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </select>
          </div>

          <div class="col-12 d-flex flex-wrap gap-2">
            <button class="btn-primary" @click="save" :disabled="saving">
              {{ saving ? "..." : (editingId ? "Enregistrer" : "Ajouter") }}
            </button>
            <button v-if="editingId" class="btn-ghost" @click="cancelEdit" :disabled="saving">
              Annuler
            </button>
          </div>

          <p v-if="err" class="text-danger mb-0">{{ err }}</p>
        </div>
      </div>

      <!-- List -->
      <div class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 class="h5 fw-bold mb-0">Projets</h2>
          <span class="badge">{{ projectsSorted.length }} total</span>
        </div>

        <div v-if="loading" class="empty">Chargement…</div>

        <div v-else-if="projectsSorted.length === 0" class="empty">
          Aucun projet pour le moment. Ajoute-en un 👆
        </div>

        <div v-else class="list">
          <div v-for="p in projectsSorted" :key="p.id" class="item">
            <div class="info">
              <div class="top">
                <div class="name">{{ p.title }}</div>
                <div class="meta">
                  <span class="pill">{{ p.status }}</span>
                  <span class="pill muted-pill">Ordre: {{ p.order ?? 999 }}</span>
                  <span class="pill" :class="p.isVisible ? 'ok' : 'off'">
                    {{ p.isVisible ? "Visible" : "Masqué" }}
                  </span>
                </div>
              </div>

              <p v-if="p.summary" class="desc">{{ p.summary }}</p>

              <div class="links">
                <a v-if="p.link" class="link" :href="p.link" target="_blank" rel="noreferrer">Ouvrir le lien</a>
                <span v-if="p.image" class="muted">🖼️ Image: {{ shorten(p.image) }}</span>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" @click="edit(p)">Modifier</button>
              <button class="btn-small danger" @click="remove(p.id)">Supprimer</button>
            </div>
          </div>
        </div>

        <p class="hint">
          🔧 Collection Firestore : <code>projects</code> (read public, write admin).
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const loading = ref(true);
const saving = ref(false);
const err = ref("");

const projects = ref([]);
let unsub = null;

const editingId = ref(null);

const form = reactive({
  title: "",
  status: "En cours",
  summary: "",
  image: "",
  link: "",
  order: 1,
  isVisible: true,
});

const projectsSorted = computed(() =>
  [...projects.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function resetForm() {
  form.title = "";
  form.status = "En cours";
  form.summary = "";
  form.image = "";
  form.link = "";
  form.order = 1;
  form.isVisible = true;
}

onMounted(() => {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  unsub = onSnapshot(
    q,
    (snap) => {
      projects.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      loading.value = false;
    },
    (e) => {
      console.error(e);
      err.value = "Erreur Firestore (projects). Vérifie rules + config Firebase.";
      loading.value = false;
    }
  );
});

onBeforeUnmount(() => {
  if (unsub) unsub();
});

async function save() {
  err.value = "";
  if (!form.title) {
    err.value = "Le titre est obligatoire.";
    return;
  }

  saving.value = true;

  const payload = {
    title: form.title,
    status: form.status,
    summary: form.summary,
    image: form.image,
    link: form.link,
    order: Number.isFinite(form.order) ? form.order : 999,
    isVisible: !!form.isVisible,
    updatedAt: serverTimestamp(),
  };

  try {
    if (editingId.value) {
      await updateDoc(doc(db, "projects", editingId.value), payload);
      editingId.value = null;
      resetForm();
      saving.value = false;
      return;
    }

    await addDoc(collection(db, "projects"), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    resetForm();
  } catch (e) {
    console.error(e);
    err.value = e?.message || "Erreur lors de l’enregistrement.";
  } finally {
    saving.value = false;
  }
}

function edit(p) {
  editingId.value = p.id;
  form.title = p.title || "";
  form.status = p.status || "En cours";
  form.summary = p.summary || "";
  form.image = p.image || "";
  form.link = p.link || "";
  form.order = Number.isFinite(p.order) ? p.order : 999;
  form.isVisible = p.isVisible !== false;
}

function cancelEdit() {
  editingId.value = null;
  resetForm();
}

async function remove(id) {
  err.value = "";
  try {
    await deleteDoc(doc(db, "projects", id));
    if (editingId.value === id) cancelEdit();
  } catch (e) {
    console.error(e);
    err.value = e?.message || "Erreur lors de la suppression.";
  }
}

function shorten(url) {
  if (!url) return "";
  return url.length > 40 ? url.slice(0, 40) + "…" : url;
}
</script>

<style scoped>
.admin {
  background: #000;
  min-height: 100vh;
  color: #fff;
  padding-top: 90px;
}

.title {
  font-weight: 900;
  margin: 0;
}

.subtitle {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.7);
}

.card {
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}

.btn-back {
  text-decoration: none;
  color: #fff;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 14px;
  padding: 10px 14px;
}

.badge {
  font-weight: 900;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.list {
  display: grid;
  gap: 12px;
}

.item {
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.info {
  min-width: 0;
  flex: 1;
}

.name {
  font-weight: 900;
  font-size: 18px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
  align-items: center;
}

.pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  background: rgba(249, 115, 22, 0.12);
  border: 1px solid rgba(249, 115, 22, 0.45);
  color: #f97316;
  font-size: 13px;
}

.muted-pill {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.75);
}

.pill.ok {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.35);
  color: #22c55e;
}

.pill.off {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.35);
  color: #ef4444;
}

.desc {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.75);
}

.links {
  margin-top: 10px;
  display: grid;
  gap: 6px;
}

.link {
  color: #f97316;
  font-weight: 800;
  text-decoration: none;
}

.muted {
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn-primary {
  border: none;
  border-radius: 14px;
  padding: 10px 14px;
  font-weight: 900;
  color: #000;
  background: #f97316;
}

.btn-ghost {
  border-radius: 14px;
  padding: 10px 14px;
  font-weight: 900;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-small {
  border-radius: 12px;
  padding: 8px 10px;
  font-weight: 900;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-small.danger {
  border-color: rgba(239, 68, 68, 0.45);
  background: rgba(239, 68, 68, 0.12);
}

.empty {
  padding: 16px;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.7);
}

.muted {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.hint {
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}
</style>
