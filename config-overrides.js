const {
  rewireWorkboxGenerate,
  defaultGenerateConfig
} = require('react-app-rewire-workbox')

module.exports = (config, env) => {
  if (env === 'production') {
    console.log('Production build - Adding Workbox for PWAs')
    config = rewireWorkboxGenerate({
      ...defaultGenerateConfig,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://api.hannoverjs.de/'),
          handler: 'networkFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('^https://maps.googleapis.com/'),
          handler: 'networkFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    })(config, env)
  }

  return config
}
