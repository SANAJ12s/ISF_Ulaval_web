<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Gestion — Événements</h1>
          <p class="subtitle">Crée, modifie et supprime les événements affichés sur la page d’accueil.</p>
        </div>

        <router-link class="btn-back" to="/admin">← Retour au dashboard</router-link>
      </div>

      <!-- Import initial (si collection vide) -->
      <div class="card mb-4" v-if="!loading && events.length === 0">
        <h2 class="h5 fw-bold mb-2">Importer des événements de base</h2>
        <p class="muted mb-3">
          Ta collection <code>events</code> est vide. Clique pour importer un exemple (tu peux en ajouter plusieurs).
        </p>
        <button class="btn-primary" @click="importInitial" :disabled="saving">
          {{ saving ? "..." : "Importer maintenant" }}
        </button>
        <p v-if="error" class="mt-2 text-danger mb-0">{{ error }}</p>
      </div>

      <!-- Form -->
      <div class="card mb-4">
        <div class="d-flex align-items-start justify-content-between gap-3 flex-wrap">
          <h2 class="h5 fw-bold mb-3">{{ editingId ? "Modifier un événement" : "Nouvel événement" }}</h2>
          <div class="text-white-50 small" v-if="loading">Synchronisation…</div>
        </div>

        <div class="row g-3">
          <div class="col-md-7">
            <label class="form-label">Titre</label>
            <input v-model.trim="form.title" class="form-control" placeholder="Ex: Atelier CV / Soirée recrutement" />
          </div>

          <div class="col-md-5">
            <label class="form-label">Catégorie (optionnel)</label>
            <input v-model.trim="form.category" class="form-control" placeholder="Ex: Activité / Conférence" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Date</label>
            <input v-model="form.date" type="date" class="form-control" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Heure (optionnel)</label>
            <input v-model.trim="form.time" type="time" class="form-control" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Lieu (optionnel)</label>
            <input v-model.trim="form.location" class="form-control" placeholder="Ex: ULaval, Pavillon X, Local Y" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Image (URL optionnelle)</label>
            <input v-model.trim="form.imageUrl" class="form-control" placeholder="https://..." />
            <small class="muted">Plus tard : upload via Firebase Storage si tu veux.</small>
          </div>

          <div class="col-12">
            <label class="form-label">Description (optionnel)</label>
            <textarea
              v-model.trim="form.description"
              class="form-control"
              rows="3"
              placeholder="Infos, objectifs, inscription, etc."
            ></textarea>
          </div>

          <div class="col-md-6">
            <label class="form-label">Lien (optionnel)</label>
            <input v-model.trim="form.link" class="form-control" placeholder="https://... (inscription, fb event...)" />
          </div>

          <div class="col-md-3">
            <label class="form-label">Ordre</label>
            <input v-model.number="form.order" type="number" class="form-control" placeholder="1" />
            <small class="muted">Plus petit = affiché en premier.</small>
          </div>

          <div class="col-md-3">
            <label class="form-label">Afficher</label>
            <select v-model="form.isVisible" class="form-select">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </select>
          </div>

          <div class="col-12 d-flex flex-wrap gap-2 align-items-center">
            <button class="btn-primary" @click="save" :disabled="saving">
              {{ saving ? "..." : (editingId ? "Enregistrer" : "Ajouter") }}
            </button>

            <button v-if="editingId" class="btn-ghost" @click="cancelEdit" :disabled="saving">
              Annuler
            </button>

            <span v-if="error" class="text-danger ms-2">{{ error }}</span>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 class="h5 fw-bold mb-0">Événements</h2>
          <span class="badge">{{ eventsSorted.length }} total</span>
        </div>

        <div v-if="loading" class="empty">Chargement…</div>

        <div v-else-if="eventsSorted.length === 0" class="empty">
          Aucun événement pour le moment. Ajoute-en un 👆
        </div>

        <div v-else class="list">
          <div v-for="e in eventsSorted" :key="e.id" class="item">
            <div class="info">
              <div class="top">
                <div class="name">{{ e.title }}</div>
                <div class="meta">
                  <span v-if="e.category" class="pill">{{ e.category }}</span>
                  <span class="pill muted-pill">Ordre: {{ e.order ?? 999 }}</span>

                  <span class="pill muted-pill" v-if="e.date">
                    {{ formatDate(e.date) }} <span v-if="e.time">• {{ e.time }}</span>
                  </span>

                  <span class="pill" :class="e.isVisible ? 'ok' : 'off'">
                    {{ e.isVisible ? "Visible" : "Masqué" }}
                  </span>
                </div>
              </div>

              <p v-if="e.location" class="desc">📍 {{ e.location }}</p>
              <p v-if="e.description" class="desc">{{ e.description }}</p>

              <div class="links">
                <a v-if="e.link" class="link" :href="e.link" target="_blank" rel="noreferrer">Ouvrir le lien</a>
                <a v-if="e.imageUrl" class="link" :href="e.imageUrl" target="_blank" rel="noreferrer">Voir l’image</a>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" @click="edit(e)" :disabled="saving">Modifier</button>
              <button class="btn-small danger" @click="removeEvent(e.id)" :disabled="saving">Supprimer</button>
            </div>
          </div>
        </div>

        <p class="hint">
          ✅ Firestore branché : <code>events</code> • Ajout / modif / suppression = persistant.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const events = ref([]);
const loading = ref(true);   // lecture snapshot
const saving = ref(false);   // save/delete/import
const error = ref("");

const editingId = ref(null);
let unsub = null;

const form = reactive({
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  description: "",
  link: "",
  imageUrl: "",
  order: 1,
  isVisible: true,
});

