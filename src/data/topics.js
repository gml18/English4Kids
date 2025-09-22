// src/data/topics.js
// Rutas de imágenes servidas desde /public
// Ej: public/img/animals/dog.jpeg  ->  /img/animals/dog.jpeg

export const temas = {
  animales: [
    { word: 'Dog',  img: '${base}img/animals/dog.jpeg',  audio: '/audio/animals/dog.mp3' },
    { word: 'Cat',  img: '${base}img/animals/cat.jpeg',  audio: '/audio/animals/cat.mp3' },
    { word: 'Duck', img: '${base}img/animals/duck.jpeg' },
    { word: 'Frog', img: '${base}img/animals/frog.jpeg' },
  ],

  colores: [
    { word: 'Red',    img: '${base}img/colors/red.jpeg' },
    { word: 'Blue',   img: '${base}img/colors/blue.jpeg' },
    { word: 'Green',  img: '${base}img/colors/green.jpeg' },
    { word: 'Yellow', img: '${base}img/colors/yellow.jpeg' },
  ],

  numeros: [
    { word: 'One',   img: '${base}img/numbers/one.jpeg' },
    { word: 'Two',   img: '${base}img/numbers/two.jpeg' },
    { word: 'Three', img: '${base}img/numbers/three.jpeg' },
    { word: 'Four',  img: '${base}img/numbers/four.jpeg' },
  ],

   alfabeto: [
    { word: 'A', img: '${base}img/alphabets/a.jpeg' },
    { word: 'B', img: '${base}img/alphabets/b.jpeg' },
    { word: 'C', img: '${base}img/alphabets/c.jpeg' },
    { word: 'D', img: '${base}img/alphabets/d.jpeg' },
  ],
};

// Voz del navegador como respaldo si no hay mp3
export function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (_) {}
}