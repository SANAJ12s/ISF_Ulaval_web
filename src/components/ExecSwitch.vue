<template>
  <section class="exec">
    <div class="exec-header">
      <h2>Comité exécutif</h2>
      <p>Découvre l’équipe qui fait vivre ISF-ULaval.</p>
    </div>

    <div class="exec-frame">
      <button class="nav-btn" @click="prev" aria-label="Précédent">‹</button>

      <!-- SINGLE -->
      <div v-if="current.type === 'single'" class="exec-single">
        <div class="name">{{ current.person.prenomNom }}</div>
        <div class="role">{{ current.person.titre }}</div>

        <img class="photo" :src="current.person.photo" :alt="current.person.prenomNom" />

        <div class="meta">
          <div class="programme">{{ current.person.programme }}</div>
          <div class="desc">{{ current.person.description }}</div>
        </div>
      </div>

      <!-- DUO -->
      <div v-else class="exec-duo">
        <div class="duo-grid">
          <article class="exec-card">
            <div class="name">{{ current.left.prenomNom }}</div>
            <div class="role">{{ current.left.titre }}</div>
            <img class="photo" :src="current.left.photo" :alt="current.left.prenomNom" />
            <div class="meta">
              <div class="programme">{{ current.left.programme }}</div>
              <div class="desc">{{ current.left.description }}</div>
            </div>
          </article>

          <article class="exec-card">
            <div class="name">{{ current.right.prenomNom }}</div>
            <div class="role">{{ current.right.titre }}</div>
            <img class="photo" :src="current.right.photo" :alt="current.right.prenomNom" />
            <div class="meta">
              <div class="programme">{{ current.right.programme }}</div>
              <div class="desc">{{ current.right.description }}</div>
            </div>
          </article>
        </div>
      </div>

      <button class="nav-btn" @click="next" aria-label="Suivant">›</button>
    </div>

    <div class="dots">
      <span
        v-for="(item, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === index }"
        @click="index = i"
        role="button"
        aria-label="Aller à la carte"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "ExecSwitch",
  data() {
    return {
      index: 0,
      slides: [
        {
          type: "single",
          person: {
            prenomNom: "Soraya Faulet",
            titre: "Présidente",
            programme: "Programme à préciser",
            description:
              "Coordonne l’équipe, assure la vision, représente la section et supervise les activités.",
            photo: "/executif/Presidente.jpg",
          },
        },
        {
          type: "single",
          person: {
            prenomNom: "—",
            titre: "VP Exécutive",
            programme: "Programme à préciser",
            description:
              "Soutient la présidence, assure le suivi interne et la coordination des tâches exécutives.",
            photo: "/executif/Vp_Executive.jpg",
          },
        },
        {
          type: "single",
          person: {
            prenomNom: "—",
            titre: "VP Trésorerie",
            programme: "Programme à préciser",
            description:
              "Gère le budget, les dépenses, le financement et le suivi des ressources.",
            photo: "/executif/Vp_Tresorerie.jpg",
          },
        },
        {
          type: "single",
          person: {
            prenomNom: "—",
            titre: "VP Interne",
            programme: "Programme à préciser",
            description:
              "Anime la vie interne, l’intégration des membres et la communication interne.",
            photo: "/executif/Vp_Interne.jpg",
          },
        },
        {
          type: "single",
          person: {
            prenomNom: "—",
            titre: "VP Communication",
            programme: "Programme à préciser",
            description:
              "Gère l’image publique, les réseaux sociaux et la diffusion des activités.",
            photo: "/executif/Vp_Communication.jpg",
          },
        },
        {
          type: "single",
          person: {
            prenomNom: "—",
            titre: "VP Événementiel",
            programme: "Programme à préciser",
            description:
              "Planifie et organise les événements, ateliers, conférences et activités.",
            photo: "/executif/Vp_Evenementiel.jpg",
          },
        },

        /* ✅ DUO : Projet d’ingénierie */
        {
          type: "duo",
          left: {
            prenomNom: "—",
            titre: "VP Projet d’ingénierie",
            programme: "Programme à préciser",
            description:
              "Coordonne les projets techniques (planification, suivi, livrables) et mobilise l’équipe projet.",
            photo: "/executif/Vp_Projet_Ingenierie.jpg",
          },
          right: {
            prenomNom: "—",
            titre: "Assistante Projet d’ingénierie",
            programme: "Programme à préciser",
            description:
              "Soutient la VP Projet (organisation, suivi des tâches, documentation et logistique).",
            photo: "/executif/Assistante_Projet_Ingenierie.jpg",
          },
        },

        /* ✅ DUO : Externe */
        {
          type: "duo",
          left: {
            prenomNom: "—",
            titre: "VP Externe",
            programme: "Programme à préciser",
            description:
              "Développe les partenariats et les relations externes, commandites et collaborations.",
            photo: "/executif/Vp_Externe.jpg",
          },
          right: {
            prenomNom: "—",
            titre: "Assistante Externe",
            programme: "Programme à préciser",
            description:
              "Appuie la VP Externe dans le suivi des partenaires et la logistique.",
            photo: "/executif/Assistante_Externe.jpg",
          },
        },

        /* ✅ DUO : Leadership */
        {
          type: "duo",
          left: {
            prenomNom: "—",
            titre: "VP Leadership",
            programme: "Programme à préciser",
            description:
              "Développe le leadership des membres (formation, accompagnement, culture d’équipe).",
            photo: "/executif/Vp_Leadership.jpg",
          },
          right: {
            prenomNom: "—",
            titre: "Assistant Leadership",
            programme: "Programme à préciser",
            description:
              "Soutient les activités de leadership et la mobilisation des membres.",
            photo: "/executif/Assistant_Leadership.jpg",
          },
        },
      ],
    };
  },
  computed: {
    current() {
      return this.slides[this.index];
    },
  },
  methods: {
    next() {
      this.index = (this.index + 1) % this.slides.length;
    },
    prev() {
      this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    },
  },
};
</script>

