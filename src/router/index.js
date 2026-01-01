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
import Documents from '../views/Documents.vue'
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminActivities from "../views/admin/AdminActivities.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


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
  {
  path: "/admin/login",
  name: "AdminLogin",
  component: AdminLogin,
  meta: { public: true },
},
{
  path: "/admin",
  name: "AdminDashboard",
  component: AdminDashboard,
  meta: { requiresAuth: true },
},
{
  path: "/admin/activities",
  name: "AdminActivities",
  component: AdminActivities,
  meta: { requiresAuth: true },
},

  { path: "/activites", 
    name: "Activites",
    component: () => import("../views/Activites.vue") 
  },
  {
  path: '/documents',
  name: 'Documents',
  component: Documents
},


]

const router = createRouter({
  history: createWebHistory(),
  routes
})
let authReady = false;
let cachedUser = null;

function getCurrentUser() {
  return new Promise((resolve) => {
    if (authReady) return resolve(cachedUser);

    const unsub = onAuthStateChanged(auth, (user) => {
      authReady = true;
      cachedUser = user;
      unsub();
      resolve(user);
    });
  });
}

router.beforeEach(async (to, from, next) => {
  const isPublic = to.meta?.public;
  const requiresAuth = to.meta?.requiresAuth;

  if (!requiresAuth) return next();

  const user = await getCurrentUser();
  if (!user && !isPublic) return next("/admin/login");
  return next();
});

export default router
