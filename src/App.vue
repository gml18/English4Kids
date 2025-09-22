<template>
  <router-view />
</template>

<script>
export default { name: 'App' }
</script>

<style>
/* Fondo global suave */
html, body, #app {
  height: 100%;
}
body{
  margin:0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
  background: linear-gradient(180deg,#f7f3e7 0%, #efe6d1 100%);
}
</style>