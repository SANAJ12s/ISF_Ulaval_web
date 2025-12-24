<template>
  <div class="faire-un-don">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4">Faire un don</h1>
            <p class="lead mb-4">
              Soutenez nos projets et créez un impact durable
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Message principal -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="card border-0 shadow">
              <div class="card-body p-5 text-center">
                <div class="mb-4">
                  <i class="fas fa-heart fa-4x text-danger"></i>
                </div>
                <h2 class="display-5 fw-bold mb-4">Chaque geste compte</h2>
                <p class="lead mb-4">
                  <strong>Chaque contribution, même modeste, nous permet de mener à bien 
                  des projets solidaires et responsables au sein d'ISF-Ulaval.</strong>
                </p>
                <p class="mb-4">
                  En faisant un don, vous aidez des étudiants engagés à développer des 
                  actions concrètes autour de la coopération internationale et de l'impact social. 
                  Votre soutien fait réellement la différence et nous permet d'aller plus loin.
                </p>
                <div class="alert alert-success">
                  <h5 class="alert-heading">
                    <i class="fas fa-hands-helping me-2"></i>
                    Construisons ensemble un monde plus juste et plus durable
                  </h5>
                  <p class="mb-0">
                    Merci de contribuer à construire un monde plus juste et plus durable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets actuels qui ont besoin de financement -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Nos projets en cours</h2>
            <p class="lead text-muted">
              Découvrez comment votre don peut avoir un impact direct
            </p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Projet Panneaux solaires Madagascar -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="bg-warning text-white rounded-circle p-3">
                      <i class="fas fa-solar-panel fa-2x"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3">Projet Panneaux solaires - Madagascar</h5>
                    <p class="text-muted mb-3">
                      Installation d'un système solaire pour une école de 125 élèves. 
                      Votre don contribuera directement à fournir une source d'énergie 
                      durable et fiable.
                    </p>
                    <div class="mb-3">
                      <div class="progress mb-2">
                        <div 
                          class="progress-bar bg-warning" 
                          role="progressbar" 
                          style="width: 30%"
                          aria-valuenow="30" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          30%
                        </div>
                      </div>
                      <small class="text-muted">
                        Objectif : 5 000 $ CAD | Atteint : 1 500 $ CAD
                      </small>
                    </div>
                    <div class="d-flex gap-2">
                      <a 
                        href="https://www.gofundme.com/f/panneaux-solaires-madagascar" 
                        target="_blank"
                        class="btn btn-warning btn-sm"
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
            <div class="card border-0 shadow h-100">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="bg-primary text-white rounded-circle p-3">
                      <i class="fas fa-seedling fa-2x"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3">Fonds de développement futur</h5>
                    <p class="text-muted mb-3">
                      Soutenez nos futurs projets d'ingénierie humanitaire. 
                      Votre don nous permettra de saisir rapidement les opportunités 
                      qui se présenteront.
                    </p>
                    <div class="mb-3">
                      <div class="progress mb-2">
                        <div 
                          class="progress-bar bg-primary" 
                          role="progressbar" 
                          style="width: 60%"
                          aria-valuenow="60" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          60%
                        </div>
                      </div>
                      <small class="text-muted">
                        Objectif : 10 000 $ CAD | Atteint : 6 000 $ CAD
                      </small>
                    </div>
                    <div class="d-flex gap-2">
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
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Comment faire un don ?</h2>
            <p class="lead text-muted">
              Plusieurs façons de nous soutenir selon vos préférences
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-globe fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3">Don en ligne sécurisé</h5>
                <p>
                  Utilisez notre plateforme sécurisée pour faire un don par carte 
                  de crédit. Transaction rapide et sécurisée.
                </p>
                <button class="btn btn-success" @click="showDonationModal = true">
                  <i class="fas fa-credit-card me-2"></i>
                  Don en ligne
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-university fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3">Virement bancaire</h5>
                <p>
                  Contactez-nous pour obtenir nos informations bancaires 
                  et effectuer un virement directement.
                </p>
                <router-link to="/nous-joindre" class="btn btn-primary">
                  <i class="fas fa-envelope me-2"></i>
                  Demander les détails
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-hand-holding-heart fa-3x text-danger"></i>
                </div>
                <h5 class="fw-bold mb-3">Rencontre en personne</h5>
                <p>
                  Rencontrez-nous sur le campus de l'Université Laval 
                  pour discuter de votre contribution.
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
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">L'impact de votre don</h2>
            <p class="lead text-muted">
              Comment chaque dollar fait la différence
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-water fa-3x text-info"></i>
                </div>
                <h4 class="fw-bold text-info">25$</h4>
                <p class="small">
                  Fournit des outils de construction pour un projet d'eau potable
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-solar-panel fa-3x text-warning"></i>
                </div>
                <h4 class="fw-bold text-warning">100$</h4>
                <p class="small">
                  Contribue à l'achat de panneaux solaires pour notre projet Madagascar
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-graduation-cap fa-3x text-success"></i>
                </div>
                <h4 class="fw-bold text-success">250$</h4>
                <p class="small">
                  Permet d'organiser une conférence de sensibilisation
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-school fa-3x text-primary"></i>
                </div>
                <h4 class="fw-bold text-primary">500$</h4>
                <p class="small">
                  Soutient complètement l'équipement d'une salle de classe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Transparence financière -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Transparence totale</h2>
            <p class="lead text-muted">
              Nous croyons en la transparence dans l'utilisation des fonds
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-chart-pie fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3">Utilisation des fonds</h5>
                <p>
                  85% des dons vont directement aux projets, 10% à l'administration, 
                  5% aux frais de transaction.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-file-alt fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3">Rapports réguliers</h5>
                <p>
                  Recevez des mises à jour régulières sur l'avancement 
                  des projets que vous soutenez.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-users fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3">Comité de surveillance</h5>
                <p>
                  Notre comité exécutif supervise l'utilisation des fonds 
                  et veille à leur bon usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4">Agissez maintenant !</h2>
            <p class="lead mb-4">
              Chaque don compte et nous rapproche de notre objectif : créer 
              un impact durable et positif dans le monde.
            </p>
            <div class="d-flex gap-3 justify-content-center">
              <button class="btn btn-light btn-lg" @click="showDonationModal = true">
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
      class="modal fade" 
      :class="{ show: showDonationModal }" 
      tabindex="-1" 
      :style="{ display: showDonationModal ? 'block' : 'none' }"
      v-if="showDonationModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-heart text-danger me-2"></i>
              Faire un don
            </h5>
            <button type="button" class="btn-close" @click="showDonationModal = false"></button>
          </div>
          <div class="modal-body">
            <p class="mb-4">
              Merci pour votre intérêt à soutenir ISF Université Laval ! 
              Cette fonctionnalité sera bientôt disponible.
            </p>
            <div class="alert alert-info">
              <h6 class="alert-heading">
                <i class="fas fa-info-circle me-2"></i>
                En attendant
              </h6>
              <p class="mb-0">
                Vous pouvez nous contacter directement à 
                <strong>ulaval@chapter.ewb.ca</strong> pour discuter de votre don 
                ou utiliser nos plateformes de financement participatif.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDonationModal = false">
              Fermer
            </button>
            <a 
              href="https://www.gofundme.com/f/operation-eau-pour-tous" 
              target="_blank"
              class="btn btn-primary"
            >
              <i class="fas fa-external-link-alt me-2"></i>
              GoFundMe
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" v-if="showDonationModal"></div>
  </div>
</template>

<script>
export default {
  name: 'FaireUnDon',
  data() {
    return {
      showDonationModal: false
    }
  },
  methods: {
    openDonationModal() {
      this.showDonationModal = true
    }
  },
  watch: {
    showDonationModal(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  padding-top: 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.min-vh-75 {
  min-height: 60vh;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.progress {
  height: 8px;
  border-radius: 4px;
}

.progress-bar {
  transition: width 0.6s ease;
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }
  
  .display-4 {
    font-size: 2rem;
  }
}

/* Modal styles */
.modal.show {
  display: block !important;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
