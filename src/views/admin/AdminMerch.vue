<template>
  <main class="admin">
    <div class="container py-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div>
          <h1 class="title">Gestion — Merch</h1>
          <p class="subtitle">Modifie l’annonce et gère les articles affichés sur la page Merch.</p>
        </div>

        <router-link class="btn-back" to="/admin">← Retour au dashboard</router-link>
      </div>

      <!-- SETTINGS -->
      <div class="card mb-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          <h2 class="h5 fw-bold mb-0">Annonce + lien formulaire</h2>
          <span class="text-white-50 small" v-if="loadingSettings">Chargement…</span>
        </div>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Lien du formulaire (commande)</label>
            <input v-model.trim="settingsForm.orderFormUrl" class="form-control" placeholder="https://forms.gle/..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Image annonce (URL)</label>
            <input v-model.trim="settingsForm.announceImageUrl" class="form-control" placeholder="/membres/Annonce...png" />
          </div>

          <div class="col-12 d-flex gap-2 flex-wrap align-items-center">
            <button class="btn-primary" @click="saveSettings" :disabled="savingSettings">
              {{ savingSettings ? "..." : "Enregistrer settings" }}
            </button>

            <span v-if="settingsError" class="text-danger">{{ settingsError }}</span>
          </div>

          <div class="col-12" v-if="settingsForm.announceImageUrl">
            <div class="previewWide">
              <img :src="settingsForm.announceImageUrl" alt="Preview annonce" />
            </div>
          </div>
        </div>
      </div>

      <!-- ITEMS FORM -->
      <div class="card mb-4">
        <h2 class="h5 fw-bold mb-3">{{ editingId ? "Modifier un article" : "Nouvel article" }}</h2>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Titre</label>
            <input v-model.trim="form.title" class="form-control" placeholder="Ex: Pull ISF" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Sous-texte (optionnel)</label>
            <input v-model.trim="form.sub" class="form-control" placeholder="Ex: tottePull.png" />
          </div>

          <div class="col-12">
            <label class="form-label">Image (URL)</label>
            <input v-model.trim="form.imageUrl" class="form-control" placeholder="/membres/tottePull.png" />
          </div>

          <div class="col-md-4">
            <label class="form-label">Ordre</label>
            <input v-model.number="form.order" type="number" class="form-control" />
          </div>

          <div class="col-md-4">
            <label class="form-label">Afficher</label>
            <select v-model="form.isVisible" class="form-select">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </select>
          </div>

          <div class="col-md-4 d-flex align-items-end gap-2">
            <button class="btn-primary w-100" @click="saveItem" :disabled="savingItem">
              {{ savingItem ? "..." : (editingId ? "Enregistrer" : "Ajouter") }}
            </button>
          </div>

          <div class="col-12" v-if="editingId">
            <button class="btn-ghost" @click="cancelEdit" :disabled="savingItem">Annuler la modification</button>
          </div>

          <p v-if="itemError" class="text-danger mb-0">{{ itemError }}</p>
        </div>
      </div>

      <!-- ITEMS LIST -->
      <div class="card">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 class="h5 fw-bold mb-0">Articles</h2>
          <span class="badge">{{ itemsSorted.length }} total</span>
        </div>

        <div v-if="loadingItems" class="empty">Chargement…</div>

        <div v-else-if="itemsSorted.length === 0" class="empty">
          Aucun article pour le moment. Ajoute-en un 👆
        </div>

        <div v-else class="list">
          <div v-for="it in itemsSorted" :key="it.id" class="item">
            <div class="left">
              <div class="cover" v-if="it.imageUrl">
                <img :src="it.imageUrl" :alt="it.title" />
              </div>
              <div class="info">
                <div class="name">{{ it.title }}</div>
                <div class="small">
                  {{ it.sub || "—" }} • ordre: {{ it.order ?? 999 }} •
                  <span :class="it.isVisible !== false ? 'ok' : 'off'">
                    {{ it.isVisible !== false ? "Visible" : "Masqué" }}
                  </span>
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn-small" @click="edit(it)">Modifier</button>
              <button class="btn-small danger" @click="removeItem(it.id)">Supprimer</button>
            </div>
          </div>
        </div>

        <p class="hint">
          🔧 Firestore : <code>settings/merch</code> + collection <code>merch_items</code>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";

/** SETTINGS */
const loadingSettings = ref(true);
const savingSettings = ref(false);
const settingsError = ref("");

const settingsForm = reactive({
  orderFormUrl: "https://forms.gle/AmjDeCcUneTFepcT7",
  announceImageUrl: "/membres/AnnonceDesArticlesEtQRCode.png",
});

