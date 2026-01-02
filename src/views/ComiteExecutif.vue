<template>
  <main class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-inner text-center">
        <h1 class="display-4 fw-bold text-white mb-2">Comité exécutif</h1>
        <p class="lead text-white-50 mb-0">
          Découvre l’équipe qui coordonne ISF – Université Laval.
        </p>
      </div>
    </section>

    <!-- LIST -->
    <section class="section-dark py-5">
      <div class="container">
        <div v-if="loading" class="placeholder">
          <p class="mb-0 text-white-50">Chargement…</p>
        </div>

        <div v-else-if="members.length === 0" class="placeholder">
          <p class="mb-0 text-white-50">Aucun membre pour le moment.</p>
        </div>

        <div v-else class="grid">
          <article v-for="m in members" :key="m.id" class="card">
            <div class="photo" :style="photoStyle(m.photo)">
              <div v-if="!m.photo" class="fallback">
                <div class="fallback-initials">{{ initials(m.name) }}</div>
              </div>
            </div>

            <div class="body">
              <div class="name">{{ m.name }}</div>
              <div class="role">{{ m.role }}</div>

              <p v-if="m.bio" class="bio">{{ m.bio }}</p>

              <div class="contacts" v-if="m.email || m.linkedin">
                <a v-if="m.email" class="contact" :href="`mailto:${m.email}`">✉️ {{ m.email }}</a>
                <a v-if="m.linkedin" class="contact" :href="m.linkedin" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "ComiteExecutif",
  data() {
    return {
      loading: true,
      membersRaw: [],
      unsub: null,
    };
  },

  computed: {
    members() {
      return (this.membersRaw || [])
        .filter((m) => m.isVisible !== false)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .map((m) => ({
          id: m.id,
          name: m.name || "Membre",
          role: m.role || "",
          photo: m.photo || "",
          bio: m.bio || "",
          email: m.email || "",
          linkedin: m.linkedin || "",
          order: m.order ?? 999,
        }));
    },
  },

  mounted() {
    const q = query(collection(db, "executif"), orderBy("order", "asc"));
    this.unsub = onSnapshot(
      q,
      (snap) => {
        this.membersRaw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.loading = false;
      },
      (e) => {
        console.error(e);
        this.loading = false;
        this.membersRaw = [];
      }
    );
  },

  beforeUnmount() {
    if (this.unsub) this.unsub();
  },

  methods: {
    initials(name) {
      if (!name) return "";
      return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");
    },
    photoStyle(photo) {
      if (!photo) return {};
      return {
        backgroundImage: `url("${photo}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
  },
};
</script>

<style scoped>
.page { background:#000; color:#fff; min-height:100vh; }

.hero {
  position: relative;
  padding: 120px 0 70px;
  background-image: url("/ulaval.jpg");
  background-size: cover;
  background-position: center;
}
.hero-overlay { position:absolute; inset:0; background: rgba(0,0,0,0.62); }
.hero-inner { position:relative; z-index:1; }

.section-dark { background:#000; }

.placeholder{
  max-width: 900px;
  margin: 0 auto;
  border: 1px dashed rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
}

.grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.card{
  border-radius: 18px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.10);
  overflow:hidden;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35);
}

.photo{
  height: 240px;
  background: #050505;
  position: relative;
}
.fallback{
  position:absolute; inset:0;
  display:grid; place-items:center;
  background:
    radial-gradient(circle at 15% 20%, rgba(249,115,22,0.25), transparent 45%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 40%),
    #000;
}
.fallback-initials{
  width: 76px; height: 76px;
  border-radius: 22px;
  display:grid; place-items:center;
  font-weight: 900;
  font-size: 26px;
  background: rgba(249,115,22,0.16);
  border: 1px solid rgba(249,115,22,0.30);
  color: #f97316;
}

.body{ padding: 16px 16px 18px; display:grid; gap: 10px; }
.name{ font-weight: 900; font-size: 18px; }
.role{ color: rgba(255,255,255,0.75); font-weight: 800; }
.bio{ margin:0; color: rgba(255,255,255,0.75); line-height: 1.7; }

.contacts{
  display:flex; flex-wrap:wrap; gap:10px;
  margin-top: 2px;
}
.contact{
  color:#f97316;
  font-weight: 800;
  text-decoration:none;
  border: 1px solid rgba(249,115,22,0.35);
  background: rgba(249,115,22,0.12);
  padding: 8px 10px;
  border-radius: 12px;
}
</style>
