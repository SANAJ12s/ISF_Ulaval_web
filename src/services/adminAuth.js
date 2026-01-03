// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin";

// Public pages
import Home from "@/views/Home.vue";
import QuiSommesNous from "@/views/QuiSommesNous.vue";
import ComiteExecutif from "@/views/ComiteExecutif.vue";
import DevenirMembre from "@/views/DevenirMembre.vue";
import NosProjets from "@/views/NosProjets.vue";
import Partenaires from "@/views/Partenaires.vue";
import Charte from "@/views/Charte.vue";
import Stages from "@/views/Stages.vue";
import FaireUnDon from "@/views/FaireUnDon.vue";
import NousJoindre from "@/views/NousJoindre.vue";
import ArticlesPromotionnels from "@/views/ArticlesPromotionnels.vue";
import Documents from "@/views/Documents.vue";

// Admin pages
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import AdminLogin from "@/views/admin/AdminLogin.vue";
import AdminProjects from "@/views/admin/AdminProjects.vue";
import AdminEvents from "@/views/admin/AdminEvents.vue";
import AdminActivities from "@/views/admin/AdminActivities.vue";
import AdminExecutif from "@/views/admin/AdminExecutif.vue";
import AdminDocuments from "@/views/admin/AdminDocuments.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/qui-sommes-nous", component: QuiSommesNous },
  { path: "/comite-executif", component: ComiteExecutif },
  { path: "/devenir-membre", component: DevenirMembre },
  { path: "/nos-projets", component: NosProjets },
  { path: "/partenaires", component: Partenaires },
  { path: "/charte", component: Charte },
  { path: "/stages", component: Stages },
  { path: "/faire-un-don", component: FaireUnDon },
  { path: "/nous-joindre", component: NousJoindre },
  { path: "/articles-promotionnels", component: ArticlesPromotionnels },
  { path: "/documents", component: Documents },

  // Admin
  { path: "/admin/login", component: AdminLogin, meta: { publicAdmin: true } },
  { path: "/admin", component: AdminDashboard, meta: { requiresAdmin: true } },
  { path: "/admin/projets", component: AdminProjects, meta: { requiresAdmin: true } },
  { path: "/admin/evenements", component: AdminEvents, meta: { requiresAdmin: true } },
  { path: "/admin/activites", component: AdminActivities, meta: { requiresAdmin: true } },
  { path: "/admin/executif", component: AdminExecutif, meta: { requiresAdmin: true } },
  { path: "/admin/documents", component: AdminDocuments, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const admin = useAdminStore();
  await admin.init();

  // pages admin publiques (login)
  if (to.meta.publicAdmin) return true;

  if (to.meta.requiresAdmin) {
    if (!admin.isLoggedIn) return { path: "/admin/login" };
    if (!admin.isAdmin) return { path: "/" };
  }

  return true;
});

export default router;
