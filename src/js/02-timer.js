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
const timeLeftMs = JSON.parse(localStorage.getItem('time_left'));

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

const startTiming = () => {
  const setIntervalId = setInterval(() => {
    let countdown = 0;
    const { days, hours, minutes, seconds } = convertMs(countdown);
    countdown = timeLeftMs - 1000;
    console.log(countdown);

    ref.days.textContent = days;
    ref.hours.textContent = hours;
    ref.minutes.textContent = minutes;
    ref.seconds.textContent = seconds;
  }, 1000);
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
const fp = flatpickr(ref.input, options);

ref.btnStart.addEventListener('click', startTiming);
