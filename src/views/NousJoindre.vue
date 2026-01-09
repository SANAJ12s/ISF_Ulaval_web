<template>
  <div class="nous-joindre page-dark">
   
    <section class="hero-section hero-dark">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-9 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3 text-white">Nous joindre</h1>
            <p class="lead mb-0 text-white-50">
              Restons connectés — écris-nous ou viens nous voir au Pavillon Alexandre-Vachon.
            </p>
          </div>
        </div>
      </div>
    </section>

  
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-3 text-white">Suivez-nous</h2>
            <p class="lead text-white-50 mb-0">
              Rejoignez notre communauté et restez informé de nos activités.
            </p>
          </div>
        </div>

        <div class="row g-4">
         
          <div class="col-lg-4 col-md-6">
            <div class="card card-dark h-100">
              <div class="card-body text-center p-4">
                <div class="social-icon facebook mb-3">
                  <i class="fab fa-facebook-f"></i>
                </div>
                <h5 class="fw-bold mb-2 text-white">Facebook</h5>
                <p class="text-white-50 mb-4">
                  Page officielle + groupe privé pour les membres.
                </p>
                <div class="d-flex flex-column gap-2">
                  <a
                    href="https://www.facebook.com/isfulaval"
                    target="_blank"
                    class="btn btn-primary"
                    rel="noopener"
                  >
                    <i class="fab fa-facebook-f me-2"></i>
                    Page ISF
                  </a>
                  <a
                    href="https://www.facebook.com/groups/534075985970818/"
                    target="_blank"
                    class="btn btn-outline-light"
                    rel="noopener"
                  >
                    <i class="fas fa-users me-2"></i>
                    Groupe privé
                  </a>
                </div>
              </div>
            </div>
          </div>

          
          <div class="col-lg-4 col-md-6">
            <div class="card card-dark h-100">
              <div class="card-body text-center p-4">
                <div class="social-icon instagram mb-3">
                  <i class="fab fa-instagram"></i>
                </div>
                <h5 class="fw-bold mb-2 text-white">Instagram</h5>
                <p class="text-white-50 mb-4">Photos, stories, behind-the-scenes.</p>
                <a
                  href="https://www.instagram.com/isfulaval/"
                  target="_blank"
                  class="btn btn-instagram w-100"
                  rel="noopener"
                >
                  <i class="fab fa-instagram me-2"></i>
                  Suivre
                </a>
              </div>
            </div>
          </div>

       
          <div class="col-lg-4 col-md-6">
            <div class="card card-dark h-100">
              <div class="card-body text-center p-4">
                <div class="social-icon linkedin mb-3">
                  <i class="fab fa-linkedin-in"></i>
                </div>
                <h5 class="fw-bold mb-2 text-white">LinkedIn</h5>
                <p class="text-white-50 mb-4">Infos, projets, partenariats.</p>
                <a
                  href="https://www.linkedin.com/company/isfulaval/posts/?feedView=all"
                  target="_blank"
                  class="btn btn-linkedin w-100"
                  rel="noopener"
                >
                  <i class="fab fa-linkedin-in me-2"></i>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <!-- YouTube -->
          <div class="col-lg-4 col-md-6">
  <div class="card card-dark h-100">
    <div class="card-body text-center p-4">
      <div class="social-icon youtube mb-3">
        <i class="fab fa-youtube"></i>
      </div>
      <h5 class="fw-bold mb-2 text-white">YouTube</h5>
      <p class="text-white-50 mb-4">Interviews d’ingénieurs & projets.</p>
      <a
        href="https://www.youtube.com/@ISF-Ulaval"
        target="_blank"
        class="btn btn-youtube w-100"
        rel="noopener"
      >
        <i class="fab fa-youtube me-2"></i>
        Chaîne YouTube
      </a>
    </div>
  </div>
