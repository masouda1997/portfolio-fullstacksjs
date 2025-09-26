import { clamp } from '@fullstacksjs/toolbox';

import './styles.css';

let accX = 0;
let accY = 0;
let hasMotionDetected = false;
const btn = document.querySelector('.toggle-btn');
const heading = document.querySelector('.heading');
const description = document.querySelector('.description');
const aboutBox = document.getElementById('aboutBox');

function setParallax({ x, y, blur }) {
  document.body.style.setProperty('--pointer-x', `${x / 2}px`);
  document.body.style.setProperty('--pointer-y', `${y / 4}px`);
  document.body.style.setProperty('--blur-man', `${blur * -1}px`);
  document.body.style.setProperty('--blur-deer', `${blur}px`);
}

window.addEventListener('mousemove', (e) => {
  if (hasMotionDetected) return;

  const fromCenterX = Math.round((e.clientX / window.innerWidth) * 100) - 50;
  const fromCenterY = Math.round((e.clientY / window.innerHeight) * 100) - 50;
  const blur = Math.min((fromCenterX + fromCenterY) / 10, 10);

  setParallax({ x: fromCenterX, y: fromCenterY, blur });
});

window.addEventListener('devicemotion', (event) => {
  const rotation = event.rotationRate;

  accX = clamp(accX + rotation.beta / 100, -50, 50);
  accY = clamp(accY + rotation.alpha / 100, -50, 50);
  const blur = Math.min((accX + accY) / 5, 10);
  if (accX !== 0 || accY !== 0) {
    hasMotionDetected = true;
  }

  setParallax({ x: accX, y: accY, blur });
});

btn.addEventListener('click', () => {
  btn.classList.toggle('active');
  document.documentElement.classList.toggle('dark');
});


const otherLinks = Array.from(description.children).filter(
  (el) => !el.classList.contains('heading')
);

heading.addEventListener('click', (e) => {
  e.preventDefault(); 
  const isAboutVisible = aboutBox.classList.contains('show');

  if (isAboutVisible) {
    aboutBox.classList.remove('show');
    aboutBox.style.display = 'none'

    otherLinks.forEach((link) => (link.style.display = ''));
  } else {
    otherLinks.forEach((link) => (link.style.display = 'none'));
    aboutBox.style.display = 'block';
    aboutBox.classList.add('show')
  }
});

