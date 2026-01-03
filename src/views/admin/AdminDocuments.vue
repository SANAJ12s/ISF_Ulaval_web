<!-- src/views/admin/AdminDocuments.vue -->
<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Gestion — Documents</h1>
          <p class="subtitle">Ajoute et organise les PDF/liens affichés sur la page “Documents”.</p>
        </div>

        <router-link class="btn-back" to="/admin">← Retour au dashboard</router-link>
      </div>

      <!-- Import initial -->
      <div class="card mb-4" v-if="!loading && documents.length === 0">
        <h2 class="h5 fw-bold mb-2">Importer les documents existants</h2>
        <p class="muted mb-3">
          Ta base Firestore est vide. Clique pour importer la charte (et autres docs si tu en ajoutes).
        </p>
        <button class="btn-primary" @click="importInitial" :disabled="saving">
          {{ saving ? "..." : "Importer maintenant" }}
        </button>
        <p v-if="error" class="mt-2 text-danger mb-0">{{ error }}</p>
      </div>

      <!-- Form -->
      <div class="card mb-4">
        <h2 class="h5 fw-bold mb-3">{{ editingId ? "Modifier un document" : "Nouveau document" }}</h2>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Titre</label>
            <input v-model.trim="form.title" class="form-control" placeholder="Ex: Charte ISF ULaval" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Catégorie (optionnel)</label>
            <input
              v-model.trim="form.category"
              class="form-control"
              placeholder="Ex: Officiel / Recrutement / Rapports"
            />
          </div>

          <!-- ✅ Upload PDF -->
          <div class="col-12">
            <label class="form-label">PDF (upload)</label>
            <input
              class="form-control"
              type="file"
              accept="application/pdf"
              @change="onPdfFile"
              :disabled="saving"
            />
            <small class="muted">
              Choisis un PDF → upload vers Firebase Storage → l’URL sera ajoutée automatiquement.
            </small>

            <div v-if="uploading" class="muted mt-2">Upload en cours…</div>
          </div>

          <div class="col-12">
            <label class="form-label">Lien du PDF (URL)</label>
            <input
              v-model.trim="form.url"
              class="form-control"
              placeholder="https://... ou /documents/charte-isf.pdf"
            />
            <small class="muted">
              Ce champ se remplit automatiquement après upload (tu peux aussi coller un lien direct).
            </small>
          </div>

          <div class="col-12">
            <label class="form-label">Description (optionnel)</label>
            <textarea
              v-model.trim="form.description"
              class="form-control"
              rows="3"
              placeholder="Une phrase pour expliquer le document..."
            ></textarea>
          </div>

          <div class="col-md-4">
            <label class="form-label">Ordre d’affichage</label>
            <input v-model.number="form.order" type="number" class="form-control" placeholder="1" />
            <small class="muted">Plus petit = affiché en premier.</small>
          </div>

          <div class="col-md-4">
            <label class="form-label">Pages (optionnel)</label>
            <input v-model.number="form.maxPages" type="number" class="form-control" placeholder="29" />
            <small class="muted">Utile si tu affiches “Page X / Y”.</small>
          </div>

          <div class="col-md-4">
            <label class="form-label">Afficher sur la page</label>
            <select v-model="form.isVisible" class="form-select">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </select>
          </div>

          <div class="col-12 d-flex flex-wrap gap-2">
            <button class="btn-primary" @click="save" :disabled="saving || uploading">
              {{ saving ? "..." : (editingId ? "Enregistrer" : "Ajouter") }}
            </button>
            <button v-if="editingId" class="btn-ghost" @click="cancelEdit" :disabled="saving || uploading">
              Annuler
            </button>
          </div>

          <p v-if="error" class="mt-2 text-danger mb-0">{{ error }}</p>
        </div>
      </div>

      <!-- List -->
      <div class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 class="h5 fw-bold mb-0">Documents</h2>
          <span class="badge">{{ docsSorted.length }} total</span>
        </div>

        <div v-if="loading" class="empty">Chargement…</div>

        <div v-else-if="docsSorted.length === 0" class="empty">
          Aucun document pour le moment. Ajoute-en un 👆
        </div>

        <div v-else class="list">
          <div v-for="d in docsSorted" :key="d.id" class="item">
            <div class="info">
              <div class="top">
                <div class="name">{{ d.title }}</div>
                <div class="meta">
                  <span v-if="d.category" class="pill">{{ d.category }}</span>
                  <span class="pill muted-pill">Ordre: {{ d.order ?? 999 }}</span>
                  <span v-if="d.maxPages" class="pill muted-pill">Pages: {{ d.maxPages }}</span>
                  <span class="pill" :class="d.isVisible ? 'ok' : 'off'">
                    {{ d.isVisible ? "Visible" : "Masqué" }}
                  </span>
                </div>
              </div>

              <p v-if="d.description" class="desc">{{ d.description }}</p>

              <div class="links">
                <a v-if="d.url" class="link" :href="d.url" target="_blank" rel="noreferrer">Ouvrir le PDF</a>
                <span v-else class="warn">⚠️ Aucun lien fourni</span>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" @click="edit(d)" :disabled="saving || uploading">Modifier</button>
              <button class="btn-small danger" @click="removeDoc(d.id)" :disabled="saving || uploading">Supprimer</button>
            </div>
          </div>
        </div>

        <p class="hint">✅ Persistant : ajout / modification / suppression = Firestore.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

