'use strict';

const moment = require('moment');
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
  const updateClock = () => {
    clock.innerHTML = moment().format('YYYY/MM/DD hh:mm:ss');
    setTimeout(updateClock, 1000 - new Date().getMilliseconds());
  }

  updateClock();
});
