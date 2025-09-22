<template>
  <div class="page">
    <div v-if="lista.length" class="card animate-card">
      <header class="card__header">
        <h1 class="title animate-title">{{ prettyTopic }}</h1>
        <div class="meta animate-meta">
          <span class="pill">Lesson</span>
          <span class="pill">Word {{ idx + 1 }} / {{ lista.length }}</span>
        </div>
        <div class="progress animate-progress">
          <div class="progress__bar" :style="{ width: progressPct + '%' }"></div>
        </div>
      </header>

      <main class="card__body">
        <img class="pic animate-pic" :src="actual.img" alt="" />
        <h2 class="word animate-word">{{ actual.word }}</h2>
      </main>

      <footer class="card__footer animate-footer">
        <div class="actions">
          <button class="btn" @click="prev" :disabled="idx===0">⟵ Prev</button>
          <button class="btn" @click="play">Listen ▶</button>
          <button class="btn primary" @click="next">
            {{ idx < lista.length - 1 ? 'Next ⟶' : 'Finish' }}
          </button>
        </div>

        <router-link class="btn back" to="/">← Back to menu</router-link>
      </footer>

      <audio ref="player"></audio>
    </div>

    <div v-else class="card empty animate-card">
      <h2>No data for this topic.</h2>
      <router-link class="btn" to="/">Back</router-link>
    </div>
  </div>
</template>

<script setup>
/* Igual que antes */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { temas, speak } from '../data/topics'

const route = useRoute()
const router = useRouter()
const topic = route.params.topic
const lista = temas[topic] || []

const idx = ref(0)
const actual = computed(() => lista[idx.value] || {})
const prettyTopic = computed(() => {
  const map = { numeros: 'Numbers', colores: 'Colors', animales: 'Animals', alfabeto: 'Alphabet' }
  return map[topic] ?? topic
})

const player = ref(null)
function play () {
  if (actual.value?.audio) {
    player.value.src = actual.value.audio
    player.value.currentTime = 0
    player.value.play()
  } else if (actual.value?.word) speak(actual.value.word)
}
function next () {
  if (idx.value < lista.length - 1) idx.value++
  else router.push('/games')
}
function prev () {
  if (idx.value > 0) idx.value--
}

const progressPct = computed(() =>
  lista.length ? Math.round(((idx.value + 1) / lista.length) * 100) : 0
)

function onKey (e) {
  if (e.key === 'ArrowRight' || e.key === 'Enter') next()
  if (e.key === 'ArrowLeft') prev()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.page{
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(180deg, #f6f4ea 0%, #efdfbe 100%);
}

/* Animaciones */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes fadeInDown {
  0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes zoomIn {
  0% { opacity: 0; transform: scale(0.7); }
  100% { opacity: 1; transform: scale(1); }
}

/* Aplicación de animaciones */
.animate-card { animation: fadeInUp 0.6s ease-out; }
.animate-title { animation: fadeInDown 0.7s ease-out; }
.animate-meta { animation: fadeInDown 0.9s ease-out; }
.animate-progress { animation: fadeInUp 1s ease-out; }
.animate-pic { animation: zoomIn 1.2s ease-out; }
.animate-word { animation: fadeInUp 1.3s ease-out; }
.animate-footer { animation: fadeInUp 1.4s ease-out; }

/* --- ESTILOS EXISTENTES --- */
.card{
  width: min(640px, 92vw);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 28px rgba(0,0,0,.09);
  padding: 20px 20px 16px;
  display: grid;
  gap: 14px;
}
.card.empty{ text-align: center; }

.card__header{ text-align: center; display: grid; gap: 10px; }
.title{
  margin: 0;
  font-size: clamp(20px, 3.2vw, 28px);
  line-height: 1.1;
  font-weight: 800;
  color: #1f2a44;
  letter-spacing: .3px;
}
.meta{ display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.pill{
  background: #f1f5ff;
  color: #244;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid #e7ecff;
}
.progress{
  height: 8px;
  background: #f2f2f2;
  border-radius: 999px;
  overflow: hidden;
}
.progress__bar{
  height: 100%;
  background: linear-gradient(90deg, #00bcd4, #3ddc97);
  width: 0%;
  transition: width .25s ease;
}
.card__body{ text-align: center; }
.pic{
  width: clamp(140px, 26vw, 200px);
  height: clamp(140px, 26vw, 200px);
  object-fit: contain;
  display: block;
  margin: 6px auto 10px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 26px rgba(0,0,0,.08);
}
.word{
  margin: 4px 0 0 0;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: .4px;
}
.card__footer{ display: grid; gap: 10px; }
.actions{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.btn{
  padding: 12px 14px;
  border: 0;
  border-radius: 12px;
  background: #f5f5f7;
  color: #1f2a44;
  font-weight: 600;
  cursor: pointer;
  transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,.06) inset;
}
.btn:disabled{ opacity: .55; cursor: not-allowed; }
.btn:hover:not(:disabled){
  transform: translateY(-1px);
  background: #f0f0f2;
}
.btn.primary{
  background: #00bcd4;
  color: #fff;
  box-shadow: 0 6px 18px rgba(0,188,212,.35);
}
.btn.primary:hover{ filter: brightness(1.03); }
.back{
  justify-self: center;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fff8e1;
  border: 1px solid #ffe7a3;
  color: #7a5a00;
  font-weight: 600;
}
@media (max-width: 420px){
  .actions{ grid-template-columns: 1fr;}
}
</style>