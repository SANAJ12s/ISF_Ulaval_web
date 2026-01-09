<template>
  <main class="activities-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="container hero-inner">
        <div class="row align-items-center min-vh-60 py-5">
          <div class="col-lg-10 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3 text-white">Nos activités</h1>
            <p class="lead text-white-50 mb-4">
              Des moments fun, des rencontres, et de l’engagement ✨
            </p>

            <!-- CHIPS MENU -->
            <div class="chips">
              <button
                v-for="a in activities"
                :key="a.id"
                type="button"
                class="chip"
                @click="scrollTo(a.id)"
              >
                <i class="fas fa-image me-2"></i>
                {{ a.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTE ACTIVITÉS -->
    <section class="section-dark py-5">
      <div class="container">
        <div class="stack">
          <article
            v-for="(a, idx) in activities"
            :key="a.id"
            class="activity card-dark"
            :id="a.id"
          >
            <div
              class="activity-media"
              @click="openGallery(idx, 0)"
              role="button"
              tabindex="0"
              @keydown.enter="openGallery(idx, 0)"
              @keydown.space.prevent="openGallery(idx, 0)"
            >
              <img
                class="activity-img"
                :src="a.images?.[0] || a.cover"
                :alt="`Photo - ${a.title}`"
              />

              <div class="activity-badge">
                <i class="fas fa-camera me-2"></i>
                {{ a.images.length }} photos
              </div>

              <div class="activity-hover">
                <div class="hover-inner">
                  <div class="hover-title">{{ a.title }}</div>
                  <div class="hover-cta">
                    Cliquer pour voir la galerie <i class="fas fa-arrow-right ms-2"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="activity-content">
              <h2 class="activity-title">{{ a.title }}</h2>

              <!-- mini aperçus -->
              <div class="thumbs">
                <button
                  v-for="(img, i) in a.images.slice(0, 10)"
                  :key="img + i"
                  class="thumb"
                  @click="openGallery(idx, i)"
                  type="button"
                >
                  <img :src="img" :alt="`${a.title} - ${i + 1}`" />
                </button>

                <button
                  v-if="a.images.length > 10"
                  class="thumb more"
                  type="button"
                  @click="openGallery(idx, 0)"
                >
                  +{{ a.images.length - 10 }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX / GALLERY -->
    <div v-if="lightbox.open" class="lightbox" @click.self="closeGallery">
      <button class="lb-close" type="button" @click="closeGallery" aria-label="Fermer">
        <i class="fas fa-times"></i>
      </button>

      <button class="lb-nav prev" type="button" @click="prevImg" aria-label="Précédent">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="lb-card" role="dialog" aria-modal="true">
        <div class="lb-top">
          <div class="lb-title">{{ currentActivity?.title }}</div>
          <div class="lb-count">
            {{ lightbox.index + 1 }} / {{ currentActivity?.images.length || 0 }}
          </div>
        </div>

        <div class="lb-media">
          <img
            class="lb-img"
            :src="currentImage"
            :alt="currentActivity?.title || 'Photo activité'"
          />
        </div>

        <div class="lb-dots">
          <button
            v-for="(img, i) in currentActivity?.images || []"
            :key="img + i"
            class="dot"
            :class="{ active: i === lightbox.index }"
            type="button"
            @click="goTo(i)"
            :aria-label="`Aller à l'image ${i + 1}`"
          />
        </div>
      </div>

      <button class="lb-nav next" type="button" @click="nextImg" aria-label="Suivant">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Activites",
  data() {
    return {
      // ✅ HARD CODE (sans Firestore)
      activities: [
        {
          id: "chalet",
          title: "Chalet ISF édition 2025 ",
          cover: "/activites/chalet1.png",
          images: [
            "/activites/chalet1.png",
            "/activites/chalet2.png",
            "/activites/chalet3.png",
            "/activites/chalet4.png",
            "/activites/chalet5.png",
            "/activites/chalet6.png",
            "/activites/chalet7.png",
            "/activites/chalet8.png",
          ],
        },
        {
          id: "gala",
          title: "Gala de la vie étudiante 2024 ",
          cover: "/activites/Gala1.png",
          images: [
            "/activites/Gala1.png",
            "/activites/Gala2.png",
            "/activites/Gala3.png",
            "/activites/Gala4.png",
            "/activites/Gala5.png",
            "/activites/Gala6.png",
          ],
        },
        {
          id: "midiconf",
          title: "Midi-conférence avec Pierre Luc Huot ",
          cover: "/activites/midiconf1.png",
          images: [
            "/activites/midiconf1.png",
            "/activites/midiconf2.png",
            "/activites/midiconf3.png",
            "/activites/midiconf4.png",
          ],
        },
        {
          id: "visite-david",
          title: "Visite de David Boroto ",
          cover: "/activites/visiteDavid1.png",
          images: [
            "/activites/visiteDavid1.png",
            "/activites/visiteDavid2.png",
            "/activites/visiteDavid3.png",
            "/activites/visiteDavid4.png",
          ],
        },

  
        {
          id: "friperie",
          title: "Friperie ISF",
          cover: "/projets/friperie.png",
          images: ["/projets/friperie.png"],
        },
      ],

      // lightbox
      lightbox: {
        open: false,
        activityIndex: 0,
        index: 0,
      },
    };
  },

  computed: {
    currentActivity() {
      return this.activities?.[this.lightbox.activityIndex] || null;
    },
    currentImage() {
      return this.currentActivity?.images?.[this.lightbox.index] || "";
    },
  },

  methods: {
    scrollTo(id) {
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const offset = 90;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    },

    openGallery(activityIdx, imgIdx = 0) {
      this.lightbox.activityIndex = activityIdx;
      this.lightbox.index = imgIdx;
      this.lightbox.open = true;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", this.onKey);
    },
    closeGallery() {
      this.lightbox.open = false;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", this.onKey);
    },
    nextImg() {
      const n = this.currentActivity?.images?.length || 0;
      if (!n) return;
      this.lightbox.index = (this.lightbox.index + 1) % n;
    },
    prevImg() {
      const n = this.currentActivity?.images?.length || 0;
      if (!n) return;
      this.lightbox.index = (this.lightbox.index - 1 + n) % n;
    },
    goTo(i) {
      this.lightbox.index = i;
    },
    onKey(e) {
      if (!this.lightbox.open) return;
      if (e.key === "Escape") this.closeGallery();
      if (e.key === "ArrowRight") this.nextImg();
      if (e.key === "ArrowLeft") this.prevImg();
    },
  },

  mounted() {},

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.activities-page {
  background: #000;
  color: #fff;
}

/* HERO (fond visiteDavid3.png) */
.hero {
  position: relative;
  padding-top: 80px;
  background-image: url("/activites/visiteDavid3.png");
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.62);
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.min-vh-60 { min-height: 55vh; }

/* CHIPS */
.chips {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}
.chip {
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
  color: #fff;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 900;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
}
.chip:hover {
  transform: translateY(-2px);
  border-color: rgba(249,115,22,0.55);
  background: rgba(249,115,22,0.18);
}

/* Dark sections */
.section-dark { background: #000; }

/* CARD */
.card-dark {
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

/* MEDIA */
.activity-media {
  position: relative;
  height: 380px;
  background: #050505;
  cursor: pointer;
}
.activity-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05) contrast(1.02);
  transform: scale(1);
  transition: transform 0.35s ease, filter 0.35s ease;
}
.activity-media:hover .activity-img {
  transform: scale(1.03);
  filter: saturate(1.15) contrast(1.05);
}

.activity-badge {
  position: absolute;
  left: 18px;
  top: 18px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.16);
  color: rgba(255,255,255,0.9);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.95rem;
  backdrop-filter: blur(8px);
}

.activity-hover {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.78) 86%);
  display: flex;
  align-items: flex-end;
  padding: 22px;
}
.hover-inner { width: 100%; }
.hover-title {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.hover-cta {
  color: rgba(255,255,255,0.78);
  font-weight: 700;
}

/* CONTENT */
.activity-content {
  padding: 18px 20px 22px;
}
.activity-title {
  margin: 0 0 14px;
  font-weight: 900;
  font-size: 1.6rem;
}

/* THUMBS */
.thumbs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.thumb {
  width: 78px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: #060606;
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.2s ease;
}
.thumb:hover {
  transform: translateY(-2px);
  border-color: rgba(249,115,22,0.55);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb.more {
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 900;
  background:
    radial-gradient(circle at 30% 20%, rgba(249,115,22,0.25), transparent 55%),
    #050505;
}

/* LIGHTBOX */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.86);
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 18px;
}

