<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="display-4 fw-bold mb-4">
              ISF Université Laval
            </h1>
            <p class="lead mb-4">
              Ingénieurs sans frontières Canada - Section Université Laval
            </p>
            <p class="mb-4">
              Une communauté dynamique de plus de 90 membres engagée pour 
              une ingénierie humaine, responsable et solidaire.
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
              <router-link to="/devenir-membre" class="btn btn-light btn-lg">
                Rejoins-nous !
              </router-link>
              <router-link to="/nos-projets" class="btn btn-outline-light btn-lg">
                Nos projets
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="text-center">
              <div 
                class="img-fluid rounded shadow d-flex align-items-center justify-content-center text-white"
                style="height: 300px; background: linear-gradient(45deg, #2563eb, #059669);"
              >
                <div class="text-center">
                  <i class="fas fa-users fa-4x mb-2"></i>
                  <p class="mb-0 fw-bold">ISF Université Laval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Événements à venir -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Événements à venir</h2>
            <p class="lead text-muted">Rejoignez nos prochaines activités</p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">Rencontre avec Samah et Rayanne</h5>
                <p class="card-text">
                  Dimanche 21 décembre 2025 à 17h<br>
                  Présentation de notre plan de site web
                </p>
                <div class="badge bg-primary">Prochainement</div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-hands-helping fa-3x text-success"></i>
                </div>
                <h5 class="card-title">Projet Panneaux solaires Madagascar</h5>
                <p class="card-text">
                  Mandat 2025-2026<br>
                  Installation d'un système solaire pour une école de 125 élèves
                </p>
                <div class="badge bg-success">En préparation</div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-microphone fa-3x text-info"></i>
                </div>
                <h5 class="card-title">Interviews d'ingénieurs</h5>
                <p class="card-text">
                  Série d'entrevues avec des ingénieurs<br>
                  et CPI aux parcours inspirants
                </p>
                <div class="badge bg-info">En cours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos actions en images -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Nos actions</h2>
            <p class="lead text-muted">Découvrez nos projets et activités en images</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12">
            <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button 
                  type="button" 
                  data-bs-target="#imageCarousel" 
                  data-bs-slide-to="0" 
                  class="active"
                ></button>
                <button 
                  type="button" 
                  data-bs-target="#imageCarousel" 
                  data-bs-slide-to="1"
                ></button>
                <button 
                  type="button" 
                  data-bs-target="#imageCarousel" 
                  data-bs-slide-to="2"
                ></button>
                <button 
                  type="button" 
                  data-bs-target="#imageCarousel" 
                  data-bs-slide-to="3"
                ></button>
              </div>
              
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div 
                    class="d-block w-100 d-flex align-items-center justify-content-center text-white"
                    style="height: 400px; background: linear-gradient(45deg, #059669, #10b981);"
                  >
                    <div class="text-center">
                      <i class="fas fa-tint fa-5x mb-3"></i>
                      <h5 class="fw-bold">Projet Puits Cameroun 2024</h5>
                      <p>Construction d'un puits à Njindaré pour l'accès à l'eau potable</p>
                    </div>
                  </div>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Projet Puits Cameroun 2024</h5>
                    <p>Construction d'un puits à Njindaré pour l'accès à l'eau potable</p>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <div 
                    class="d-block w-100 d-flex align-items-center justify-content-center text-white"
                    style="height: 400px; background: linear-gradient(45deg, #2563eb, #3b82f6);"
                  >
                    <div class="text-center">
                      <i class="fas fa-microphone fa-5x mb-3"></i>
                      <h5 class="fw-bold">Conférences et sensibilisation</h5>
                      <p>Événements de sensibilisation aux enjeux sociaux et environnementaux</p>
                    </div>
                  </div>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Conférences et sensibilisation</h5>
                    <p>Événements de sensibilisation aux enjeux sociaux et environnementaux</p>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <div 
                    class="d-block w-100 d-flex align-items-center justify-content-center text-white"
                    style="height: 400px; background: linear-gradient(45deg, #dc2626, #ef4444);"
                  >
                    <div class="text-center">
                      <i class="fas fa-users fa-5x mb-3"></i>
                      <h5 class="fw-bold">Activités d'équipe</h5>
                      <p>Une communauté engagée de plus de 90 membres</p>
                    </div>
                  </div>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Activités d'équipe</h5>
                    <p>Une communauté engagée de plus de 90 membres</p>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <div 
                    class="d-block w-100 d-flex align-items-center justify-content-center text-white"
                    style="height: 400px; background: linear-gradient(45deg, #7c3aed, #a855f7);"
                  >
                    <div class="text-center">
                      <i class="fas fa-solar-panel fa-5x mb-3"></i>
                      <h5 class="fw-bold">Projet Panneaux solaires Madagascar</h5>
                      <p>Installation d'un système solaire pour une école de 125 élèves</p>
                    </div>
                  </div>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Projet Panneaux solaires Madagascar</h5>
                    <p>Installation d'un système solaire pour une école de 125 élèves</p>
                  </div>
                </div>
              </div>
              
              <button 
                class="carousel-control-prev" 
                type="button" 
                data-bs-target="#imageCarousel" 
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button 
                class="carousel-control-next" 
                type="button" 
                data-bs-target="#imageCarousel" 
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission et Vision -->
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-4">
            <h3 class="fw-bold mb-3">Notre Mission</h3>
            <p class="lead">
              Sensibiliser et mobiliser la communauté étudiante autour des enjeux 
              sociaux, environnementaux et éthiques liés à l'ingénierie et au 
              développement international.
            </p>
          </div>
          <div class="col-lg-6">
            <h3 class="fw-bold mb-3">Notre Vision</h3>
            <p class="lead">
              Contribuer à la formation de personnes conscientes des impacts de 
              leurs actions et désireuses de mettre leurs compétences au service 
              d'un avenir plus juste, solidaire et durable.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4">Tu as ta place parmi nous !</h2>
            <p class="lead mb-4">
              Que tu sois simplement curieux·se ou prêt·e à t'impliquer activement, 
              rejoins notre communauté d'ingénieurs engagés.
            </p>
            <div class="d-flex gap-3 justify-content-center">
              <router-link to="/devenir-membre" class="btn btn-primary btn-lg">
                Devenir membre
              </router-link>
              <router-link to="/faire-un-don" class="btn btn-outline-primary btn-lg">
                Soutenir nos projets
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
  name: 'Home'
}
</script>

<style scoped>
.hero {
  padding-top: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  min-height: 100vh;
}

.min-vh-100 {
  min-height: 100vh;
}

.carousel-item img {
  height: 400px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero {
    padding-top: 60px;
    text-align: center;
  }
  
  .display-4 {
    font-size: 2rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style>
