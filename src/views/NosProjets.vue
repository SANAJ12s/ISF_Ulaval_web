<template>
  <main class="projects-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-60 py-5">
          <div class="col-lg-9 mx-auto text-center">
            <h1 class="display-4 fw-bold text-white mb-3">Nos projets</h1>
            <p class="lead text-white-50 mb-0">
              Découvrez nos initiatives, nos impacts et les images associées à chaque projet.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTE DES PROJETS -->
    <section class="section-dark py-5">
      <div class="container">
        <!-- loading / empty -->
        <div v-if="loading" class="events-placeholder">
          <p class="mb-0 text-white-50">Chargement…</p>
        </div>

        <div v-else-if="projects.length === 0" class="events-placeholder">
          <p class="mb-0 text-white-50">Aucun projet pour le moment.</p>
        </div>

        <div v-else>
          <div v-for="(p, idx) in projects" :key="p.id" class="project-block">
            <div class="row align-items-center g-4">
              <!-- TEXTE -->
              <div class="col-lg-6">
                <div class="project-text">
                  <div class="project-kicker">Projet</div>
                  <h2 class="project-title">{{ p.title }}</h2>

                  <div v-if="p.status" class="project-tag">{{ p.status }}</div>

                  <p v-if="p.summary" class="project-desc">
                    {{ p.summary }}
                  </p>

                  <div class="mt-3 d-flex gap-3 flex-wrap">
                    <a
                      v-if="p.link"
                      class="btn btn-warning btn-lg"
                      :href="p.link"
                      target="_blank"
                      rel="noopener"
                    >
                      <i class="fas fa-link me-2"></i>
                      Ouvrir le lien
                    </a>

                    <button
                      v-if="hasImages(p)"
                      class="btn btn-outline-light btn-lg"
                      type="button"
                      @click="openGallery(idx, 0)"
                    >
                      <i class="fas fa-images me-2"></i>
                      Voir la photo
                    </button>
                  </div>
                </div>
              </div>

              <!-- PHOTO COVER -->
              <div class="col-lg-6">
                <button
                  v-if="hasImages(p)"
                  class="cover-btn"
                  type="button"
                  @click="openGallery(idx, 0)"
                  :aria-label="`Ouvrir la photo du projet ${p.title}`"
                >
                  <div class="cover-card">
                    <img
                      class="cover-img"
                      :src="p.images[0]"
                      :alt="`Photo du projet ${p.title}`"
                      loading="lazy"
                    />
                    <div class="cover-gradient"></div>

                    <div class="cover-caption">
                      <div class="cover-caption-title">{{ p.title }}</div>
                      <div class="cover-caption-sub">
                        Cliquer pour agrandir
                      </div>
                    </div>
                  </div>
                </button>

                <div v-else class="cover-empty">
                  <div class="cover-empty-inner">
                    <div class="cover-empty-icon">
                      <i class="fas fa-camera-retro"></i>
                    </div>
                    <div class="cover-empty-title">Photos à venir</div>
                    <div class="cover-empty-sub">
                      On ajoutera bientôt des images pour ce projet.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr v-if="idx !== projects.length - 1" class="divider" />
          </div>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX / MODAL -->
    <div
      v-if="lightbox.open"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      @click.self="closeGallery"
    >
      <div class="lightbox-inner">
        <button class="lb-close" type="button" @click="closeGallery" aria-label="Fermer">
          <i class="fas fa-times"></i>
        </button>

        <button class="lb-nav lb-prev" type="button" @click="prevImage" aria-label="Image précédente">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="lb-stage" :class="{ 'lb-pop': lightbox.pop }">
          <img
            class="lb-img"
            :src="currentImage"
            :alt="`Image ${lightbox.imageIndex + 1} du projet ${currentProject?.title || ''}`"
            draggable="false"
          />

          <div class="lb-meta">
            <div class="lb-title">{{ currentProject?.title }}</div>
            <div class="lb-counter">
              {{ lightbox.imageIndex + 1 }} / {{ currentProject?.images?.length || 0 }}
            </div>
          </div>
        </div>

        <button class="lb-nav lb-next" type="button" @click="nextImage" aria-label="Image suivante">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "NosProjets",
  data() {
    return {
      loading: true,
      projects: [],
      unsub: null,

      lightbox: {
        open: false,
        projectIndex: 0,
        imageIndex: 0,
        pop: false,
      },
    };
  },

  computed: {
    currentProject() {
      return this.projects?.[this.lightbox.projectIndex] || null;
    },
    currentImage() {
      return this.currentProject?.images?.[this.lightbox.imageIndex] || "";
    },
  },

  mounted() {
    window.addEventListener("keydown", this.onKeyDown);

    // 🔥 Firestore live
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    this.unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // afficher seulement les visibles
        this.projects = items
          .filter((p) => p.isVisible !== false)
          .map((p) => ({
            id: p.id,
            title: p.title || "Projet",
            status: p.status || "",
            summary: p.summary || "",
            link: p.link || "",
            // on garde la compatibilité avec ton UI images[]
            images: p.image ? [p.image] : [],
            order: p.order ?? 999,
          }));

        this.loading = false;
      },
      (e) => {
        console.error(e);
        this.loading = false;
        this.projects = [];
      }
    );
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    if (this.unsub) this.unsub();
  },

  methods: {
    hasImages(p) {
      return !!(p?.images && p.images.length);
    },

    openGallery(projectIndex, imageIndex = 0) {
      this.lightbox.projectIndex = projectIndex;
      this.lightbox.imageIndex = imageIndex;
      this.lightbox.open = true;

      this.lightbox.pop = false;
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.lightbox.pop = true;
          setTimeout(() => (this.lightbox.pop = false), 220);
        });
      });

      document.body.style.overflow = "hidden";
    },

    closeGallery() {
      this.lightbox.open = false;
      document.body.style.overflow = "";
    },

    nextImage() {
      const imgs = this.currentProject?.images || [];
      if (!imgs.length) return;
      this.lightbox.imageIndex = (this.lightbox.imageIndex + 1) % imgs.length;
      this.triggerPop();
    },

    prevImage() {
      const imgs = this.currentProject?.images || [];
      if (!imgs.length) return;
      this.lightbox.imageIndex = (this.lightbox.imageIndex - 1 + imgs.length) % imgs.length;
      this.triggerPop();
    },

    triggerPop() {
      this.lightbox.pop = false;
      requestAnimationFrame(() => {
        this.lightbox.pop = true;
        setTimeout(() => (this.lightbox.pop = false), 220);
      });
    },

    onKeyDown(e) {
      if (!this.lightbox.open) return;
      if (e.key === "Escape") this.closeGallery();
      if (e.key === "ArrowRight") this.nextImage();
      if (e.key === "ArrowLeft") this.prevImage();
    },
  },
};
</script>