const loading = ref(true);
const saving = ref(false);
const uploading = ref(false);
const error = ref("");

const documents = ref([]);
let unsub = null;

const editingId = ref(null);

const form = reactive({
  title: "",
  category: "",
  url: "",
  description: "",
  order: 1,
  maxPages: null,
  isVisible: true,
});

const docsSorted = computed(() =>
  [...documents.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function resetForm() {
  form.title = "";
  form.category = "";
  form.url = "";
  form.description = "";
  form.order = 1;
  form.maxPages = null;
  form.isVisible = true;
}

onMounted(() => {
  const q = query(collection(db, "documents"), orderBy("order", "asc"));
  unsub = onSnapshot(
    q,
    (snap) => {
      documents.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      loading.value = false;
    },
    (e) => {
      console.error(e);
      error.value = "Erreur Firestore (documents). Vérifie rules + config Firebase.";
      loading.value = false;
    }
  );
});

onBeforeUnmount(() => {
  if (unsub) unsub();
});

async function onPdfFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  error.value = "";

  if (file.type !== "application/pdf") {
    error.value = "Veuillez choisir un fichier PDF.";
    e.target.value = "";
    return;
  }

  uploading.value = true;
  try {
    const safeName = (file.name || "document.pdf").replace(/\s+/g, "_");
    const path = `documents/${Date.now()}_${safeName}`;
    const fileRef = sRef(storage, path);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    form.url = url;
    if (!form.title?.trim()) {
      // optionnel: pré-remplit le titre avec le nom du fichier sans extension
      form.title = safeName.replace(/\.pdf$/i, "");
    }
  } catch (err) {
    console.error(err);
    error.value = err?.message || "Upload impossible (Storage).";
  } finally {
    uploading.value = false;
    e.target.value = "";
  }
}

async function save() {
  error.value = "";
  if (!form.title?.trim()) {
    error.value = "Le titre est obligatoire.";
    return;
  }
  if (!form.url?.trim()) {
    error.value = "Le lien du PDF est obligatoire (colle une URL ou upload un PDF).";
    return;
  }

  saving.value = true;
  try {
    const payload = {
      title: form.title.trim(),
      category: form.category?.trim() || "",
      url: form.url.trim(),
      description: form.description?.trim() || "",
      order: Number.isFinite(form.order) ? Number(form.order) : 999,
      maxPages: Number.isFinite(form.maxPages) ? Number(form.maxPages) : null,
      isVisible: !!form.isVisible,
      updatedAt: serverTimestamp(),
    };

    if (editingId.value) {
      await updateDoc(doc(db, "documents", editingId.value), payload);
      editingId.value = null;
      resetForm();
    } else {
      await addDoc(collection(db, "documents"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      resetForm();
    }
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Erreur lors de l’enregistrement";
  } finally {
    saving.value = false;
  }
}

function edit(d) {
  editingId.value = d.id;
  form.title = d.title || "";
  form.category = d.category || "";
  form.url = d.url || "";
  form.description = d.description || "";
  form.order = Number.isFinite(d.order) ? Number(d.order) : 999;
  form.maxPages = Number.isFinite(d.maxPages) ? Number(d.maxPages) : null;
  form.isVisible = d.isVisible !== false;
}

function cancelEdit() {
  editingId.value = null;
  resetForm();
}

async function removeDoc(id) {
  error.value = "";
  const ok = window.confirm("Supprimer ce document ?");
  if (!ok) return;

  try {
    await deleteDoc(doc(db, "documents", id));
    if (editingId.value === id) cancelEdit();
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Erreur lors de la suppression";
  }
}

/** Import 1 clic (anti-doublon simple) */
async function importInitial() {
  error.value = "";
  if (saving.value) return;
  if (documents.value.length > 0) return;

  const initial = [
    {
      title: "Charte ISF",
      category: "Officiel",
      url: "/documents/charte-isf.pdf",
      description: "Document officiel — Charte ISF ULaval",
      order: 1,
      isVisible: true,
      maxPages: 29,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  ];

  saving.value = true;
  try {
    for (const item of initial) {
      await addDoc(collection(db, "documents"), item);
    }
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Import impossible";
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
/* (je garde ton style tel quel) */
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
.warn { color:rgba(255,255,255,0.6); font-size:13px; }
.actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
.btn-primary { border:none; border-radius:14px; padding:10px 14px; font-weight:900; color:#000; background:#f97316; }
.btn-ghost { border-radius:14px; padding:10px 14px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small { border-radius:12px; padding:8px 10px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small.danger { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.12); }
.empty { padding:16px; border-radius:14px; border:1px dashed rgba(255,255,255,0.18); color:rgba(255,255,255,0.7); }
.muted { color:rgba(255,255,255,0.6); font-size:13px; }
.hint { margin:14px 0 0; color:rgba(255,255,255,0.65); font-size:14px; }
</style>
