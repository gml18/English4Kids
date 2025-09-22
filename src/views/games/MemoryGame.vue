<template>
  <div class="memory-game">
    <h2>🧠 Memory Game</h2>
    <p>Find the matching pairs!</p>

    <div class="grid">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="card"
        :class="{ flipped: card.flipped || card.matched }"
        @click="flipCard(i)"
      >
        <span v-if="card.flipped || card.matched">{{ card.text }}</span>
        <span v-else>❓</span>
      </div>
    </div>

    <p v-if="matchedPairs === totalPairs" class="win-message">
      🎉 You won! All pairs matched!
    </p>

    <button @click="resetGame" class="btn-reset">Play Again</button>

    <!-- 🔙 Botón para regresar al menú de juegos -->
    <router-link to="/games" class="back-btn">⬅ Back to games</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const words = ["Dog", "Cat", "Bird", "Fish"];
const cards = ref([]);
const flippedIndexes = ref([]);
const matchedPairs = ref(0);
const totalPairs = words.length;

function initGame() {
  matchedPairs.value = 0;
  const duplicated = [...words, ...words];
  const shuffled = duplicated.sort(() => Math.random() - 0.5);
  cards.value = shuffled.map((text) => ({ text, flipped: false, matched: false }));
  flippedIndexes.value = [];
}

function flipCard(i) {
  if (cards.value[i].flipped || cards.value[i].matched) return;
  if (flippedIndexes.value.length === 2) return;

  cards.value[i].flipped = true;
  flippedIndexes.value.push(i);

  if (flippedIndexes.value.length === 2) {
    const [first, second] = flippedIndexes.value;
    if (cards.value[first].text === cards.value[second].text) {
      cards.value[first].matched = true;
      cards.value[second].matched = true;
      matchedPairs.value++;
    } else {
      setTimeout(() => {
        cards.value[first].flipped = false;
        cards.value[second].flipped = false;
      }, 700);
    }
    flippedIndexes.value = [];
  }
}

function resetGame() {
  initGame();
}

initGame();
</script>

<style scoped>
.memory-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
}
.card {
  background: #f3f4f6;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 80px;
  transition: background 0.3s ease;
}
.card.flipped {
  background: #8bc34a;
  color: white;
}
.btn-reset {
  margin-top: 12px;
  background: #1e88e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-reset:hover {
  background: #1565c0;
}
.win-message {
  color: #4caf50;
  font-weight: bold;
}

/* 🔙 Botón de volver */
.back-btn {
  margin-top: 18px;
  background: #f39c12;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s ease;
}
.back-btn:hover {
  background: #d35400;
}
</style>