// src/data/topics.js
// Rutas de imágenes servidas desde /public
// Ej: public/img/animals/dog.jpeg  ->  /img/animals/dog.jpeg

export const temas = {
  animales: [
    { word: 'Dog',  img: '/img/animals/dog.jpeg',  audio: '/audio/animals/dog.mp3' },
    { word: 'Cat',  img: '/img/animals/cat.jpeg',  audio: '/audio/animals/cat.mp3' },
    { word: 'Duck', img: '/img/animals/duck.jpeg' },
    { word: 'Frog', img: '/img/animals/frog.jpeg' },
  ],

  colores: [
    { word: 'Red',    img: '/img/colors/red.jpeg' },
    { word: 'Blue',   img: '/img/colors/blue.jpeg' },
    { word: 'Green',  img: '/img/colors/green.jpeg' },
    { word: 'Yellow', img: '/img/colors/yellow.jpeg' },
  ],

  numeros: [
    { word: 'One',   img: '/img/numbers/one.jpeg' },
    { word: 'Two',   img: '/img/numbers/two.jpeg' },
    { word: 'Three', img: '/img/numbers/three.jpeg' },
    { word: 'Four',  img: '/img/numbers/four.jpeg' },
  ],

  alfabeto: [
    { word: 'A', img: '/img/alphabets/a.jpeg' },
    { word: 'B', img: '/img/alphabets/b.jpeg' },
    { word: 'C', img: '/img/alphabets/c.jpeg' },
    { word: 'D', img: '/img/alphabets/d.jpeg' },
  ],
};

// Voz del navegador como respaldo si no hay mp3
export function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
} catch (_) {}
}