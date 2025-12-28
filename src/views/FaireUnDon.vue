<template>
  <div class="faire-un-don">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4 text-white">Faire un don</h1>
            <p class="lead mb-4 text-white-50">
              Soutenez nos projets et créez un impact durable
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Message principal -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="card border-0 shadow card-dark">
              <div class="card-body p-5 text-center">
                <div class="mb-4">
                  <i class="fas fa-heart fa-4x icon-heart"></i>
                </div>
                <h2 class="display-5 fw-bold mb-4 text-white">Chaque geste compte</h2>
                <p class="lead mb-4 text-white-50">
                  <strong>
                    Chaque contribution, même modeste, nous permet de mener à bien des projets
                    solidaires et responsables au sein d'ISF-Ulaval.
                  </strong>
                </p>
                <p class="mb-4 text-white-50">
                  En faisant un don, vous aidez des étudiants engagés à développer des actions concrètes
                  autour de la coopération internationale et de l'impact social. Votre soutien fait réellement
                  la différence et nous permet d'aller plus loin.
                </p>

                <div class="alert alert-dark custom-alert">
                  <h5 class="alert-heading mb-2">
                    <i class="fas fa-hands-helping me-2 text-warning"></i>
                    Construisons ensemble un monde plus juste et plus durable
                  </h5>
                  <p class="mb-0 text-white-50">
                    Merci de contribuer à construire un monde plus juste et plus durable.
                  </p>
                </div>

                <div class="d-flex gap-3 justify-content-center flex-wrap mt-4">
                  <button class="btn btn-donate btn-lg" @click="showDonationModal = true">
                    <i class="fas fa-heart me-2"></i>
                    Faire un don
                  </button>
                  <router-link to="/nos-projets" class="btn btn-outline-light btn-lg">
                    <i class="fas fa-arrow-right me-2"></i>
                    Voir nos projets
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets actuels qui ont besoin de financement -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Nos projets en cours</h2>
            <p class="lead text-white-50">
              Découvrez comment votre don peut avoir un impact direct
            </p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Projet Panneaux solaires Madagascar -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="icon-bubble bubble-warning">
                      <i class="fas fa-solar-panel fa-2x"></i>
                    </div>
                  </div>

                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3 text-white">Projet Panneaux solaires — Madagascar</h5>
                    <p class="text-white-50 mb-3">
                      Installation d'un système solaire pour une école de 125 élèves.
                      Votre don contribuera directement à fournir une source d'énergie durable et fiable.
                    </p>

                    <div class="mb-3">
                      <div class="progress progress-dark mb-2">
                        <div
                          class="progress-bar progress-bar-warning"
                          role="progressbar"
                          style="width: 30%"
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          30%
                        </div>
                      </div>
                      <small class="text-white-50">
                        Objectif : 5 000 $ CAD | Atteint : 1 500 $ CAD
                      </small>
                    </div>

                    <div class="d-flex gap-2 flex-wrap">
                      <a
                        href="https://www.gofundme.com/f/panneaux-solaires-madagascar"
                        target="_blank"
                        class="btn btn-donate-sm"
                      >
                        <i class="fas fa-external-link-alt me-1"></i>
                        GoFundMe
                      </a>
                      <router-link to="/nos-projets" class="btn btn-outline-warning btn-sm">
                        En savoir plus
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fonds général pour projets futurs -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="icon-bubble bubble-primary">
                      <i class="fas fa-seedling fa-2x"></i>
                    </div>
                  </div>

                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3 text-white">Fonds de développement futur</h5>
                    <p class="text-white-50 mb-3">
                      Soutenez nos futurs projets d'ingénierie humanitaire.
                      Votre don nous permettra de saisir rapidement les opportunités qui se présenteront.
                    </p>

                    <div class="mb-3">
                      <div class="progress progress-dark mb-2">
                        <div
                          class="progress-bar progress-bar-primary"
                          role="progressbar"
                          style="width: 60%"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          60%
                        </div>
                      </div>
                      <small class="text-white-50">
                        Objectif : 10 000 $ CAD | Atteint : 6 000 $ CAD
                      </small>
                    </div>

                    <div class="d-flex gap-2 flex-wrap">
                      <button class="btn btn-primary btn-sm" @click="showDonationModal = true">
                        <i class="fas fa-heart me-1"></i>
                        Faire un don
                      </button>
                      <router-link to="/nos-projets" class="btn btn-outline-primary btn-sm">
                        Nos projets
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Méthodes de don -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Comment faire un don ?</h2>
            <p class="lead text-white-50">
              Plusieurs façons de nous soutenir selon vos préférences
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-globe fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Don en ligne sécurisé</h5>
                <p class="text-white-50">
                  Utilisez notre plateforme sécurisée pour faire un don par carte de crédit.
                  Transaction rapide et sécurisée.
                </p>
                <button class="btn btn-success" @click="showDonationModal = true">
                  <i class="fas fa-credit-card me-2"></i>
                  Don en ligne
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-university fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Virement bancaire</h5>
                <p class="text-white-50">
                  Contactez-nous pour obtenir nos informations bancaires et effectuer un virement.
                </p>
                <router-link to="/nous-joindre" class="btn btn-primary">
                  <i class="fas fa-envelope me-2"></i>
                  Demander les détails
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-hand-holding-heart fa-3x text-danger"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Rencontre en personne</h5>
                <p class="text-white-50">
                  Rencontrez-nous sur le campus de l'Université Laval pour discuter de votre contribution.
                </p>
                <router-link to="/nous-joindre" class="btn btn-danger">
                  <i class="fas fa-map-marker-alt me-2"></i>
                  Nous rejoindre
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact de votre don -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">L'impact de votre don</h2>
            <p class="lead text-white-50">
              Comment chaque dollar fait la différence
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-water fa-3x text-info"></i>
                </div>
                <h4 class="fw-bold text-info">25$</h4>
                <p class="small text-white-50 mb-0">
                  Fournit des outils de construction pour un projet d'eau potable
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-solar-panel fa-3x text-warning"></i>
                </div>
                <h4 class="fw-bold text-warning">100$</h4>
                <p class="small text-white-50 mb-0">
                  Contribue à l'achat de panneaux solaires pour notre projet Madagascar
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-graduation-cap fa-3x text-success"></i>
                </div>
                <h4 class="fw-bold text-success">250$</h4>
                <p class="small text-white-50 mb-0">
                  Permet d'organiser une conférence de sensibilisation
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-school fa-3x text-primary"></i>
                </div>
                <h4 class="fw-bold text-primary">500$</h4>
                <p class="small text-white-50 mb-0">
                  Soutient complètement l'équipement d'une salle de classe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Transparence financière -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Transparence totale</h2>
            <p class="lead text-white-50">
              Nous croyons en la transparence dans l'utilisation des fonds
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-chart-pie fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Utilisation des fonds</h5>
                <p class="text-white-50 mb-0">
                  85% des dons vont directement aux projets, 10% à l'administration, 5% aux frais de transaction.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-file-alt fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Rapports réguliers</h5>
                <p class="text-white-50 mb-0">
                  Recevez des mises à jour régulières sur l'avancement des projets que vous soutenez.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark card-hover">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-users fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Comité de surveillance</h5>
                <p class="text-white-50 mb-0">
                  Notre comité exécutif supervise l'utilisation des fonds et veille à leur bon usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-5 cta-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4 text-white">Agissez maintenant !</h2>
            <p class="lead mb-4 text-white-50">
              Chaque don compte et nous rapproche de notre objectif : créer un impact durable et positif dans le monde.
            </p>
            <div class="d-flex gap-3 justify-content-center flex-wrap">
              <button class="btn btn-donate btn-lg" @click="showDonationModal = true">
                <i class="fas fa-heart me-2"></i>
                Faire un don maintenant
              </button>
              <router-link to="/devenir-membre" class="btn btn-outline-light btn-lg">
                <i class="fas fa-users me-2"></i>
                Devenir membre
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de don (simulation) -->
    <div
      class="modal fade custom-modal"
      :class="{ show: showDonationModal }"
      tabindex="-1"
      :style="{ display: showDonationModal ? 'block' : 'none' }"
      v-if="showDonationModal"
      @click.self="showDonationModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-dark">
          <div class="modal-header">
            <h5 class="modal-title text-white">
              <i class="fas fa-heart text-danger me-2"></i>
              Faire un don
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="showDonationModal = false"></button>
          </div>

          <div class="modal-body">
            <p class="mb-4 text-white-50">
              Merci pour votre intérêt à soutenir ISF Université Laval !
              Cette fonctionnalité sera bientôt disponible.
            </p>

            <div class="alert alert-dark custom-alert">
              <h6 class="alert-heading mb-2">
                <i class="fas fa-info-circle me-2 text-info"></i>
                En attendant
              </h6>
              <p class="mb-0 text-white-50">
                Vous pouvez nous contacter directement à
                <strong class="text-white">ulaval@chapter.ewb.ca</strong>
                ou utiliser nos plateformes de financement participatif.
              </p>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-light" @click="showDonationModal = false">
              Fermer
            </button>
            <a
              href="https://www.gofundme.com/f/operation-eau-pour-tous"
              target="_blank"
              class="btn btn-donate"
            >
              <i class="fas fa-external-link-alt me-2"></i>
              GoFundMe
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showDonationModal"></div>
  </div>
