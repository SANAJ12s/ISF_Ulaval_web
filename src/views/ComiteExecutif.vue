<template>
  <main class="exec-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-9 mx-auto text-center">
            <div class="hero-pill">
              <i class="fas fa-users me-2"></i>
              Comité exécutif
            </div>

            <h1 class="display-4 fw-bold mb-3 text-white">Notre équipe</h1>

            <p class="lead text-white-50 mb-0">
              Clique sur un membre pour voir sa fiche complète.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- GRID -->
    <section class="py-5 section-dark">
      <div class="container exec-container">
        <div class="row mb-4">
          <div class="col-lg-10 mx-auto">
            <div class="intro card-dark">
              <div class="intro-left">
                <h2 class="h4 fw-bold text-white mb-2">Comité 2025–2026</h2>
                <p class="text-white-50 mb-0">
                  Cliquez sur une carte : photo en plein écran + infos à droite.
                </p>
              </div>

              <div class="intro-right">
                <div class="stat">
                  <div class="stat-value">{{ members.length }}</div>
                  <div class="stat-label">Membres</div>
                </div>
                <div class="stat">
                  <div class="stat-value">ISF</div>
                  <div class="stat-label">ULaval</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ 2 par ligne + scroll -->
        <div class="exec-grid">
          <article
            v-for="(m, idx) in members"
            :key="m.id"
            class="exec-card card-dark"
            role="button"
            tabindex="0"
            @click="openMember(idx)"
            @keydown.enter.prevent="openMember(idx)"
            @keydown.space.prevent="openMember(idx)"
          >
            <div class="media">
              <img :src="m.photo" :alt="`Photo de ${m.role}`" class="photo" />
              <div class="role-badge">
                <i class="fas fa-bolt me-2"></i>
                {{ m.role }}
              </div>
            </div>

            <div class="content">
              <h3 class="name">
                {{ m.name }}
              </h3>

              <p class="desc mb-0">
                {{ m.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-5 cta">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 mx-auto text-center">
            <h2 class="display-6 fw-bold text-white mb-3">Envie de t’impliquer ?</h2>
            <p class="lead text-white-50 mb-4">
              Rejoins ISF Université Laval et participe à des projets et activités qui font une vraie différence.
            </p>
            <div class="d-flex gap-3 justify-content-center flex-wrap">
              <router-link to="/devenir-membre" class="btn btn-light btn-lg">
                <i class="fas fa-users me-2"></i> Deviens membre
              </router-link>
              <router-link to="/nous-joindre" class="btn btn-outline-light btn-lg">
                <i class="fas fa-envelope me-2"></i> Nous contacter
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bottom-glow"></div>

    <!-- MODAL (photo + infos + flèches) -->
    <div v-if="isOpen" class="overlay" @click.self="closeMember">
      <div class="modal-shell" :class="{ open: isOpen }" role="dialog" aria-modal="true">
        <!-- Header modal -->
        <div class="modal-top">
          <div class="modal-title">
            <span class="pill">
              <i class="fas fa-id-badge me-2"></i>
              Profil membre
            </span>
          </div>

          <button class="icon-btn" @click="closeMember" aria-label="Fermer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Body modal -->
        <div class="modal-body">
          <!-- Photo left -->
          <div class="modal-photo">
            <img
              :src="active.photo"
              :alt="`Photo de ${active.role}`"
              class="modal-photo-img"
            />

            <button class="nav-btn prev" @click="prevMember" aria-label="Précédent">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn next" @click="nextMember" aria-label="Suivant">
              <i class="fas fa-chevron-right"></i>
            </button>

            <div class="modal-photo-badge">
              <i class="fas fa-bolt me-2"></i>{{ active.role }}
            </div>
          </div>

          <!-- Infos right -->
          <aside class="modal-info">
            <h2 class="info-name">{{ active.name }}</h2>

            <p class="info-desc">{{ active.description }}</p>

            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">
                  <i class="fas fa-graduation-cap me-2"></i> Programme
                </div>
                <div class="info-value">{{ active.programme || "—" }}</div>
              </div>

              <div class="info-card">
                <div class="info-label">
                  <i class="fas fa-calendar-alt me-2"></i> Année
                </div>
                <div class="info-value">{{ active.annee || "—" }}</div>
              </div>

              <div class="info-card wide">
                <div class="info-label">
                  <i class="fas fa-star me-2"></i> Fun fact
                </div>
                <div class="info-value muted" style="line-height: 1.7;">
                  {{ active.funFact || "—" }}
                </div>
              </div>

              <div class="info-card wide" v-if="active.bio">
                <div class="info-label">
                  <i class="fas fa-quote-left me-2"></i> À propos
                </div>
                <div class="info-value muted" style="line-height: 1.7;">
                  {{ active.bio }}
                </div>
              </div>
            </div>

            <div class="actions">
              <a
                v-if="active.email"
                class="btn btn-outline-light"
                :href="`mailto:${active.email}`"
              >
                <i class="fas fa-envelope me-2"></i> Envoyer un courriel
              </a>

              <a
                v-if="active.linkedin"
                class="btn btn-warning"
                :href="active.linkedin"
                target="_blank"
                rel="noopener"
              >
                <i class="fab fa-linkedin-in me-2"></i> LinkedIn
              </a>
            </div>

            <p class="hint">
              Astuce : flèches ◀ ▶, ESC pour fermer.
            </p>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "ComiteExecutif",
  data() {
    return {
      isOpen: false,
      activeIndex: 0,

      // ✅ Données hardcodées (TES infos + TES images locales)
      members: [
        {
          id: "presidente",
          name: "Soraya Toutlaye Tifenn Faulet",
          role: "Présidente",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Mécanique",
          annee: "2025–2026",
          funFact: "Adore le chocolat !",
          bio: "",
          photo: "/executif/Presidente.jpg",
          description:
            "Représente officiellement l’association, coordonne l’exécutif et assure le suivi des décisions et des activités.",
        },
        {
          id: "vp-executive",
          name: "Nelly Njakou Tchaptchet",
          role: "VP Exécutive",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Industriel",
          annee: "2025–2026",
          funFact: "Toujours partante pour apprendre… et pour rire🤣",
          bio: "",
          photo: "/executif/Vp_Executive.jpg",
          description:
            "Soutient la présidence, assure le bon fonctionnement du comité et la tenue des procès-verbaux (PV).",
        },
        {
          id: "vp-tresorerie",
          name: "Marietou Gning",
          role: "VP Trésorerie",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Civil",
          annee: "2025–2026",
          funFact: "J’aime le chocolat🥹",
          bio: "",
          photo: "/executif/Vp_Tresorerie.jpg",
          description:
            "Gère les finances, le budget et les transactions; assure le suivi des dépenses et des remboursements.",
        },
        {
          id: "vp-interne",
          name: "Gaoussou Modibo Keita",
          role: "VP Interne",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Industriel",
          annee: "2025–2026",
          funFact: "Je suis un grand aventurier !",
          bio: "",
          photo: "/executif/Vp_Interne.jpg",
          description:
            "Assure la cohésion du groupe et la communication interne; accueille les nouveaux membres et anime la vie associative.",
        },
        {
          id: "vp-communications",
          name: "Omar Diaw",
          role: "VP Communications",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Mécanique",
          annee: "2025–2026",
          funFact: "Très bon gamer.",
          bio: "",
          photo: "/executif/Vp_Communication.jpg",
          description:
            "Gère l’image et les réseaux sociaux; diffuse les informations importantes et maintient une cohérence visuelle.",
        },
        {
          id: "vp-projet-d-ingenierie",
          name: "Noa Tantely Rajaona",
          role: "Vp Projet d’ingénierie",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Industriel",
          annee: "2025–2026",
          funFact: "j'ai joué du violoncelle pendant toute mon enfance et adolescence / j'ai appris à faire de l'escrime suite à cause des JO",
          bio: "",
          photo: "/executif/vp_projet.jpg",
          description:
            "",
        },
        {
          id: "assistante-projet-dingenierie",
          name: "Sarah Martin",
          role: "Assistante Projet d’ingénierie",
          email: "",
          linkedin: "",
          programme: "Diplômée en Génie Agroenvironnemental",
          annee: "2025–2026",
          funFact: "J’ai fais une session d’échange puis je suis revenue !",
          bio: "",
          photo: "/executif/AssistanteProjetIng.png",
          description:
            "",
        },
        {
          id: "vp-evenementiel",
          name: "Manuela Thérèse Karelle Ngongo Kengne",
          role: "VP Événementiel",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Alimentaire",
          annee: "2025–2026",
          funFact:
            "Je suis passionnée de cheveux afro et de coiffures africaines.J'en fais sur moi même et sur mes proches",
          bio: "",
          photo: "/executif/Vp_Evenementiel.jpg",
          description:
            "Planifie et coordonne les événements et activités de financement; supervise la logistique et les bénévoles.",
        },
        {
          id: "vp-externe",
          name: "Cédric Christ Roi Gangoue Gambou",
          role: "VP Externe",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Industriel",
          annee: "2025–2026",
          funFact: "J’ai hâte d’avoir mon premier million de dollars 💸",
          bio: "",
          photo: "/executif/Vp_Externe.jpg",
          description:
            "Développe les relations externes et partenariats; coordonne les activités d’implication et de sensibilisation.",
        },
        {
          id: "assistante-externe",
          name: "Rougui Diop",
          role: "Assistante — Affaires externes",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Alimentaire",
          annee: "2025–2026",
          funFact: "Étudiante en ingénierie mais chroniqueuse anonyme à ses heures perdues 🤭",
          bio: "",
          photo: "/executif/Assistante_Externe.jpg",
          description:
            "Appuie la VP Externe dans l’organisation des initiatives et le suivi des partenaires et activités.",
        },
        {
          id: "vp-leadership",
          name: "Zeinabou Sissoko",
          role: "VP Leadership",
          email: "",
          linkedin: "",
          programme: "Baccalauréat",
          annee: "2025–2026",
          funFact: "J’aime prendre des photos.",
          bio: "",
          photo: "/executif/Vp_Leadership.jpg",
          description:
            "Organise des ateliers et activités de formation; développe les compétences et la conscientisation des membres.",
        },
        {
          id: "assistant-leadership",
          name: "David Mathieu Touelli Ndoumbe",
          role: "Assistant — Leadership",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Mécanique",
          annee: "2025–2026",
          funFact: "Très bon cuisinier.",
          bio: "",
          photo: "/executif/Assistant_Leadership.jpg",
          description:
            "Appuie la VP Leadership dans la préparation et l’animation d’activités de formation et de sensibilisation.",
        },
        {
          id: "sage-1",
          name: "Yeva Côté-Paradis",
          role: "Sage",
          email: "",
          linkedin: "",
          programme: "Baccalauréat Génie Industriel",
          annee: "2025–2026",
          funFact: "Aime le rose gold — boss girl ✨",
          bio: "",
          photo: "/executif/Sage1.png",
          description:
            "Rôle conseil : appuie l’exécutif dans la vision, la structure et la prise de décision.",
        },
        {
          id: "sage-2",
          name: "Benjamin Méthot",
          role: "Sage",
          email: "",
          linkedin: "",
          programme: "Chercheur en génie électrique",
          annee: "2025–2026",
          funFact: "Adore aller en Égypte.",
          bio: "",
          photo: "/executif/Sage2.png",
          description:
            "Rôle conseil : partage d’expérience, soutien et accompagnement pour la continuité de l’association.",
        },
        // Si tu veux utiliser aussi ces 2 images (optionnel):
        // { id:"assistant-leadership-2", name:"...", role:"Assistant Leadership", photo:"/executif/Assistant_Leadership.jpg", ... }
        // { id:"assistante-projet-ing", name:"Sarah Martin", role:"Assistante Projet d’ingénierie", photo:"/executif/AssistanteProjetIng.png", ... }
      ],
    };
  },

  computed: {
    active() {
      return this.members[this.activeIndex] || {};
    },
  },

  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
    document.body.style.overflow = "auto";
  },

  methods: {
    openMember(idx) {
      this.activeIndex = idx;
      this.isOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeMember() {
      this.isOpen = false;
      document.body.style.overflow = "auto";
    },
    nextMember() {
      this.activeIndex = (this.activeIndex + 1) % this.members.length;
    },
    prevMember() {
      this.activeIndex = (this.activeIndex - 1 + this.members.length) % this.members.length;
    },
    onKeydown(e) {
      if (!this.isOpen) return;
      if (e.key === "Escape") this.closeMember();
      if (e.key === "ArrowRight") this.nextMember();
      if (e.key === "ArrowLeft") this.prevMember();
    },
  },
};
</script>

<style scoped>
.exec-page { background:#000; color:#fff; min-height:100vh; }

/* HERO */
.hero{
  position:relative;
  padding-top:80px;
  background:
    radial-gradient(circle at 18% 20%, rgba(249,115,22,0.28), transparent 48%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 42%),
    #000;
}
.hero-overlay{ position:absolute; inset:0; background:rgba(0,0,0,0.35); }
.hero-inner{ position:relative; z-index:1; }
.min-vh-75{ min-height:60vh; }

.hero-pill{
  display:inline-flex; align-items:center; gap:10px;
  padding:10px 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.12);
  color:rgba(255,255,255,0.90);
  margin-bottom:14px;
}

/* SECTION */
.section-dark{ background:#000; }
.exec-container{ max-width:1180px; }

/* INTRO */
.intro{
  padding:18px 20px;
  display:flex; justify-content:space-between; align-items:center;
  gap:16px; flex-wrap:wrap;
}
.intro-left{ max-width:720px; }
.intro-right{ display:flex; gap:10px; }
.stat{
  min-width:110px;
  padding:10px 12px;
  border-radius:14px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.10);
  text-align:center;
}
.stat-value{ font-weight:900; font-size:1.1rem; color:#fff; }
.stat-label{ font-size:.85rem; color:rgba(255,255,255,0.55); }

/* CARDS */
.card-dark{
  background:#0b0b0b;
  border:1px solid rgba(255,255,255,0.08);
  border-radius:18px;
  box-shadow:0 14px 40px rgba(0,0,0,0.35);
}

/* ✅ 2 par ligne */
.exec-grid{
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap:18px;
  padding-top:10px;
}

.exec-card{
  overflow:hidden;
  cursor:pointer;
  transition: transform .2s ease, border-color .2s ease;
  outline:none;
}
.exec-card:hover,
.exec-card:focus{
  transform: translateY(-4px);
  border-color: rgba(249,115,22,0.40);
}

/* ✅ photos plus grandes */
.media{
  position:relative;
  height: 440px;
  background:#050505;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.photo{
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  transform: scale(1.01);
}

.role-badge{
  position:absolute;
  left:14px; bottom:14px;
  padding:10px 12px;
  border-radius:999px;
  background: rgba(0,0,0,0.55);
  border:1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(6px);
  color: rgba(255,255,255,0.92);
  font-weight:800;
}

.content{ padding:16px 16px 18px; }
.name{ margin:0 0 10px; font-weight:900; font-size:1.1rem; color:#fff; }
.desc{ margin:0; color: rgba(255,255,255,0.70); line-height:1.7; }

/* CTA */
.cta{
  background: linear-gradient(135deg, rgba(249,115,22,0.30) 0%, rgba(0,0,0,1) 60%);
  border-top:1px solid rgba(255,255,255,0.08);
}
.bottom-glow{
  height:10px;
  width:100%;
  background: linear-gradient(90deg, rgba(249,115,22,0.0), rgba(249,115,22,0.9), rgba(249,115,22,0.0));
}

/* MODAL OVERLAY */
.overlay{
  position:fixed;
  inset:0;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
}

/* MODAL SHELL */
.modal-shell{
  width: min(1200px, 100%);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(11,11,11,0.92);
  box-shadow: 0 25px 70px rgba(0,0,0,0.60);
  overflow:hidden;
  transform: translateY(10px) scale(0.96);
  opacity: 0;
  transition: transform .22s ease, opacity .22s ease;
}
.modal-shell.open{
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* top bar */
.modal-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 14px 14px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.pill{
  display:inline-flex; align-items:center;
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.88);
  font-weight: 800;
}
.icon-btn{
  width: 42px; height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color:#fff;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
}
.icon-btn:hover{
  border-color: rgba(249,115,22,0.45);
}

/* body layout */
.modal-body{
  display:grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 0;
  min-height: 620px;
}

/* photo area */
.modal-photo{
  position:relative;
  background:#050505;
  border-right: 1px solid rgba(255,255,255,0.08);
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
}
.modal-photo-img{
  width:100%;
  height:100%;
  object-fit: cover;
  animation: popForward .22s ease;
}
@keyframes popForward{
  from { transform: scale(0.96); filter: blur(2px); opacity: 0.7; }
  to   { transform: scale(1); filter: blur(0); opacity: 1; }
}

.modal-photo-badge{
  position:absolute;
  left: 14px;
  bottom: 14px;
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(0,0,0,0.55);
  border:1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(6px);
  color: rgba(255,255,255,0.92);
  font-weight: 800;
}

/* nav buttons */
.nav-btn{
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.45);
  color: #fff;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
}
.nav-btn:hover{
  border-color: rgba(249,115,22,0.45);
}
.nav-btn.prev{ left: 14px; }
.nav-btn.next{ right: 14px; }

/* right info */
.modal-info{
  padding: 18px 18px 16px;
  display:flex;
  flex-direction:column;
}
.info-name{
  margin: 4px 0 10px;
  font-weight: 900;
  color:#fff;
}
.info-desc{
  color: rgba(255,255,255,0.75);
  line-height:1.7;
  margin: 0 0 14px;
}
.info-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.info-card{
  padding: 12px 12px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
}
.info-card.wide{ grid-column: 1 / -1; }
.info-label{
  font-weight: 800;
  color: rgba(255,255,255,0.85);
  margin-bottom: 6px;
  font-size: .95rem;
}
.info-value{
  color: rgba(255,255,255,0.72);
  font-weight: 700;
}
.muted{ color: rgba(255,255,255,0.55); }

/* actions */
.actions{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}
.hint{
  margin-top: auto;
  margin-bottom: 0;
  color: rgba(255,255,255,0.45);
  font-size: .9rem;
  padding-top: 12px;
}

/* Responsive */
@media (max-width: 992px){
  .hero{ padding-top:60px; }
  .exec-grid{ grid-template-columns: 1fr; }
  .media{ height: 380px; }
  .modal-body{ grid-template-columns: 1fr; min-height: auto; }
  .modal-photo{ height: 380px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
}
@media (max-width: 576px){
  .media{ height: 330px; }
  .modal-photo{ height: 300px; }
}
</style>
