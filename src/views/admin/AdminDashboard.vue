<template>
  <main class="admin">
    <h1>Admin ISF ULaval</h1>

    <section class="cards">
      <router-link to="/admin/activites">Activités</router-link>
      <router-link to="/admin/projets">Projets</router-link>
      <router-link to="/admin/evenements">Événements</router-link>
      <router-link to="/admin/executif">Exécutif</router-link>
      <router-link to="/admin/documents">Documents</router-link>
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
.admin {
  padding: 120px 40px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
a {
  padding: 20px;
  background: #111;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 900;
}
</style>
