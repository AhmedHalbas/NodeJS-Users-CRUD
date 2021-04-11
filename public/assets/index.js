const h1 = document.querySelector('h1');
const div = document.getElementById('home');

setInterval(() => {
  h1.style.color = h1.style.color == 'red' ? 'blue' : 'red';
}, 2000);

div.onclick = () => {
  fetch('/home').then((r) => r.text()).then(t => { div.textContent = t })
  fetch('/assets/home.js');
}