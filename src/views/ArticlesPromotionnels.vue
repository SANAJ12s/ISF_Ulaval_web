<template>
  <main class="articles-promotionnels">
    <!-- HERO -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3 text-white">Merch</h1>
            <p class="lead mb-4 text-white-50">
              Découvre nos articles officiels ISF Université Laval
            </p>

            <a :href="orderLink" target="_blank" class="btn btn-donate btn-lg" rel="noreferrer">
              <i class="fas fa-external-link-alt me-2"></i>
              Commander via le formulaire
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ANNONCE -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="announce-card">
          <img v-if="announceImage" :src="announceImage" alt="Annonce des articles" class="announce-img" />
          <div v-else class="announce-fallback">
            <div class="fallback-inner">
              <div class="fw-bold">Merch ISF</div>
              <div class="text-white-50">Ajoute une image d’annonce dans /public/membres/</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUITS -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-2 text-white">Nos articles</h2>
            <p class="lead text-white-50 mb-0">Clique sur un article pour voir la photo en grand.</p>
          </div>
        </div>

        <div v-if="items.length === 0" class="events-placeholder">
          <p class="mb-0 text-white-50">Aucun article pour le moment.</p>
        </div>

        <div v-else class="row g-4">
          <div v-for="(p, idx) in items" :key="p.id" class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(idx)">
              <div class="product-media">
                <img v-if="p.imageUrl" :src="p.imageUrl" :alt="p.title" class="product-img" />
                <div v-else class="product-img fallback">
                  <div class="fallback-inner">
                    <i class="fas fa-image"></i>
                    <div class="fw-bold mt-2">Image manquante</div>
                  </div>
                </div>
              </div>

              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">{{ p.title }}</h5>
                <p class="text-white-50 mb-0">
                  <span v-if="p.price">Prix : {{ p.price }}</span>
                  <span v-else>—</span>
                </p>
              </div>
            </article>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-5">
          <a :href="orderLink" target="_blank" class="btn btn-donate btn-lg" rel="noreferrer">
            <i class="fas fa-shopping-cart me-2"></i>
            Commander maintenant
          </a>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX -->
    <teleport to="body">
      <div v-if="lightboxOpen">
        <div class="lb-backdrop" @click="closeLightbox"></div>

        <div class="lb-modal" role="dialog" aria-modal="true">
          <button class="lb-close" @click="closeLightbox" aria-label="Fermer">
            <i class="fas fa-times"></i>
          </button>

          <button class="lb-nav lb-prev" @click="prevImage" aria-label="Précédent" :disabled="items.length <= 1">
            <i class="fas fa-chevron-left"></i>
          </button>

          <div class="lb-content">
            <img :src="currentLightbox.imageUrl" :alt="currentLightbox.title" class="lb-img" />
            <div class="lb-caption">
              <div class="lb-title">{{ currentLightbox.title }}</div>
              <div class="lb-sub">
                <span v-if="currentLightbox.price">Prix : {{ currentLightbox.price }}</span>
                <span v-else>—</span>
              </div>
            </div>
          </div>

          <button class="lb-nav lb-next" @click="nextImage" aria-label="Suivant" :disabled="items.length <= 1">
            <i class="fas fa-chevron-right"></i>
          </button>

          <div class="lb-actions">
            <a :href="orderLink" target="_blank" class="btn btn-donate" rel="noreferrer">
              <i class="fas fa-external-link-alt me-2"></i>
              Commander
            </a>
          </div>
        </div>
      </div>
    </teleport>
  </main>
</template>

