<template>
  <div class="home">
    <!-- HERO : image midiconf4 (logo déjà dans l’image) -->
    <section class="hero"></section>

    <!-- TEXTE SOUS LE BANNER (fond noir) -->
    <section class="hero-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3">ISF – Université Laval</h1>

            <p class="lead mb-3">Ingénieurs sans frontières Canada – Section Université Laval</p>

            <p class="mb-4">
              Une communauté étudiante engagée pour une ingénierie humaine, responsable et solidaire.
            </p>

            <div class="d-flex gap-3 justify-content-center">
              <router-link to="/nous-joindre" class="btn btn-custom-primary btn-lg">
                Rejoins-nous !
              </router-link>

              <router-link to="/nos-projets" class="btn btn-custom-outline btn-lg">
                Nos projets
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMAGE cover1 -->
    <section class="midiconf-section">
      <div class="container">
        <img src="/cover1.png" alt="ISF ULaval cover" class="midiconf-img" />
      </div>
    </section>

    <!-- ÉVÉNEMENTS À VENIR (Firestore + carousel auto) -->
    <section class="py-5 events-home">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-white">Événements à venir</h2>
          <p class="lead text-white-50">
            Découvre nos prochains événements — navigue avec les flèches.
          </p>
        </div>

        <!-- Loading / Empty -->
        <div v-if="loadingEvents" class="events-placeholder">
          <p class="mb-0 text-white-50">Chargement des événements…</p>
        </div>

        <div v-else-if="visibleUpcoming.length === 0" class="events-placeholder">
          <p class="mb-0 text-white-50">✨ Aucun événement à venir pour le moment.</p>
        </div>

        <!-- Carousel -->
        <div
          v-else
          class="event-shell"
          @mouseenter="pauseAuto"
          @mouseleave="resumeAuto"
          @focusin="pauseAuto"
          @focusout="resumeAuto"
        >
          <button
            class="nav-btn"
            @click="prevEvent(true)"
            :disabled="visibleUpcoming.length <= 1"
            aria-label="Événement précédent"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <article class="event-card">
            <div class="event-media">
              <img
                v-if="currentEvent.imageUrl"
                :src="currentEvent.imageUrl"
                class="event-img"
                :alt="currentEvent.title"
              />
              <div v-else class="event-img fallback">
                <div class="fallback-inner">
                  <i class="fas fa-calendar-alt"></i>
                  <div class="fw-bold mt-2">ISF ULaval</div>
                  <div class="small text-white-50">Événement</div>
                </div>
              </div>

              <div class="event-badges">
                <span v-if="currentEvent.category" class="pill">{{ currentEvent.category }}</span>
                <span v-if="currentEvent.date" class="pill muted-pill">
                  {{ formatDate(currentEvent.date) }}
                </span>
              </div>
            </div>

            <div class="event-body">
              <h3 class="event-title">{{ currentEvent.title }}</h3>

              <p v-if="currentEvent.location" class="event-meta">
                📍 {{ currentEvent.location }}
              </p>

              <p v-if="currentEvent.description" class="event-desc">
                {{ currentEvent.description }}
              </p>
              <p v-else class="event-desc text-white-50">Détails à venir.</p>

              <div class="event-actions">
                <a
                  v-if="currentEvent.link"
                  class="btn btn-custom-primary btn-sm"
                  :href="currentEvent.link"
                  target="_blank"
                  rel="noopener"
                >
                  En savoir plus
                </a>

                <span class="dots" aria-label="Position dans la liste">
                  <button
                    v-for="(e, i) in visibleUpcoming"
                    :key="e.id"
                    class="dot"
                    :class="{ active: i === currentIndex }"
                    @click="goTo(i)"
                    :aria-label="`Aller à l'événement ${i + 1}`"
                  />
                </span>
              </div>
            </div>
          </article>

          <button
            class="nav-btn"
            @click="nextEvent(true)"
            :disabled="visibleUpcoming.length <= 1"
            aria-label="Événement suivant"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- COMITÉ EXÉCUTIF -->
    <section class="py-5 exec-home">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="display-5 fw-bold text-white">Comité exécutif</h2>
          <p class="lead text-white-50 mb-0">Découvre l’équipe qui coordonne ISF – Université Laval.</p>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <router-link to="/comite-executif" class="exec-btn-orange btn btn-lg">
            Voir le comité exécutif
          </router-link>
        </div>
      </div>
    </section>

    <!-- DEVIENS MEMBRE -->
    <section id="deviens-membre" class="py-5 become-member">
      <div class="container">
        <div class="text-center">
          <h2 class="display-5 fw-bold mb-3 text-white">Deviens membre !</h2>
          <p class="lead mb-4 text-white-50">Tous les programmes et tous les cycles sont les bienvenus.</p>

          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <router-link to="/devenir-membre" class="btn btn-primary btn-lg">
              Formulaire d’adhésion
            </router-link>

            <router-link to="/articles-promotionnels" class="btn btn-outline-light btn-lg">
              Merch
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "Home",

  data() {
    return {
      loadingEvents: true,
      events: [],
      currentIndex: 0,
      _unsub: null,

      // Auto carousel
      autoMs: 6000,
      _paused: false,
      _timer: null,
    };
  },

  computed: {
    visibleUpcoming() {
      const today = this.todayYYYYMMDD();

      const visible = this.events.filter((e) => e.isVisible === true || e.isVisible === undefined);
      const upcoming = visible.filter((e) => (e.date || "") >= today);

      upcoming.sort((a, b) => {
        const da = a.date || "9999-99-99";
        const dbb = b.date || "9999-99-99";
        if (da !== dbb) return da.localeCompare(dbb);
        return (a.order ?? 999) - (b.order ?? 999);
      });

      return upcoming;
    },

    currentEvent() {
      if (this.visibleUpcoming.length === 0) return {};
      const i = Math.max(0, Math.min(this.currentIndex, this.visibleUpcoming.length - 1));
      return this.visibleUpcoming[i];
    },
  },

  mounted() {
    const q = query(collection(db, "events"));
    this._unsub = onSnapshot(
      q,
      (snap) => {
        this.events = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.loadingEvents = false;

        if (this.currentIndex > this.visibleUpcoming.length - 1) {
          this.currentIndex = 0;
        }
      },
      (err) => {
        console.error("events load error:", err);
        this.loadingEvents = false;
      }
    );

    window.addEventListener("keydown", this.onKey);
    this.startAuto();
  },

  beforeUnmount() {
    if (this._unsub) this._unsub();
    window.removeEventListener("keydown", this.onKey);
    this.stopAuto();
  },

  methods: {
    todayYYYYMMDD() {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },

    formatDate(yyyyMmDd) {
      try {
        const [y, m, d] = (yyyyMmDd || "").split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        return dt.toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
      } catch {
        return yyyyMmDd || "";
      }
    },

    startAuto() {
      this.stopAuto();
      this._timer = setInterval(() => {
        if (!this._paused && this.visibleUpcoming.length > 1) {
          this.nextEvent(false);
        }
      }, this.autoMs);
    },

    stopAuto() {
      if (this._timer) clearInterval(this._timer);
      this._timer = null;
    },

    pauseAuto() {
      this._paused = true;
    },

    resumeAuto() {
      this._paused = false;
    },

    resetAuto() {
      this.startAuto();
    },

    nextEvent(reset = true) {
      const n = this.visibleUpcoming.length;
      if (n <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % n;
      if (reset) this.resetAuto();
    },

    prevEvent(reset = true) {
      const n = this.visibleUpcoming.length;
      if (n <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + n) % n;
      if (reset) this.resetAuto();
    },

    goTo(i) {
      this.currentIndex = i;
      this.resetAuto();
    },

    onKey(e) {
      if (this.visibleUpcoming.length <= 1) return;
      if (e.key === "ArrowRight") this.nextEvent(true);
      if (e.key === "ArrowLeft") this.prevEvent(true);
    },
  },
};
</script>

