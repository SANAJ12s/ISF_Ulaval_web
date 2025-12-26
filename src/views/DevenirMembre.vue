<template>
  <div class="devenir-membre">

    <!-- HERO Section (fond image chalet1) -->
    <section class="hero-section">
      <div class="hero-overlay"></div>

      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4 text-white">Deviens membre !</h1>
            <p class="lead mb-4 text-white-50">
              Rejoins notre communauté d'ingénieurs engagés
            </p>

            <div class="alert custom-alert">
              <h5 class="alert-heading mb-2">
                🚀 Pour devenir membre il te suffit de compléter le sondage ci-dessous !
              </h5>
              <p class="mb-0">
                Nous acceptons tous les programmes, tous les cycles et les étudiants gradués !
              </p>
            </div>

            <!-- CTA Office Form -->
            <div class="d-flex justify-content-center mt-4">
              <a
                href="https://forms.office.com/r/mn5m3N3YJz"
                target="_blank"
                rel="noopener"
                class="btn btn-join btn-lg"
              >
                <i class="fas fa-external-link-alt me-2"></i>
                Accéder au formulaire d’adhésion
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaires (on garde Merch, et adhésion = bouton Office form) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row g-4">

          <!-- Formulaire d'adhésion (externe) -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-header header-orange">
                <h4 class="mb-0">
                  <i class="fas fa-user-plus me-2"></i>
                  Formulaire d'adhésion
                </h4>
              </div>
              <div class="card-body p-4">
                <h5 class="card-title text-white">Devenir membre d'ISF ULaval</h5>
                <p class="card-text text-white-50 mb-4">
                  Le formulaire est externe et s’ouvre dans un nouvel onglet.
                </p>

                <a
                  href="https://forms.office.com/r/mn5m3N3YJz"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-join w-100"
                >
                  <i class="fas fa-paper-plane me-2"></i>
                  Ouvrir le formulaire d’adhésion
                </a>

                <div class="small text-white-50 mt-3">
                  Si tu as un souci avec le formulaire, écris-nous : <span class="text-white">ulaval@chapter.ewb.ca</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire Merch (gardé) -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-header bg-success text-white">
                <h4 class="mb-0">
                  <i class="fas fa-tshirt me-2"></i>
                  Formulaire Merch
                </h4>
              </div>
              <div class="card-body p-4">
                <h5 class="card-title text-white">Pull de membre ISF</h5>
                <p class="card-text text-white-50 mb-4">
                  <strong class="text-white">
                    N'oublie pas de remplir le formulaire de merch pour toi aussi avoir ton pull de membre !
                  </strong>
                </p>

                <div class="alert alert-warning">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  <strong>Important :</strong> Le formulaire merch est externe et s'ouvre dans un nouvel onglet.
                </div>

                <a
                  href="https://forms.gle/AmjDeCcUneTFepcT7"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-success w-100 mb-4"
                >
                  <i class="fas fa-external-link-alt me-2"></i>
                  Accéder au formulaire Merch
                </a>

                <hr class="hr-dark">

                <h6 class="fw-bold mb-3 text-white">Détails du pull</h6>
                <ul class="list-unstyled text-white-50 mb-0">
                  <li class="mb-2">
                    <i class="fas fa-check text-success me-2"></i>
                    Design officiel ISF Université Laval
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-check text-success me-2"></i>
                    Coton premium de haute qualité
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-check text-success me-2"></i>
                    Disponible en plusieurs tailles
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-check text-success me-2"></i>
                    Couleurs : Noir, Blanc, Bleu marine
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Avantages d'être membre (fond noir au lieu de bg-light) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-3 text-white">Pourquoi devenir membre ?</h2>
            <p class="lead text-white-50">
              Les avantages d'être membre d'ISF Université Laval
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-globe-americas fa-3x text-warning"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Avoir un impact réel</h5>
                <p class="text-white-50 mb-0">
                  Contribuer à des initiatives locales ou internationales qui ont un impact concret.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-graduation-cap fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Valoriser son parcours</h5>
                <p class="text-white-50 mb-0">
                  Développer une expérience associative reconnue et enrichissante.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow h-100 card-dark">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-hands-helping fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3 text-white">Participer à des projets</h5>
                <p class="text-white-50 mb-0">
                  S’impliquer dans des projets et activités liés à la solidarité et à l’engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Groupe Facebook Privé (gardé) -->
    <section class="py-5 facebook-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4 text-white">Groupe Facebook Privé</h2>
            <p class="lead mb-4 text-white-50">
              Une fois membre, rejoins notre groupe Facebook privé pour rester
              connecté avec la communauté et ne manquer aucune information !
            </p>
            <a
              href="https://www.facebook.com/groups/534075985970818/"
              target="_blank"
              rel="noopener"
              class="btn btn-light btn-lg"
            >
              <i class="fab fa-facebook me-2"></i>
              Rejoindre le groupe privé
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: "DevenirMembre",
};
</script>

<style scoped>
/* Page dark */
.devenir-membre {
  background: #000;
  color: #fff;
}

/* HERO background chalet1 */
.hero-section {
  position: relative;
  padding-top: 80px;
  background-image: url("/activites/chalet1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.60);
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.min-vh-75 {
  min-height: 60vh;
}

/* Alert custom (lisible sur image) */
.custom-alert {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  padding: 18px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
}

/* Sections dark */
.section-dark {
  background: #000;
}

/* Card dark style */
.card-dark {
  background: #0b0b0b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.hr-dark {
  border-color: rgba(255, 255, 255, 0.12);
}

/* Header orange (adhésion) */
.header-orange {
  background: #f97316;
  color: #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

/* Button orange */
.btn-join {
  background: #f97316;
  border: 2px solid #f97316;
  color: #000;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-join:hover {
  background: #ff8a3d;
  border-color: #ff8a3d;
  transform: translateY(-2px);
  box-shadow: 0 0 22px rgba(249, 115, 22, 0.55);
  color: #000;
}

/* Facebook section (garder le style, mais dark-friendly) */
.facebook-section {
  background: linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(0,0,0,1) 55%);
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

  .custom-alert {
    padding: 14px;
  }
}
</style>
