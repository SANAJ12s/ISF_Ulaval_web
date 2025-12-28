<template>
  <div class="articles-promotionnels">
    <!-- HERO (fond noir, style cohérent) -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-3 text-white">Merch</h1>
            <p class="lead mb-4 text-white-50">
              Découvre nos articles officiels ISF Université Laval
            </p>

            <a
              href="https://forms.gle/AmjDeCcUneTFepcT7"
              target="_blank"
              class="btn btn-donate btn-lg"
            >
              <i class="fas fa-external-link-alt me-2"></i>
              Commander via le formulaire
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Image annonce (au début) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="announce-card">
          <img
            src="/membres/AnnonceDesArticlesEtQRCode.png"
            alt="Annonce des articles et QR Code"
            class="announce-img"
          />
        </div>
      </div>
    </section>

    <!-- Produits (display tous, fond noir, cartes plus clean) -->
    <section class="py-5 section-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-6 fw-bold mb-2 text-white">Nos articles</h2>
            <p class="lead text-white-50 mb-0">
              Clique sur un article pour voir la photo en grand.
            </p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Pull (devant) -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(0)">
              <div class="product-media">
                <img src="/membres/tottePull.png" alt="Pull ISF (devant)" class="product-img" />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Pull ISF</h5>
                <p class="text-white-50 mb-0">Photo : tottePull.png</p>
              </div>
            </article>
          </div>

          <!-- Pull (dos) -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(1)">
              <div class="product-media">
                <img src="/membres/backpull.png" alt="Pull ISF (dos)" class="product-img" />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Pull ISF (dos)</h5>
                <p class="text-white-50 mb-0">Photo : backpull.png</p>
              </div>
            </article>
          </div>

          <!-- Tote bag -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(2)">
              <div class="product-media">
                <img src="/membres/tottebag.png" alt="Tote bag ISF" class="product-img" />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Tote bag ISF</h5>
                <p class="text-white-50 mb-0">Photo : tottebag.png</p>
              </div>
            </article>
          </div>

          <!-- Combo Pull + tote -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(3)">
              <div class="product-media">
                <img
                  src="/membres/pullbackettotte.png"
                  alt="Pull + tote bag"
                  class="product-img"
                />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Combo Pull + Tote</h5>
                <p class="text-white-50 mb-0">Photo : pullbackettotte.png</p>
              </div>
            </article>
          </div>

          <!-- Patch -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(4)">
              <div class="product-media">
                <img src="/membres/patch.png" alt="Patch ISF" class="product-img" />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Patch ISF</h5>
                <p class="text-white-50 mb-0">Photo : patch.png</p>
              </div>
            </article>
          </div>

          <!-- Patches -->
          <div class="col-lg-4 col-md-6">
            <article class="card card-dark card-hover h-100 product-card" @click="openLightbox(5)">
              <div class="product-media">
                <img src="/membres/patchs.png" alt="Patches ISF" class="product-img" />
              </div>
              <div class="card-body p-4">
                <h5 class="fw-bold text-white mb-2">Patches ISF</h5>
                <p class="text-white-50 mb-0">Photo : patchs.png</p>
              </div>
            </article>
          </div>
        </div>

        <!-- CTA en bas -->
        <div class="text-center mt-5">
          <a
            href="https://forms.gle/AmjDeCcUneTFepcT7"
            target="_blank"
            class="btn btn-donate btn-lg"
          >
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

          <button class="lb-nav lb-prev" @click="prevImage" aria-label="Précédent">
            <i class="fas fa-chevron-left"></i>
          </button>

          <div class="lb-content">
            <img :src="products[currentIndex].src" :alt="products[currentIndex].title" class="lb-img" />
            <div class="lb-caption">
              <div class="lb-title">{{ products[currentIndex].title }}</div>
              <div class="lb-sub">{{ products[currentIndex].sub }}</div>
            </div>
          </div>

          <button class="lb-nav lb-next" @click="nextImage" aria-label="Suivant">
            <i class="fas fa-chevron-right"></i>
          </button>

          <div class="lb-actions">
            <a
              href="https://forms.gle/AmjDeCcUneTFepcT7"
              target="_blank"
              class="btn btn-donate"
            >
              <i class="fas fa-external-link-alt me-2"></i>
              Commander
            </a>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: "ArticlesPromotionnels",
  data() {
    return {
      lightboxOpen: false,
      currentIndex: 0,
      products: [
        { title: "Pull ISF", sub: "tottePull.png", src: "/membres/tottePull.png" },
        { title: "Pull ISF (dos)", sub: "backpull.png", src: "/membres/backpull.png" },
        { title: "Tote bag ISF", sub: "tottebag.png", src: "/membres/tottebag.png" },
        { title: "Combo Pull + Tote", sub: "pullbackettotte.png", src: "/membres/pullbackettotte.png" },
        { title: "Patch ISF", sub: "patch.png", src: "/membres/patch.png" },
        { title: "Patches ISF", sub: "patchs.png", src: "/membres/patchs.png" },
      ],
    };
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
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
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
/* Global dark */
.articles-promotionnels {
  background: #000;
  color: #fff;
}
.section-dark {
  background: #000;
}

/* HERO */
.hero-section {
  position: relative;
  padding-top: 80px;
  background: radial-gradient(circle at 20% 10%, rgba(249,115,22,0.22), transparent 45%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 40%),
              #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.min-vh-75 {
  min-height: 60vh;
}

/* Annonce */
.announce-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.03);
  box-shadow: 0 18px 45px rgba(0,0,0,0.35);
}
.announce-img {
  width: 100%;
  height: auto;
  display: block;
}

/* Cards dark */
.card-dark {
  background: #0b0b0b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  cursor: pointer;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  border-color: rgba(249, 115, 22, 0.35);
}

/* Product media */
.product-media {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 20%, rgba(249,115,22,0.18), transparent 55%),
              #050505;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}

/* Buttons */
.btn-donate {
  background: #f97316;
  color: #000;
  border: none;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 20px;
}
.btn-donate:hover {
  background: #ff8a3d;
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.45);
  color: #000;
}

/* LIGHTBOX */
:global(body.modal-open) {
  overflow: hidden;
}

.lb-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 2000;
}
.lb-modal {
  position: fixed;
  inset: 0;
  z-index: 2001;
  display: grid;
  place-items: center;
  padding: 18px;
}
.lb-content {
  max-width: 980px;
  width: min(980px, 92vw);
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
}
.lb-img {
  width: 100%;
  height: min(70vh, 640px);
  object-fit: contain;
  background: #050505;
  display: block;
}
.lb-caption {
  padding: 14px 16px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.lb-title {
  font-weight: 900;
  color: #fff;
}
.lb-sub {
  color: rgba(255,255,255,0.65);
  margin-top: 4px;
  font-size: 0.95rem;
}

.lb-close {
  position: fixed;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.35);
  color: #fff;
  display: grid;
  place-items: center;
  z-index: 2002;
}

.lb-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.35);
  color: #fff;
  display: grid;
  place-items: center;
  z-index: 2002;
}
.lb-prev { left: 18px; }
.lb-next { right: 18px; }

.lb-actions {
  position: fixed;
  bottom: 18px;
  left: 0;
  right: 0;
  z-index: 2002;
  display: flex;
  justify-content: center;
  padding: 0 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }
  .display-4 {
    font-size: 2rem;
  }
  .product-media {
    height: 240px;
  }
}
</style>
