<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="display-4 fw-bold mb-4">
              ISF-Ulaval
            </h1>
            <p class="lead mb-4">
              Ingénieurs sans frontières Canada - Section Université Laval
            </p>
            <p class="mb-4">
              Une communauté dynamique et engagée de plus de 90 membres pour
              une ingénierie humaine, responsable et solidaire.
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
              <a href="#deviens-membre" class="btn btn-light btn-lg">
                Rejoins-nous !
              </a>
              <router-link to="/nos-projets" class="btn btn-outline-light btn-lg">
                Nos projets
              </router-link>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="text-center">
              <div class="hero-visual rounded shadow d-flex align-items-center justify-content-center text-white">
                <div class="text-center">
                  <i class="fas fa-users fa-4x mb-2"></i>
                  <p class="mb-0 fw-bold">ISF Université Laval</p>
                </div>
              </div>
              <small class="text-white-50 d-block mt-2">
                (Tu peux remplacer ce visuel par une vraie photo plus tard)
              </small>
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
                  <i class="fas fa-calendar-alt fa-3x icon-accent"></i>
                </div>
                <h5 class="card-title">Rencontre avec Samah et Rayanne</h5>
                <p class="card-text">
                  Dimanche 21 décembre 2025 à 17h<br />
                  Présentation de notre plan de site web
                </p>
                <div class="badge badge-accent">Prochainement</div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-hands-helping fa-3x icon-dark"></i>
                </div>
                <h5 class="card-title">Projet Panneaux solaires Madagascar</h5>
                <p class="card-text">
                  Mandat 2025-2026<br />
                  Installation d'un système solaire pour une école de 125 élèves
                </p>
                <div class="badge bg-secondary">En préparation</div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-microphone fa-3x icon-accent"></i>
                </div>
                <h5 class="card-title">Interviews d'ingénieurs</h5>
                <p class="card-text">
                  Série d'entrevues avec des ingénieurs<br />
                  et CPI aux parcours inspirants
                </p>
                <div class="badge bg-dark">En cours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos actions en images (placeholder) -->
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
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="3"></button>
              </div>

              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="carousel-placeholder d-flex align-items-center justify-content-center text-white">
                    <div class="text-center">
                      <i class="fas fa-tint fa-5x mb-3"></i>
                      <h5 class="fw-bold">Projet Puits Cameroun 2024</h5>
                      <p>Construction d'un puits à Njindaré pour l'accès à l'eau potable</p>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="carousel-placeholder d-flex align-items-center justify-content-center text-white">
                    <div class="text-center">
                      <i class="fas fa-microphone fa-5x mb-3"></i>
                      <h5 class="fw-bold">Conférences et sensibilisation</h5>
                      <p>Événements de sensibilisation aux enjeux sociaux et environnementaux</p>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="carousel-placeholder d-flex align-items-center justify-content-center text-white">
                    <div class="text-center">
                      <i class="fas fa-users fa-5x mb-3"></i>
                      <h5 class="fw-bold">Activités d'équipe</h5>
                      <p>Une communauté engagée de plus de 90 membres</p>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="carousel-placeholder d-flex align-items-center justify-content-center text-white">
                    <div class="text-center">
                      <i class="fas fa-solar-panel fa-5x mb-3"></i>
                      <h5 class="fw-bold">Projet Panneaux solaires Madagascar</h5>
                      <p>Installation d'un système solaire pour une école de 125 élèves</p>
                    </div>
                  </div>
                </div>
              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Qui sommes-nous -->
    <section class="py-5 who">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Qui sommes-nous ?</h2>
            <p class="lead text-muted">Notre histoire, mission et vision</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="info-card">
              <h3>Notre histoire</h3>
              <p>
                La section Ingénieurs sans frontières – Université Laval fait partie du réseau
                de Ingénieurs sans frontières Canada. Elle rassemble aujourd’hui une communauté
                dynamique et engagée de plus de 90 membres.
              </p>
              <p class="mb-0">
                Ouverte à toutes les étudiantes et tous les étudiants, de tous les cycles et de
                tous les programmes, notre section est un espace inclusif où chacun peut s’impliquer
                à sa façon.
              </p>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="info-card">
              <h3>Notre mission</h3>
              <p class="mb-0">
                Sensibiliser et mobiliser la communauté étudiante autour des enjeux sociaux,
                environnementaux et éthiques liés à l’ingénierie et au développement international.
                Par conférences, activités, événements et initiatives concrètes, nous cherchons un
                impact positif et durable, ici comme ailleurs.
              </p>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="info-card">
              <h3>Notre vision</h3>
              <p class="mb-0">
                Contribuer à une ingénierie humaine, responsable et engagée. Nous voulons former des
                personnes conscientes des impacts de leurs actions et prêtes à mettre leurs compétences
                au service d’un avenir plus juste, solidaire et durable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comité exécutif (switch) -->
    <ExecSwitch />

    <!-- Deviens membre -->
    <section id="deviens-membre" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-3">Deviens membre !</h2>
            <p class="lead mb-4">
              Pour devenir membre il te suffit de compléter le formulaire ci-dessous !
              Nous acceptons tous les programmes, tous les cycles et les étudiants gradués !
            </p>

            <div class="d-flex flex-wrap gap-3 justify-content-center">
              <!-- Remplace ce lien par TON lien officiel d’adhésion -->
              <a class="btn btn-primary btn-lg" href="#" target="_blank" rel="noreferrer">
                Formulaire d’adhésion
              </a>

              <a
                class="btn btn-outline-dark btn-lg"
                href="https://forms.gle/AmjDeCcUneTFepcT7"
                target="_blank"
                rel="noreferrer"
              >
                Formulaire merch
              </a>

              <a
                class="btn btn-dark btn-lg"
                href="https://www.facebook.com/groups/534075985970818/"
                target="_blank"
                rel="noreferrer"
              >
                Groupe Facebook privé
              </a>
            </div>

            <div class="mt-4 text-muted">
              <p class="mb-2 fw-semibold">Avantages d’être membre :</p>
              <ul class="list-unstyled mb-0">
                <li>• Avoir un impact réel, même à petite échelle, sur des initiatives locales ou internationales.</li>
                <li>• Valoriser son parcours avec une expérience associative reconnue.</li>
                <li>• Participer à des projets concrets en lien avec la solidarité internationale.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import ExecSwitch from "@/components/ExecSwitch.vue";

export default {
  name: "Home",
  components: { ExecSwitch },
};
</script>

<style scoped>
.hero {
  padding-top: 80px;
  background-image: url('/ulaval.jpg'); background-size: cover; background-position: center;
  min-height: 100vh;
}

.hero-visual {
  height: 300px;
  background: linear-gradient(45deg, #111827, #f97316);
}

.min-vh-100 {
  min-height: 100vh;
}

.carousel-placeholder {
  height: 400px;
  background: linear-gradient(45deg, var(--dark-color), var(--primary-color));
}

/* Couleurs thème au lieu du bleu bootstrap */
.icon-accent { color: var(--primary-color); }
.icon-dark { color: var(--dark-color); }
.badge-accent { background: var(--primary-color); }

/* Qui sommes-nous */
.who {
  background: var(--bg-soft);
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  height: 100%;
}

.info-card h3 {
  color: var(--dark-color);
  font-weight: 800;
  margin-bottom: 10px;
}

.info-card p {
  color: #374151;
  line-height: 1.7;
}

/* Responsive */
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
