<template>
  <main class="exec-page">
    <div class="container exec-container">
      <header class="exec-header">
        <h1 class="exec-title">Comité exécutif</h1>
        <p class="exec-subtitle">
          Découvrez les membres de l’exécutif d’ISF Université Laval.
        </p>
      </header>

      <!-- Grid 2 colonnes -->
      <section class="exec-grid">
        <article v-for="m in members" :key="m.id" class="exec-member">
          <div class="photo-wrap">
            <img :src="m.photo" :alt="`Photo de ${m.name}`" class="photo" />
          </div>

          <h2 class="member-name">{{ m.name }}</h2>
          <h3 class="member-role">{{ m.role }}</h3>

          <!-- Email optionnel -->
          <a
            v-if="m.email"
            class="member-email"
            :href="`mailto:${m.email}`"
          >
            {{ m.email }}
          </a>

          <p class="member-desc">
            {{ m.description }}
          </p>
        </article>
      </section>
    </div>

    <!-- bande bordeaux en bas -->
    <div class="bottom-bar"></div>
  </main>
</template>

<script>
export default {
  name: "ComiteExecutif",
  data() {
    return {
      members: [
        {
          id: "presidence",
          name: "Nom à déterminer",
          role: "Présidence",
          email: "",
          photo: "/executif/Presidente.jpg",
          description:
            "Représente officiellement l’association, coordonne l’exécutif et assure le suivi des décisions et des activités.",
        },
        {
          id: "vp-executive",
          name: "Nom à déterminer",
          role: "VP Exécutive",
          email: "",
          photo: "/executif/Vp_Executive.jpg",
          description:
            "Soutient la présidence, assure le bon fonctionnement du comité et la tenue des procès-verbaux (PV).",
        },
        {
          id: "vp-tresorerie",
          name: "Nom à déterminer",
          role: "VP Trésorerie",
          email: "",
          photo: "/executif/Vp_Tresorerie.jpg",
          description:
            "Gère les finances, le budget et les transactions; assure le suivi des dépenses et des remboursements.",
        },
        {
          id: "vp-evenementiel",
          name: "Nom à déterminer",
          role: "VP Événementielles",
          email: "",
          photo: "/executif/Vp_Evenementiel.jpg",
          description:
            "Planifie et coordonne les événements et activités de financement; supervise la logistique et les bénévoles.",
        },
        {
          id: "vp-externe",
          name: "Nom à déterminer",
          role: "VP Externe",
          email: "",
          photo: "/executif/Vp_Externe.jpg",
          description:
            "Développe les relations externes et partenariats; coordonne les activités d’implication et de sensibilisation.",
        },
        {
          id: "vp-interne",
          name: "Nom à déterminer",
          role: "VP Interne",
          email: "",
          photo: "/executif/Vp_Interne.jpg",
          description:
            "Assure la cohésion du groupe et la communication interne; accueille les nouveaux membres et anime la vie associative.",
        },
        {
          id: "vp-communications",
          name: "Nom à déterminer",
          role: "VP Communications",
          email: "",
          photo: "/executif/Vp_Communication.jpg",
          description:
            "Gère l’image et les réseaux sociaux; diffuse les informations importantes et maintient une cohérence visuelle.",
        },
        {
          id: "vp-leadership",
          name: "Nom à déterminer",
          role: "VP Leadership",
          email: "",
          photo: "/executif/Vp_Leadership.jpg",
          description:
            "Organise des ateliers et activités de formation; développe les compétences et la conscientisation des membres.",
        },

        /* Assistants présents dans le dossier executif */
        {
          id: "assistante-externe",
          name: "Nom à déterminer",
          role: "Assistante – Affaires externes",
          email: "",
          photo: "/executif/Assistante_Externe.jpg",
          description:
            "Appuie la VP Externe dans l’organisation des initiatives et le suivi des partenaires et activités.",
        },
        {
          id: "assistant-leadership",
          name: "Nom à déterminer",
          role: "Assistant – Leadership",
          email: "",
          photo: "/executif/Assistant_Leadership.jpg",
          description:
            "Appuie la VP Leadership dans la préparation et l’animation d’activités de formation et de sensibilisation.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Page */
.exec-page {
  background: #fbf7dd; /* beige clair comme l’exemple */
  min-height: 100vh;
  padding-top: 120px; /* si navbar fixed */
}

/* Container un peu plus large */
.exec-container {
  max-width: 1180px;
}

/* Header */
.exec-header {
  text-align: center;
  margin-bottom: 36px;
}

.exec-title {
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: clamp(2.2rem, 3vw, 3rem);
  margin-bottom: 10px;
  color: #3b0a0a;
}

.exec-subtitle {
  color: #1f2937;
  opacity: 0.85;
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Grid 2 colonnes */
.exec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 44px 54px;
  padding-bottom: 44px;
}

/* Carte membre */
.exec-member {
  text-align: center;
}

/* Photo grande */
.photo-wrap {
  background: transparent;
  border: 1px solid rgba(59, 10, 10, 0.18);
  padding: 10px;
}

.photo {
  width: 100%;
  height: 320px;
  object-fit: contain; /* affiche la photo au complet */
  background: #f5f2dc;
  display: block;
}

/* Nom / rôle / email */
.member-name {
  margin: 18px 0 10px 0;
  font-weight: 900;
  font-size: 1.6rem;
  color: #7a0c0c;
}

.member-role {
  margin: 0 0 14px 0;
  font-weight: 800;
  color: #7a0c0c;
}

.member-email {
  display: inline-block;
  font-style: italic;
  color: #111827;
  text-decoration: none;
  margin-bottom: 18px;
}

.member-email:hover {
  text-decoration: underline;
  color: #7a0c0c;
}

/* Description */
.member-desc {
  text-align: left;
  margin: 0;
  color: #111827;
  line-height: 1.75;
  font-size: 1rem;
}

/* Bande bordeaux en bas */
.bottom-bar {
  height: 10px;
  background: #7a0c0c;
  width: 100%;
}

/* Responsive : 1 colonne */
@media (max-width: 992px) {
  .exec-page {
    padding-top: 96px;
  }

  .exec-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .photo {
    height: 280px;
  }
}
</style>
