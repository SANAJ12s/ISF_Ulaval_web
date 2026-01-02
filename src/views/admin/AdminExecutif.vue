<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Gestion — Comité exécutif</h1>
          <p class="subtitle">Ajoute, modifie et supprime les membres affichés sur la page “Comité exécutif”.</p>
        </div>

        <router-link class="btn-back" to="/admin">← Retour au dashboard</router-link>
      </div>

      <!-- Form -->
      <div class="card mb-4">
        <h2 class="h5 fw-bold mb-3">{{ editingId ? "Modifier un membre" : "Nouveau membre" }}</h2>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nom complet</label>
            <input v-model.trim="form.name" class="form-control" placeholder="Ex: Sana Naj…" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Rôle</label>
            <input v-model.trim="form.role" class="form-control" placeholder="Ex: Présidente" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Photo (URL)</label>
            <input v-model.trim="form.photo" class="form-control" placeholder="https://... ou /executif/xxx.jpg" />
            <small class="muted">Astuce : plus tard on branchera Firebase Storage pour upload.</small>
          </div>

          <div class="col-md-6">
            <label class="form-label">Ordre d’affichage</label>
            <input v-model.number="form.order" type="number" class="form-control" placeholder="1" />
            <small class="muted">Plus petit = affiché en premier.</small>
          </div>

          <div class="col-12">
            <label class="form-label">Bio (optionnel)</label>
            <textarea v-model.trim="form.bio" class="form-control" rows="3" placeholder="Courte description..."></textarea>
          </div>

          <div class="col-12">
            <label class="form-label">Contact (public)</label>
            <div class="row g-3">
              <div class="col-md-6">
                <input v-model.trim="form.email" type="email" class="form-control" placeholder="Email" />
              </div>
              <div class="col-md-6">
                <input v-model.trim="form.linkedin" class="form-control" placeholder="Lien LinkedIn" />
              </div>
            </div>
            <small class="muted">Ces champs seront visibles publiquement (si remplis).</small>
          </div>

          <div class="col-md-6">
            <label class="form-label">Afficher sur le site</label>
            <select v-model="form.isVisible" class="form-select">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </select>
          </div>

          <div class="col-12 d-flex flex-wrap gap-2">
            <button class="btn-primary" @click="save" :disabled="saving || loading">
              {{ saving ? "..." : (editingId ? "Enregistrer" : "Ajouter") }}
            </button>
            <button v-if="editingId" class="btn-ghost" @click="cancelEdit" :disabled="saving || loading">
              Annuler
            </button>
          </div>

          <p v-if="err" class="text-danger mb-0">{{ err }}</p>
        </div>
      </div>

      <!-- List -->
      <div class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 class="h5 fw-bold mb-0">Membres</h2>
          <span class="badge">{{ membersSorted.length }} total</span>
        </div>

        <div v-if="loading" class="empty">Chargement…</div>

        <div v-else-if="membersSorted.length === 0" class="empty">
          Aucun membre pour le moment. Ajoute-en un 👆
        </div>

        <div v-else class="list">
          <div v-for="m in membersSorted" :key="m.id" class="item">
            <div class="left">
              <div class="avatar" :style="avatarStyle(m.photo)">
                <span v-if="!m.photo">{{ initials(m.name) }}</span>
              </div>

              <div class="info">
                <div class="name">{{ m.name }}</div>
                <div class="role">{{ m.role }}</div>

                <div class="meta">
                  <span class="pill muted-pill">Ordre: {{ m.order ?? 999 }}</span>
                  <span class="pill" :class="m.isVisible ? 'ok' : 'off'">
                    {{ m.isVisible ? "Visible" : "Masqué" }}
                  </span>
                </div>

                <p v-if="m.bio" class="bio">{{ m.bio }}</p>

                <div class="links">
                  <a v-if="m.email" class="link" :href="`mailto:${m.email}`">✉️ {{ m.email }}</a>
                  <a v-if="m.linkedin" class="link" :href="m.linkedin" target="_blank" rel="noreferrer">
                    Ouvrir LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" @click="edit(m)" :disabled="saving || loading">Modifier</button>
              <button class="btn-small danger" @click="removeMember(m.id)" :disabled="saving || loading">Supprimer</button>
            </div>
          </div>
        </div>

        <p class="hint">
          🔧 Collection Firestore : <code>executif</code>
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
import { db } from "@/firebase";

