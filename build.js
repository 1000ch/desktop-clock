'use strict';

const packager = require('electron-packager');
const pkg = require('./package');
const devDependencies = Object.keys(pkg.devDependencies);

let required = {
  dir: './',
  name: 'Desktop Clock',
  version: '0.37.5'
};

let optional = {
  'app-bundle-id': 'net.1000ch.DesktopClock',
  'app-version': pkg.version,
  overwrite: true,
  ignore: [
    '/fixtures($|/)',
    '/release($|/)',
    '/src($|/)'
  ].concat(devDependencies.map(name => '/node_modules/' + name + '($|/)'))
};

const archs = ['ia32', 'x64'];
const platforms = ['win32', 'linux', 'darwin'];

for (let platform of platforms) {
  for (let arch of archs) {
    pack(platform, arch);
  }
}

function pack(platform, arch) {
  if (platform === 'darwin' && arch === 'ia32') {
    return;
  }

  packager(Object.assign({}, required, optional, {
    platform: platform,
    arch: arch,
    out: `release`
  }), () => {
    console.log(`Packaging ${platform}-${arch} is finished`);
  });
}
