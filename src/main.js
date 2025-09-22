import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // <-- importa el router
import './style.css'            // <-- estilos globales (opcional pero recomendado)

const app = createApp(App)
app.use(router)                 // <-- usa el router
app.mount('#app')               // <-- monta la app