async function loadSettingsOnce() {
  loadingSettings.value = true;
  settingsError.value = "";
  try {
    const refDoc = doc(db, "settings", "merch");
    const snap = await getDoc(refDoc);
    if (snap.exists()) {
      const d = snap.data();
      settingsForm.orderFormUrl = d.orderFormUrl || settingsForm.orderFormUrl;
      settingsForm.announceImageUrl = d.announceImageUrl || settingsForm.announceImageUrl;
    } else {
      // crée un doc par défaut
      await setDoc(refDoc, {
        orderFormUrl: settingsForm.orderFormUrl,
        announceImageUrl: settingsForm.announceImageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (e) {
    console.error(e);
    settingsError.value = e?.message || "Erreur settings merch";
  } finally {
    loadingSettings.value = false;
  }
}

async function saveSettings() {
  savingSettings.value = true;
  settingsError.value = "";
  try {
    await updateDoc(doc(db, "settings", "merch"), {
      orderFormUrl: settingsForm.orderFormUrl?.trim() || "",
      announceImageUrl: settingsForm.announceImageUrl?.trim() || "",
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error(e);
    settingsError.value = e?.message || "Erreur sauvegarde settings";
  } finally {
    savingSettings.value = false;
  }
}

/** ITEMS */
const items = ref([]);
const loadingItems = ref(true);
const savingItem = ref(false);
const itemError = ref("");

const editingId = ref(null);

const form = reactive({
  title: "",
  sub: "",
  imageUrl: "",
  order: 1,
  isVisible: true,
});

let unsub = null;

const itemsSorted = computed(() =>
  [...items.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
);

function resetForm() {
  form.title = "";
  form.sub = "";
  form.imageUrl = "";
  form.order = 1;
  form.isVisible = true;
}

function edit(it) {
  editingId.value = it.id;
  form.title = it.title || "";
  form.sub = it.sub || "";
  form.imageUrl = it.imageUrl || "";
  form.order = Number.isFinite(it.order) ? it.order : 999;
  form.isVisible = it.isVisible !== false;
}

function cancelEdit() {
  editingId.value = null;
  resetForm();
}

function validateItem() {
  if (!form.title?.trim()) return "Le titre est obligatoire.";
  if (!form.imageUrl?.trim()) return "L’image (URL) est obligatoire.";
  return "";
}

async function saveItem() {
  itemError.value = "";
  const v = validateItem();
  if (v) return (itemError.value = v);

  savingItem.value = true;
  try {
    const payload = {
      title: form.title.trim(),
      sub: form.sub?.trim() || "",
      imageUrl: form.imageUrl.trim(),
      order: Number.isFinite(form.order) ? Number(form.order) : 999,
      isVisible: !!form.isVisible,
      updatedAt: serverTimestamp(),
    };

    if (editingId.value) {
      await updateDoc(doc(db, "merch_items", editingId.value), payload);
      cancelEdit();
    } else {
      await addDoc(collection(db, "merch_items"), { ...payload, createdAt: serverTimestamp() });
      resetForm();
    }
  } catch (e) {
    console.error(e);
    itemError.value = e?.message || "Erreur Firestore merch_items";
  } finally {
    savingItem.value = false;
  }
}

async function removeItem(id) {
  const ok = window.confirm("Supprimer cet article ?");
  if (!ok) return;

  try {
    await deleteDoc(doc(db, "merch_items", id));
    if (editingId.value === id) cancelEdit();
  } catch (e) {
    console.error(e);
    itemError.value = e?.message || "Erreur suppression";
  }
}

onMounted(async () => {
  await loadSettingsOnce();

  loadingItems.value = true;
  const q = query(collection(db, "merch_items"), orderBy("order", "asc"));
  unsub = onSnapshot(
    q,
    (snap) => {
      items.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      loadingItems.value = false;
    },
    (e) => {
      console.error(e);
      itemError.value = "Erreur Firestore (merch_items). Vérifie rules + config.";
      loadingItems.value = false;
    }
  );
});

onBeforeUnmount(() => {
  if (unsub) unsub();
});
</script>

<style scoped>
.admin { background:#000; min-height:100vh; color:#fff; padding-top:90px; }
.title { font-weight:900; margin:0; }
.subtitle { margin:6px 0 0; color:rgba(255,255,255,0.7); }
.card { background:#0b0b0b; border:1px solid rgba(255,255,255,0.10); border-radius:18px; padding:20px; box-shadow:0 14px 40px rgba(0,0,0,0.35); }
.btn-back { text-decoration:none; color:#fff; font-weight:800; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); border-radius:14px; padding:10px 14px; }
.badge { font-weight:900; padding:8px 12px; border-radius:999px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.10); }
.empty { padding:16px; border-radius:14px; border:1px dashed rgba(255,255,255,0.18); color:rgba(255,255,255,0.7); }

.btn-primary { border:none; border-radius:14px; padding:10px 14px; font-weight:900; color:#000; background:#f97316; }
.btn-ghost { border-radius:14px; padding:10px 14px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }

.list { display:grid; gap:12px; }
.item { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
.left { display:flex; align-items:center; gap:12px; min-width:0; }
.cover { width:92px; height:62px; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.12); background:#050505; }
.cover img { width:100%; height:100%; object-fit:cover; display:block; }
.info { min-width:0; }
.name { font-weight:900; }
.small { color:rgba(255,255,255,0.65); font-weight:700; margin-top:4px; }
.ok { color:#22c55e; font-weight:900; }
.off { color:#ef4444; font-weight:900; }
.actions { display:flex; gap:10px; flex-wrap:wrap; }
.btn-small { border-radius:12px; padding:8px 10px; font-weight:900; color:#fff; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); }
.btn-small.danger { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.12); }

.previewWide { margin-top:10px; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.10); background:#050505; }
.previewWide img { width:100%; display:block; }
.hint { margin:14px 0 0; color:rgba(255,255,255,0.65); font-size:14px; text-align:center; }
</style>
