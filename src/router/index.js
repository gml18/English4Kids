import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import HomeView     from '../views/HomeView.vue'
import LessonView   from '../views/LessonView.vue'
import GamesView    from '../views/GamesView.vue'
import LoginView    from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

// Juegos (importar las nuevas vistas)
import MemoryGame   from '../views/games/MemoryGame.vue'
import QuizGame     from '../views/games/QuizGame.vue'


const routes = [
  // Login & Registro
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // Pantalla principal
  { path: '/', name: 'home', component: HomeView },

  // Lecciones
  {
    path: '/lesson/:topic',
    name: 'lesson',
    component: LessonView,
    props: true,
  },

  // Atajos bonitos
  { path: '/numbers',  redirect: { name: 'lesson', params: { topic: 'numeros'  } } },
  { path: '/colors',   redirect: { name: 'lesson', params: { topic: 'colores'  } } },
  { path: '/animals',  redirect: { name: 'lesson', params: { topic: 'animales' } } },
  { path: '/alphabet', redirect: { name: 'lesson', params: { topic: 'alfabeto' } } },

  // Juegos
  { path: '/games', name: 'games', component: GamesView },
  { path: '/games/memory', name: 'memory', component: MemoryGame },
  { path: '/games/quiz', name: 'quiz', component: QuizGame },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// ✅ Protección de rutas: si no hay sesión → redirige a /login
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('e4k_current') || 'null')
  const publicPages = ['/login', '/register']

  if (!user && !publicPages.includes(to.path)) {
    return next('/login')
  }

  next()
})

export default router