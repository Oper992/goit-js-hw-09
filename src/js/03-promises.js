import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const generatorPromises = e => {
  e.preventDefault();

  let position = 0;
  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  const intervalId = setInterval(() => {
    position += 1;

    createPromise(position, delay)
      .then(({ pos, del }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${pos} in ${del}ms`);
      })
      .catch(({ pos, del }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${pos} in ${del}ms`);
      });

    delay += step;

    if (position === amount) {
      clearInterval(intervalId);
    }
  }, 0);
};

function createPromise(pos, del) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ pos, del });
      } else {
        reject({ pos, del });
      }
    }, del);
  });
}

form.addEventListener('submit', generatorPromises);
