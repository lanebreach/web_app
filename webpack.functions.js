const Dotenv = require("dotenv-webpack");
console.log("Custom config");

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv()]
};
