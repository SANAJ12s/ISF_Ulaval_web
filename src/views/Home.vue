<template>
  <div class="home">

    <!-- HERO : image midiconf4 (logo déjà dans l’image) -->
    <section class="hero"></section>

    <!-- TEXTE SOUS LE BANNER (fond noir) -->
    <section class="hero-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3">
              ISF – Université Laval
            </h1>

            <p class="lead mb-3">
              Ingénieurs sans frontières Canada – Section Université Laval
            </p>

            <p class="mb-4">
              Une communauté étudiante engagée pour une ingénierie humaine,
              responsable et solidaire.
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

    <!-- IMAGE cover1 (après les 2 boutons) -->
    <section class="midiconf-section">
      <div class="container">
        <img
          src="/cover1.png"
          alt="ISF ULaval cover"
          class="midiconf-img"
        />
      </div>
    </section>

    <!-- BANDES : QUI SOMMES-NOUS -->
    <section class="who-we-are">
      <h2 class="section-title">Qui sommes-nous ?</h2>

      <!-- ORANGE : NOTRE HISTOIRE -->
      <div class="band band-orange">
        <div class="container band-inner">
          <h3>Notre histoire</h3>
          <p>
            La section Ingénieurs sans frontières – Université Laval fait partie du réseau
            Ingénieurs sans frontières Canada. Elle rassemble aujourd’hui une communauté
            dynamique et engagée de plus de 90 membres.
          </p>
          <p>
            Ouverte à toutes les étudiantes et tous les étudiants, de tous les cycles, de tous
            les programmes, incluant les étudiants et étudiantes aux cycles supérieurs, notre
            section est un espace inclusif où chacun peut s’impliquer à sa façon et selon ses intérêts.
          </p>
        </div>
      </div>

      <!-- NOIR : NOTRE MISSION -->
      <div class="band band-black">
        <div class="container band-inner">
          <h3>Notre mission</h3>
          <p>
            Notre mission est de sensibiliser et mobiliser la communauté étudiante autour des enjeux
            sociaux, environnementaux et éthiques liés à l’ingénierie et au développement international.
          </p>
          <p>
            Par le biais de conférences, d’activités de sensibilisation, d’événements et d’initiatives
            concrètes, nous cherchons à créer un impact positif et durable, ici comme ailleurs.
          </p>
        </div>
      </div>

      <!-- ORANGE : NOTRE VISION -->
      <div class="band band-orange">
        <div class="container band-inner">
          <h3>Notre vision</h3>
          <p>
            Nous croyons en une ingénierie humaine, responsable et engagée. Notre vision est de contribuer
            à la formation de personnes conscientes des impacts de leurs actions et désireuses de mettre
            leurs compétences au service d’un avenir plus juste, solidaire et durable.
          </p>
          <p>
            Que tu sois simplement curieux·se ou prêt·e à t’impliquer activement,
            tu as ta place parmi nous.
          </p>
        </div>
      </div>
    </section>

    <!-- ÉVÉNEMENTS À VENIR (ajoutée, fond noir) -->
    <section class="py-5 events-home">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-white">Événements à venir</h2>
          <p class="lead text-white-50">
            On ajoutera bientôt les prochains événements (et plus tard on rendra ça dynamique).
          </p>
        </div>

        <div class="events-placeholder">
          <p class="mb-0 text-white-50">
            ✨ Des événements seront affichés ici prochainement.
          </p>
        </div>
      </div>
    </section>

    <!-- COMITÉ EXÉCUTIF -->
    <section class="py-5 exec-home">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="display-5 fw-bold text-white">Comité exécutif</h2>
          <p class="lead text-white-50 mb-0">
            Découvre l’équipe qui coordonne ISF – Université Laval.
          </p>
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
          <p class="lead mb-4 text-white-50">
            Tous les programmes et tous les cycles sont les bienvenus.
          </p>

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
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  background: #000;
  color: #fff;
}

/* HERO (BACKGROUND midiconf4) */
.hero {
  position: relative;
  background-image: url("/activites/midiconf4.png");
  background-size: cover;
  background-position: center;
  height: 70vh;
}

/* TEXTE SOUS HERO -> noir */
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

/* QUI SOMMES-NOUS (BANDES) */
.who-we-are {
  background: #000;
  padding-bottom: 0;
}
.section-title {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 900;
  padding: 0 12px 2.5rem;
  margin: 0;
  color: #fff;
}
.band {
  padding: 3.2rem 0;
}
.band-inner {
  max-width: 900px;
}
.band h3 {
  font-size: 1.9rem;
  font-weight: 900;
  margin-bottom: 1rem;
}
.band p {
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 0.9rem;
}
.band-orange {
  background: #f97316;
  color: #000;
}
.band-black {
  background: #000;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* ÉVÉNEMENTS */
.events-home {
  background: #000;
}
.events-placeholder {
  max-width: 900px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 22px;
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
  0% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.0); }
  50% { box-shadow: 0 0 18px rgba(249, 115, 22, 0.55); }
  100% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.0); }
}

/* DEVIENS MEMBRE */
.become-member {
  background: #000;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .band-inner {
    padding: 0 8%;
  }
}
</style>