<style scoped>
.home {
  background: #000;
  color: #fff;
}

/* HERO */
.hero {
  position: relative;
  background-image: url("/activites/midiconf4.png");
  background-size: cover;

  /* ✅ on décale un peu vers le bas (tu peux ajuster 15%/20%/25%) */
  background-position: center 18%;

  height: 100vh;
}

.hero-content {
  background: #000;
  color: #fff;
}

/* Boutons */
.btn-custom-primary {
  background: #f97316;
  color: #000;
  border: none;
  font-weight: 900;
}
.btn-custom-primary:hover {
  background: #ff8a3d;
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.6);
}

.btn-custom-outline {
  border: 2px solid #fff;
  color: #fff;
  font-weight: 900;
}
.btn-custom-outline:hover {
  border-color: #f97316;
  color: #f97316;
}

/* IMAGE cover1 */
.midiconf-section {
  background: #000;
  padding: 3.5rem 0 4.5rem;
}
.midiconf-img {
  width: 100%;
  max-width: 1100px;
  display: block;
  margin: 0 auto;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}

/* EVENTS */
.events-home {
  background: #000;
}

.events-placeholder {
  max-width: 980px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
}

.event-shell {
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 52px 1fr 52px;
  gap: 14px;
  align-items: center;
}

.nav-btn {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-weight: 900;
  display: grid;
  place-items: center;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
}
.nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: rgba(249, 115, 22, 0.45);
  background: rgba(249, 115, 22, 0.12);
}
.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.event-card {
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  min-height: 320px;
}

