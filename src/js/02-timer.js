import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const currentDataUnix = new Date().getTime();

ref.btnStart.setAttribute('disabled', '');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const newObj = {};
  newObj.days = String(days).padStart(2, 0);
  newObj.hours = String(hours).padStart(2, 0);
  newObj.minutes = String(minutes).padStart(2, 0);
  newObj.seconds = String(seconds).padStart(2, 0);

  return newObj;
}

const startTiming = () => {
  let timeLeftMs = JSON.parse(localStorage.getItem('time_left'));

  const timerId = setInterval(() => {
    timeLeftMs -= 1000;

    const { days, hours, minutes, seconds } = addLeadingZero(convertMs(timeLeftMs));

    if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
      clearInterval(timerId);
    }

    ref.days.textContent = days;
    ref.hours.textContent = hours;
    ref.minutes.textContent = minutes;
    ref.seconds.textContent = seconds;
  }, 1000);

  ref.btnStart.removeEventListener('click', startTiming);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDataUnix = new Date(selectedDates).getTime();
    const timeLeftMs = selectedDataUnix - currentDataUnix;

    if (selectedDataUnix > currentDataUnix) {
      ref.btnStart.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      ref.btnStart.setAttribute('disabled', '');
    }

    localStorage.setItem('time_left', JSON.stringify(timeLeftMs));
  },
};

flatpickr(ref.input, options);

ref.btnStart.addEventListener('click', startTiming);
