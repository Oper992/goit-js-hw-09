const form = document.querySelector('.form');

const generatorPromises = e => {
  e.preventDefault();

  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  let position = 0;

  const intervalId = setInterval(() => {
    position += 1;

    createPromise(position, delay)

    delay += step;

    if (position === amount) {
      clearInterval(intervalId);
    }
  }, 0);
};

function createPromise(pos, del) {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
       Promise.resolve({ pos, del });
    } else {
       Promise.reject({ pos, del });
    }
  }, del);
}

form.addEventListener('submit', generatorPromises);
