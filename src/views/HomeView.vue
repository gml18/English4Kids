<template>
  <div class="home">
    <!-- HERO centrado con 2 logos -->
    <section class="hero">
      <img class="hero__img" src="/img/logo.jpg" alt="English 4Kids logo" />

      <div class="hero__center">
        <h1>English 4Kids</h1>
        <p class="subtitle">Choose a topic to start learning and playing</p>

        <!-- 👋 Saludo con color dinámico -->
        <p :class="['hello', isGuest ? 'hello-guest' : 'hello-user']">
          👋 Hola, {{ userName }}
        </p>

        <!-- Botón de logout -->
        <button class="btn-logout" @click="logout">🚪 Cerrar Sesión</button>
      </div>

      <img class="hero__img" src="/img/hero-kids.jpeg" alt="Kids" />
    </section>

    <!-- MENÚ en 2 columnas con tarjetas de color -->
    <section class="menu">
      <div class="menu-grid">
        <router-link class="card card--blue" to="/lesson/numeros">
          <div class="card__emoji">🔢</div>
          <div class="card__title">Numbers</div>
          <div class="card__hint">Count & pronounce</div>
        </router-link>

        <router-link class="card card--red" to="/lesson/colores">
          <div class="card__emoji">🎨</div>
          <div class="card__title">Colors</div>
          <div class="card__hint">Learn basic colors</div>
        </router-link>

        <router-link class="card card--green" to="/lesson/animales">
          <div class="card__emoji">🐶</div>
          <div class="card__title">Animals</div>
          <div class="card__hint">Names & sounds</div>
        </router-link>

        <router-link class="card card--amber" to="/lesson/alfabeto">
          <div class="card__emoji">🔤</div>
          <div class="card__title">Alphabet</div>
          <div class="card__hint">A to Z practice</div>
        </router-link>

        <!-- Games a lo ancho -->
        <router-link class="card card--purple card--span2" to="/games">
          <div class="card__emoji">🎮</div>
          <div class="card__title">Games</div>
          <div class="card__hint">Play & reinforce</div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref("Little Fellow");
const isGuest = ref(false);

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("e4k_current") || "null");
  if (user && user.name) {
    userName.value = user.name;
    isGuest.value = !user.email; // Si no tiene email => es invitado
  } else {
    userName.value = "Invitado";
    isGuest.value = true;
  }
});

function logout() {
  localStorage.removeItem("e4k_current");
  router.push("/login");
}
</script>

<style scoped>
.home {
  padding: 28px 16px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.hero {
  width: 100%;
  max-width: 980px;
  background: #fff;
  border-radius: 16px;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 140px 1fr 140px;
  align-items: center;
  gap: 18px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.hero__img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  background: #f3f4f6;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.hero__center h1 {
  margin: 0 0 6px;
  font-size: 28px;
  color: #1f2a37;
  font-weight: 800;
}
.subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
.hello {
  margin-top: 6px;
  font-weight: 700;
  font-size: 16px;
}
.hello-user {
  color: #4caf50; /* Verde para usuarios logueados */
}
.hello-guest {
  color: #f39c12; /* Naranja para invitados */
}

.btn-logout {
  margin-top: 10px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease-in-out;
}
.btn-logout:hover {
  background: #d32f2f;
}

/* ===== MENÚ 2 columnas ===== */
.menu {
  width: 100%;
  max-width: 940px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 18px;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 18px 16px;
  min-height: 120px;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
  color: #fff;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  filter: saturate(1.05);
}

.card__emoji {
  font-size: 26px;
}
.card__title {
  margin-top: 6px;
  font-weight: 800;
}
.card__hint {
  margin-top: 2px;
  opacity: 0.9;
  font-size: 13px;
}

.card--blue {
  background: #1e88e5;
}
.card--red {
  background: #e53935;
}
.card--green {
  background: #2e7d32;
}
.card--amber {
  background: #f39c12;
}
.card--purple {
  background: #8e44ad;
}

.card--span2 {
  grid-column: span 4;
}

@media (max-width: 700px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
  .card--span2 {
    grid-column: auto;
  }
  .hero {
    grid-template-columns: 96px 1fr 96px;
  }
  .hero__img {
    width: 96px;
    height: 96px;
  }
  .hero__center h1 {
    font-size: 22px;
}
}
</style>