</div>


          <div class="col-lg-4 col-md-6">
            <div class="card card-dark h-100">
              <div class="card-body text-center p-4">
                <div class="social-icon email mb-3">
                  <i class="fas fa-envelope"></i>
                </div>
                <h5 class="fw-bold mb-2 text-white">Courriel</h5>
                <p class="text-white-50 mb-3">Pour toute question / collaboration.</p>

                <div class="email-pill">{{ email }}</div>

                <button
                  type="button"
                  class="btn btn-email w-100 mt-3"
                  @click="copyEmail"
                  :disabled="copyState === 'copied'"
                >
                  <i class="fas fa-copy me-2"></i>
                  <span v-if="copyState === 'idle'">Copier l’adresse</span>
                  <span v-else>Copié !</span>
                </button>

                <div v-if="copyState === 'copied'" class="small text-white-50 mt-2">
                  Adresse copié
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coordonnées (Adresse seulement) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-3 text-white">Nos coordonnées</h2>
            <p class="lead text-white-50 mb-0">
              Pavillon Alexandre-Vachon, Université Laval.
            </p>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-lg-8">
            <div class="card card-dark h-100">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-3 text-white">
                  <i class="fas fa-map-marker-alt text-warning me-2"></i>
                  Adresse
                </h5>

                <div class="info-line">
                  <span class="info-k">Local</span>
                  <span class="info-v">00151</span>
                </div>

                <div class="mt-3 text-white-50">
                  1045 Av de la Médecine<br />
                  Pavillon Alexandre-Vachon<br />
                  Université Laval<br />
                  Québec, QC, Canada
                </div>

                <div class="mini-note mt-4">
                  <i class="fas fa-info-circle me-2"></i>
                  Le local peut parfois être fermé.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-3 text-white">Comment nous retrouver</h2>
            <p class="lead text-white-50 mb-0">
              Cliquez sur la carte pour ouvrir Google Maps avec l’adresse déjà prête.
            </p>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-lg-10">
            <a
              class="map-card-dark"
              :href="googleMapsLink"
              target="_blank"
              rel="noopener"
              aria-label="Ouvrir Google Maps"
              title="Ouvrir dans Google Maps"
            >
              <div class="map-topbar-dark">
                <div class="map-pin-dark">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="map-meta-dark">
                  <div class="map-title-dark">Pavillon Alexandre-Vachon</div>
                  <div class="map-subtitle-dark">{{ addressLine }}</div>
                </div>
                <div class="map-cta-dark">
                  <span class="pill-dark">
                    <i class="fas fa-external-link-alt me-2"></i>Ouvrir
                  </span>
                </div>
              </div>

              <div class="map-frame-dark">
                <iframe
                  class="map-iframe-dark"
                  :src="googleMapsEmbed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  allowfullscreen
                ></iframe>
                <div class="map-glow"></div>
              </div>

              <div class="map-footer-dark">
                <div class="hint-dark">
                  <i class="fas fa-mouse-pointer me-2"></i>
                  Clique pour itinéraire + recherche automatique
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

   
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-3 text-white">Questions fréquentes</h2>
            <p class="lead text-white-50 mb-0">Quelques réponses rapides.</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card card-dark h-100">
              <div class="card-body p-4 text-center">
                <div class="mb-3">
                  <i class="fas fa-question-circle fa-3x text-warning"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Qui peut devenir membre ?</h5>
                <p class="text-white-50">
                  Tous les étudiants de l'Université Laval, tous programmes et cycles confondus,
                  ainsi que les diplômés récents.
                </p>
                <router-link to="/devenir-membre" class="btn btn-outline-light">
                  En savoir plus
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card card-dark h-100">
              <div class="card-body p-4 text-center">
                <div class="mb-3">
                  <i class="fas fa-dollar-sign fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Coût de l'adhésion ?</h5>
                <p class="text-white-50">
                  L'adhésion à ISF est <strong class="text-white">entièrement gratuite</strong>.
                </p>
                <router-link to="/devenir-membre" class="btn btn-outline-light">
                  Rejoindre maintenant
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card card-dark h-100">
              <div class="card-body p-4 text-center">
                <div class="mb-3">
                  <i class="fas fa-clock fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Engagement requis ?</h5>
                <p class="text-white-50">
                  Aucun engagement minimum ! Participez selon vos disponibilités.
                </p>
                <router-link to="/comite-executif" class="btn btn-outline-light">
                  Contacter le comité
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <router-link to="/comite-executif" class="btn btn-accent btn-lg">
            <i class="fas fa-users me-2"></i>
            Contacter le comité
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NousJoindre",
  data() {
    return {
      email: "ulaval@chapter.ewb.ca",
      copyState: "idle", 
      addressLine:
        "1045 Av de la Médecine, Pavillon Alexandre-Vachon, Université Laval, Québec, QC, Canada",
    };
  },
  computed: {
    googleMapsLink() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        this.addressLine
      )}`;
    },
    googleMapsEmbed() {
      return `https://www.google.com/maps?q=${encodeURIComponent(this.addressLine)}&output=embed`;
    },
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.email);
        this.copyState = "copied";
        window.setTimeout(() => (this.copyState = "idle"), 2500);
      } catch (e) {
        // Fallback si clipboard bloqué (rare)
        const el = document.createElement("textarea");
        el.value = this.email;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.copyState = "copied";
        window.setTimeout(() => (this.copyState = "idle"), 2500);
      }
    },
  },
};
</script>

