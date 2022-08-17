import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    timerHtml: document.querySelector('.timer'),
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),

};
    refs.btnStart.disabled = true;   /*делаем кнопку не активной*/
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.btnStart.disabled = true; 
      } else {
        refs.btnStart.disabled = false;
      }
      
    },
  };
    flatpickr(refs.inputDate, options);

    /* Функция для подсчета значений, принимает время в милисекундах, высчитавет сколько часов, секунд
возвращает обьект часы, минута, секунда*/
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = (Math.floor(ms / day));
    // Remaining hours
    const hours =  (Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = (Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = (Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};
/*Принимает число, приводик к строке и добавляет вначало если число меньше 2-х знаков*/
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
refs.btnStart.addEventListener('click', onStartTime);
let timerId = null;
  
    function onStartTime (){
    refs.btnStart.disabled = true; 
    timerId = setInterval(() => {
        const deltaTime = new Date(refs.inputDate.value) - new Date();
        const startTime = convertMs(deltaTime);
        refs.days.textContent = addLeadingZero(startTime.days);
        refs.hours.textContent = addLeadingZero(startTime.hours);
        refs.minutes.textContent = addLeadingZero(startTime.minutes);
        refs.seconds.textContent = addLeadingZero(startTime.seconds);
        if (deltaTime < 1000) {
          clearInterval(timerId);
          Notiflix.Notify.failure('timer is over');
          btnStart.disabled = false;
        }
        
        
        
    }, 1000);
};
