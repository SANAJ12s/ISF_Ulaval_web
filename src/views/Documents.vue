<template>
  <div class="documents-page">
    <!-- HERO -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-9 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3 text-white">Documents</h1>
            <p class="lead mb-4 text-white-50">
              Retrouvez ici nos documents officiels (charte, règlements, rapports, etc.).
            </p>

            <div class="hero-pill">
              <i class="fas fa-file-pdf me-2"></i>
              <span>Charte ISF — 29 pages</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTE DOCS -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto">
            <div class="intro-card card-dark">
              <h2 class="h4 fw-bold mb-2 text-white">Documents officiels</h2>
              <p class="mb-0 text-white-50">
                Cliquez sur un document pour l’ouvrir. Si ton navigateur bloque l’affichage PDF,
                clique sur “Ouvrir dans Google”.
              </p>
            </div>
          </div>
        </div>

        <div class="row mt-4 g-4">
          <div class="col-lg-9 mx-auto">
            <div class="docs-grid">
              <button class="doc-item" type="button" @click="openDoc(docs[0])">
                <div class="doc-left">
                  <div class="doc-icon">
                    <i class="fas fa-file-pdf"></i>
                  </div>
                  <div class="doc-meta">
                    <div class="doc-title">Charte ISF</div>
                    <div class="doc-sub">Document officiel — PDF — 29 pages</div>
                  </div>
                </div>
                <div class="doc-right">
                  <span class="doc-open">
                    Ouvrir <i class="fas fa-arrow-right ms-2"></i>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VIEWER -->
    <section v-if="activeDoc" class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="viewer card-dark">
              <div class="viewer-head">
                <div class="viewer-title">
                  <i class="fas fa-file-pdf me-2 text-danger"></i>
                  <span class="fw-bold">{{ activeDoc.title }}</span>
                  <span class="ms-2 text-white-50">— Page {{ page }} / {{ activeDoc.maxPages }}</span>
                </div>

                <div class="viewer-actions">
                  <button class="btn btn-sm btn-outline-light" @click="prevPage" :disabled="page <= 1">
                    <i class="fas fa-chevron-left me-1"></i> Prev
                  </button>
                  <button class="btn btn-sm btn-outline-light" @click="nextPage" :disabled="page >= activeDoc.maxPages">
                    Next <i class="fas fa-chevron-right ms-1"></i>
                  </button>

                  <div class="vr mx-2"></div>

                  <button class="btn btn-sm btn-outline-warning" @click="zoomOut" :disabled="zoom <= 0.6">
                    <i class="fas fa-search-minus"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-warning" @click="zoomIn" :disabled="zoom >= 1.6">
                    <i class="fas fa-search-plus"></i>
                  </button>

                  <a
                    class="btn btn-sm btn-warning ms-2"
                    :href="googleViewerUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    <i class="fas fa-external-link-alt me-1"></i> Ouvrir dans Google
                  </a>

                  <a
                    class="btn btn-sm btn-outline-light ms-2"
                    :href="activeDoc.src"
                    target="_blank"
                    rel="noopener"
                    title="Ouvrir le PDF directement"
                  >
                    PDF direct
                  </a>

                  <button class="btn btn-sm btn-outline-light ms-2" @click="closeDoc" title="Fermer">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>

              <div class="viewer-body">
                <!-- 1) Viewer natif -->
                <iframe class="pdf-embed" :src="pdfUrl" title="PDF viewer (natif)"></iframe>

                <!-- 2) Fallback: si natif ne marche pas, le user clique sur bouton Google -->
                <div class="viewer-hint">
                  <div class="hint-card">
                    <div class="fw-bold mb-1">Si tu ne vois rien :</div>
                    <div class="text-white-50 mb-3">
                      Ton navigateur bloque peut-être l’affichage PDF dans la page.
                      Clique sur <strong>“Ouvrir dans Google”</strong> ou <strong>“PDF direct”</strong>.
                    </div>
                    <div class="d-flex gap-2 flex-wrap">
                      <a class="btn btn-warning btn-sm" :href="googleViewerUrl" target="_blank" rel="noopener">
                        Ouvrir dans Google
                      </a>
                      <a class="btn btn-outline-light btn-sm" :href="activeDoc.src" target="_blank" rel="noopener">
                        PDF direct
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="viewer-foot">
                <div class="page-jump">
                  <label class="text-white-50 me-2 mb-0">Aller à :</label>
                  <input
                    type="number"
                    class="form-control form-control-sm jump-input"
                    :min="1"
                    :max="activeDoc.maxPages"
                    v-model.number="jump"
                    @keyup.enter="goToJump"
                  />
                  <button class="btn btn-sm btn-outline-light ms-2" @click="goToJump">Go</button>
                </div>
                <div class="text-white-50 small">
                  Astuce : en prod, “Ouvrir dans Google” marche très bien (URL publique).
                </div>
              </div>
            </div>

            <div class="mt-3 text-center text-white-50 small">
              Si tu es en <strong>localhost</strong>, Google viewer peut ne pas afficher.
              Dans ce cas utilise <strong>PDF direct</strong>.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-5 cta-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center">
            <h2 class="display-6 fw-bold text-white mb-3">Besoin d’un document ?</h2>
            <p class="lead text-white-50 mb-4">
              Écris-nous et on pourra ajouter d’autres documents officiels sur cette page.
            </p>
            <router-link to="/nous-joindre" class="btn btn-light btn-lg">
              <i class="fas fa-envelope me-2"></i> Nous contacter
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Documents",
  data() {
    return {
      docs: [
        {
          id: "charte",
          title: "Charte ISF",
          src: "/documents/charte-isf.pdf", // ✅ TON NOUVEAU PATH
          maxPages: 29,
        },
      ],
      activeDoc: null,
      page: 1,
      zoom: 1.0,
      jump: 1,
    };
  },
  computed: {
    pdfUrl() {
      if (!this.activeDoc) return "";
      const z = Math.round(this.zoom * 100);
      // FitH + scrollbar interne du iframe -> évite “portion invisible”
      return `${this.activeDoc.src}#page=${this.page}&zoom=${z}&view=FitH`;
    },
    googleViewerUrl() {
      if (!this.activeDoc) return "#";
      const absolute = this.activeDoc.src.startsWith("http")
        ? this.activeDoc.src
        : `${window.location.origin}${this.activeDoc.src}`;
      return `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(absolute)}`;
    },
  },
  methods: {
    openDoc(doc) {
      this.activeDoc = doc;
      this.page = 1;
      this.zoom = 1.0;
      this.jump = 1;
      this.$nextTick(() => {
        const el = document.querySelector(".viewer");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    closeDoc() {
      this.activeDoc = null;
      this.page = 1;
      this.jump = 1;
    },
    nextPage() {
      if (!this.activeDoc) return;
      if (this.page < this.activeDoc.maxPages) {
        this.page += 1;
        this.jump = this.page;
      }
    },
    prevPage() {
      if (!this.activeDoc) return;
      if (this.page > 1) {
        this.page -= 1;
        this.jump = this.page;
      }
    },
    zoomIn() {
      this.zoom = Math.min(1.6, +(this.zoom + 0.1).toFixed(1));
    },
    zoomOut() {
      this.zoom = Math.max(0.6, +(this.zoom - 0.1).toFixed(1));
    },
    goToJump() {
      if (!this.activeDoc) return;
      const n = Number(this.jump);
      if (Number.isNaN(n)) return;
      const clamped = Math.max(1, Math.min(this.activeDoc.maxPages, n));
      this.page = clamped;
      this.jump = clamped;
    },
  },
};
</script>

<style scoped>
.documents-page { background:#000; color:#fff; }

/* Hero */
.hero-section{
  position:relative;
  padding-top:80px;
  background:
    radial-gradient(circle at 15% 20%, rgba(249,115,22,0.25), transparent 45%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 40%),
    #000;
}
.hero-overlay{ position:absolute; inset:0; background:rgba(0,0,0,0.35); }
.hero-inner{ position:relative; z-index:1; }
.min-vh-75{ min-height:60vh; }
.hero-pill{
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 14px; border-radius:999px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.12);
  color:rgba(255,255,255,0.9);
}

/* Sections */
.section-dark{ background:#000; }
.cta-section{
  background: linear-gradient(135deg, rgba(249,115,22,0.30) 0%, rgba(0,0,0,1) 60%);
  border-top:1px solid rgba(255,255,255,0.08);
}

/* Cards */
.card-dark{
  background:#0b0b0b;
  border:1px solid rgba(255,255,255,0.08);
  border-radius:16px;
  box-shadow:0 14px 40px rgba(0,0,0,0.35);
}

/* Intro */
.intro-card{ padding:20px 22px; }

/* Docs list */
.docs-grid{ display:grid; gap:14px; }
.doc-item{
  width:100%;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.10);
  border-radius:16px;
  padding:16px 18px;
  display:flex; align-items:center; justify-content:space-between;
  color:#fff; text-align:left;
  transition:transform .2s ease, border-color .2s ease, background .2s ease;
}
.doc-item:hover{
  transform:translateY(-2px);
  background:rgba(255,255,255,0.06);
  border-color:rgba(249,115,22,0.35);
}
.doc-left{ display:flex; align-items:center; gap:14px; }
.doc-icon{
  width:44px; height:44px; border-radius:12px;
  display:grid; place-items:center;
  background:rgba(249,115,22,0.18);
  border:1px solid rgba(249,115,22,0.25);
  color:#ffb37a;
}
.doc-title{ font-weight:900; }
.doc-sub{ color:rgba(255,255,255,0.55); font-size:.92rem; }
.doc-open{ color:rgba(255,255,255,0.85); font-weight:800; }

/* Viewer */
.viewer{ overflow:hidden; }
.viewer-head{
  display:flex; align-items:center; justify-content:space-between;
  gap:14px;
  padding:14px 16px;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.viewer-title{ display:flex; align-items:center; flex-wrap:wrap; gap:6px; }
.viewer-actions{ display:flex; align-items:center; flex-wrap:wrap; gap:8px; }

.viewer-body{
  position:relative;
  height:min(85vh, 950px);
  background:#050505;
}

/* ✅ le PDF prend TOUT et scroll inside */
.pdf-embed{
  width:100%;
  height:100%;
  display:block;
  border:0;
}

/* petit hint overlay (ne bloque pas les clics) */
.viewer-hint{
  pointer-events:none;
  position:absolute;
  inset:0;
  display:flex;
  align-items:flex-end;
  justify-content:center;
  padding:14px;
}
.hint-card{
  pointer-events:auto;
  width:min(720px, 100%);
  background:rgba(0,0,0,0.72);
  border:1px solid rgba(255,255,255,0.14);
  border-radius:14px;
  padding:12px 14px;
  backdrop-filter: blur(6px);
}

.viewer-foot{
  padding:12px 16px;
  border-top:1px solid rgba(255,255,255,0.08);
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; flex-wrap:wrap;
}
.page-jump{ display:flex; align-items:center; }
.jump-input{
  width:90px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12);
  color:#fff;
}
.jump-input:focus{
  box-shadow:none;
  border-color:rgba(249,115,22,0.45);
}

@media (max-width:768px){
  .hero-section{ padding-top:60px; }
  .display-4{ font-size:2rem; }
  .viewer-body{ height:75vh; }
}
</style>
