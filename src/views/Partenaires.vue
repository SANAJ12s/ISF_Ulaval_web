<template>
  <div class="partenaires">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4 text-white">Nos partenaires</h1>
            <p class="lead mb-4 text-white-50">
              Remerciements à nos généreux commanditaires et partenaires
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partenaires principaux (scroll vertical, images grandes) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Nos commanditaires</h2>
            <p class="lead text-white-50">
              Grâce à leur soutien, nous pouvons mener à bien nos missions
            </p>
          </div>
        </div>

        <div class="partners-stack">
          <!-- CADEUL -->
          <article class="partner-big card-dark">
            <div class="partner-media">
              <img src="/partenaires/cadeul.png" alt="Cadeul" class="partner-img" />
            </div>
            <div class="partner-content">
              <h3 class="partner-title">CADEUL</h3>
              <p class="partner-text">
                Le Comité d'action pour la diversité en ingénierie de l'Université Laval
              </p>
            </div>
          </article>

          <!-- AESGUL -->
          <article class="partner-big card-dark">
            <div class="partner-media">
              <img src="/partenaires/aesgul.png" alt="Aesgul" class="partner-img" />
            </div>
            <div class="partner-content">
              <h3 class="partner-title">AESGUL</h3>
              <p class="partner-text">
                Association des étudiantes et étudiants en génie de l'Université Laval
              </p>
            </div>
          </article>

          <!-- AEGSEG -->
          <article class="partner-big card-dark">
            <div class="partner-media">
              <img src="/partenaires/aegseg.png" alt="AEGSEG" class="partner-img" />
            </div>
            <div class="partner-content">
              <h3 class="partner-title">AEGSEG</h3>
              <p class="partner-text">
                Association des étudiants du génie des systèmes d'information géographique
              </p>
            </div>
          </article>

          <!-- Département -->
          <article class="partner-big card-dark">
            <div class="partner-media">
              <img
                src="/partenaires/departement de genie civil.png"
                alt="Département de génie civil et génie des eaux"
                class="partner-img"
              />
            </div>
            <div class="partner-content">
              <h3 class="partner-title">Département de génie civil et génie des eaux</h3>
              <p class="partner-text">Université Laval — Partenaire académique</p>
            </div>
          </article>

          <!-- Faculté -->
          <article class="partner-big card-dark">
            <div class="partner-media">
              <img
                src="/partenaires/faculte sciences et genie.png"
                alt="Faculté des sciences et de génie"
                class="partner-img"
              />
            </div>
            <div class="partner-content">
              <h3 class="partner-title">Faculté des sciences et de génie</h3>
              <p class="partner-text">Université Laval — Soutien institutionnel</p>
            </div>
          </article>

          <!-- Desjardins (placeholder propre tant que pas d’image) -->
          <article class="partner-big card-dark">
            <div class="partner-media partner-placeholder">
              <div class="placeholder-inner">
                <i class="fas fa-building fa-3x"></i>
                <div class="mt-3 fw-bold">Desjardins</div>
                <div class="badge bg-warning text-dark mt-2">À confirmer</div>
              </div>
            </div>
            <div class="partner-content">
              <h3 class="partner-title">Desjardins</h3>
              <p class="partner-text">Partenaire financier potentiel</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Réseau ISF Canada (fond noir) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">
              Réseau Ingénieurs sans frontières Canada
            </h2>
            <p class="lead text-white-50">
              Nous faisons partie du réseau national d'ISF Canada
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-network-wired fa-3x text-warning"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Réseau national</h5>
                <p class="text-white-50 mb-0">
                  Nous sommes une section du réseau Ingénieurs sans frontières Canada,
                  présent dans plusieurs universités à travers le pays.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-handshake fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Collaboration</h5>
                <p class="text-white-50 mb-0">
                  Nous collaborons avec les autres sections pour partager les meilleures pratiques
                  et coordonner nos actions à l'échelle nationale.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-globe fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Impact international</h5>
                <p class="text-white-50 mb-0">
                  Ensemble, nous renforçons l'impact de l'ingénierie humanitaire
                  et du développement international au Canada et ailleurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partenaires opérationnels (fond noir) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Nos partenaires opérationnels</h2>
            <p class="lead text-white-50">
              Les organisations avec lesquelles nous collaborons directement
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="bg-warning text-dark rounded-circle p-3">
                      <i class="fas fa-heart fa-2x"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3 text-white">Gather Charity</h5>
                    <p class="text-white-50 mb-3">
                      Organisation à but non lucratif fondée par un ancien étudiant
                      de l'Université Laval, spécialisée dans les projets d'accès à l'eau
                      potable au Cameroun.
                    </p>
                    <p class="text-white-50 mb-0">
                      <strong class="text-white">Collaboration :</strong> Projet Puits Cameroun 2024<br>
                      <strong class="text-white">Statut :</strong> Partenaire actif
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body p-4">
                <div class="d-flex align-items-start">
                  <div class="me-4">
                    <div class="bg-success text-white rounded-circle p-3">
                      <i class="fas fa-graduation-cap fa-2x"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-3 text-white">Écoles partenaires</h5>
                    <p class="text-white-50 mb-3">
                      Écoles et institutions éducatives dans les pays où nous menons
                      nos projets, assurant la durabilité et l'impact de nos initiatives.
                    </p>
                    <p class="text-white-50 mb-0">
                      <strong class="text-white">Collaborations :</strong> Projet Madagascar (école 125 élèves)<br>
                      <strong class="text-white">Statut :</strong> En développement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Devenir partenaire -->
    <section class="py-5 become-partner">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4 text-white">Devenir partenaire</h2>
            <p class="lead mb-4 text-white-50">
              Vous êtes une organisation qui partage nos valeurs ?
              Rejoignez notre réseau de partenaires et contribuez à notre mission !
            </p>
            <p class="mb-4 text-white-50">
              Nous recherchons des partenariats dans divers domaines :
              financement, expertise technique, logistique, et bien plus encore.
            </p>
            <div class="d-flex gap-3 justify-content-center flex-wrap">
              <router-link to="/nous-joindre" class="btn btn-light btn-lg">
                <i class="fas fa-envelope me-2"></i>
                Nous contacter
              </router-link>
              <router-link to="/devenir-membre" class="btn btn-outline-light btn-lg">
                <i class="fas fa-users me-2"></i>
                Rejoindre ISF
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Témoignages supprimés -->
  </div>
