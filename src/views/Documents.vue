<template>
  <main class="docs-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-inner text-center">
        <h1 class="display-4 fw-bold text-white mb-2">Documents</h1>
        <p class="lead text-white-50 mb-0">
          Consulte nos documents officiels, rapports et ressources (PDF).
        </p>
      </div>
    </section>

    <section class="section-dark py-5">
      <div class="container">
        <!-- intro -->
        <div class="intro">
          <h2 class="intro-title">Bibliothèque de documents</h2>
          <p class="intro-sub">
            Clique sur un document pour l’ouvrir en plein écran. Tu peux aussi l’ouvrir dans un nouvel onglet.
          </p>
        </div>

        <!-- loading / empty -->
        <div v-if="loading" class="placeholder">
          <p class="mb-0 text-white-50">Chargement…</p>
        </div>

        <div v-else-if="docs.length === 0" class="placeholder">
          <p class="mb-0 text-white-50">Aucun document pour le moment.</p>
        </div>

        <div v-else class="layout">
          <!-- list -->
          <aside class="list">
            <button
              v-for="d in docs"
              :key="d.id"
              class="doc-item"
              :class="{ active: selected?.id === d.id }"
              type="button"
              @click="select(d)"
            >
              <div class="doc-title">{{ d.title }}</div>
              <div class="doc-meta">
                <span v-if="d.category" class="pill">{{ d.category }}</span>
                <span class="pill muted-pill">Ordre: {{ d.order ?? 999 }}</span>
              </div>
              <p v-if="d.description" class="doc-desc">{{ d.description }}</p>
            </button>
          </aside>

          <!-- viewer -->
          <section class="viewer">
            <div v-if="!selected" class="viewer-empty">
              <p class="mb-0 text-white-50">Sélectionne un document à gauche 👈</p>
            </div>

            <div v-else class="viewer-card">
              <div class="viewer-top">
                <div class="viewer-title">
                  <div class="big">{{ selected.title }}</div>
                  <div class="small" v-if="selected.category">{{ selected.category }}</div>
                </div>

                <div class="viewer-actions">
                  <a class="btn-open" :href="selected.url" target="_blank" rel="noreferrer">
                    Ouvrir dans un onglet ↗
                  </a>
                </div>
              </div>

              <div class="viewer-frame">
                <!-- embed iframe pdf -->
                <iframe
                  v-if="selected.url"
                  :src="pdfSrc(selected.url)"
                  title="PDF viewer"
                  frameborder="0"
                />
                <div v-else class="viewer-empty">
                  <p class="mb-0 text-white-50">⚠️ Aucun lien PDF fourni pour ce document.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <p class="hint">
          📌 Les documents affichés viennent de Firestore (collection <code>documents</code>) et filtrent <code>isVisible</code>.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "Documents",
  data() {
    return {
      loading: true,
      raw: [],
      selected: null,
      unsub: null,
    };
  },

  computed: {
    docs() {
      return (this.raw || [])
        .filter((d) => d.isVisible !== false)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .map((d) => ({
          id: d.id,
          title: d.title || "Document",
          category: d.category || "",
          url: d.url || "",
          description: d.description || "",
          order: d.order ?? 999,
        }));
    },
  },

  mounted() {
    const q = query(collection(db, "documents"), orderBy("order", "asc"));
    this.unsub = onSnapshot(
      q,
      (snap) => {
        this.raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.loading = false;

        // auto-select first doc
        if (!this.selected && this.docs.length) this.selected = this.docs[0];
        // keep selection if deleted
        if (this.selected && !this.docs.find((x) => x.id === this.selected.id)) {
          this.selected = this.docs[0] || null;
        }
      },
      (e) => {
        console.error(e);
        this.loading = false;
        this.raw = [];
      }
    );
  },

  beforeUnmount() {
    if (this.unsub) this.unsub();
  },

  methods: {
    select(d) {
      this.selected = d;
    },

    // Force PDF to show viewer (works for direct pdf links, and local /public)
    pdfSrc(url) {
      // basic: if you want page param you can append #page=1
      return `${url}#toolbar=1&navpanes=0&scrollbar=1`;
    },
  },
};
</script>

<style scoped>
.docs-page { background:#000; color:#fff; min-height:100vh; }

/* HERO */
.hero {
  position: relative;
  padding: 120px 0 70px;
  background-image: url("/ulaval.jpg");
  background-size: cover;
  background-position: center;
}
.hero-overlay { position:absolute; inset:0; background: rgba(0,0,0,0.62); }
.hero-inner { position:relative; z-index:1; }

.section-dark { background:#000; }

.intro{
  max-width: 980px;
  margin: 0 auto 26px;
  text-align: center;
}
.intro-title{ font-weight: 900; font-size: 2rem; margin:0 0 8px; }
.intro-sub{ margin:0; color: rgba(255,255,255,0.70); line-height: 1.8; }

.placeholder{
  max-width: 980px;
  margin: 0 auto;
  border: 1px dashed rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
}

.layout{
  display:grid;
  grid-template-columns: 380px 1fr;
  gap: 16px;
  align-items: start;
}

.list{
  display:grid;
  gap: 12px;
}

.doc-item{
  text-align:left;
  border-radius: 18px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  padding: 14px;
  color:#fff;
  cursor:pointer;
  transition: transform .15s ease, border-color .2s ease, background .2s ease;
}
.doc-item:hover{
  transform: translateY(-2px);
  border-color: rgba(249,115,22,0.40);
}
.doc-item.active{
  border-color: rgba(249,115,22,0.65);
  background: rgba(249,115,22,0.10);
}
.doc-title{ font-weight: 900; font-size: 16px; }
.doc-meta{ display:flex; flex-wrap:wrap; gap:8px; margin-top: 8px; }
.pill{
  display:inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
}
.muted-pill{ color: rgba(255,255,255,0.70); }
.doc-desc{ margin: 10px 0 0; color: rgba(255,255,255,0.72); line-height: 1.65; }

.viewer{ position: sticky; top: 96px; }
.viewer-empty{
  border-radius: 18px;
  border: 1px dashed rgba(255,255,255,0.18);
  padding: 22px;
  text-align:center;
}

.viewer-card{
  border-radius: 18px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  overflow:hidden;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
}

.viewer-top{
  padding: 14px 14px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 12px;
}
.viewer-title .big{ font-weight: 900; font-size: 16px; }
.viewer-title .small{ color: rgba(255,255,255,0.65); font-weight: 800; margin-top: 2px; font-size: 12px; }

.btn-open{
  color:#000;
  background:#f97316;
  font-weight: 900;
  text-decoration:none;
  padding: 10px 12px;
  border-radius: 14px;
}

.viewer-frame{
  height: min(78vh, 760px);
  background:#050505;
}
.viewer-frame iframe{
  width: 100%;
  height: 100%;
  border: 0;
}

.hint{
  margin: 18px 0 0;
  text-align:center;
  color: rgba(255,255,255,0.65);
}

@media (max-width: 992px){
  .layout{ grid-template-columns: 1fr; }
  .viewer{ position: static; }
}
</style>
