<template>
  <div class="login-page">
    <div class="card">
      <!-- 🖼 Imagen ajustada al contenedor -->
      <img src="/img/reg.jpg" alt="English 4Kids Logo" class="logo" />
      
      <h2>Registro</h2>
      <input v-model="name" type="text" placeholder="Nombre" class="input" />
      <input v-model="email" type="email" placeholder="Correo" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />

      <button class="btn mt-3" @click="register">Crear Cuenta</button>

      <p class="mt-3">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

async function register() {
  if (!name.value || !email.value || !password.value) {
    alert("Completa todos los campos");
    return;
  }
  const users = JSON.parse(localStorage.getItem("e4k_users") || "{}");
  if (users[email.value.toLowerCase()]) {
    alert("Ya existe una cuenta con este correo");
    return;
  }
  const hash = await hashPassword(password.value);
  users[email.value.toLowerCase()] = {
    name: name.value,
    email: email.value,
    password: hash,
  };
  localStorage.setItem("e4k_users", JSON.stringify(users));
  alert("Cuenta creada, ahora inicia sesión");
  router.push("/login");
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
  background: #111;
}

.card {
  background: #e06262;
  padding: 0; /* Quitamos padding para que la imagen use todo el ancho */
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  max-width: 320px;
  width: 90%;
  text-align: center;
  color: white;
  overflow: hidden; /* Evita que la imagen sobresalga */
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

.mt-3 {
  margin-top: 1rem;
}
</style>