<style scoped>
/* ✅ J’ai gardé ton CSS tel quel, j’ai juste réutilisé "events-placeholder"
   comme bloc propre pour loading/empty (tu peux renommer si tu veux). */

.projects-page {
  background: #000;
  color: #fff;
}

/* Hero (fond ulaval.jpg) */
.hero {
  position: relative;
  padding-top: 80px;
  background-image: url("/ulaval.jpg");
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.58);
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.min-vh-60 {
  min-height: 55vh;
}

.section-dark {
  background: #000;
}

.project-block {
  padding: 6px 0 26px;
}

.divider {
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 34px 0 0;
}

/* petit placeholder propre */
.events-placeholder {
  max-width: 900px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 22px;
}

/* Texte */
.project-text {
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 24px;
}

.project-kicker {
  display: inline-block;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 10px;
}

.project-title {
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  font-size: clamp(1.6rem, 2.2vw, 2.1rem);
}

.project-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(249, 115, 22, 0.5);
  color: #f97316;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 14px;
}

.project-desc {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
  margin: 0 0 14px;
}

/* Cover image */
.cover-btn {
  width: 100%;
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
}

.cover-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #050505;
  transform: translateZ(0);
  transition: transform 0.18s ease, box-shadow 0.2s ease;
}

.cover-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
}

.cover-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

.cover-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0) 55%);
  pointer-events: none;
}

.cover-caption {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  z-index: 2;
}

.cover-caption-title {
  font-weight: 900;
  font-size: 1.15rem;
  color: #fff;
}

.cover-caption-sub {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
  margin-top: 4px;
}

/* Cover empty */
.cover-empty {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: radial-gradient(circle at 30% 20%, rgba(249, 115, 22, 0.20), transparent 60%),
              #070707;
  padding: 30px;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-empty-inner {
  text-align: center;
  max-width: 360px;
}

.cover-empty-icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 115, 22, 0.18);
  border: 1px solid rgba(249, 115, 22, 0.25);
  color: #f97316;
  margin-bottom: 12px;
}

.cover-empty-icon i {
  font-size: 1.6rem;
}

.cover-empty-title {
  font-weight: 900;
  font-size: 1.25rem;
  color: #fff;
}

.cover-empty-sub {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.70);
  line-height: 1.6;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
}

.lightbox-inner {
  position: relative;
  width: min(1100px, 100%);
  height: min(78vh, 760px);
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  gap: 14px;
}

.lb-stage {
  position: relative;
  width: 100%;
  height: 100%;
  background: #050505;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  transition: transform 0.2s ease;
}

.lb-pop {
  transform: scale(1.02);
}

.lb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
}

.lb-meta {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.lb-title {
  font-weight: 900;
  color: #fff;
}

.lb-counter {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 800;
}

.lb-nav {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 15, 15, 0.7);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease, background 0.2s ease;
}

.lb-nav:hover {
  background: rgba(249, 115, 22, 0.22);
  transform: translateY(-1px);
}

.lb-nav i {
  font-size: 1.35rem;
}

.lb-close {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 15, 15, 0.75);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.lb-close:hover {
  background: rgba(249, 115, 22, 0.22);
}

/* Responsive */
@media (max-width: 992px) {
  .cover-img {
    height: 320px;
  }
  .cover-empty {
    min-height: 320px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 60px;
  }
  .lightbox-inner {
    grid-template-columns: 52px 1fr 52px;
    height: min(72vh, 680px);
  }
  .lb-nav {
    width: 52px;
    height: 52px;
    border-radius: 14px;
  }
}
</style>