</template>

<script>
export default {
  name: "Partenaires",
};
</script>

<style scoped>
/* Global dark */
.partenaires {
  background: #000;
  color: #fff;
}

/* Hero avec background vachon.jpg */
.hero-section {
  position: relative;
  padding-top: 80px;
  background: url("/vachon.jpg") center / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65); /* overlay sombre */
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.min-vh-75 {
  min-height: 60vh;
}

/* Dark sections */
.section-dark {
  background: #000;
}

/* Dark card */
.card-dark {
  background: #0b0b0b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

/* Partners big scroll stack */
.partners-stack {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.partner-big {
  overflow: hidden;
}

.partner-media {
  height: 320px; /* grande zone image */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #050505;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.partner-img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* logo bien visible */
  padding: 28px;
}

.partner-content {
  padding: 22px 22px 24px;
}

.partner-title {
  font-weight: 900;
  margin: 0 0 10px;
  color: #fff;
}

.partner-text {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
}

/* Placeholder */
.partner-placeholder {
  background: radial-gradient(circle at 30% 20%, rgba(249, 115, 22, 0.25), transparent 55%),
              #050505;
}
.placeholder-inner {
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
}

/* Become partner section */
.become-partner {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.30) 0%, rgba(0, 0, 0, 1) 55%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }

  .display-4 {
    font-size: 2rem;
  }

  .partner-media {
    height: 240px;
  }

  .partner-img {
    padding: 18px;
  }
}
</style>
