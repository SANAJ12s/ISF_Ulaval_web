// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import QuiSommesNous from "../views/QuiSommesNous.vue";
import ComiteExecutif from "../views/ComiteExecutif.vue";
import DevenirMembre from "../views/DevenirMembre.vue";
import NosProjets from "../views/NosProjets.vue";
import Partenaires from "../views/Partenaires.vue";
import Charte from "../views/Charte.vue";
import Stages from "../views/Stages.vue";
import FaireUnDon from "../views/FaireUnDon.vue";
import NousJoindre from "../views/NousJoindre.vue";
import ArticlesPromotionnels from "../views/ArticlesPromotionnels.vue";
import Documents from "../views/Documents.vue";

import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminActivities from "../views/admin/AdminActivities.vue";

import { useAdminStore } from "@/stores/admin";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/qui-sommes-nous", name: "QuiSommesNous", component: QuiSommesNous },
  { path: "/comite-executif", name: "ComiteExecutif", component: ComiteExecutif },
  { path: "/devenir-membre", name: "DevenirMembre", component: DevenirMembre },
  { path: "/nos-projets", name: "NosProjets", component: NosProjets },
  { path: "/partenaires", name: "Partenaires", component: Partenaires },
  { path: "/charte", name: "Charte", component: Charte },
  { path: "/stages", name: "Stages", component: Stages },
  { path: "/faire-un-don", name: "FaireUnDon", component: FaireUnDon },
  { path: "/nous-joindre", name: "NousJoindre", component: NousJoindre },
  { path: "/articles-promotionnels", name: "ArticlesPromotionnels", component: ArticlesPromotionnels },
  { path: "/documents", name: "Documents", component: Documents },

  // Activités (lazy si tu veux)
  {
    path: "/activites",
    name: "Activites",
    component: () => import("../views/Activites.vue"),
  },

  // Admin
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
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/activities",
    name: "AdminActivities",
    component: AdminActivities,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const admin = useAdminStore();
  admin.init();

  // tant que l’auth n’est pas prête, on laisse passer (ou tu peux bloquer avec un loader)
  if (admin.loading) return true;

  if (to.meta.requiresAdmin) {
    if (!admin.user) return "/admin/login";
    if (!admin.isAdmin) return "/";
  }

  return true;
});

export default router;
