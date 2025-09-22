<template>
  <div class="games">
    <h1 class="title animate-title">🎮 Games</h1>
    <p class="subtitle animate-subtitle">Play and learn while having fun!</p>

    <div class="game-list animate-cards">
      <router-link class="game-card" to="/games/memory">
        🧠 Memory Game
      </router-link>

      <router-link class="game-card" to="/games/quiz">
        ❓ Guess the Word
      </router-link>
    </div>

    <!-- 🔙 Botón para volver al menú principal -->
    <router-link to="/" class="back-btn animate-back">⬅ Back to menu</router-link>
  </div>
</template>

<script>
export default { name: "GamesView" };
</script>

<style scoped>
.games {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 28px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}

.title {
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 12px;
  color: #ffffff;
}

.subtitle {
  color: #d1d5db;
  font-size: 20px;
  margin-bottom: 30px;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.game-card {
  display: block;
  background: #1e88e5;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  padding: 18px;
  border-radius: 14px;
  transition: transform 0.2s ease, background 0.2s ease-in-out;
}
.game-card:hover {
  background: #1565c0;
  transform: scale(1.05);
}

.back-btn {
  margin-top: 30px;
  background: #f39c12;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.2s ease, background 0.2s ease;
}
.back-btn:hover {
  background: #d35400;
  transform: scale(1.05);
}

/* ✨ Animaciones */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-title {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-subtitle {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-cards {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-back {
  animation: fadeInUp 1.2s ease-out forwards;
}
</style>