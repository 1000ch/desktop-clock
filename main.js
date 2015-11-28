'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const Tray = require('tray');
const nativeImage = require('native-image');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 240,
    height: 80,
    transparent: true,
    frame: false,
    resizable: false,
    'skip-taskbar': true,
    show: false
  });
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  let trayIcon = new Tray(nativeImage.createFromPath(`${__dirname}/icon.png`));
  trayIcon.setContextMenu(
    Menu.buildFromTemplate([{
      label: 'Open',
      click: () => mainWindow.focus()
    }, {
      label: 'Close',
      click: () => mainWindow.close()
    }])
  );
  trayIcon.setToolTip(app.getName());
  trayIcon.on('clicked', () => mainWindow.focus());
});
