'use strict';

const remote = require('remote');
const currentWindow = remote.getCurrentWindow();
const WINDOW_POSITION = 'window-position';

if (localStorage.getItem(WINDOW_POSITION)) {
  let position = JSON.parse(localStorage.getItem(WINDOW_POSITION));
  currentWindow.setPosition(position[0], position[1]);
}

currentWindow.on('close', () => {
  let position = JSON.stringify(currentWindow.getPosition());
  localStorage.setItem(WINDOW_POSITION, position);
});

currentWindow.show();

document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('.clock');
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const padZero = number => (number < 10) ? `0${number}` : number;

  const updateClock = () => {
    let date = new Date();
    let YYYY = date.getFullYear();
    let MM = padZero(date.getMonth() + 1);
    let DD = padZero(date.getDate());
    let AA = WEEKDAYS[date.getDay()];
    let hh = padZero(date.getHours());
    let mm = padZero(date.getMinutes());
    let ss = padZero(date.getSeconds());

    clock.innerHTML = `${YYYY}/${MM}/${DD} (${AA})<br>${hh}:${mm}:${ss}`;
    setTimeout(updateClock, 1000 - new Date().getMilliseconds());
  }

  updateClock();
});
