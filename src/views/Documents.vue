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
            Clique sur un document pour l’ouvrir. Tu peux l’afficher en plein écran ou dans un nouvel onglet.
          </p>
        </div>

        <div class="layout">
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
                  <button class="btn-ghost" type="button" @click="openFullscreen">
                    Plein écran
                  </button>

                  <a class="btn-open" :href="selected.url" target="_blank" rel="noreferrer">
                    Onglet ↗
                  </a>
                </div>
              </div>

              <div class="viewer-frame">
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
      </div>
    </section>

    <!-- FULLSCREEN MODAL -->
    <teleport to="body">
      <div v-if="fsOpen" class="fs-backdrop" @click.self="closeFullscreen" role="dialog" aria-modal="true">
        <div class="fs-modal">
          <div class="fs-top">
            <div class="fs-left">
              <div class="fs-title">{{ selected?.title }}</div>
              <div class="fs-sub" v-if="selected?.category">{{ selected.category }}</div>
            </div>

            <div class="fs-actions">
              <a v-if="selected?.url" class="btn-open" :href="selected.url" target="_blank" rel="noreferrer">
                Onglet ↗
              </a>
              <button class="btn-ghost" type="button" @click="closeFullscreen">
                Fermer
              </button>
            </div>
          </div>

          <div class="fs-frame">
            <iframe
              v-if="selected?.url"
              :src="pdfSrc(selected.url)"
              title="PDF fullscreen viewer"
              frameborder="0"
            />
          </div>
        </div>
      </div>
    </teleport>
  </main>
</template>

<script>
export default {
  name: "Documents",
  data() {
    return {
      // ✅ HARD CODE (sans Firestore)
      docs: [
        {
          id: "charte",
          title: "Charte ISF — Université Laval",
          category: "Document officiel",
          description: "La charte officielle de la section ISF Université Laval.",
          url: "/documents/charte-isf.pdf",
          order: 1,
          isVisible: true,
        },
      ],

      selected: null,
      fsOpen: false,
    };
  },

  mounted() {
    // auto-select first visible doc
    const first = (this.docs || []).filter((d) => d.isVisible !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999))[0];
    this.selected = first || null;

    window.addEventListener("keydown", this.onKey);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
    document.body.style.overflow = "";
  },

  methods: {
    select(d) {
      this.selected = d;
    },

    pdfSrc(url) {
      // Viewer PDF (toolbar ok, nav/scroll ok)
      return `${url}#toolbar=1&navpanes=0&scrollbar=1`;
    },

    openFullscreen() {
      if (!this.selected?.url) return;
      this.fsOpen = true;
      document.body.style.overflow = "hidden";
    },

    closeFullscreen() {
      this.fsOpen = false;
      document.body.style.overflow = "";
    },

    onKey(e) {
      if (!this.fsOpen) return;
      if (e.key === "Escape") this.closeFullscreen();
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

.layout{
  display:grid;
  grid-template-columns: 380px 1fr;
  gap: 16px;
  align-items: start;
}

.list{ display:grid; gap: 12px; }

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

.viewer-actions{
  display:flex;
  gap: 10px;
  align-items:center;
  flex-wrap: wrap;
}

.btn-open{
  color:#000;
  background:#f97316;
  font-weight: 900;
  text-decoration:none;
  padding: 10px 12px;
  border-radius: 14px;
  border: none;
}

.btn-ghost{
  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 900;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
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

/* FULLSCREEN */
.fs-backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.86);
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 12px;
}

.fs-modal{
  width: min(1200px, 98vw);
  height: min(92vh, 900px);
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
  display: flex;
  flex-direction: column;
}

.fs-top{
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 12px;
}

.fs-title{ font-weight: 900; color:#fff; }
.fs-sub{ color: rgba(255,255,255,0.65); font-weight: 800; font-size: 12px; margin-top: 2px; }

.fs-actions{
  display:flex;
  gap: 10px;
  align-items:center;
  flex-wrap: wrap;
}

.fs-frame{
  flex: 1;
  background:#050505;
}
.fs-frame iframe{
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 992px){
  .layout{ grid-template-columns: 1fr; }
  .viewer{ position: static; }
}
</style>
