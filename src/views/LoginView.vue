<template>
  <div class="login-page">
    <div class="card">
      <!-- 🖼 Logo ajustado como en Registro -->
      <img src="/img/logo.jpg" alt="English 4Kids Logo" class="logo" />

      <h2>Inicio Sesión</h2>
      <input v-model="email" type="email" placeholder="Correo" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />

      <button class="btn mt-3" @click="login">Inicia Sesión</button>
      <button class="btn secondary mt-2" @click="guestLogin">Entrar como Invitado</button>

      <p class="mt-3">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

async function login() {
  if (!email.value || !password.value) {
    alert("Completa todos los campos");
    return;
  }
  const users = JSON.parse(localStorage.getItem("e4k_users") || "{}");
  const user = users[email.value.toLowerCase()];
  if (!user) {
    alert("Usuario no encontrado");
    return;
  }
  const hash = await hashPassword(password.value);
  if (hash !== user.password) {
    alert("Contraseña incorrecta");
    return;
  }
  localStorage.setItem("e4k_current", JSON.stringify(user));
  router.push("/");
}

function guestLogin() {
  const guest = { name: "Invitado", email: null };
  localStorage.setItem("e4k_current", JSON.stringify(guest));
  router.push("/");
}

async function hashPassword(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #111; /* Fondo oscuro */
}

.card {
  background: #e06262;
  padding: 0; /* Igual que en registro */
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  max-width: 320px;
  width: 90%;
  text-align: center;
  color: white;
  overflow: hidden; /* Para que la imagen no sobresalga */
}

.logo {
  width: 100%;
  display: block;
  object-fit: cover;
}

h2 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.input {
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin-top: 10px;
  font-size: 1rem;
}

.btn {
  width: 80%;
  padding: 10px;
  background: white;
  color: #111;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

.btn.secondary {
  background: #222735;
  color: white;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>