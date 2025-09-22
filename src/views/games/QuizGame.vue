<template>
  <div class="quiz-game">
    <h2 class="quiz-title">❓ Guess the Word</h2>
    <p class="quiz-subtitle">Choose the correct answer for each image</p>

    <div v-if="currentQuestion" class="question">
      <img :src="currentQuestion.img" alt="question image" class="question-img" />
      <div class="options">
        <button
          v-for="(option, i) in currentQuestion.options"
          :key="i"
          class="option"
          @click="selectAnswer(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <p v-if="feedback" :class="feedbackClass" class="feedback">{{ feedback }}</p>

    <button @click="nextQuestion" class="btn-next" v-if="showNext">
      Next ➡
    </button>

    <router-link to="/games" class="back-btn">⬅ Back to games</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const questions = [
  { img: "/img/quiz/apple.png", answer: "Apple", options: ["Apple", "Banana", "Orange"] },
  { img: "/img/quiz/dog.png", answer: "Dog", options: ["Cat", "Dog", "Bird"] },
  { img: "/img/quiz/red.png", answer: "Red", options: ["Blue", "Green", "Red"] },
];

const currentIndex = ref(0);
const currentQuestion = ref(questions[currentIndex.value]);
const feedback = ref("");
const feedbackClass = ref("");
const showNext = ref(false);

function selectAnswer(option) {
  if (option === currentQuestion.value.answer) {
    feedback.value = "✅ Correct!";
    feedbackClass.value = "correct";
    showNext.value = true;
  } else {
    feedback.value = "❌ Try again!";
    feedbackClass.value = "wrong";
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++;
    currentQuestion.value = questions[currentIndex.value];
    feedback.value = "";
    showNext.value = false;
  } else {
    feedback.value = "🎉 You completed all questions!";
    feedbackClass.value = "correct";
    showNext.value = false;
  }
}
</script>

<style scoped>
.quiz-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centrado vertical */
  min-height: 100vh; /* Ocupa toda la pantalla */
  padding: 20px;
  background: linear-gradient(135deg, #f6f4ea, #efdfbe);
  text-align: center;
}

.quiz-title {
  font-size: 42px;
  font-weight: 900;
  color: #1f2a44;
  margin-bottom: 6px;
}

.quiz-subtitle {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.question-img {
  width: 180px;
  height: 180px;
  object-fit: contain;
  margin: 20px 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.option {
  background: #1e88e5;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  width: 200px;
  transition: transform 0.15s ease, background 0.2s ease-in-out;
}
.option:hover {
  background: #1565c0;
  transform: scale(1.05);
}

.feedback {
  font-size: 20px;
  margin-top: 14px;
}
.correct {
  color: #4caf50;
  font-weight: bold;
}
.wrong {
  color: #e53935;
  font-weight: bold;
}

.btn-next {
  background: #8e44ad;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 16px;
  transition: transform 0.15s ease, background 0.2s ease;
}
.btn-next:hover {
  background: #6c3483;
  transform: scale(1.05);
}

/* 🔙 Botón de volver */
.back-btn {
  margin-top: 20px;
  background: #f39c12;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.15s ease, background 0.2s ease;
}
.back-btn:hover {
  background: #d35400;
  transform: scale(1.05);
}
</style>