.event-media {
  position: relative;
  background: #050505;
}
.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.event-img.fallback {
  display: grid;
  place-items: center;
  height: 100%;
  background:
    radial-gradient(circle at 15% 20%, rgba(249,115,22,0.25), transparent 45%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 40%),
    #000;
}
.fallback-inner {
  text-align: center;
  color: rgba(255,255,255,0.9);
}
.fallback-inner i {
  font-size: 34px;
  color: rgba(249,115,22,0.9);
}

.event-badges {
  position: absolute;
  left: 14px;
  top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: #fff;
  backdrop-filter: blur(6px);
}
.muted-pill {
  color: rgba(255, 255, 255, 0.75);
}

.event-body {
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}

.event-title {
  font-weight: 900;
  font-size: 22px;
  margin: 0;
}

.event-meta {
  margin: 0;
  color: rgba(255,255,255,0.8);
  font-weight: 700;
}

.event-desc {
  margin: 0;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
}

.event-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.dots {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.10);
  cursor: pointer;
}
.dot.active {
  background: rgba(249,115,22,0.9);
  border-color: rgba(249,115,22,0.9);
}

/* COMITÉ EXÉCUTIF */
.exec-home {
  background: #000;
}
.exec-btn-orange {
  background: #f97316;
  border: 2px solid #f97316;
  color: #000;
  font-weight: 900;
  padding: 14px 28px;
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  animation: glowOrange 2.8s ease-in-out infinite;
}
.exec-btn-orange:hover {
  transform: translateY(-2px);
  background: #ff8a3d;
  border-color: #ff8a3d;
  box-shadow: 0 0 22px rgba(249, 115, 22, 0.65);
  color: #000;
}
@keyframes glowOrange {
  0% { box-shadow: 0 0 0 rgba(249,115,22,0.0); }
  50% { box-shadow: 0 0 18px rgba(249,115,22,0.55); }
  100% { box-shadow: 0 0 0 rgba(249,115,22,0.0); }
}

.become-member {
  background: #000;
}

/* Responsive */
@media (max-width: 992px) {
  .event-card {
    grid-template-columns: 1fr;
  }
  .event-media {
    height: 260px;
  }
  .event-shell {
    grid-template-columns: 44px 1fr 44px;
  }
  .nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
}
</style>
