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

          <!-- ✅ Upload images -->
          <div class="col-12">
            <label class="form-label">Images (upload)</label>

            <input
              ref="fileInput"
              class="form-control"
              type="file"
              multiple
              accept="image/*"
              @change="onFiles"
              :disabled="saving || uploading"
            />

            <small class="muted d-block mt-2">
              ✅ Les images seront uploadées après avoir cliqué sur <b>Ajouter/Enregistrer projet</b>.
              <br />
              Si Storage bloque, le projet est quand même enregistré (sans photo) et tu verras une erreur claire.
            </small>

            <!-- Pending previews -->
            <div v-if="pendingPreviews.length" class="img-grid mt-3">
              <div v-for="(p, i) in pendingPreviews" :key="p.url" class="img-card">
                <img :src="p.url" alt="" class="img-preview" />
                <div class="img-actions">
                  <span class="muted small">{{ i === 0 ? "Cover (pending)" : `Pending ${i + 1}` }}</span>
                  <button class="btn-small danger" type="button" @click="removePending(i)" :disabled="saving || uploading">
                    Retirer
                  </button>
                </div>
              </div>
            </div>

            <!-- Uploaded previews -->
            <div v-if="form.images.length" class="img-grid mt-3">
              <div v-for="(img, i) in form.images" :key="img + i" class="img-card">
                <img :src="img" alt="" class="img-preview" />
                <div class="img-actions">
                  <span class="muted small">{{ i === 0 ? "Cover" : `Image ${i + 1}` }}</span>
                  <button class="btn-small danger" type="button" @click="removeImage(i)" :disabled="saving || uploading">
                    Retirer
                  </button>
                </div>
              </div>
            </div>

            <!-- Upload progress -->
            <div v-if="uploading" class="uploadBox mt-3">
              <div class="muted">
                Upload en cours… {{ uploadDone }}/{{ uploadTotal }} ({{ uploadProgressPct }}%)
              </div>

              <div class="progressLine">
                <div class="progressFill" :style="{ width: uploadProgressPct + '%' }"></div>
              </div>

              <button class="btn-small danger mt-2" type="button" @click="cancelUpload" :disabled="saving">
                Annuler l’upload
              </button>
            </div>
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
            <button class="btn-primary" type="button" @click="saveProject" :disabled="saving || uploading">
              {{ saving ? "..." : (editingId ? "Enregistrer projet" : "Ajouter projet") }}
            </button>

            <button v-if="editingId" class="btn-ghost" type="button" @click="cancelEdit" :disabled="saving || uploading">
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

                <span v-if="firstImage(p)" class="muted">🖼️ Cover: {{ shorten(firstImage(p)) }}</span>
                <span v-if="(p.images?.length || 0) > 1" class="muted">
                  + {{ p.images.length - 1 }} autres image(s)
                </span>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" type="button" @click="edit(p)" :disabled="saving || uploading">Modifier</button>
              <button class="btn-small danger" type="button" @click="remove(p.id)" :disabled="saving || uploading">
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <p class="hint">
          🔧 Firestore : <code>projects</code> — Storage : <code>projects/{projectId}/...</code>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
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
import { ref as sRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/firebase";

const loading = ref(true);
const saving = ref(false);
const uploading = ref(false);
const err = ref("");

const projects = ref([]);
let unsub = null;

const editingId = ref(null);

const fileInput = ref(null);

// pending (local)
const pendingFiles = ref([]);
const pendingPreviews = ref([]);
const previewUrlsToRevoke = ref([]);

// upload progress
const uploadTotal = ref(0);
const uploadDone = ref(0);
const uploadProgressPct = ref(0);

// tasks for cancel
const uploadTasks = ref([]);

const form = reactive({
  title: "",
  status: "En cours",
  summary: "",
  images: [],
  link: "",
  order: 1,
  isVisible: true,
});

const projectsSorted = computed(() =>
  [...projects.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function safeName(name) {
  return String(name || "file")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

function clearFileInput() {
  if (fileInput.value) fileInput.value.value = "";
}

function revokePreviews() {
  for (const u of previewUrlsToRevoke.value) URL.revokeObjectURL(u);
  previewUrlsToRevoke.value = [];
}

function resetForm() {
  form.title = "";
  form.status = "En cours";
  form.summary = "";
  form.images = [];
  form.link = "";
  form.order = 1;
  form.isVisible = true;

  pendingFiles.value = [];
  pendingPreviews.value = [];
  revokePreviews();
  clearFileInput();

  err.value = "";
}

onMounted(() => {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  unsub = onSnapshot(
    q,
    (snap) => {
      projects.value = snap.docs.map((d) => {
        const data = d.data() || {};
        const imgs = Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []);
        return { id: d.id, ...data, images: imgs };
      });
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
  revokePreviews();
});

function onFiles(e) {
  err.value = "";
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  for (const f of files) {
    const type = (f.type || "").toLowerCase();
    const looksLikeImage = type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(f.name);
    if (!looksLikeImage) continue;

    pendingFiles.value.push(f);

    const url = URL.createObjectURL(f);
    previewUrlsToRevoke.value.push(url);
    pendingPreviews.value.push({ url, name: f.name });
  }

  clearFileInput();
}

function removePending(i) {
  pendingFiles.value.splice(i, 1);
  const p = pendingPreviews.value.splice(i, 1)[0];
  if (p?.url) {
    URL.revokeObjectURL(p.url);
    previewUrlsToRevoke.value = previewUrlsToRevoke.value.filter((x) => x !== p.url);
  }
}

function removeImage(i) {
  form.images.splice(i, 1);
}

function cancelUpload() {
  for (const t of uploadTasks.value) {
    try { t.cancel(); } catch {}
  }
  uploadTasks.value = [];
  uploading.value = false;
  uploadTotal.value = 0;
  uploadDone.value = 0;
  uploadProgressPct.value = 0;
  err.value = "Upload annulé.";
}

async function uploadOneWithTimeout(task, timeoutMs = 20000) {
  return await Promise.race([
    new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            resolve(url);
          } catch (e) {
            reject(e);
          }
        }
      );
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Upload timeout. Vérifie Storage rules + connexion.")), timeoutMs)
    ),
  ]);
}

async function uploadPendingImages(projectId) {
  if (!pendingFiles.value.length) return;

  uploading.value = true;
  uploadTotal.value = pendingFiles.value.length;
  uploadDone.value = 0;
  uploadProgressPct.value = 0;
  uploadTasks.value = [];

  const uploadedUrls = [];

  try {
    for (let i = 0; i < pendingFiles.value.length; i++) {
      const file = pendingFiles.value[i];

      const stamp = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const path = `projects/${projectId}/${stamp}_${safeName(file.name)}`;

      const storageRef = sRef(storage, path);
      const task = uploadBytesResumable(storageRef, file);
      uploadTasks.value.push(task);

      // progress (simple: file-by-file)
      task.on("state_changed", (snap) => {
        const filePct = snap.totalBytes > 0 ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0;
        // global approx : i files done + current file pct
        const global = Math.round(((i + filePct / 100) / uploadTotal.value) * 100);
        uploadProgressPct.value = Math.min(99, Math.max(0, global));
      });

      const url = await uploadOneWithTimeout(task, 25000);
      uploadedUrls.push(url);
      uploadDone.value += 1;
      uploadProgressPct.value = Math.round((uploadDone.value / uploadTotal.value) * 100);
    }

    // merge into form.images
    for (const u of uploadedUrls) {
      if (!form.images.includes(u)) form.images.push(u);
    }

    await updateDoc(doc(db, "projects", projectId), {
      images: form.images,
      image: form.images?.[0] || "",
      updatedAt: serverTimestamp(),
    });

    // clear pending
    pendingFiles.value = [];
    pendingPreviews.value = [];
    revokePreviews();
  } finally {
    uploading.value = false;
    uploadTasks.value = [];
    uploadTotal.value = 0;
    uploadDone.value = 0;
    uploadProgressPct.value = 0;
  }
}

async function saveProject() {
  err.value = "";
  if (!form.title?.trim()) {
    err.value = "Le titre est obligatoire.";
    return;
  }

  saving.value = true;

  const basePayload = {
    title: form.title.trim(),
    status: form.status,
    summary: form.summary?.trim() || "",
    link: form.link?.trim() || "",
    order: Number.isFinite(form.order) ? Number(form.order) : 999,
    isVisible: !!form.isVisible,
    updatedAt: serverTimestamp(),
  };

  try {
    let projectId = editingId.value;

    // 1) Save Firestore first (always works)
    if (editingId.value) {
      await updateDoc(doc(db, "projects", editingId.value), {
        ...basePayload,
        images: Array.isArray(form.images) ? form.images : [],
        image: form.images?.[0] || "",
      });
    } else {
      const docRef = await addDoc(collection(db, "projects"), {
        ...basePayload,
        images: Array.isArray(form.images) ? form.images : [],
        image: form.images?.[0] || "",
        createdAt: serverTimestamp(),
      });
      projectId = docRef.id;
    }

    // 2) Upload after (if pending)
    if (pendingFiles.value.length) {
      try {
        await uploadPendingImages(projectId);
      } catch (upErr) {
        console.error(upErr);
        err.value =
          "Le projet est enregistré, mais l’upload des images a échoué. " +
          (upErr?.message || "Vérifie Storage rules: /projects/** write admin.");
      }
    }

    editingId.value = null;
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
  form.images = Array.isArray(p.images) ? [...p.images] : (p.image ? [p.image] : []);
  form.link = p.link || "";
  form.order = Number.isFinite(p.order) ? p.order : 999;
  form.isVisible = p.isVisible !== false;

  pendingFiles.value = [];
  pendingPreviews.value = [];
  revokePreviews();
  clearFileInput();
  err.value = "";
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

function firstImage(p) {
  if (!p) return "";
  if (Array.isArray(p.images) && p.images.length) return p.images[0];
  if (p.image) return p.image;
  return "";
}
</script>

<style scoped>
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

.pill { display:inline-block; padding:6px 10px; border-radius:999px; font-weight:900; background:rgba(249,115,22,0.12); border:1px solid rgba(249,115,22,0.45); color:#f97316; font-size:13px; }
.muted-pill { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.10); color:rgba(255,255,255,0.75); }
.pill.ok { background:rgba(34,197,94,0.12); border-color:rgba(34,197,94,0.35); color:#22c55e; }
.pill.off { background:rgba(239,68,68,0.12); border-color:rgba(239,68,68,0.35); color:#ef4444; }

.desc { margin:10px 0 0; color:rgba(255,255,255,0.75); }
.links { margin-top:10px; display:grid; gap:6px; }
.link { color:#f97316; font-weight:800; text-decoration:none; }
.muted { color:rgba(255,255,255,0.55); font-size:13px; }
.muted.small { font-size:12px; }

.actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }

.btn-primary { border:none; border-radius:14px; padding:10px 14px; font-weight:900; color:#000; background:#f97316; }
.btn-ghost { border-radius:14px; padding:10px 14px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small { border-radius:12px; padding:8px 10px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small.danger { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.12); }

.empty { padding:16px; border-radius:14px; border:1px dashed rgba(255,255,255,0.18); color:rgba(255,255,255,0.7); }
.hint { margin:14px 0 0; color:rgba(255,255,255,0.65); font-size:14px; }

.img-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; }
.img-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.10); border-radius:14px; overflow:hidden; }
.img-preview { width:100%; height:140px; object-fit:cover; display:block; }
.img-actions { display:flex; justify-content:space-between; align-items:center; gap:10px; padding:10px; }
@media (max-width:900px){ .img-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }

.uploadBox { border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px; background:rgba(255,255,255,0.04); }
.progressLine { width:100%; height:10px; border-radius:999px; background:rgba(255,255,255,0.10); overflow:hidden; margin-top:8px; }
.progressFill { height:100%; background:rgba(249,115,22,0.85); width:0%; transition:width .2s ease; }
</style>
