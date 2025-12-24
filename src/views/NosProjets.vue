<template>
  <div class="nos-projets">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4">Nos projets</h1>
            <p class="lead mb-4">
              Découvrez nos initiatives concrètes pour un impact positif
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projet Puits Cameroun 2024 -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Projet du puits - Cameroun 2024</h2>
            <p class="lead mb-4">
              Le projet <strong>Eau pour tous</strong>, mené durant le mandat 2024‑2025, 
              visait la construction d'un puits de <strong>1 270 $</strong> à 
              <strong>Njindaré, au Cameroun</strong>, afin d'offreir un accès durable 
              à l'eau potable.
            </p>
            <p class="mb-4">
              La réalisation a été effectuée en collaboration avec un ancien étudiant 
              de l'Université Laval, fondateur de <strong>Gather Charity</strong>, 
              déjà à l'origine de trois projets similaires dans la région.
            </p>
            <div class="d-flex gap-3">
              <a 
                href="https://www.gofundme.com/f/operation-eau-pour-tous" 
                target="_blank"
                class="btn btn-primary"
              >
                <i class="fas fa-external-link-alt me-2"></i>
                Voir la campagne GoFundMe
              </a>
              <a 
                href="https://drive.google.com/drive/folders/1SUGTWbXwwFAi-C1OLJ8QHU6jmgOqNJWP" 
                target="_blank"
                class="btn btn-outline-primary"
              >
                <i class="fas fa-images me-2"></i>
                Photos du projet
              </a>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card border-0 shadow">
              <div id="puitsCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button 
                    type="button" 
                    data-bs-target="#puitsCarousel" 
                    data-bs-slide-to="0" 
                    class="active"
                  ></button>
                  <button 
                    type="button" 
                    data-bs-target="#puitsCarousel" 
                    data-bs-slide-to="1"
                  ></button>
                  <button 
                    type="button" 
                    data-bs-target="#puitsCarousel" 
                    data-bs-slide-to="2"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img 
                      src="/projets/puit_construction.jpg" 
                      class="d-block w-100" 
                      alt="Construction du puits"
                      style="height: 300px; object-fit: cover;"
                    >
                    <div class="carousel-caption">
                      <h5>Construction en cours</h5>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img 
                      src="/projets/puit_construction1.jpg" 
                      class="d-block w-100" 
                      alt="Inauguration du puits"
                      style="height: 300px; object-fit: cover;"
                    >
                    <div class="carousel-caption">
                      <h5>Inauguration officielle</h5>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img 
                      src="/projets/puit_construction2.jpg" 
                      class="d-block w-100" 
                      alt="Bénéficiaires du puits"
                      style="height: 300px; object-fit: cover;"
                    >
                    <div class="carousel-caption">
                      <h5>La communauté bénéficiaire</h5>
                    </div>
                  </div>
                </div>
                <button 
                  class="carousel-control-prev" 
                  type="button" 
                  data-bs-target="#puitsCarousel" 
                  data-bs-slide="prev"
                >
                  <span class="carousel-control-prev-icon"></span>
                </button>
                <button 
                  class="carousel-control-next" 
                  type="button" 
                  data-bs-target="#puitsCarousel" 
                  data-bs-slide="next"
                >
                  <span class="carousel-control-next-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projet Interviews d'ingénieurs -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="card border-0 shadow">
              <div 
                class="d-flex align-items-center justify-content-center text-white"
                style="height: 250px; background: linear-gradient(135deg, #dc2626, #ef4444);"
              >
                <div class="text-center">
                  <i class="fas fa-microphone fa-4x mb-3"></i>
                  <h5 class="fw-bold">Série d'interviews</h5>
                </div>
              </div>
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">Série d'interviews</h5>
                <p class="card-text">
                  Découvrez les témoignages d'ingénieurs inspirants
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Projet interviews d'ingénieurs</h2>
            <p class="lead mb-4">
              Notre <strong>VP externe</strong> réalise des entrevues avec des ingénieurs 
              et CPI aux parcours inspirants. Découvrez leurs témoignages, leurs conseils 
              et leurs expériences directement sur notre chaîne YouTube.
            </p>
            
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="stat-card text-center p-3 bg-white rounded shadow">
                  <div class="stat-number">5+</div>
                  <div class="stat-label">Interviews réalisées</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-card text-center p-3 bg-white rounded shadow">
                  <div class="stat-number">1000+</div>
                  <div class="stat-label">Vues sur YouTube</div>
                </div>
              </div>
            </div>
            
            <div class="d-flex gap-3">
              <a 
                href="#" 
                target="_blank"
                class="btn btn-danger"
              >
                <i class="fab fa-youtube me-2"></i>
                Chaîne YouTube
              </a>
              <router-link to="/comite-executif" class="btn btn-outline-danger">
                <i class="fas fa-users me-2"></i>
                Notre VP Externe
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projet Panneaux solaires Madagascar -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Projet panneaux solaires - Madagascar</h2>
            <p class="lead mb-4">
              Le projet <strong>Panneaux solaires à Madagascar</strong>, inscrit dans le 
              mandat 2025‑2026, vise l'installation d'un système solaire dans une école 
              accueillant <strong>125 élèves</strong>.
            </p>
            <p class="mb-4">
              Cette initiative permettra de fournir une source d'énergie durable et fiable, 
              essentielle au bon déroulement des activités scolaires.
            </p>
            <p class="mb-4">
              <strong>Actuellement en préparation</strong>, ce projet s'inscrit dans notre 
              volonté de soutenir des infrastructures éducatives tout en promouvant des 
              solutions énergétiques responsables.
            </p>
            
            <div class="alert alert-info">
              <i class="fas fa-info-circle me-2"></i>
              <strong>Statut :</strong> En phase de préparation et de financement
            </div>
            
            <div class="d-flex gap-3">
              <router-link to="/faire-un-don" class="btn btn-success">
                <i class="fas fa-hand-holding-heart me-2"></i>
                Soutenir le projet
              </router-link>
              <router-link to="/partenaires" class="btn btn-outline-success">
                <i class="fas fa-handshake me-2"></i>
                Nos partenaires
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card border-0 shadow">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-4">Impact attendu</h5>
                
                <div class="row g-3">
                  <div class="col-12">
                    <div class="d-flex align-items-center p-3 bg-light rounded">
                      <i class="fas fa-school fa-2x text-primary me-3"></i>
                      <div>
                        <h6 class="mb-1">125 élèves bénéficiaires</h6>
                        <small class="text-muted">Accès à l'éducation de qualité</small>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <div class="d-flex align-items-center p-3 bg-light rounded">
                      <i class="fas fa-solar-panel fa-2x text-warning me-3"></i>
                      <div>
                        <h6 class="mb-1">Énergie durable</h6>
                        <small class="text-muted">Réduction de l'empreinte carbone</small>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <div class="d-flex align-items-center p-3 bg-light rounded">
                      <i class="fas fa-graduation-cap fa-2x text-success me-3"></i>
                      <div>
                        <h6 class="mb-1">Amélioration des conditions d'étude</h6>
                        <small class="text-muted">Éclairage et technologie en classe</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Galerie de tous nos projets -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Nos actions en images</h2>
            <p class="lead text-muted">
              Découvrez notre galerie de projets et activités
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit_construction4.jpg" 
                class="card-img-top" 
                alt="Projet 1"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Sensibilisation</h5>
                <p class="card-text">
                  Conférences et activités de sensibilisation aux enjeux sociaux et environnementaux.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit_construction5.jpg" 
                class="card-img-top" 
                alt="Projet 2"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Formation</h5>
                <p class="card-text">
                  Ateliers et formations pour développer les compétences de nos membres.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit_construction6.jpg" 
                class="card-img-top" 
                alt="Projet 3"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Réseautage</h5>
                <p class="card-text">
                  Événements de networking avec des professionnels et anciens étudiants.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit_construction7.jpg" 
                class="card-img-top" 
                alt="Projet 4"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Projet communautaire</h5>
                <p class="card-text">
                  Initiatives locales pour avoir un impact dans notre communauté.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit7.jpg" 
                class="card-img-top" 
                alt="Projet 5"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Innovation</h5>
                <p class="card-text">
                  Recherche et développement de solutions innovantes aux défis sociaux.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow h-100">
              <img 
                src="/projets/puit8.jpg" 
                class="card-img-top" 
                alt="Projet 6"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="card-title">Engagement</h5>
                <p class="card-text">
                  Mobilisation et engagement de la communauté étudiante autour de nos valeurs.
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
            <h2 class="display-5 fw-bold mb-4">Participe à nos projets !</h2>
            <p class="lead mb-4">
              Tu veux contribuer à nos initiatives et avoir un impact concret ? 
              Rejoins-nous et participe à la réalisation de nos projets !
            </p>
            <div class="d-flex gap-3 justify-content-center">
              <router-link to="/devenir-membre" class="btn btn-light btn-lg">
                Devenir membre
              </router-link>
              <router-link to="/faire-un-don" class="btn btn-outline-light btn-lg">
                Faire un don
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NosProjets'
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

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--gray-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }
  
  .display-4 {
    font-size: 2rem;
  }
}
</style>
