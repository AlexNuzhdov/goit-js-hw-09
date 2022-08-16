
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
  refs.btnStop.disabled = true;
  let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
  refs.btnStart.addEventListener('click', () => {
   refs.btnStart.disabled = true;
   refs.btnStop.disabled = false;

   timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

  refs.btnStop.addEventListener('click', () => {
   clearInterval(timerId);
   refs.btnStart.disabled = false;
   refs.btnStop.disabled = true;
});