// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin";

// Public
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

// Admin
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminActivities from "../views/admin/AdminActivities.vue";

const routes = [
  // Public
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
  { path: "/activites", name: "Activites", component: () => import("../views/Activites.vue") },

  // Admin
  { path: "/admin/login", name: "AdminLogin", component: AdminLogin, meta: { publicAdmin: true } },
  { path: "/admin", name: "AdminDashboard", component: AdminDashboard, meta: { requiresAdmin: true } },

  { path: "/admin/activities", name: "AdminActivities", component: AdminActivities, meta: { requiresAdmin: true } },
  { path: "/admin/events", name: "AdminEvents", component: () => import("../views/admin/AdminEvents.vue"), meta: { requiresAdmin: true } },
  { path: "/admin/projects", name: "AdminProjects", component: () => import("../views/admin/AdminProjects.vue"), meta: { requiresAdmin: true } },
  { path: "/admin/executif", name: "AdminExecutif", component: () => import("../views/admin/AdminExecutif.vue"), meta: { requiresAdmin: true } },
  { path: "/admin/documents", name: "AdminDocuments", component: () => import("../views/admin/AdminDocuments.vue"), meta: { requiresAdmin: true } },

  // Redirects FR (anciens liens)
  { path: "/admin/activites", redirect: "/admin/activities" },
  { path: "/admin/evenements", redirect: "/admin/events" },
  { path: "/admin/projets", redirect: "/admin/projects" },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const admin = useAdminStore();
  await admin.init();

  // Login accessible
  if (to.meta.publicAdmin) return true;

  // Pages protégées
  if (to.meta.requiresAdmin) {
    if (!admin.user) return { path: "/admin/login" };
    if (!admin.isAdmin) return { path: "/" };
  }

  return true;
});

export default router;