<script>
export default {
  name: "ArticlesPromotionnels",

  data() {
    return {
      orderLink: "https://forms.gle/AmjDeCcUneTFepcT7",

      // ✅ Image annonce (met ce fichier dans /public/membres/)
      // si tu préfères, mets: "/membres/AnnonceDesArticlesEtQRCode.png"
      announceImage: "/membres/AnnonceDesArticlesEtQRCode.png",

      // ✅ Produits hardcodés (mets les bons prix si tu veux)
      items: [
        {
          id: "patch",
          title: "Patch ISF",
          price: "",
          imageUrl: "/membres/patch.png",
        },
        {
          id: "patch1",
          title: "Patch ISF (variante)",
          price: "",
          imageUrl: "/membres/patch1.png",
        },
        {
          id: "pull",
          title: "Pull ISF",
          price: "",
          imageUrl: "/membres/pull.png",
        },
        {
          id: "pull1",
          title: "Pull ISF (variante)",
          price: "",
          imageUrl: "/membres/pull1.png",
        },
        {
          id: "totte",
          title: "Totebag ISF",
          price: "",
          imageUrl: "/membres/totte.png",
        },
        {
          id: "totte1",
          title: "Totebag ISF (variante)",
          price: "",
          imageUrl: "/membres/totte1.png",
        },
      ],

      lightboxOpen: false,
      currentIndex: 0,
    };
  },

  computed: {
    currentLightbox() {
      const list = this.items;
      if (!list.length) return { title: "", price: "", imageUrl: "" };
      const i = Math.max(0, Math.min(this.currentIndex, list.length - 1));
      return list[i];
    },
  },

  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
    document.body.classList.remove("modal-open");
  },

  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxOpen = true;
      document.body.classList.add("modal-open");
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.classList.remove("modal-open");
    },
    nextImage() {
      const n = this.items.length;
      if (n <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % n;
    },
    prevImage() {
      const n = this.items.length;
      if (n <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + n) % n;
    },
    onKeydown(e) {
      if (!this.lightboxOpen) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowRight") this.nextImage();
      if (e.key === "ArrowLeft") this.prevImage();
    },
  },
};
</script>

<style scoped>
.articles-promotionnels { background:#000; color:#fff; }
.section-dark { background:#000; }

/* HERO */
.hero-section{
  position: relative;
  padding-top: 80px;
  background:
    radial-gradient(circle at 20% 10%, rgba(249,115,22,0.22), transparent 45%),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 40%),
    #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-overlay{ position:absolute; inset:0; background: rgba(0,0,0,0.35); }
.hero-inner{ position: relative; z-index:1; }
.min-vh-75{ min-height: 60vh; }

/* Annonce */
.announce-card{
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.03);
  box-shadow: 0 18px 45px rgba(0,0,0,0.35);
}
.announce-img{ width:100%; height:auto; display:block; }

.announce-fallback{
  padding: 48px 18px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 15% 20%, rgba(249,115,22,0.20), transparent 45%),
    #050505;
}
.fallback-inner{ text-align:center; }

/* Cards */
.card-dark{
  background: #0b0b0b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.card-hover{
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
  cursor: pointer;
}
.card-hover:hover{
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(0,0,0,0.35);
  border-color: rgba(249,115,22,0.35);
}

/* Media */
.product-media{
  height: 280px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:
    radial-gradient(circle at 30% 20%, rgba(249,115,22,0.18), transparent 55%),
    #050505;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.product-img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}
.product-img.fallback{
  display:grid;
  place-items:center;
  color: rgba(255,255,255,0.75);
}

/* Buttons */
.btn-donate{
  background: #f97316;
  color: #000;
  border: none;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 20px;
}
.btn-donate:hover{
  background: #ff8a3d;
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.45);
  color: #000;
}

.events-placeholder{
  max-width: 980px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
}

/* LIGHTBOX */
:global(body.modal-open){ overflow:hidden; }

.lb-backdrop{
  position: fixed; inset:0;
  background: rgba(0,0,0,0.78);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 2000;
}
.lb-modal{
  position: fixed; inset:0;
  z-index: 2001;
  display:grid;
  place-items:center;
  padding: 18px;
}
.lb-content{
  max-width: 980px;
  width: min(980px, 92vw);
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
}
.lb-img{
  width: 100%;
  height: min(70vh, 640px);
  object-fit: contain;
  background: #050505;
  display:block;
}
.lb-caption{
  padding: 14px 16px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.lb-title{ font-weight:900; color:#fff; }
.lb-sub{ color: rgba(255,255,255,0.65); margin-top:4px; font-size: .95rem; }

.lb-close{
  position: fixed; top:18px; right:18px;
  width:44px; height:44px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.35);
  color:#fff;
  display:grid;
  place-items:center;
  z-index: 2002;
}

.lb-nav{
  position: fixed;
  top:50%;
  transform: translateY(-50%);
  width:48px; height:48px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.35);
  color:#fff;
  display:grid;
  place-items:center;
  z-index: 2002;
}
.lb-nav:disabled{ opacity: .35; cursor: not-allowed; }
.lb-prev{ left:18px; }
.lb-next{ right:18px; }

.lb-actions{
  position: fixed;
  bottom:18px;
  left:0; right:0;
  z-index: 2002;
  display:flex;
  justify-content:center;
  padding: 0 18px;
}

@media (max-width: 768px){
  .hero-section{ padding-top: 60px; }
  .display-4{ font-size: 2rem; }
  .product-media{ height: 240px; }
}
</style>
