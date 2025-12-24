<template>
  <footer class="bg-dark text-light py-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <h5 class="mb-3">ISF Université Laval</h5>
          <p class="mb-3">
            Ingénieurs sans frontières Canada - Section Université Laval
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com/isfulaval" class="text-light me-3" target="_blank">
            <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-light me-3" target="_blank">
            <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-light me-3" target="_blank">
            <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="text-light me-3" target="_blank">
            <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="text-light me-3" target="_blank">
            <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        
        <div class="col-lg-4 mb-4">
          <h5 class="mb-3">Liens rapides</h5>
          <ul class="list-unstyled">
            <li><router-link to="/devenir-membre" class="text-light text-decoration-none">Devenir membre</router-link></li>
            <li><router-link to="/nos-projets" class="text-light text-decoration-none">Nos projets</router-link></li>
            <li><router-link to="/faire-un-don" class="text-light text-decoration-none">Faire un don</router-link></li>
            <li><router-link to="/charte" class="text-light text-decoration-none">Notre charte</router-link></li>
          </ul>
        </div>
        
        <div class="col-lg-4 mb-4">
          <h5 class="mb-3">Contact</h5>
          <p class="mb-2">
            <i class="fas fa-envelope me-2"></i>
            <a href="mailto:ulaval@chapter.ewb.ca" class="text-light text-decoration-none">
              ulaval@chapter.ewb.ca
            </a>
          </p>
          <p class="mb-2">
            <i class="fas fa-map-marker-alt me-2"></i>
            Local 00151<br>
            1045 Av de la Médecine<br>
            Pavillon Alexandre-Vachon<br>
            Université Laval, Québec, Canada
          </p>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0">&copy; 2025 ISF Université Laval. Tous droits réservés.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="mb-0">
            Fait avec <i class="fas fa-heart text-danger"></i> par des étudiants engagés
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.social-links a {
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-color) !important;
}

footer {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
}

footer a:hover {
  color: var(--primary-color) !important;
}
</style>
