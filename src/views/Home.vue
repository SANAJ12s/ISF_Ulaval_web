<template>
  <div class="home">

    <!-- HERO : image ULaval + logo -->
    <section class="hero">
      <img src="/logo.png" alt="Logo ISF Ulaval" class="hero-logo" />
    </section>

    <!-- TEXTE SOUS LE BANNER -->
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
              <a href="#deviens-membre" class="btn btn-custom-primary btn-lg">
                Rejoins-nous !
              </a>

              <router-link to="/nos-projets" class="btn btn-custom-outline btn-lg">
                Nos projets
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ÉVÉNEMENTS -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">Événements à venir</h2>
          <p class="lead text-muted">
            Rejoignez nos prochaines activités
          </p>
        </div>
      </div>
    </section>

    <!-- COMITÉ EXÉCUTIF (DISPLAY IDENTIQUE À LA PAGE COMITÉ) -->
    <section class="py-5 exec-home">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">Comité exécutif</h2>
          <p class="lead text-muted">
            Les membres de l’exécutif d’ISF Université Laval
          </p>
        </div>

        <div class="exec-list">
          <article
            v-for="m in execMembers"
            :key="m.role"
            class="member-card"
          >
            <!-- Photo -->
            <div class="member-photo">
              <img :src="m.photo" :alt="`Photo de ${m.name}`" />
            </div>

            <!-- Infos -->
            <div class="member-info">
              <div class="member-top">
                <div>
                  <h3 class="member-name">{{ m.name }}</h3>
                  <p class="member-role">{{ m.role }}</p>
                </div>

                <a
                  class="member-email"
                  :href="`mailto:${m.email}`"
                >
                  {{ m.email }}
                </a>
              </div>

              <p class="member-desc">
                {{ m.description }}
              </p>
            </div>
          </article>
        </div>

        <!-- Lien vers page complète -->
        <div class="text-center mt-4">
          <router-link to="/comite-executif" class="btn btn-custom-outline btn-lg">
            Voir le comité complet
          </router-link>
        </div>
      </div>
    </section>

    <!-- DEVIENS MEMBRE -->
    <section id="deviens-membre" class="py-5">
      <div class="container">
        <div class="text-center">
          <h2 class="display-5 fw-bold mb-3">Deviens membre !</h2>
          <p class="lead mb-4">
            Tous les programmes et tous les cycles sont les bienvenus.
          </p>

          <div class="d-flex justify-content-center gap-3">
            <a class="btn btn-primary btn-lg" href="#">
              Formulaire d’adhésion
            </a>

            <a class="btn btn-outline-dark btn-lg" href="#">
              Merch
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      execMembers: [
        {
          name: "Nom Prénom",
          role: "Présidence",
          email: "presidence@isf-ulaval.com",
          photo: "/executif/Presidente.jpg",
          description:
            "La présidence représente l’association, coordonne les activités et veille au bon fonctionnement de l’équipe exécutive.",
        },
        {
          name: "Nom Prénom",
          role: "Vice-présidence aux communications",
          email: "communications@isf-ulaval.com",
          photo: "/executif/Communications.jpg",
          description:
            "Responsable de la diffusion de l’information, de l’image de l’association et des réseaux sociaux.",
        },
        {
          name: "Nom Prénom",
          role: "Vice-présidence aux finances",
          email: "finances@isf-ulaval.com",
          photo: "/executif/Finances.jpg",
          description:
            "Assure la gestion financière, le suivi budgétaire et la planification des dépenses.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* HERO */
.hero {
  position: relative;
  background-image: url("/ulaval.jpg");
  background-size: cover;
  background-position: center;
  height: 70vh;
}

/* LOGO DANS L'IMAGE */
.hero-logo {
  position: absolute;
  top: 110px;
  left: 24px;
  width: 140px;
}

/* TEXTE SOUS HERO */
.hero-content {
  background: #ffffff;
  color: #111827;
}

/* BOUTONS */
.btn-custom-primary {
  background: #111827;
  color: #ffffff;
  border: none;
}

.btn-custom-primary:hover {
  background: #f97316;
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.6);
}

.btn-custom-outline {
  border: 2px solid #111827;
  color: #111827;
}

.btn-custom-outline:hover {
  border-color: #f97316;
  color: #f97316;
}

/* ============================= */
/* COMITÉ EXÉCUTIF – DISPLAY HOME */
/* ============================= */

.exec-list {
  display: grid;
  gap: 18px;
}

.member-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 18px;
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(17, 24, 39, 0.06);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.member-photo {
  width: 120px;
  height: 120px;
  border-radius: 14px;
  overflow: hidden;
  background: #f3f4f6;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  min-width: 0;
}

.member-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
  color: #111827;
}

.member-role {
  margin-top: 4px;
  font-weight: 800;
  color: #f97316;
}

.member-email {
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  white-space: nowrap;
}

.member-email:hover {
  color: #f97316;
  text-decoration: underline;
}

.member-desc {
  margin-top: 12px;
  color: #374151;
  line-height: 1.75;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .member-card {
    grid-template-columns: 1fr;
  }

  .member-photo {
    width: 150px;
    height: 150px;
  }

  .hero-logo {
    top: 90px;
    width: 110px;
  }

  .member-email {
    white-space: normal;
  }
}
</style>
