const Dotenv = require('dotenv-webpack')

// `react-scripts` installs `webpack` v3 on root of `node_modules
// and `netlify-lambda` installs `webpack` v4 in it's own folder.
// `dotenv-webpack` needs to require `webpack` v4, so `netlify-lambda`
// can use this config, but since v3 is installed on root, it doesn't work,
// so this is a little workaround to ensure it's using v4.
module.exports = {
  plugins: [new Dotenv()]
}