<style scoped>
/* Page background */
.page-dark {
  background: #000;
  color: #fff;
}

/* Sections */
.section-dark {
  background: #000;
}

/* Hero */
.hero-dark {
  position: relative;
  padding-top: 80px;
  background: radial-gradient(circle at 20% 10%, rgba(249, 115, 22, 0.28), transparent 45%),
    radial-gradient(circle at 80% 35%, rgba(37, 99, 235, 0.18), transparent 45%), #000;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.min-vh-75 {
  min-height: 60vh;
}

/* Dark card */
.card-dark {
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  color: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card-dark:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  border-color: rgba(249, 115, 22, 0.25);
}

/* Social icons */
.social-icon {
  width: 78px;
  height: 78px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  margin: 0 auto;
  font-size: 2rem;
  color: white;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
}
.social-icon.facebook {
  background: linear-gradient(135deg, #1877f2, #0f3d8a);
}
.social-icon.instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
}
.social-icon.linkedin {
  background: linear-gradient(135deg, #0077b5, #005885);
}
.social-icon.youtube {
  background: linear-gradient(135deg, #ff0000, #b30000);
}
.social-icon.email {
  background: linear-gradient(135deg, #6c757d, #42484f);
}

/* Email pill */
.email-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.86);
  font-weight: 800;
  letter-spacing: 0.2px;
}

/* Buttons */
.btn-instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  border: none;
  color: #fff;
  font-weight: 800;
}
.btn-instagram:hover {
  filter: brightness(0.95);
  color: #fff;
}
.btn-linkedin {
  background: #0077b5;
  border: none;
  color: #fff;
  font-weight: 800;
}
.btn-linkedin:hover {
  background: #005885;
  color: #fff;
}
.btn-youtube {
  background: #ff0000;
  border: none;
  color: #fff;
  font-weight: 800;
}
.btn-youtube:hover {
  background: #cc0000;
  color: #fff;
}
.btn-email {
  background: #6c757d;
  border: none;
  color: #fff;
  font-weight: 900;
}
.btn-email:hover {
  background: #545b62;
  color: #fff;
}
.btn-email:disabled {
  opacity: 0.75;
  cursor: default;
}
.btn-outline-light {
  font-weight: 800;
}

/* Accent button */
.btn-accent {
  background: #f97316;
  color: #111;
  border: none;
  font-weight: 950;
  border-radius: 999px;
  box-shadow: 0 16px 40px rgba(249, 115, 22, 0.25);
}
.btn-accent:hover {
  filter: brightness(0.95);
  color: #111;
}

/* Info blocks */
.info-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.info-k {
  color: rgba(255, 255, 255, 0.65);
  font-weight: 800;
}
.info-v {
  color: #fff;
  font-weight: 950;
}
.mini-note {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.22);
  color: rgba(255, 255, 255, 0.78);
  font-weight: 650;
}

/* Map card (dark) */
.map-card-dark {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 18px;
  overflow: hidden;
  background: #0b0b0b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.map-card-dark:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.55);
  border-color: rgba(249, 115, 22, 0.28);
}
.map-topbar-dark {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(37, 99, 235, 0.12));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.map-pin-dark {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(249, 115, 22, 0.18);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
}
.map-meta-dark {
  flex: 1;
  min-width: 0;
}
.map-title-dark {
  font-weight: 950;
  color: #fff;
  line-height: 1.15;
}
.map-subtitle-dark {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 650;
  font-size: 0.95rem;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pill-dark {
  display: inline-flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 999px;
  background: #f97316;
  color: #111;
  font-weight: 950;
  border: none;
}
.map-frame-dark {
  position: relative;
  height: 430px;
  background: #111;
}
.map-iframe-dark {
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(0.95) contrast(1.02);
}
.map-glow {
  position: absolute;
  inset: -40px;
  pointer-events: none;
  background: radial-gradient(circle at 20% 15%, rgba(249, 115, 22, 0.18), transparent 55%),
    radial-gradient(circle at 80% 40%, rgba(37, 99, 235, 0.15), transparent 55%);
  mix-blend-mode: screen;
  opacity: 0.9;
}
.map-footer-dark {
  padding: 12px 16px;
  background: #0b0b0b;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.hint-dark {
  color: rgba(255, 255, 255, 0.72);
  font-weight: 750;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-dark {
    padding-top: 60px;
  }
  .display-4 {
    font-size: 2rem;
  }
  .social-icon {
    width: 62px;
    height: 62px;
    font-size: 1.6rem;
  }
  .map-frame-dark {
    height: 320px;
  }
  .map-subtitle-dark {
    white-space: normal;
  }
}
</style>
