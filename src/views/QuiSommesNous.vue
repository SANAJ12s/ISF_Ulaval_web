<template>
  <div class="about-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="container hero-inner">
        <div class="row align-items-center min-vh-60 py-5">
          <div class="col-lg-7">
            <div class="kicker">À propos</div>
            <h1 class="display-4 fw-bold mb-3 text-white">Qui sommes-nous ?</h1>
            <p class="lead text-white-50 mb-4">
              Découvrez l’histoire, la mission et la vision d’ISF Université Laval — une
              communauté étudiante engagée pour une ingénierie humaine et responsable.
            </p>

            <div class="d-flex gap-3 flex-wrap">
              <router-link to="/devenir-membre" class="btn btn-orange btn-lg">
                Rejoindre ISF
              </router-link>
              <router-link to="/comite-executif" class="btn btn-outline-light btn-lg">
                Notre équipe
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HISTOIRE -->
    <section class="section-dark py-5">
      <div class="container">
        <div class="section-head text-center mb-5">
          <h2 class="display-5 fw-bold text-white mb-3">Notre histoire</h2>
          <p class="lead text-white-50 mb-0">
            ISF–Université Laval fait partie du réseau Ingénieurs sans frontières Canada.
          </p>
        </div>

        <div class="row g-4 align-items-stretch">
          <div class="col-lg-7">
            <div class="card-dark h-100">
              <div class="card-body p-4 p-lg-5">
                <div class="card-kicker">
                  <i class="fas fa-book-open me-2"></i> Depuis nos débuts
                </div>

                <p class="lead text-white mb-3">
                  La section Ingénieurs sans frontières – Université Laval a été crée en 2004 et fait partie du 
                  réseau de Ingénieurs sans frontières Canada. Elle rassemble aujourd’hui une communauté
                  dynamique et engagée de plus de 90 membres.
                </p>

                <p class="text-white-50 mb-0" style="line-height: 1.85;">
                  Ouverte à toutes les étudiantes et tous les étudiants — de tous les cycles et programmes,
                  incluant les cycles supérieurs — notre section est un espace inclusif où chacun peut
                  s’impliquer à sa façon et selon ses intérêts.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="card-dark h-100 card-glow">
              <div class="card-body p-4 p-lg-5">
                <div class="stats-grid">
                  <div class="stat-box">
                    <div class="stat-box-num">90+</div>
                    <div class="stat-box-label">Membres actifs</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-box-num">3+</div>
                    <div class="stat-box-label">Projets / initiatives</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-box-num">∞</div>
                    <div class="stat-box-label">Opportunités d’implication</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-box-num">ULaval</div>
                    <div class="stat-box-label">Ancrage local</div>
                  </div>
                </div>

                <div class="tip mt-4">
                  <i class="fas fa-info-circle me-2"></i>
                  Tu peux participer ponctuellement ou t’impliquer à long terme.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISSION & VISION -->
    <section class="section-dark py-5">
      <div class="container">
        <div class="section-head text-center mb-5">
          <h2 class="display-5 fw-bold text-white mb-3">Mission & vision</h2>
          <p class="lead text-white-50 mb-0">
            Ce qui nous guide et ce qu’on veut construire.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-lg-6">
            <div class="card-dark h-100">
              <div class="card-body p-4 p-lg-5">
                <div class="title-row">
                  <div class="icon-circle orange">
                    <i class="fas fa-bullseye"></i>
                  </div>
                  <h3 class="fw-bold text-white mb-0">Notre mission</h3>
                </div>

                <p class="lead text-white mt-4">
                  Sensibiliser et mobiliser la communauté étudiante autour des enjeux sociaux,
                  environnementaux et éthiques liés à l’ingénierie et au développement international.
                </p>

                <p class="text-white-50 mb-0" style="line-height: 1.85;">
                  À travers des conférences, des activités de sensibilisation, des événements et des
                  initiatives concrètes, nous cherchons à créer un impact positif et durable, ici comme ailleurs.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card-dark h-100 card-glow">
              <div class="card-body p-4 p-lg-5">
                <div class="title-row">
                  <div class="icon-circle green">
                    <i class="fas fa-eye"></i>
                  </div>
                  <h3 class="fw-bold text-white mb-0">Notre vision</h3>
                </div>

                <p class="lead text-white mt-4">
                  Une <strong>ingénierie humaine, responsable et engagée</strong>.
                </p>

                <p class="text-white-50 mb-0" style="line-height: 1.85;">
                  Contribuer à former des personnes conscientes des impacts de leurs actions, et désireuses
                  de mettre leurs compétences au service d’un avenir plus juste, solidaire et durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALEURS -->
    <section class="section-dark py-5">
      <div class="container">
        <div class="section-head text-center mb-5">
          <h2 class="display-5 fw-bold text-white mb-3">Nos valeurs</h2>
          <p class="lead text-white-50 mb-0">
            Les principes qui guident notre action quotidienne.
          </p>
        </div>

        <div class="row g-4">
          <div v-for="v in values" :key="v.title" class="col-lg-4 col-md-6">
            <div class="value-card h-100">
              <div class="value-icon" :class="v.accent">
                <i :class="v.icon"></i>
              </div>
              <h5 class="fw-bold text-white mb-2">{{ v.title }}</h5>
              <p class="text-white-50 mb-0">
                {{ v.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta">
      <div class="container">
        <div class="cta-card">
          <div class="cta-left">
            <h2 class="fw-bold mb-2">Tu as ta place parmi nous !</h2>
            <p class="mb-0">
              Curieux·se ou prêt·e à t’impliquer, on t’attend pour construire un avenir plus juste.
            </p>
          </div>

          <div class="cta-right">
            <router-link to="/devenir-membre" class="btn btn-orange btn-lg">
              Devenir membre
            </router-link>
            <router-link to="/activites" class="btn btn-outline-light btn-lg">
              Voir nos activités
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "QuiSommesNous",
  data() {
    return {
      values: [
        {
          title: "Solidarité",
          icon: "fas fa-heart",
          accent: "red",
          text: "On avance ensemble, avec entraide et coopération, pour avoir plus d’impact.",
        },
        {
          title: "Durabilité",
          icon: "fas fa-leaf",
          accent: "green",
          text: "On privilégie des solutions responsables, respectueuses de l’environnement et utiles à long terme.",
        },
        {
          title: "Responsabilité",
          icon: "fas fa-globe",
          accent: "blue",
          text: "On agit avec éthique, transparence et sens du devoir, dans chaque projet et décision.",
        },
        {
          title: "Inclusion",
          icon: "fas fa-users",
          accent: "cyan",
          text: "Tous les profils sont bienvenus : diversité, respect et ouverture font partie de notre ADN.",
        },
        {
          title: "Innovation",
          icon: "fas fa-lightbulb",
          accent: "yellow",
          text: "On cherche des idées créatives et concrètes pour répondre aux défis du monde réel.",
        },
        {
          title: "Engagement",
          icon: "fas fa-graduation-cap",
          accent: "purple",
          text: "On s’implique pour vrai — chacun à son rythme — et on transforme l’énergie en action.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-page {
  background: #000;
  color: #fff;
}

/* HERO */
.hero {
  position: relative;
  padding-top: 80px;
  background:
    radial-gradient(circle at 18% 12%, rgba(249,115,22,0.22), transparent 48%),
    radial-gradient(circle at 82% 30%, rgba(255,255,255,0.08), transparent 40%),
    url("/ulaval.jpg");
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
}
.hero-inner { position: relative; z-index: 1; }
.min-vh-60 { min-height: 60vh; }

.kicker {
  display: inline-block;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.65);
  margin-bottom: 10px;
}

/* Buttons */
.btn-orange {
  background: #f97316;
  border: 2px solid #f97316;
  color: #000;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 20px;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn-orange:hover {
  transform: translateY(-2px);
  background: #ff8a3d;
  border-color: #ff8a3d;
  box-shadow: 0 0 22px rgba(249,115,22,0.55);
  color: #000;
}

/* Hero card */
.hero-card {
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,10,10,0.65);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 60px rgba(0,0,0,0.45);
  overflow: hidden;
}
.hero-card-top {
  display: flex;
  gap: 10px;
  padding: 14px 14px 0;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
  font-weight: 800;
  font-size: 0.92rem;
}
.hero-badge.alt {
  border-color: rgba(249,115,22,0.35);
  background: rgba(249,115,22,0.12);
}
.hero-card-body { padding: 18px 18px 18px; }

.hero-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  background: radial-gradient(circle at 30% 20%, rgba(249,115,22,0.35), transparent 60%),
              rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
}
.hero-icon i { font-size: 1.6rem; color: #fff; }

.hero-card-title {
  font-weight: 900;
  font-size: 1.35rem;
  color: #fff;
  letter-spacing: -0.02em;
}
.hero-card-sub { color: rgba(255,255,255,0.7); margin-top: 4px; }

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
}
.stat {
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 12px 10px;
  text-align: center;
}
.stat-num { font-weight: 900; font-size: 1.25rem; color: #fff; }
.stat-label { color: rgba(255,255,255,0.65); font-weight: 700; font-size: 0.85rem; margin-top: 2px; }

.hero-mini {
  margin-top: 14px;
  border-radius: 14px;
  border: 1px solid rgba(249,115,22,0.22);
  background: rgba(249,115,22,0.10);
  padding: 10px 12px;
  color: rgba(255,255,255,0.85);
  font-weight: 700;
}

/* Sections */
.section-dark { background: #000; }
.section-head { max-width: 900px; margin: 0 auto; }

/* Cards */
.card-dark {
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
  transition: transform 0.18s ease, box-shadow 0.2s ease;
}
.card-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 55px rgba(0,0,0,0.45);
}
.card-glow {
  background:
    radial-gradient(circle at 20% 10%, rgba(249,115,22,0.12), transparent 55%),
    #0b0b0b;
}

.card-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.stat-box {
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  padding: 16px 14px;
}
.stat-box-num {
  font-weight: 900;
  font-size: 1.35rem;
  color: #fff;
}
.stat-box-label {
  margin-top: 4px;
  color: rgba(255,255,255,0.65);
  font-weight: 700;
  font-size: 0.95rem;
}

.tip {
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  padding: 12px 12px;
  color: rgba(255,255,255,0.78);
  font-weight: 700;
}

/* Mission/Vision title row */
.title-row { display: flex; align-items: center; gap: 12px; }
.icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}
.icon-circle i { color: #fff; font-size: 1.25rem; }
.icon-circle.orange { background: rgba(249,115,22,0.14); border-color: rgba(249,115,22,0.28); }
.icon-circle.green  { background: rgba(16,185,129,0.14); border-color: rgba(16,185,129,0.28); }

/* Values cards */
.value-card {
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 18px 18px 18px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
  transition: transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.value-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 55px rgba(0,0,0,0.45);
  border-color: rgba(249,115,22,0.28);
}
.value-icon {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}
.value-icon i { font-size: 1.35rem; color: #fff; }

.value-icon.red    { background: rgba(239,68,68,0.14); border-color: rgba(239,68,68,0.28); }
.value-icon.green  { background: rgba(16,185,129,0.14); border-color: rgba(16,185,129,0.28); }
.value-icon.blue   { background: rgba(59,130,246,0.14); border-color: rgba(59,130,246,0.28); }
.value-icon.cyan   { background: rgba(34,211,238,0.14); border-color: rgba(34,211,238,0.28); }
.value-icon.yellow { background: rgba(245,158,11,0.14); border-color: rgba(245,158,11,0.28); }
.value-icon.purple { background: rgba(139,92,246,0.14); border-color: rgba(139,92,246,0.28); }

/* CTA */
.cta {
  background:
    radial-gradient(circle at 18% 20%, rgba(249,115,22,0.20), transparent 55%),
    #000;
  padding: 56px 0;
}
.cta-card {
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,10,10,0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 60px rgba(0,0,0,0.45);
  padding: 22px;
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cta-left {
  max-width: 720px;
}
.cta-left h2 { color: #fff; }
.cta-left p { color: rgba(255,255,255,0.75); }
.cta-right { display: flex; gap: 12px; flex-wrap: wrap; }

/* Responsive */
@media (max-width: 768px) {
  .hero { padding-top: 60px; }
  .display-4 { font-size: 2rem; }
  .hero-stats { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
}
</style>