<style scoped>
.exec {
  padding: 64px 0;
  background: var(--bg-soft);
}
.exec-header {
  text-align: center;
  margin-bottom: 18px;
}
.exec-header h2 {
  color: var(--dark-color);
  font-size: 2rem;
  font-weight: 800;
}
.exec-header p {
  color: var(--gray-color);
  margin-top: 6px;
}

/* Frame */
.exec-frame {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  gap: 12px;
  align-items: center;
  padding: 0 14px;
}

.nav-btn {
  border: none;
  background: var(--primary-color);
  color: white;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  font-size: 28px;
  cursor: pointer;
}
.nav-btn:hover {
  background: var(--accent-color);
}

/* Single */
.exec-single {
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  padding: 18px;
  text-align: center;
}

.name {
  font-weight: 900;
  color: var(--dark-color);
  font-size: 1.2rem;
}
.role {
  margin-top: 4px;
  color: var(--primary-color);
  font-weight: 800;
}

.photo {
  margin: 14px auto 10px;
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 999px;
  border: 4px solid rgba(249,115,22,0.25);
}

.meta {
  max-width: 760px;
  margin: 0 auto;
}
.programme {
  color: var(--gray-color);
  font-weight: 700;
  margin-bottom: 6px;
}
.desc {
  color: #374151;
  line-height: 1.6;
}

/* Duo */
.exec-duo {
  width: 100%;
}
.duo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.exec-card {
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  padding: 18px;
  text-align: center;
}

/* Dots */
.dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #d1d5db;
  cursor: pointer;
}
.dot.active {
  background: var(--primary-color);
}

@media (max-width: 900px) {
  .duo-grid {
    grid-template-columns: 1fr;
  }
  .photo {
    width: 140px;
    height: 140px;
  }
}
</style>
