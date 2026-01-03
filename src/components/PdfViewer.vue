<template>
  <div class="pv">
    <div class="pv-toolbar">
      <button class="pv-btn" @click="prev" :disabled="page <= 1">←</button>
      <div class="pv-count">
        Page <b>{{ page }}</b> / <b>{{ numPages || "…" }}</b>
      </div>
      <button class="pv-btn" @click="next" :disabled="!numPages || page >= numPages">→</button>

      <div class="pv-spacer"></div>

      <button class="pv-btn ghost" type="button" @click="$emit('toggleFullscreen')">
        Plein écran
      </button>
      <a class="pv-btn" :href="url" target="_blank" rel="noreferrer">Onglet ↗</a>
    </div>

    <div class="pv-body" ref="bodyEl">
      <div v-if="loading" class="pv-state">Chargement…</div>
      <div v-else-if="error" class="pv-state error">{{ error }}</div>
      <canvas v-else ref="canvas" class="pv-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps({
  url: { type: String, required: true },
  startPage: { type: Number, default: 1 },
});

defineEmits(["toggleFullscreen"]);

const canvas = ref(null);
const bodyEl = ref(null);

const pdfDoc = ref(null);
const page = ref(props.startPage);
const numPages = ref(0);
const loading = ref(true);
const error = ref("");

let renderTask = null;

async function ensureCanvasReady() {
  // attend que le canvas soit réellement dans le DOM
  await nextTick();
  // parfois un nextTick de plus aide quand v-if change
  if (!canvas.value) await nextTick();
}

async function loadPdf() {
  loading.value = true;
  error.value = "";
  numPages.value = 0;

  try {
    await ensureCanvasReady();

    pdfDoc.value = await pdfjsLib.getDocument(props.url).promise;
    numPages.value = pdfDoc.value.numPages;

    if (page.value < 1) page.value = 1;
    if (page.value > numPages.value) page.value = numPages.value;

    await renderPage(page.value);
  } catch (e) {
    console.error(e);
    error.value = "Impossible de charger / afficher le PDF. Vérifie le lien (CORS/permissions) et la console.";
  } finally {
    loading.value = false;
  }
}

async function renderPage(n) {
  if (!pdfDoc.value) return;
  await ensureCanvasReady();
  if (!canvas.value) return;

  // cancel previous render
  if (renderTask) {
    try { renderTask.cancel(); } catch {}
    renderTask = null;
  }

  const pdfPage = await pdfDoc.value.getPage(n);

  const parentW = (bodyEl.value?.clientWidth || canvas.value.parentElement?.clientWidth || 900);
  const viewport1 = pdfPage.getViewport({ scale: 1 });

  const scale = Math.max(1, Math.min(2.2, parentW / viewport1.width));
  const viewport = pdfPage.getViewport({ scale });

  const ctx = canvas.value.getContext("2d");
  canvas.value.width = Math.floor(viewport.width);
  canvas.value.height = Math.floor(viewport.height);

  renderTask = pdfPage.render({ canvasContext: ctx, viewport });
  await renderTask.promise;
}

function prev() {
  if (page.value <= 1) return;
  page.value -= 1;
}
function next() {
  if (!numPages.value || page.value >= numPages.value) return;
  page.value += 1;
}

watch(
  () => props.url,
  async () => {
    page.value = props.startPage || 1;
    await loadPdf();
  },
  { immediate: true, flush: "post" } // 🔥 IMPORTANT : flush post => après DOM
);

watch(page, async (n) => {
  if (!pdfDoc.value) return;
  await renderPage(n);
});

function onResize() {
  if (!pdfDoc.value) return;
  renderPage(page.value);
}

onMounted(() => window.addEventListener("resize", onResize));
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
  if (renderTask) {
    try { renderTask.cancel(); } catch {}
  }
});
</script>

<style scoped>
.pv { border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.10); background:#0b0b0b; }
.pv-toolbar{
  display:flex; gap:10px; align-items:center;
  padding: 12px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.pv-btn{
  border-radius: 12px; padding: 10px 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color:#fff; font-weight: 900; text-decoration:none;
}
.pv-btn.ghost{ background: rgba(255,255,255,0.03); }
.pv-btn:disabled{ opacity:.35; cursor:not-allowed; }
.pv-count{ color: rgba(255,255,255,0.75); font-weight: 800; }
.pv-spacer{ flex:1; }

.pv-body{
  background:#050505;
  height: min(78vh, 760px);
  display:grid;
  place-items:center;
  padding: 10px;
}
.pv-canvas{
  width: 100%;
  height: auto;
  border-radius: 12px;
  background:#050505;
}
.pv-state{ color: rgba(255,255,255,0.75); font-weight: 800; }
.pv-state.error{ color: #ff6b6b; }
</style>