const eventsSorted = computed(() =>
  [...events.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function resetForm() {
  form.title = "";
  form.category = "";
  form.date = "";
  form.time = "";
  form.location = "";
  form.description = "";
  form.link = "";
  form.imageUrl = "";
  form.order = 1;
  form.isVisible = true;
}

function validate() {
  if (!form.title?.trim()) return "Le titre est requis.";
  if (!form.date) return "La date est requise.";
  return "";
}

async function save() {
  error.value = "";
  const v = validate();
  if (v) {
    error.value = v;
    return;
  }

  saving.value = true;
  try {
    const payload = {
      title: form.title.trim(),
      category: form.category?.trim() || "",
      date: form.date, // YYYY-MM-DD
      time: form.time || "",
      location: form.location?.trim() || "",
      description: form.description?.trim() || "",
      link: form.link?.trim() || "",
      imageUrl: form.imageUrl?.trim() || "",
      order: Number.isFinite(form.order) ? Number(form.order) : 999,
      isVisible: !!form.isVisible,
      updatedAt: serverTimestamp(),
    };

    if (editingId.value) {
      await updateDoc(doc(db, "events", editingId.value), payload);
      editingId.value = null;
      resetForm();
    } else {
      await addDoc(collection(db, "events"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      resetForm();
    }
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Erreur Firestore";
  } finally {
    saving.value = false;
  }
}

function edit(e) {
  editingId.value = e.id;
  form.title = e.title || "";
  form.category = e.category || "";
  form.date = e.date || "";
  form.time = e.time || "";
  form.location = e.location || "";
  form.description = e.description || "";
  form.link = e.link || "";
  form.imageUrl = e.imageUrl || "";
  form.order = Number.isFinite(e.order) ? e.order : 999;
  form.isVisible = e.isVisible !== false;
}

function cancelEdit() {
  editingId.value = null;
  resetForm();
}

async function removeEvent(id) {
  error.value = "";
  if (!id) return;

  const ok = window.confirm("Supprimer cet événement ?");
  if (!ok) return;

  saving.value = true;
  try {
    await deleteDoc(doc(db, "events", id));
    if (editingId.value === id) cancelEdit();
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Erreur suppression";
  } finally {
    saving.value = false;
  }
}

function formatDate(yyyyMmDd) {
  try {
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return yyyyMmDd;
  }
}

/** Import 1 clic (si la collection est vide) */
async function importInitial() {
  error.value = "";
  if (saving.value) return;
  if (events.value.length > 0) return;

  const initial = [
    {
      title: "Atelier CV — ISF ULaval",
      category: "Atelier",
      date: "2026-01-20",
      time: "18:00",
      location: "Université Laval",
      description: "Atelier pour améliorer ton CV + conseils recrutement.",
      link: "",
      imageUrl: "",
      order: 1,
      isVisible: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  ];

  saving.value = true;
  try {
    for (const item of initial) {
      await addDoc(collection(db, "events"), item);
    }
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Import impossible";
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loading.value = true;
  const q = query(collection(db, "events"));
  unsub = onSnapshot(
    q,
    (snap) => {
      events.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      loading.value = false;
    },
    (err) => {
      console.error(err);
      error.value = err?.message || "Erreur de chargement";
      loading.value = false;
    }
  );
});

onBeforeUnmount(() => {
  if (unsub) unsub();
});
</script>

<style scoped>
/* (Ton style inchangé) */
.admin { background:#000; min-height:100vh; color:#fff; padding-top:90px; }
.title { font-weight:900; margin:0; }
.subtitle { margin:6px 0 0; color:rgba(255,255,255,0.7); }
.card { background:#0b0b0b; border:1px solid rgba(255,255,255,0.10); border-radius:18px; padding:20px; box-shadow:0 14px 40px rgba(0,0,0,0.35); }
.btn-back { text-decoration:none; color:#fff; font-weight:800; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); border-radius:14px; padding:10px 14px; }
.badge { font-weight:900; padding:8px 12px; border-radius:999px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.10); }
.list { display:grid; gap:12px; }
.item { display:flex; gap:14px; justify-content:space-between; align-items:flex-start; padding:14px; border-radius:14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
.info { min-width:0; flex:1; }
.name { font-weight:900; font-size:18px; }
.meta { display:flex; flex-wrap:wrap; gap:10px; margin-top:6px; align-items:center; }
.pill { display:inline-block; padding:6px 10px; border-radius:999px; font-weight:900; font-size:13px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); }
.muted-pill { color:rgba(255,255,255,0.65); }
.pill.ok { background:rgba(34,197,94,0.12); border-color:rgba(34,197,94,0.35); color:#22c55e; }
.pill.off { background:rgba(239,68,68,0.12); border-color:rgba(239,68,68,0.35); color:#ef4444; }
.desc { margin:10px 0 0; color:rgba(255,255,255,0.75); }
.links { margin-top:10px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
.link { color:#f97316; font-weight:800; text-decoration:none; }
.actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
.btn-primary { border:none; border-radius:14px; padding:10px 14px; font-weight:900; color:#000; background:#f97316; }
.btn-ghost { border-radius:14px; padding:10px 14px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small { border-radius:12px; padding:8px 10px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small.danger { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.12); }
.empty { padding:16px; border-radius:14px; border:1px dashed rgba(255,255,255,0.18); color:rgba(255,255,255,0.7); }
.muted { color:rgba(255,255,255,0.6); font-size:13px; }
.hint { margin:14px 0 0; color:rgba(255,255,255,0.65); font-size:14px; }
</style>
