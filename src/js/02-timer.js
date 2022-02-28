import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
};

const currentDataUnix = new Date().getTime();

ref.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDataUnix = new Date(selectedDates).getTime();

    if (selectedDataUnix > currentDataUnix) {
      ref.btnStart.removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
      ref.btnStart.setAttribute('disabled', '');
    }
    // console.log(new Date(selectedDates).getTime());
  },
};

flatpickr(ref.input, options);

// console.log(new Date());
