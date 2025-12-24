<template>
  <div class="devenir-membre">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4">Deviens membre !</h1>
            <p class="lead mb-4">
              Rejoins notre communauté d'ingénieurs engagés
            </p>
            <div class="alert alert-info">
              <h5 class="alert-heading">🚀 Pour devenir membre il te suffit de compléter le sondage ci-dessous !</h5>
              <p class="mb-0">
                Nous acceptons tous les programmes, tous les cycles et les étudiants gradués !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaires -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <!-- Formulaire d'adhésion -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100">
              <div class="card-header bg-primary text-white">
                <h4 class="mb-0">
                  <i class="fas fa-user-plus me-2"></i>
                  Formulaire d'adhésion
                </h4>
              </div>
              <div class="card-body p-4">
                <h5 class="card-title">Devenir membre d'ISF ULaval</h5>
                <p class="card-text text-muted mb-4">
                  Remplis ce formulaire pour rejoindre notre communauté et recevoir 
                  toutes les informations sur nos activités et projets.
                </p>
                
                <form @submit.prevent="submitAdhesion">
                  <div class="mb-3">
                    <label for="nom" class="form-label">Nom complet *</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="nom" 
                      v-model="formAdhesion.nom"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label for="email" class="form-label">Courriel *</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      v-model="formAdhesion.email"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label for="programme" class="form-label">Programme d'études *</label>
                    <select 
                      class="form-control" 
                      id="programme" 
                      v-model="formAdhesion.programme"
                      required
                    >
                      <option value="">Sélectionner un programme</option>
                      <option value="genie-civil">Génie civil</option>
                      <option value="genie-electrique">Génie électrique</option>
                      <option value="genie-mecanique">Génie mécanique</option>
                      <option value="genie-informatique">Génie informatique</option>
                      <option value="genie-chimique">Génie chimique</option>
                      <option value="genie-mines">Génie des mines</option>
                      <option value="genie-industriel">Génie industriel</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label for="cycle" class="form-label">Cycle d'études *</label>
                    <select 
                      class="form-control" 
                      id="cycle" 
                      v-model="formAdhesion.cycle"
                      required
                    >
                      <option value="">Sélectionner un cycle</option>
                      <option value="bac1">Baccalauréat 1ère année</option>
                      <option value="bac2">Baccalauréat 2ème année</option>
                      <option value="bac3">Baccalauréat 3ème année</option>
                      <option value="bac4">Baccalauréat 4ème année</option>
                      <option value="maitrise">Maîtrise</option>
                      <option value="doctorat">Doctorat</option>
                      <option value="diplome">Diplômé(e)</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label for="interets" class="form-label">Centres d'intérêt</label>
                    <textarea 
                      class="form-control" 
                      id="interets" 
                      rows="3"
                      v-model="formAdhesion.interets"
                      placeholder="Projets, événements, domaines qui t'intéressent..."
                    ></textarea>
                  </div>
                  
                  <div class="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="newsletter" 
                      v-model="formAdhesion.newsletter"
                    >
                    <label class="form-check-label" for="newsletter">
                      Je souhaite recevoir la newsletter d'ISF ULaval
                    </label>
                  </div>
                  
                  <button type="submit" class="btn btn-primary w-100">
                    <i class="fas fa-paper-plane me-2"></i>
                    Rejoindre ISF ULaval
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Formulaire Merch -->
          <div class="col-lg-6">
            <div class="card border-0 shadow h-100">
              <div class="card-header bg-success text-white">
                <h4 class="mb-0">
                  <i class="fas fa-tshirt me-2"></i>
                  Formulaire Merch
                </h4>
              </div>
              <div class="card-body p-4">
                <h5 class="card-title">Pull de membre ISF</h5>
                <p class="card-text text-muted mb-4">
                  <strong>N'oublie pas de remplir le formulaire de merch pour toi aussi avoir ton pull de membre !</strong>
                </p>
                
                <div class="alert alert-warning">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  <strong>Important :</strong> Le formulaire merch est externe et s'ouvre dans un nouvel onglet.
                </div>
                
                <a 
                  href="https://forms.gle/AmjDeCcUneTFepcT7" 
                  target="_blank"
                  class="btn btn-success w-100 mb-4"
                >
                  <i class="fas fa-external-link-alt me-2"></i>
                  Accéder au formulaire Merch
                </a>
                
                <hr>
                
                <h6 class="fw-bold mb-3">Détails du pull</h6>
                <ul class="list-unstyled">
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

    <!-- Avantages d'être membre -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Pourquoi devenir membre ?</h2>
            <p class="lead text-muted">
              Les avantages d'être membre d'ISF Université Laval
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-globe-americas fa-3x text-primary"></i>
                </div>
                <h5 class="fw-bold mb-3">Avoir un impact réel</h5>
                <p>
                  Avoir un impact réel, même à petite échelle, sur des initiatives 
                  locales ou internationales qui changent des vies.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-graduation-cap fa-3x text-success"></i>
                </div>
                <h5 class="fw-bold mb-3">Valoriser son parcours</h5>
                <p>
                  Valoriser son parcours avec une expérience associative reconnue 
                  dans le monde académique et professionnel.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4">
            <div class="card border-0 shadow h-100">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-hands-helping fa-3x text-info"></i>
                </div>
                <h5 class="fw-bold mb-3">Participer à des projets concrets</h5>
                <p>
                  Participer à des projets concrets en lien avec la solidarité 
                  internationale et l'engagement social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Galerie Photos Membres -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="display-5 fw-bold mb-4">Notre communauté</h2>
            <p class="lead text-muted">
              Découvrez notre communauté en images
            </p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12">
            <div id="membersCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #2563eb, #3b82f6);"
                      >
                        <div class="text-center">
                          <i class="fas fa-users fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Groupe ISF</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #059669, #10b981);"
                      >
                        <div class="text-center">
                          <i class="fas fa-running fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Activité</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #dc2626, #ef4444);"
                      >
                        <div class="text-center">
                          <i class="fas fa-calendar-star fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Événement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #7c3aed, #a855f7);"
                      >
                        <div class="text-center">
                          <i class="fas fa-users-cog fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Équipe</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #f59e0b, #fbbf24);"
                      >
                        <div class="text-center">
                          <i class="fas fa-tools fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Workshop</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div 
                        class="d-block w-100 rounded d-flex align-items-center justify-content-center text-white"
                        style="height: 200px; background: linear-gradient(45deg, #be185d, #ec4899);"
                      >
                        <div class="text-center">
                          <i class="fas fa-trophy fa-3x mb-2"></i>
                          <p class="mb-0 fw-bold">Équipe</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                class="carousel-control-prev" 
                type="button" 
                data-bs-target="#membersCarousel" 
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button 
                class="carousel-control-next" 
                type="button" 
                data-bs-target="#membersCarousel" 
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Groupe Facebook Privé -->
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4">Groupe Facebook Privé</h2>
            <p class="lead mb-4">
              Une fois membre, rejoins notre groupe Facebook privé pour rester 
              connecté avec la communauté et ne manquer aucune information !
            </p>
            <a 
              href="https://www.facebook.com/groups/534075985970818/" 
              target="_blank"
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
  name: 'DevenirMembre',
  data() {
    return {
      formAdhesion: {
        nom: '',
        email: '',
        programme: '',
        cycle: '',
        interets: '',
        newsletter: true
      }
    }
  },
  methods: {
    submitAdhesion() {
      // Simulation de soumission du formulaire
      alert('Merci pour ton intérêt ! Ce formulaire sera bientôt fonctionnel. En attendant, contacte-nous directement via ulaval@chapter.ewb.ca')
      // Reset du formulaire
      this.formAdhesion = {
        nom: '',
        email: '',
        programme: '',
        cycle: '',
        interets: '',
        newsletter: true
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  padding-top: 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.min-vh-75 {
  min-height: 60vh;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.25);
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 60px;
  }
  
  .display-4 {
    font-size: 2rem;
  }
}
</style>