</template>

<script>
export default {
  name: "FaireUnDon",
  data() {
    return {
      showDonationModal: false,
    };
  },
  watch: {
    showDonationModal(newVal) {
      document.body.classList.toggle("modal-open", newVal);
    },
  },
  beforeUnmount() {
    document.body.classList.remove("modal-open");
  },
};
</script>

<style scoped>
/* Page globale */
.faire-un-don {
  background: #000;
  color: #fff;
}

/* Sections */
.section-dark {
  background: #000;
}

/* Hero */
.hero-section {
  position: relative;
  padding-top: 80px;
  background: radial-gradient(circle at 20% 10%, rgba(249,115,22,0.22), transparent 45%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 40%),
              #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.min-vh-75 {
  min-height: 60vh;
}

/* Cards dark */
.card-dark {
  background: #0b0b0b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  border-color: rgba(249, 115, 22, 0.35);
}

/* Alert custom */
.custom-alert {
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.06);
}

/* CTA */
.cta-section {
  background: linear-gradient(135deg, rgba(249,115,22,0.28) 0%, rgba(0,0,0,1) 58%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Icons */
.icon-heart {
  color: #fb7185;
  text-shadow: 0 0 18px rgba(251, 113, 133, 0.25);
}
.icon-bubble {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.bubble-warning {
  background: rgba(249, 115, 22, 0.22);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.35);
}
.bubble-primary {
  background: rgba(59, 130, 246, 0.18);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.32);
}

/* Progress */
.progress-dark {
  height: 9px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}
.progress-bar-warning {
  background: #f97316;
  font-weight: 800;
}
.progress-bar-primary {
  background: #3b82f6;
  font-weight: 800;
}

/* Buttons */
.btn-donate {
  background: #f97316;
  color: #000;
  border: none;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 20px;
}
.btn-donate:hover {
  background: #ff8a3d;
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.45);
  color: #000;
}

.btn-donate-sm {
  background: rgba(249,115,22,0.12);
  border: 1px solid rgba(249,115,22,0.45);
  color: #fff;
  font-weight: 800;
}
.btn-donate-sm:hover {
  background: #f97316;
  color: #000;
}

/* Modal */
.custom-modal {
  z-index: 1055;
}
.modal-dark {
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
}
.modal-header,
.modal-footer {
  border-color: rgba(255,255,255,0.08);
}
.modal-backdrop {
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

/* Lock scroll when modal open */
:global(body.modal-open) {
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }
  .display-4 {
    font-size: 2rem;
  }
}
</style>
