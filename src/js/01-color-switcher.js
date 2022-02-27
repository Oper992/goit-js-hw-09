const ref = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startRandomColor = () => {
  ref.start.style.backgroundColor = 'blue';
  ref.start.setAttribute('disabled', '');
  ref.stop.removeAttribute('disabled');
  interval = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopRandomColor = () => {
  ref.stop.setAttribute('disabled', '');
  ref.stop.style.backgroundColor = 'yellow';
  ref.start.removeAttribute('disabled');
  clearInterval(interval);
};

ref.start.addEventListener('click', startRandomColor);
ref.stop.addEventListener('click', stopRandomColor);