.lb-card {
  width: min(980px, 96vw);
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
  animation: popIn 0.18s ease-out;
}

@keyframes popIn {
  from { transform: scale(0.98); opacity: 0.6; }
  to { transform: scale(1); opacity: 1; }
}

.lb-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.lb-title { font-weight: 900; color: #fff; }
.lb-count { color: rgba(255,255,255,0.65); font-weight: 700; }

.lb-media { background: #050505; }
.lb-img {
  width: 100%;
  height: min(70vh, 620px);
  object-fit: contain;
  display: block;
}

.lb-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: 0;
  background: rgba(255,255,255,0.25);
}
.dot.active { background: rgba(249,115,22,0.95); }

/* nav buttons */
.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.55);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.12s ease, border-color 0.2s ease;
}
.lb-nav:hover {
  transform: translateY(-50%) scale(1.04);
  border-color: rgba(249,115,22,0.55);
}
.lb-nav.prev { left: 18px; }
.lb-nav.next { right: 18px; }

.lb-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.55);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.lb-close:hover { border-color: rgba(249,115,22,0.55); }

/* responsive */
@media (max-width: 768px) {
  .hero { padding-top: 60px; }
  .display-4 { font-size: 2rem; }
  .activity-media { height: 280px; }
  .thumb { width: 72px; height: 52px; }
  .lb-nav.prev { left: 10px; }
  .lb-nav.next { right: 10px; }
}
</style>
