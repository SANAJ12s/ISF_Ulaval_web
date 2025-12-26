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
        <article v-for="m in members" :key="m.email" class="exec-member">
          <div class="photo-wrap">
            <img :src="m.photo" :alt="`Photo de ${m.name}`" class="photo" />
          </div>

          <h2 class="member-name">{{ m.name }}</h2>
          <h3 class="member-role">{{ m.role }}</h3>

          <a class="member-email" :href="`mailto:${m.email}`">
            {{ m.email }}
          </a>

          <p class="member-desc">
            {{ m.description }}
          </p>
        </article>
      </section>
    </div>

    <!-- bande bordeaux en bas (comme sur ton exemple) -->
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
          name: "Nom Prénom",
          role: "Présidence",
          email: "presidence@isf-ulaval.com",
          photo: "/executif/Presidente.jpg",
          description:
            "La présidence représente officiellement l’association, coordonne les activités et veille au bon fonctionnement de l’exécutif. Elle assure également le lien avec les partenaires et les instances de la faculté.",
        },
        {
          name: "Nom Prénom",
          role: "VP aux affaires institutionnelles",
          email: "institutionnelle@isf-ulaval.com",
          photo: "/executif/Institutionnelle.jpg",
          description:
            "La vice-présidence aux affaires institutionnelles assiste la présidence, veille à la conformité des procédures et assure le bon déroulement des rencontres. Elle contribue à la mémoire organisationnelle de l’association.",
        },
        {
          name: "Nom Prénom",
          role: "VP aux communications",
          email: "communications@isf-ulaval.com",
          photo: "/executif/Communications.jpg",
          description:
            "Responsable des communications externes, des réseaux sociaux et de l’image de l’association. Elle s’assure que les informations importantes soient diffusées clairement aux membres.",
        },
        {
          name: "Nom Prénom",
          role: "VP aux finances",
          email: "finances@isf-ulaval.com",
          photo: "/executif/Finances.jpg",
          description:
            "Assure la gestion budgétaire, le suivi des dépenses et la planification financière. Elle soutient les projets en veillant à une utilisation responsable des ressources.",
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

/* Container un peu plus large (comme sur ton screenshot) */
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
  gap: 44px 54px; /* gros espace comme l’exemple */
  padding-bottom: 44px;
}

/* Carte membre */
.exec-member {
  text-align: center;
}

/* Photo grande, format paysage */
.photo-wrap {
  background: transparent;
  border: 1px solid rgba(59, 10, 10, 0.18);
  padding: 10px;
}

.photo {
  width: 100%;
  height: 320px;       /* garde la même hauteur */
  object-fit: contain; /* 🔑 affiche la photo AU COMPLET */
  background: #f5f2dc; /* même fond beige que la page */
  display: block;
}


/* Nom / rôle / email */
.member-name {
  margin: 18px 0 10px 0;
  font-weight: 900;
  font-size: 1.6rem;
  color: #7a0c0c; /* bordeaux */
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