const loading = ref(true);
const saving = ref(false);
const err = ref("");

const members = ref([]);
let unsub = null;

const editingId = ref(null);

const form = reactive({
  name: "",
  role: "",
  photo: "",
  bio: "",
  email: "",
  linkedin: "",
  order: 1,
  isVisible: true,
});

const membersSorted = computed(() =>
  [...members.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function resetForm() {
  form.name = "";
  form.role = "";
  form.photo = "";
  form.bio = "";
  form.email = "";
  form.linkedin = "";
  form.order = 1;
  form.isVisible = true;
}

onMounted(() => {
  const q = query(collection(db, "executif"), orderBy("order", "asc"));
  unsub = onSnapshot(
    q,
    (snap) => {
      members.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      loading.value = false;
    },
    (e) => {
      console.error(e);
      err.value = "Erreur Firestore (executif). Vérifie rules + config Firebase.";
      loading.value = false;
    }
  );
});

onBeforeUnmount(() => {
  if (unsub) unsub();
});

function validate() {
  if (!form.name?.trim()) return "Le nom est obligatoire.";
  if (!form.role?.trim()) return "Le rôle est obligatoire.";
  return "";
}

async function save() {
  err.value = "";
  const v = validate();
  if (v) {
    err.value = v;
    return;
  }

  saving.value = true;

  const payload = {
    name: form.name.trim(),
    role: form.role.trim(),
    photo: form.photo?.trim() || "",
    bio: form.bio?.trim() || "",
    email: form.email?.trim() || "",
    linkedin: form.linkedin?.trim() || "",
    order: Number.isFinite(form.order) ? Number(form.order) : 999,
    isVisible: !!form.isVisible,
    updatedAt: serverTimestamp(),
  };

  try {
    if (editingId.value) {
      await updateDoc(doc(db, "executif", editingId.value), payload);
      editingId.value = null;
      resetForm();
    } else {
      await addDoc(collection(db, "executif"), { ...payload, createdAt: serverTimestamp() });
      resetForm();
    }
  } catch (e) {
    console.error(e);
    err.value = e?.message || "Erreur lors de l’enregistrement.";
  } finally {
    saving.value = false;
  }
}

function edit(m) {
  editingId.value = m.id;
  form.name = m.name || "";
  form.role = m.role || "";
  form.photo = m.photo || "";
  form.bio = m.bio || "";
  form.email = m.email || "";
  form.linkedin = m.linkedin || "";
  form.order = Number.isFinite(m.order) ? m.order : 999;
  form.isVisible = m.isVisible !== false;
}

function cancelEdit() {
  editingId.value = null;
  resetForm();
}

async function removeMember(id) {
  err.value = "";
  const ok = window.confirm("Supprimer ce membre ?");
  if (!ok) return;

  try {
    await deleteDoc(doc(db, "executif", id));
    if (editingId.value === id) cancelEdit();
  } catch (e) {
    console.error(e);
    err.value = e?.message || "Erreur lors de la suppression.";
  }
}

function initials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function avatarStyle(photo) {
  if (!photo) return {};
  return {
    backgroundImage: `url("${photo}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
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
.left { display:flex; gap:12px; min-width:0; flex:1; }
.avatar { width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.10); display:grid; place-items:center; font-weight:900; flex:0 0 auto; }
.info { min-width:0; flex:1; }
.name { font-weight:900; font-size:18px; }
.role { color:rgba(255,255,255,0.7); font-weight:800; margin-top:2px; }
.meta { margin-top:8px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.pill { display:inline-block; padding:6px 10px; border-radius:999px; font-weight:900; font-size:13px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); }
.pill.ok { background:rgba(34,197,94,0.12); border-color:rgba(34,197,94,0.35); color:#22c55e; }
.pill.off { background:rgba(239,68,68,0.12); border-color:rgba(239,68,68,0.35); color:#ef4444; }
.muted-pill { color:rgba(255,255,255,0.65); }
.bio { margin:10px 0 0; color:rgba(255,255,255,0.75); }
.links { margin-top:10px; display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
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
