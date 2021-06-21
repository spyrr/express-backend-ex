const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/app.js",
  target: 'node16',
  resolve: {
    fallback: { util: false, }
  },
  plugins: [ new Dotenv(), ],
};