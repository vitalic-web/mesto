const presets = [
    ['@babel/env', { // какой пресет использовать
      targets: { // какие версии браузеров поддерживать
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      },
  
      corejs: '3.6.5',
      useBuiltIns: "entry"
    }]
  ];
  
  module.exports = { presets };