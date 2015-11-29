'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const Tray = require('tray');
const nativeImage = require('native-image');

let mainWindow = null;
let bringToFront = true;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  Menu.setApplicationMenu(new Menu());
  setupBrowserWindow();
  setupTrayIcon();
});

function setupBrowserWindow() {
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
  mainWindow.setAlwaysOnTop(bringToFront);
}

function setupTrayIcon() {
  let trayIcon = new Tray(nativeImage.createFromPath(`${__dirname}/icon.png`));
  trayIcon.setContextMenu(
    Menu.buildFromTemplate([{
      label: 'Open',
      click: () => {
        if (mainWindow) {
          mainWindow.focus();
        } else {
          setupBrowserWindow();
        }
      }
    }, {
      label: 'Close',
      click: () => mainWindow.close()
    }, {
      type: 'separator'
    }, {
      label: 'Always Bring to Front',
      type: 'checkbox',
      checked: bringToFront,
      click: menuItem => {
        bringToFront = menuItem.checked;
        if (mainWindow) {
          mainWindow.setAlwaysOnTop(bringToFront);
        }
      }
    }])
  );
  trayIcon.setToolTip(app.getName());
}
