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
        <div v-for="(p, idx) in projects" :key="p.id" class="project-block">
          <div class="row align-items-center g-4">
            <!-- TEXTE -->
            <div class="col-lg-6">
              <div class="project-text">
                <div class="project-kicker">Projet</div>
                <h2 class="project-title">{{ p.title }}</h2>

                <div v-if="p.tag" class="project-tag">{{ p.tag }}</div>

                <p class="project-desc">
                  {{ p.description }}
                </p>

                <ul v-if="p.highlights?.length" class="project-highlights">
                  <li v-for="(h, i) in p.highlights" :key="i">{{ h }}</li>
                </ul>

                <div v-if="p.cta || (p.images && p.images.length)" class="mt-3 d-flex gap-3 flex-wrap">
                  <a
                    v-if="p.cta?.href"
                    class="btn btn-warning btn-lg"
                    :href="p.cta.href"
                    target="_blank"
                    rel="noopener"
                  >
                    <i class="fab fa-youtube me-2"></i>
                    {{ p.cta.label }}
                  </a>

                  <button
                    v-if="p.images?.length"
                    class="btn btn-outline-light btn-lg"
                    type="button"
                    @click="openGallery(idx, 0)"
                  >
                    <i class="fas fa-images me-2"></i>
                    Voir les photos
                  </button>
                </div>
              </div>
            </div>

            <!-- PHOTO COVER -->
            <div class="col-lg-6">
              <button
                v-if="p.images?.length"
                class="cover-btn"
                type="button"
                @click="openGallery(idx, 0)"
                :aria-label="`Ouvrir les photos du projet ${p.title}`"
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
                      Cliquer pour agrandir • {{ p.images.length }} photo(s)
                    </div>
                  </div>
                </div>
              </button>

              <div v-else class="cover-empty">
                <div class="text-white-50">
                  Ajoute des images dans <code>public/projets</code> et liste-les dans <code>projects[].images</code>.
                </div>
              </div>
            </div>
          </div>

          <hr v-if="idx !== projects.length - 1" class="divider" />
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
export default {
  name: "NosProjets",
  data() {
    return {
      projects: [
        {
          id: "puits-2024",
          title: "Eau pour tous — Puits (2024)",
          tag: "Mandat 2024–2025",
          description:
            "Le projet Eau pour tous visait la construction d’un puits de 1 270 $ à Njindaré, au Cameroun, afin d’offrir un accès durable à l’eau potable. La réalisation a été effectuée en collaboration avec un ancien étudiant de l’Université Laval, fondateur de Gather Charity, déjà à l’origine de trois projets similaires dans la région.",
          highlights: [
            "Lieu : Njindaré (Cameroun)",
            "Objectif : accès durable à l’eau potable",
            "Budget : 1 270 $",
            "Partenaire : Gather Charity",
          ],
          // ✅ TES VRAIS FICHIERS
          images: [
            "/projets/isfPuit.png",
            "/projets/puit.jpg",
            "/projets/puit2.jpg",
            "/projets/puit7.jpg",
            "/projets/puit8.jpg",
            "/projets/puit_construction.jpg",
            "/projets/puit_construction1.jpg",
            "/projets/puit_construction2.jpg",
            "/projets/puit_construction3.jpg",
            "/projets/puit_construction4.jpg",
            "/projets/puit_construction5.jpg",
            "/projets/puit_construction6.jpg",
            "/projets/puit_construction7.jpg",
          ],
        },

        {
          id: "interviews",
          title: "Interviews d’ingénieurs",
          tag: "Série vidéo",
          description:
            "Notre VP externe réalise des entrevues avec des ingénieurs et CPI aux parcours inspirants. Découvrez leurs témoignages, leurs conseils et leurs expériences directement sur notre chaîne YouTube.",
          highlights: [
            "Formats : témoignages, conseils, parcours",
            "Public : étudiants, CPI, ingénieurs",
          ],
          cta: {
            label: "Voir sur YouTube",
            // 🔁 Remplace par ta chaîne/playlist
            href: "https://www.youtube.com/",
          },
          // Mets tes images quand elles existent
          images: [],
        },

        {
          id: "madagascar-solaire",
          title: "Panneaux solaires à Madagascar",
          tag: "Mandat 2025–2026 (à venir)",
          description:
            "Le projet Panneaux solaires à Madagascar vise l’installation d’un système solaire dans une école accueillant 125 élèves. Cette initiative permettra de fournir une source d’énergie durable et fiable, essentielle au bon déroulement des activités scolaires. Actuellement en préparation, ce projet s’inscrit dans notre volonté de soutenir des infrastructures éducatives tout en promouvant des solutions énergétiques responsables.",
          highlights: [
            "Cible : école (125 élèves)",
            "Objectif : énergie durable et fiable",
            "Statut : en préparation",
          ],
          // Mets tes images quand elles existent
          images: [],
        },
      ],

      lightbox: {
        open: false,
        projectIndex: 0,
        imageIndex: 0,
        pop: false, // animation "forward"
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
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    openGallery(projectIndex, imageIndex = 0) {
      this.lightbox.projectIndex = projectIndex;
      this.lightbox.imageIndex = imageIndex;
      this.lightbox.open = true;

      // animation "forward"
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
.projects-page {
  background: #000;
  color: #fff;
}

/* Hero */
.hero {
  position: relative;
  padding-top: 80px;
  background: radial-gradient(circle at 15% 10%, rgba(249, 115, 22, 0.22), transparent 45%),
              radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.08), transparent 40%),
              #000;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}
.hero-inner { position: relative; z-index: 1; }
.min-vh-60 { min-height: 55vh; }

.section-dark { background: #000; }

.project-block { padding: 6px 0 26px; }

.divider {
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 34px 0 0;
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

.project-highlights {
  margin: 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.75;
}
.project-highlights li { margin-bottom: 6px; }

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
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.0) 55%);
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

.cover-empty {
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  padding: 26px;
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

.lb-pop { transform: scale(1.02); }

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

.lb-title { font-weight: 900; color: #fff; }

.lb-counter { color: rgba(255, 255, 255, 0.75); font-weight: 800; }

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
.lb-nav i { font-size: 1.35rem; }

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
.lb-close:hover { background: rgba(249, 115, 22, 0.22); }

/* Responsive */
@media (max-width: 992px) {
  .cover-img { height: 320px; }
}

@media (max-width: 768px) {
  .hero { padding-top: 60px; }
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
