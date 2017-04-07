module.exports = {
  staticFileGlobs: [
    'css/**.css',
    '**.html',
    'images/**.*',
    'js/**.js'
  ],
  stripPrefix: '',
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
};