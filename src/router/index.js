import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QuiSommesNous from '../views/QuiSommesNous.vue'
import ComiteExecutif from '../views/ComiteExecutif.vue'
import DevenirMembre from '../views/DevenirMembre.vue'
import NosProjets from '../views/NosProjets.vue'
import Partenaires from '../views/Partenaires.vue'
import Charte from '../views/Charte.vue'
import Stages from '../views/Stages.vue'
import FaireUnDon from '../views/FaireUnDon.vue'
import NousJoindre from '../views/NousJoindre.vue'
import ArticlesPromotionnels from '../views/ArticlesPromotionnels.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/qui-sommes-nous',
    name: 'QuiSommesNous',
    component: QuiSommesNous
  },
  {
    path: '/comite-executif',
    name: 'ComiteExecutif',
    component: ComiteExecutif
  },
  {
    path: '/devenir-membre',
    name: 'DevenirMembre',
    component: DevenirMembre
  },

  {
    path: '/nos-projets',
    name: 'NosProjets',
    component: NosProjets
  },
  {
    path: '/partenaires',
    name: 'Partenaires',
    component: Partenaires
  },
  {
    path: '/charte',
    name: 'Charte',
    component: Charte
  },
  {
    path: '/stages',
    name: 'Stages',
    component: Stages
  },
  {
    path: '/faire-un-don',
    name: 'FaireUnDon',
    component: FaireUnDon
  },
  {
    path: '/nous-joindre',
    name: 'NousJoindre',
    component: NousJoindre
  },
  {
    path: '/articles-promotionnels',
    name: 'ArticlesPromotionnels',
    component: ArticlesPromotionnels
  },
  { path: "/activites", 
    name: "Activites",
    component: () => import("../views/Activites.vue") 
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
