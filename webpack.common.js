const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/app.js",

  resolve: {
    // alias: {
    //   Components: path.resolve(__dirname, "./src/components/"),
    // },
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new Dotenv(),
  ],
};